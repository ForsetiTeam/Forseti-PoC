import {
  versionController,
  authController,
} from "../controllers";
import {Express} from "express-serve-static-core";

function registerRouters(app: Express) {
    app.use("/api/version", versionController);

    app.use("/api/auth", authController);
}

export default registerRouters;
