import * as mongoose from "mongoose";
import config from "./config";
import {Express} from "express-serve-static-core";

// mongoose.Promise = global.Promise;

export default class MongoDb {
  private dbUrl: string;
  constructor(url?: string) {
    if (url) {
      this.dbUrl = url;
    } else {
      this.dbUrl = config.get("db.uri");
    }
  }

  public connect(app: Express): void {
    mongoose.connect(this.dbUrl);
    const db = mongoose.connection;
    // todo: return connection
  }
}
