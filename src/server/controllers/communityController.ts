import * as express from "express";
import * as passport from "passport";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import CommunityModel from "../models/CommunityModel";

const router = express.Router();

async function getList(req: Request, res: Response, next: NextFunction) {
  let list = await CommunityModel.find();
  res.json(list.map(community => community.getExportJSON()));
}

async function get(req: Request, res: Response, next: NextFunction) {
  const communityName = req.params.communityName;
  let community = await CommunityModel.findOne({name: communityName});
  if (!community) return res.responses.notFoundResource("Community not found");
  res.json(community.getExportJSON());
}

async function join(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const communityName = req.params.communityName;

  let community = await CommunityModel.findOne({name: communityName});
  if (!community) return res.responses.notFoundResource("Community not found");

  const error = await user.toggleCommunity(community._id);
  if (error) return res.responses.requestError("Can't toggle community");

  return res.json({user: user.getExportJSON()});
}

router.get("/",
  passport.authenticate("jwt", { session: false }),
  getList);
router.get("/:communityName",
  passport.authenticate("jwt", { session: false }),
  get);
router.post("/:communityName/join",
  passport.authenticate("jwt", { session: false }),
  join);

export default router;
