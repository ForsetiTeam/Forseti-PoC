import * as express from "express";
import * as passport from "passport";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import DisputeModel, { populateDispute } from "../models/DisputeModel";

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
      res.json(list.map(dispute => dispute.getExportJSON(req.user)))
    })
    .catch(() => res.responses.requestError("Can't resolve request"))
  ;
}

function getById(id, user, res) {
  populateDispute(DisputeModel.findById(id)).exec()
    .then(async dispute => {
      res.json(dispute.getExportJSON(user));
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

async function get(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;

  getById(disputeId, req.user, res);
}

async function create(req, res: Response, next: NextFunction) {
  const disputeRaw = req.body;

  const dispute = new DisputeModel({
    author: req.user._id,
    title: disputeRaw.title,
    description: disputeRaw.description || null,
    community: disputeRaw.community,
    eth: disputeRaw.eth,
    arbitersNeed: disputeRaw.arbitersNeed,
    document: disputeRaw.document
  });

  return dispute.save()
    .then(dispute => getById(dispute._id, req.user, res))
    .catch(err => res.responses.requestError("Can't save dispute"));
}

function vote(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  DisputeModel.findById(disputeId).exec()
    .then(dispute => {

      const vote = dispute.getUserVote(req.user.account);
      if (!vote) return res.responses.requestError("User is not an arbiter");

      vote.decision = req.body.decision;
      vote.sig = req.body.sig;

      dispute.save()
        .then(dispute => getById(dispute._id, req.user, res))
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
      finishDispute(dispute.ethAddress, dispute.arbiters, result)
        .then(async (transaction) => {
          dispute.isClosed = true;
          dispute.result = result;
          res.json(dispute.getExportJSON(req.user));
        })
        .catch(() => res.responses.requestError("Can't finish dispute"));
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

router.get("/",
  passport.authenticate("jwt", { session: false }),
  validate(validateGetDisputeList),
  getList);
router.get("/:id",
  passport.authenticate("jwt", { session: false }),
  get);

router.post("/",
  passport.authenticate("jwt", { session: false }),
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
