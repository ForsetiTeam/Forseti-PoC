import * as express from "express";
import * as passport from "passport";
import {Types} from "mongoose";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import DisputeModel, { populateDispute } from "../models/DisputeModel"
import DocumentModel from "../models/DocumentModel";

import getFileUploader from './utils/getFileUploader';
import sendFile from './utils/sendFile';

import validate from "../middlewares/validateSchema";
import {
  validateGetDisputeList,
  validateCreateDispute,
  validateVoteDispute,
  validateStartDispute
} from "../validators/disputeSchemas";

const router = express.Router();

async function getList(req: Request, res: Response, next: NextFunction) {
  const filterRaw = req.query;
  console.log('filterRaw', filterRaw);

  const filter = {};
  if (filterRaw.author == 'true') {
    filter.author = req.user._id;
  }
  if (filterRaw.arbiter == 'true') {
    filter.arbiters = {$elemMatch: { user: Types.ObjectId(req.user._id) }};
    if (filterRaw.hasOwnProperty('answered')) {
      filter.arbiters.$elemMatch.decision = { $exists: filterRaw.answered == 'true' };
    }
  }
  if (filterRaw.status) {
    filter.status = filterRaw.status;
  }

  let list = await populateDispute(DisputeModel.find(filter)).exec();
  res.json(list.map(item => item.getExportJSON(req.user._id.toString())));
}

async function get(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  return populateDispute(DisputeModel.findById(disputeId)).exec()
    .then(async dispute => {
      res.json(dispute.getExportJSON(req.user._id.toString()))
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

async function create(req, res: Response, next: NextFunction) {
  const disputeRaw = req.body;
  const dispute = new DisputeModel({
    author: req.user._id,
    title: disputeRaw.title,
    description: disputeRaw.description || null,
    community: disputeRaw.community,
    arbitersNeed: disputeRaw.arbitersNeed,
    document: req.file ? req.file.id : null,
    //ethAddress: disputeRaw.ethAddress,
  });

  return dispute.save()
    .then(async dispute => res.json(dispute.getExportJSON(req.user._id.toString())))
    .catch(err => res.responses.requestError("Can't save dispute", null));
}

async function getDocument(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  DisputeModel.findById(disputeId).populate({path: 'document', model: DocumentModel}).exec()
    .then((dispute: any) => {
      if (!dispute.document) return res.responses.notFoundResource("Document not found");

      const fileData = dispute.document.toJSON();
      const fileName = fileData.metadata && fileData.metadata.fileName || 'undefined';

      sendFile(res, fileData, fileName);
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

function vote(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  DisputeModel.findById(disputeId).populate({path: 'document', model: DocumentModel}).exec()
    .then(dispute => {

      const vote = dispute.getUserVote(req.user._id.toString());
      if (!vote) return res.responses.requestError("User is not an arbiter");

      vote.decision = req.body.decision;
      vote.sig = req.body.sig;

      dispute.save()
        .then(dispute => res.json(dispute.getExportJSON(req.user._id.toString())))
        .catch(error => res.responses.requestError(error));
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

function start(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  const ethAddress = req.body.ethAddress;

  console.log(disputeId, ethAddress);

  populateDispute(DisputeModel.findByIdAndUpdate(disputeId, { ethAddress }, { new: true })).exec()
    .then(async dispute => {
      await dispute.setArbiters();
      res.json(dispute.getExportJSON(req.user._id.toString()))
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

router.get("/",
  passport.authenticate("jwt", { session: false }),
  validate(validateGetDisputeList),
  getList);
router.get("/:id/document",
  passport.authenticate("jwt", { session: false }),
  getDocument);
router.get("/:id",
  passport.authenticate("jwt", { session: false }),
  get);

const upload = getFileUploader();
router.post("/",
  passport.authenticate("jwt", { session: false }),
  validate(validateCreateDispute),
  upload.single('document'),
  create);
router.post("/:id/vote",
  passport.authenticate("jwt", { session: false }),
  validate(validateVoteDispute),
  vote);
router.post("/:id/start",
  passport.authenticate("jwt", { session: false }),
  validate(validateStartDispute),
  start);

export default router;
