import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportJwt from "passport-jwt";
import * as ethUtil from 'ethereumjs-util';
import config from "../config";
import UserModel from "../models/UserModel";
import {Express, Request} from "../types/ExpressExtended";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

function checkSig(sig, owner) {
  try {
    let phrase = config.get("metamask.sigPhrase");
    let message = ethUtil.toBuffer(phrase);
    let msgHash = ethUtil.hashPersonalMessage(message);
    // Get the address of whoever signed this message
    let signature = ethUtil.toBuffer(sig);
    let sigParams = ethUtil.fromRpcSig(signature);
    let publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s);
    let sender = ethUtil.publicToAddress(publicKey);
    let addr = ethUtil.bufferToHex(sender);
    return addr == owner;
  } catch(e) {
    return false;
  }
}

export default (app: Express): void => {
  passport.serializeUser((user: any, done) => {
    return done(null, user._id);
  });

  // tslint:disable-next-line
  passport.deserializeUser(async (_id, done) => {
    const user = await UserModel.findOne({_id}, { password: false });
    if (!user || !user._id) {
      return done("not found");
    }
    return done(null, user);
  });

  passport.use(new LocalStrategy({
      usernameField: "account",
      passwordField: "sig",
    },
    async (account, sig, next) => {
      const user = await UserModel.findOne({account}).lean();
      if (!user) {
        return next(null, false, {message: "Account not found"});
      }
      if (!checkSig(sig, account)) {
        return next(null, false, {message: "Signature missmatch"});
      }
      return next(null, user);
    },
  ));

  const jwtStrategyOpts = {jwtFromRequest: null, secretOrKey: null};

  jwtStrategyOpts.jwtFromRequest = (req: Request): string => {
    let token = null;

    if (req && req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if ((typeof token === "undefined" || token === null) && req && req.headers && req.headers.authorization) {
      token = req.headers.authorization;
    }

    return token;
  };
  jwtStrategyOpts.secretOrKey = config.get("jwt.secret");

  passport.use(new JwtStrategy(
    jwtStrategyOpts,
    async (jwtPayload, next) => {
      const user = await UserModel.findOne({ _id: jwtPayload.userId }).lean();
      if (!user) {
        return next(null, false);
      }
      return next(null, user);
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());
};
