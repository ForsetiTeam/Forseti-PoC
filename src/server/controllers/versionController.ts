import * as express from "express";
import {NextFunction, Request, Response} from "../types/ExpressExtended";
import VersionModel from "../models/VersionModel";

const router = express.Router();

async function getVersion(req: Request, res: Response, next: NextFunction): Promise<Response> {
  const currentVersion = (await VersionModel.find().limit(1).sort({$natural:-1}))[0];
  return res.responses.success(currentVersion.version);
}

router.get("/", getVersion);

export default router;
