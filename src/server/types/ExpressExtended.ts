import {Request, Response, NextFunction, RequestHandler, Express} from "express-serve-static-core";
import {ResponseFactory} from "../app/responses";

interface ResponseExtended extends Response {
  responses: ResponseFactory;
}

// region extensions

interface Session {
  [key: string]: any;
  id: string;
  cookie: any;
  regenerate(callback: (err: any) => void): void;
  destroy(callback: (err: any) => void): void;
  reload(callback: (err: any) => void): void;
  save(callback: (err: any) => void): void;
  touch(callback: (err: any) => void): void;
}

// endregion extensions

interface RequestExtended extends Request {
  session: Session;
}

interface RequestHandlerExtended extends RequestHandler {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
  (req: RequestExtended, res: ResponseExtended, next: NextFunction): any;
}

// todo: figure out how to export Module as ModuleExtended (modules syntax doesn`t work due to ":" references type)
export {
  RequestExtended as Request,
  ResponseExtended as Response,
  NextFunction,
  RequestHandlerExtended as RequestHandler,
  Express,
};
