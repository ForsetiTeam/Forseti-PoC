import * as express from "express";
import * as passport from "passport";
import * as VError from "verror";
import config from "../config";
import UserModel, { populateUser } from "../models/UserModel";
import {NextFunction, Request, Response} from "../types/ExpressExtended";
import validate from "../middlewares/validateSchema";
import {
  signUpSchema,
  signInSchema
} from "../validators/authSchemas";
import * as jwt from "jsonwebtoken";

const router = express.Router();

// todo: move to utils
function generateToken(user) {
  const payload = { userId: user._id };
  const options = {
    expiresIn: config.get("jwt.expiresIn"),
  };
  return jwt.sign(payload, config.get("jwt.secret"), options);
}

async function login(req: Request, res: Response, next: NextFunction) {
  const account = req.body.account;
  try {
    return passport.authenticate("local", {session: false}, (err, user, info) => {
      if (err) {
        return next(new VError(err, "Auth error"));
      }

      if (!user) {
        return res.responses.unauthorized(info.message);
      }
      const token = generateToken(user);
      req.logIn(user, (loginErr) => {
        if (loginErr) { return next(new VError(err, "Auth error")); }
        res.cookie("jwt", token, {httpOnly: true});
        populateUser(UserModel.findById(user._id)).exec()
          .then(user => res.json({message: "Success", user: user.getExportJSON(), token}))
          .catch(err => res.responses.notFoundResource("User not found"));
      });

    })(req, res, next);
  } catch (err) {
    return next(err instanceof Error ? err : new VError(err));
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  req.logout();
  // req.session.destroy(() => true);
  return res.responses.success("Success");
}

async function register(req: Request, res: Response, next: NextFunction) {
  const userData = req.body;

  const userDoc = {
    email: userData.email,
    account: userData.account,
    sig: userData.sig
  };

  const user = await UserModel.create(userDoc);

  const token = generateToken(user);
  req.logIn(user, (loginErr) => {
    if (loginErr) { return next(new VError("Auth error")); }
    res.cookie("jwt", token, {httpOnly: true});
    return res.json({message: "Success", user: user, token});
  });
}

router.post("/register", validate(signUpSchema), register);
router.post("/login", validate(signInSchema), login);
router.post("/logout", logout);

export default router;
