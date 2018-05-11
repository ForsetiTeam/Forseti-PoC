import * as express from "express";
import * as passport from "passport";
import CommunityModel from "../models/CommunityModel";
import {NextFunction, Request, Response} from "../types/ExpressExtended";

const router = express.Router();

async function getList(req: Request, res: Response, next: NextFunction) {
  let list = await CommunityModel.find();
  res.json(list);
}

async function get(req: Request, res: Response, next: NextFunction) {
  const communityId = req.params.id;
  let community = await CommunityModel.findOne({name: communityId});
  if (!community) return res.responses.notFoundResource("Community not found");
  res.json(community);
}

async function join(req: Request, res: Response, next: NextFunction) {
  const communityId = req.params.id;
  let community = await CommunityModel.findOne({name: communityId});
  if (!community) return res.responses.notFoundResource("Community not found");

  console.log(req);
  //req.user.communities.push(community).save();
  //res.json(community);
  return res.responses.success("Успешно");
}

router.get("/", getList);
router.get("/:id", get);
router.post("/:id/join", passport.authenticate("jwt", { session: false }), join);

export default router;
