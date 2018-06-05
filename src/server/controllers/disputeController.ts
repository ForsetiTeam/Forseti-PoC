import * as express from "express";
import * as passport from "passport";
import {Types} from "mongoose";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import DisputeModel, { populateDispute, Status } from "../models/DisputeModel"
import DocumentModel from "../models/DocumentModel";

import getFileUploader from './utils/getFileUploader';
import sendFile from './utils/sendFile';

import finishDispute from '../ethereum/dispute/finishDispute';

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

  const filter = {};
  if (filterRaw.author == 'true') {
    filter.author = req.user._id;
  }
  if (filterRaw.arbiter == 'true') {
    filter.arbiters = { $elemMatch: { userAddress: req.user.account } };
    if (filterRaw.hasOwnProperty('answered')) {
      filter.arbiters.$elemMatch.decision = { $exists: filterRaw.answered == 'true' };
    }
  }
  if (filterRaw.status) {
    filter.status = filterRaw.status;
  }

  populateDispute(DisputeModel.find(filter)).exec()
    .then(list => {
      console.log(list)
      res.json(list.map(dispute => dispute.getExportJSON(req.user)))
    })
    .catch(() => res.responses.requestError("Can't resolve request"))
  ;
}

async function get(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  console.log('disputeId', disputeId);

  return populateDispute(DisputeModel.findById(disputeId)).exec()
    .then(async dispute => {
      res.json(dispute.getExportJSON(req.user));
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
    document: req.file ? req.file.id : null
  });

  return dispute.save()
    .then(async dispute => res.json(dispute.getExportJSON(req.user)))
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

      const vote = dispute.getUserVote(req.user.account);
      if (!vote) return res.responses.requestError("User is not an arbiter");

      vote.decision = req.body.decision;
      vote.sig = req.body.sig;

      dispute.save()
        .then(dispute => res.json(dispute.getExportJSON(req.user)))
        .catch(error => res.responses.requestError(error));
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

function start(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  const ethAddress = req.body.ethAddress;

  populateDispute(DisputeModel.findById(disputeId)).exec()
    .catch(() => res.responses.notFoundResource("Dispute not found"))
    .then(dispute => dispute.setArbiters())
    .then(dispute => {
      console.log('SAVE');
      dispute.ethAddress = ethAddress;
      return dispute.save();
    })
    .then(dispute => res.json(dispute.getExportJSON(req.user)))
    .catch(error => res.responses.requestError(error));
}

function finish(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;

  populateDispute(DisputeModel.findById(disputeId)).exec()
    .then(dispute => {
      const result = dispute.calcResult();
      finishDispute(dispute.ethAddress, dispute.community.poolMasterAddress, dispute.arbiters, result)
        .then(async (transaction) => {
          console.log('transaction', transaction)
          dispute.status = Status.CLOSED;
          await dispute.save();
          res.responses.success("Success");
        })
        .catch(() => res.responses.requestError("Can't finish dispute"));
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
  upload.single('document'),
  validate(validateCreateDispute),
  create);
router.post("/:id/vote",
  passport.authenticate("jwt", { session: false }),
  validate(validateVoteDispute),
  vote);
router.post("/:id/start",
  passport.authenticate("jwt", { session: false }),
  validate(validateStartDispute),
  start);
router.post("/:id/finish",
  passport.authenticate("jwt", { session: false }),
  finish);

export default router;
