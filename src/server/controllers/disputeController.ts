import * as express from "express";
import * as passport from "passport";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import DisputeModel, { populateDispute } from "../models/DisputeModel"
import DocumentModel from "../models/DocumentModel";

import getFileUploader from './utils/getFileUploader';
import sendFile from './utils/sendFile';

const router = express.Router();

async function getList(req: Request, res: Response, next: NextFunction) {
  const params = req.query;
  const filter = {author: undefined, status: undefined};
  if (params.owner) {
    filter.author = req.user._id;
  }
  if (params.status) {
    filter.status = params.status;
  }
  if (!filter.author) delete filter.author;
  if (!filter.status) delete filter.status;

  let list = await populateDispute(DisputeModel.find(filter)).exec();
  res.json(list.map(item => item.getExportJSON(req.user._id.toString())));
}

async function get(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  return populateDispute(DisputeModel.findById(disputeId)).exec()
    //.then(dispute => res.json(dispute.getExportJSON(req.user._id.toString())))
    .then(async dispute => {
      console.log('DISPUTE', dispute);
      const resul = await dispute.setArbiters();
      console.log('RESUL', resul);
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
    ethAddress: disputeRaw.ethAddress,
  });

  return dispute.save()
    .then(dispute => res.json(dispute.getExportJSON(req.user._id.toString())))
    .catch(err => res.responses.requestError("Can't save dispute", null));
}

async function getDocument(req: Request, res: Response, next: NextFunction) {
  //get dispute and document name
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
  //get dispute and document name
  const disputeId = req.params.id;
  DisputeModel.findById(disputeId).populate({path: 'document', model: DocumentModel}).exec()
    .then(dispute => {

      console.log('DISPUTE', dispute);
      console.log('DECISION', req.body.decision);
      console.log('USER', req.user);
      const vote = dispute.getUserVote(req.user._id.toString());
      console.log('VOTE', vote);
      if (vote) return res.responses.requestError("Already voted");
      dispute.addVote(req.user._id, req.body.decision);
      console.log('VOTES', dispute.arbiters);
      dispute.save()
        .then(dispute => res.json(dispute.getExportJSON(req.user._id.toString())))
        .catch(error => res.responses.requestError(error));
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

router.get("/", passport.authenticate("jwt", { session: false }), getList);
router.get("/:id/document", passport.authenticate("jwt", { session: false }), getDocument);
router.get("/:id", passport.authenticate("jwt", { session: false }), get);

const upload = getFileUploader();
router.post("/", passport.authenticate("jwt", { session: false }), upload.single('document'), create);
router.post("/:id/vote", passport.authenticate("jwt", { session: false }), vote);

export default router;
