import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as morgan from "morgan";
import * as express from "express";
import * as path from "path";
import * as cors from 'cors';
import config from "./config";
import {log as logger, logStream} from "./app/logger";
import routers from "./app/routers";
import responses from "./app/responses";
import {Express} from "./types/ExpressExtended";
import customValidators from "./middlewares/customValidators";
import passport from "./middlewares/passport";
import "./tasks";

const initMiddleware = (app: Express) => {
    // "as any" used to prevent buggy behavior with method override
    app.use(morgan(`[:date[clf]] - ":method :url" :status :response-time ms - :res[content-length]` as any,
        {stream: logStream} as any),
    );
    //app.use(cookieParser());
    app.use(bodyParser.json());
    /*app.use((err, req, res, next) => {
        return res.status(400).json({message: "Invalid JSON string."});
    });*/
    app.use(responses());
    app.use(customValidators());
    passport(app);
};

const initSession = (app: Express) => {
    app.use(
        session({
            saveUninitialized: true,
            resave: true,
            secret: config.get("session.secret"),
            cookie: { maxAge: config.get("session.maxAge") },
        }),
    );
};

const initModulesServerRoutes = (app: Express) => { routers(app); };

const initErrorRoutes = (app: Express) => {
    app.use((err, req, res, next) => {
        if (!err) { return next(); }

        const result = {
            status: 500,
            message: err.message || "Error",
        };
        logger.error("Unexpected Error in controller");
        logger.error(err.stack || err);
        res.statusCode = result.status;
        return res.json(result);
    });
};

const initStatic = (app: Express) => {
    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.resolve(__dirname, "../../build")));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../../build/index.html"));
        });
    }
};

const notFoundRoutes = (app: Express) => {
    app.use("/api/*", (req, res) => {
        res.status(404).send("Endpoint not found");
    });
};

const initCORS = (app: Express) => {
    // enable CORS
    app.use((req, res, next) => {

     /*   res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
*/


      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        next();
    });
};

const init = (): Express => {
    const app = express();
    initCORS(app);
    initSession(app);
    initMiddleware(app);
    initModulesServerRoutes(app);
    initErrorRoutes(app);
    notFoundRoutes(app);
    initStatic(app);
    return app;
};

export default init;
