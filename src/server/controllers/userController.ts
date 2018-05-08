import * as express from "express";
import * as passport from "passport";
import * as bcrypt from "bcryptjs-then";
import * as crypto from "crypto";
import * as VError from "verror";
import {NextFunction, Request, Response} from "../types/ExpressExtended";
import UserModel from "../models/UserModel";
import config from "../config";
import { sendMail } from "../services/emailService";

const router = express.Router();

async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const dbUser = await UserModel.findOne({_id: user._id}).lean();

  return res.json(dbUser);
}

async function updateCurrentUser(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const email = req.body.email;
  const password = req.body.password;

  const modification = { email } as any;

  if (password) {
    modification.password = await bcrypt.hash(password);
  }

  if (email !== user.email) {
    modification.$unset = { btcAddress: "" };
  }

  await UserModel.update({ _id: user._id }, modification);

  return res.responses.success("Account updated");
}

async function changeEmail(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  const tokenBuffer = await crypto.randomBytes(config.get("emailChange.tokenLength"));
  const emailChangeToken = tokenBuffer.toString("hex");
  const now = new Date();
  const emailChangeLastDate = now.setUTCHours(now.getUTCHours() + config.get("emailChange.tokenTTL"));
  const emailChangeValue = req.body.email;

  await UserModel.updateOne({ _id: user._id }, { emailChangeToken, emailChangeLastDate, emailChangeValue });

  const emailChangeLink =
    `${config.get("http.url")}/email/change/${emailChangeToken}`;

  const mailOptions = {
    from: "Aspirity Blockchain <aspirity@blockchain.com>",
    to: req.body.email,
    subject: "Изменение адреса электронной почты",
    text: `Для подтверждения изменения адреса электронной почты перейдите по ссылке: ${emailChangeLink}`,
    html: `<p>Для подтверждения изменения адреса электронной почты перейдите по ссылке:
           <a href="${emailChangeLink}">${emailChangeLink}</a></p>`,
  };

  await sendMail(mailOptions);

  return res.responses.success("Письмо отправлено");
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const password = req.body.password;

  const tokenBuffer = await crypto.randomBytes(config.get("passwordChange.tokenLength"));
  const passwordChangeToken = tokenBuffer.toString("hex");
  const now = new Date();
  const passwordChangeLastDate = now.setUTCHours(now.getUTCHours() + config.get("passwordChange.tokenTTL"));
  const passwordChangeValue = await bcrypt.hash(password);

  await UserModel.updateOne({ _id: user._id }, { passwordChangeToken, passwordChangeLastDate, passwordChangeValue });

  const passwordChangeLink =
    `${config.get("http.url")}/password/change/${passwordChangeToken}`;

  const mailOptions = {
    from: "Aspirity Blockchain <aspirity@blockchain.com>",
    to: user.email,
    subject: "Изменение пароля",
    text: `Для подтверждения изменения пароля перейдите по ссылке: ${passwordChangeLink}`,
    html: `<p>Для подтверждения изменения пароля перейдите по ссылке:
           <a href="${passwordChangeLink}">${passwordChangeLink}</a></p>`,
  };

  await sendMail(mailOptions);

  return res.responses.success("Письмо отправлено");
}

async function confirmEmailChange(req: Request, res: Response, next: NextFunction) {
  try {
    const emailChangeToken = req.body.emailChangeToken;
    const user = await UserModel.findOne({ emailChangeToken });

    if (!user) {
      return res.responses.notFoundResource("User not found", null);
    }

    const now = new Date();

    if (user.emailChangeLastDate < now.setUTCHours(now.getUTCHours())) {
      return res.responses.requestError("Token expires", null);
    }

    user.email = user.emailChangeValue;
    user.emailChangeToken = undefined;
    user.emailChangeLastDate = undefined;

    await user.save();

    return res.responses.success("done");
  } catch (err) {
    return next(err instanceof Error ? err : new VError(err));
  }
}

async function confirmPasswordChange(req: Request, res: Response, next: NextFunction) {
  try {
    const passwordChangeToken = req.body.passwordChangeToken;
    const user = await UserModel.findOne({ passwordChangeToken });

    if (!user) {
      return res.responses.notFoundResource("User not found", null);
    }

    const now = new Date();

    if (user.passwordChangeLastDate < now.setUTCHours(now.getUTCHours())) {
      return res.responses.requestError("Token expires", null);
    }

    user.password = user.passwordChangeValue;
    user.passwordChangeToken = undefined;
    user.passwordChangeLastDate = undefined;

    await user.save();

    return res.responses.success("done");
  } catch (err) {
    return next(err instanceof Error ? err : new VError(err));
  }
}

export default router;
