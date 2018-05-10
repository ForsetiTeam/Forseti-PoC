import * as expressValidator from "express-validator";
import * as bcrypt from "bcryptjs-then";
import UserModel from "../models/UserModel";

function isContains(item, targetItems) {
  if (!item) {
    return false;
  }
  return Boolean(targetItems && targetItems.find((i) => i === item));
}

function isCustomEmail(email) {
  return /^[-a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\-\.]+@[a-z0-9.\-]+$/.test(email);
}

async function isUserExistsByEmail(email) {
  if (!email) { return Promise.resolve(); }
  const existingUser = await UserModel.findOne({email});
  if (existingUser) {
    return Promise.reject("user exist");
  }
  return Promise.resolve();
  // todo: handle notconfirmed emails
  // switch (emailStatus) {
  //   case "notExists":
  //     return Promise.resolve();
  //   case "notConfirmed":
  //     await User.remove({ email });
  //     return Promise.resolve();
  //   case "confirmed":
  //     return Promise.reject();
  // }
}

async function isUserNotExistsByEmail(email) {
  if (!email) { return Promise.resolve(); }

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    return Promise.reject("user not exist");
  }
  return Promise.resolve();
}

async function isUserExistsByEmailUpdate(email, userEmail) {
  if (!email) { return Promise.resolve(); }
  const existingUser = await UserModel.findOne({email});
  if (existingUser && email !== userEmail) {
    return Promise.reject("user exist");
  }
  return Promise.resolve();
}

function isPassword(password) {
  return /(?=.*[0-9])(?=.*[а-яёa-z])(?=.*[A-ZА-ЯЁ])[0-9a-zA-Z.,';\]\[{}:"<>?!@#$%^&*()_\-+=|\/№А-Яа-яЁё]{6,}/
    .test(password);
}

function isLengthArray(array, length) {
  return array.length <= length;
}

function isArray(value) {
  return Array.isArray(value);
}

function isString(value) {
  return typeof value === "string";
}

function isCustomPhone(phone) {
  return /^\d{0,15}$/.test(phone);
}

function isSamePassword(oldPassword, user) {
  if (!user) {
    return Promise.reject("user undefined");
  }

  return bcrypt.compare(oldPassword, user.password)
    .then((valid) => {
      if (valid) { return Promise.resolve(); }

      return Promise.reject("different passwords");
    });
}

async function isUserExistsByAccount(account) {
    if (!account) { return Promise.resolve(); }
    const existingUser = await UserModel.findOne({account});
    if (existingUser) {
        return Promise.reject("user exist");
    }
    return Promise.resolve();
}

function setupValidator() {
  return expressValidator({
    customValidators: {
      isContains,
      isCustomEmail,
      isUserExistsByEmail,
      isUserNotExistsByEmail,
      isPassword,
      isLengthArray,
      isArray,
      isString,
      isCustomPhone,
      isSamePassword,
      isUserExistsByEmailUpdate,

      isUserExistsByAccount
    },
  });
}

export default setupValidator;
