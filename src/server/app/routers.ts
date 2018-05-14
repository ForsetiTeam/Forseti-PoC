import {
  versionController,
  authController,
  communityController,
} from "../controllers";
import {Express} from "express-serve-static-core";

function registerRouters(app: Express) {
  app.use("/api/version", versionController);
  app.use("/api/auth", authController);
  app.use("/api/community", communityController);
}

export default registerRouters;
