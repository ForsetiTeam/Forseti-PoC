import express from "./express";
import config from "./config";
import MongoDb from "./mongodb";
import  "./ipfs";

const db = new MongoDb();
const app = express();

db.connect(app);

console.log('START SERVER');
app.listen(config.get("http.port") || 8080);
