import * as express from "express";
import * as bcrypt from "bcryptjs-then";
import * as passport from "passport";
import * as VError from "verror";
import config from "../config";
import UserModel from "../models/UserModel";
import {NextFunction, Request, Response} from "../types/ExpressExtended";
import validate from "../middlewares/validateSchema";
import {
  signUpSchema,
  signInSchema,
  confirmEmailSchema,
  passwordRecoverSchema,
  passwordSetSchema,
} from "../validators/authSchemas";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { sendMail } from "../services/emailService";

const router = express.Router();

// todo: move to utils
function generateToken(user) {
  const payload = { userId: user._id };
  const options = {
    expiresIn: config.get("jwt.expiresIn"),
  };
  return jwt.sign(payload, config.get("jwt.secret"), options);
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    return passport.authenticate("local", {}, (err, user, info) => {
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
        return res.json({message: "Success", id: user._id, token});
      }); // todo: logIn from passport should be in request extended

    })(req, res, next);
  } catch (err) {
    return next(err instanceof Error ? err : new VError(err));
  }
}


async function confirmEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const confirmationToken = req.body.confirmationToken;
    const user = await UserModel.findOne({ confirmationToken });

    if (!user) {
      return res.responses.notFoundResource("User not found", null);
    }

    const now = new Date();

    if (user.confirmationLastDate < now.setUTCHours(now.getUTCHours())) {
      return res.responses.requestError("Token expires", null);
    }

    user.emailConfirmed = true;
    user.confirmationToken = undefined;
    user.confirmationLastDate = undefined;

    await user.save();

    const token = generateToken(user);

    return res.json({ userId: user._id, token });
  } catch (err) {
    return next(err instanceof Error ? err : new VError(err));
  }
}

async function sendMailForPasswordRecover(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.responses.notFoundResource("User not found", null);
    }

    const tokenBuffer = await crypto.randomBytes(config.get("passwordRecover.tokenLength"));
    const passwordRecoverToken = tokenBuffer.toString("hex");
    const now = new Date();
    const passwordRecoverLastDate = now.setUTCHours(now.getUTCHours() + config.get("passwordRecover.tokenTTL"));

    user.passwordRecoverToken = passwordRecoverToken;
    user.passwordRecoverLastDate = passwordRecoverLastDate;

    await user.save();

    const passwordRecoverLink =
      `${config.get("http.url")}/password/set/${passwordRecoverToken}`;

    const mailOptions = {
      from: "Aspirity Blockchain <aspirity@blockchain.com>",
      to: email,
      subject: "Восстановление пароля",
      text: `Для ввода нового пароля перейдите по ссылке: ${passwordRecoverLink}`,
      html: `<p>Для ввода нового пароля перейдите по ссылке:
           <a href="${passwordRecoverLink}">${passwordRecoverLink}</a></p>`,
    };

    await sendMail(mailOptions);

    return res.responses.success("Письмо отправлено");
  } catch (err) {
    return next(err instanceof Error ? err : new VError(err));
  }
}

async function setNewPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const password = req.body.password;
    const passwordRecoverToken = req.body.passwordRecoverToken;
    const user = await UserModel.findOne({ passwordRecoverToken });

    if (!user) {
      return res.responses.notFoundResource("User not found", null);
    }

    const now = new Date();

    if (user.passwordRecoverLastDate < now.setUTCHours(now.getUTCHours())) {
      return res.responses.requestError("Token expires", null);
    }

    user.password = await bcrypt.hash(password);
    user.passwordRecoverToken = undefined;
    user.passwordRecoverLastDate = undefined;

    await user.save();

    return res.responses.success("Пароль успешно изменён");
  } catch (err) {
    return next(err instanceof Error ? err : new VError(err));
  }
}



async function register(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    const userDoc = {
        email: user.email,
        account: user.account,
        sign: user.sign
    };

    await UserModel.create(userDoc);
    req.session.destroy(() => true);

    return res.responses.success("Регистрация завершена");
}

router.post("/register", validate(signUpSchema), register);

router.post("/signin", validate(signInSchema), signIn);
router.put("/confirm", validate(confirmEmailSchema), confirmEmail);
router.put("/password/recover", validate(passwordRecoverSchema), sendMailForPasswordRecover);
router.put("/password/set", validate(passwordSetSchema), setNewPassword);

export default router;
