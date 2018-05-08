import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportJwt from "passport-jwt";
import * as bcrypt from "bcryptjs-then";
import config from "../config";
import UserModel from "../models/UserModel";
import {Express, Request} from "../types/ExpressExtended";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

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
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      const user = await UserModel.findOne({email}).lean();
      if (!user) {
        return next(null, false, {message: "Неправильный e-mail или пароль"});
      }
      if (!user.emailConfirmed) {
        return next(null, false, {message: "Аккаунт неподтверждён"});
      }
      const res = await bcrypt.compare(password, user.password);
      if (!res) {
        return next(null, false, {message: "Неправильный e-mail или пароль"});
      }
      delete user.password;
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

  passport.use(new JwtStrategy(jwtStrategyOpts, async (jwtPayload, next) => {
    const user = await UserModel.findOne({ _id: jwtPayload.userId }).lean();
    if (!user) {
      return next(null, false);
    }
    return next(null, user);
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
