import {Express} from "express-serve-static-core";

import versionController from "./versionController";
import authController from "./authController";
import communityController from "./communityController";
import disputeController from "./disputeController";

function registerRouters(app: Express) {
  app.use("/api/version", versionController);
  app.use("/api/auth", authController);
  app.use("/api/community", communityController);
  app.use("/api/dispute", disputeController);
}

export default registerRouters;
