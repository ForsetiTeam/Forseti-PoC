import * as nodemailer from "nodemailer";
import config from "../config";
import { log } from "../app/logger";

function createTransporter() {
  return nodemailer.createTransport({
    service: config.get("emailTransport.service"),
    auth: {
      user: config.get("emailTransport.user"),
      pass: config.get("emailTransport.pass"),
    },
  });
}

async function sendMail(mailOptions) {
  const transporter = createTransporter();

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    log.error(err);
  }
}

export { sendMail };
