import * as express from "express";
import * as passport from "passport";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import DisputeModel from "../models/DisputeModel";

const router = express.Router();

async function getList(req: Request, res: Response, next: NextFunction) {
  console.log('GET LIST')
  const params = req.query;
  const filter = {};
  if (params.owner) {
    filter.author = req.user._id;
  }
  if (params.status) {
    filter.status = params.status;
  }

  let list = await DisputeModel.populateAll(DisputeModel.find(filter)).exec();
  console.log(list)
  res.json(list.map(item => item.getExportJSON()));
}

async function get(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  return DisputeModel.populateAll(DisputeModel.findById(disputeId)).exec()
    .then(dispute => res.json(dispute.getExportJSON()))
    .catch(() => res.responses.requestError("Can't save", null));
}

async function create(req: Request, res: Response, next: NextFunction) {
  const disputeRaw = req.body.dispute;
  console.log('disputeRaw', disputeRaw);
  const dispute = new DisputeModel({
    author: req.user._id,
    title: disputeRaw.title,
    description: disputeRaw.description,
    community: disputeRaw.community
  });
  return dispute.save()
    .then(dispute => res.json(dispute.getExportJSON()))
    .catch((err) => next(err instanceof Error ? err : new VError(err)));
}

router.get("/", passport.authenticate("jwt", { session: false }), getList);
router.get("/:id", passport.authenticate("jwt", { session: false }), get);
router.post("/", passport.authenticate("jwt", { session: false }), create);

export default router;
