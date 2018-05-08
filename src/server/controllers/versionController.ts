import * as express from "express";
import {NextFunction, Request, Response} from "../types/ExpressExtended";
import VersionModel from "../models/VersionModel";

const router = express.Router();

async function getVersion(req: Request, res: Response, next: NextFunction): Promise<Response> {
  const currentVersion = await VersionModel.findOne();
  if (!currentVersion) {
    const test = new VersionModel({ version: "1.0.0", description: "init version" });
    await test.save();
    return res.responses.success(test.version);
  }
  return res.responses.success(currentVersion.version);
}

router.get("/", getVersion);

export default router;
