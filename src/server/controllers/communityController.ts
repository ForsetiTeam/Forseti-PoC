import * as express from "express";
import * as passport from "passport";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import UserModel from "../models/UserModel";
import CommunityModel from "../models/CommunityModel";


const router = express.Router();

async function getList(req: Request, res: Response, next: NextFunction) {
  let list = await CommunityModel.find();
  res.json(list);
}

async function get(req: Request, res: Response, next: NextFunction) {
  const communityName = req.params.communityName;
  let community = await CommunityModel.findOne({name: communityName});
  if (!community) return res.responses.notFoundResource("Community not found");
  res.json(community);
}

async function join(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const communityName = req.params.communityName;

  let community = await CommunityModel.findOne({name: communityName});
  if (!community) return res.responses.notFoundResource("Community not found");

  let communities = user.communities||[];
  const pos = communities.map(community => String(community)).indexOf(String(community._id));
  if (pos != -1) {
    communities.splice(pos, 1);
  } else {
    communities.push(community);
  }

  const newUser = await UserModel.findByIdAndUpdate(user._id, { communities }, {new: true})
    .populate({path: 'communities', model: CommunityModel})
    .exec();

  return res.json({message: "Success", user: newUser.getExportJSON()});
}

router.get("/", passport.authenticate("jwt", { session: false }), getList);
router.get("/:communityName", passport.authenticate("jwt", { session: false }), get);
router.post("/:communityName/join", passport.authenticate("jwt", { session: false }), join);

export default router;
