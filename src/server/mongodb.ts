import * as mongoose from "mongoose";
import {Express} from "express-serve-static-core";

import config from "./config";
import { migrateToActual } from './migrations';
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
    mainConnect();
  }
}

function dropDatabase() {
  return mongoose.connection.db.dropDatabase();
}

function mainConnect() {
  //if (config.get('db.dropDatabaseAlways')) dropDatabase();
  if (config.get('db.autoApplyMigrations')) migrateToActual();
}

