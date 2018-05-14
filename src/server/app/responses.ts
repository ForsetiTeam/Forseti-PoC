import * as http from "http";
import {ResponseMessage} from "../types/ResponseTypes";
import {Request, Response, NextFunction, RequestHandler} from "../types/ExpressExtended";

export class ResponseFactory {
  private res: Response;
  constructor(res) { this.res = res; }

  public notFoundResource(message, options = null): Response {
    const code = 404;
    const responseMessage = {
      message: message || http.STATUS_CODES[code],
    };
    return this.res.status(code).json(responseMessage) as Response;
  }

  public requestError(message: string, options): Response {
    const code = 400;
    const responseMessage: ResponseMessage = {
      message: message || http.STATUS_CODES[code],
    };

    if (options && options.errors) {
      responseMessage.errors = options.errors;
    }

    return this.res.status(code).json(responseMessage) as Response;
  }

  public validationError(message: string, options): Response {
    const code = 422;
    if (options && options.errors) {
      delete options.errors.isOperational;
    }
    const responseMessage = {
      message: message || http.STATUS_CODES[code],
      errors: options.errors || "Validation error",
    };

    return this.res.status(code).json(responseMessage) as Response;
  }

  public unauthorized(message: string): Response {
    const code = 401;
    const responseMessage = {
      message: message || http.STATUS_CODES[code],
    };

    return this.res.status(code).json(responseMessage) as Response;
  }

  public accessDenied(message: string): Response {
    const code = 403;
    const responseMessage = {
      message: message || http.STATUS_CODES[code],
    };

    return this.res.status(code).json(responseMessage) as Response;
  }

  public serverError(message: string): Response {
    const code = 500;
    const responseMessage = {
      message: message || http.STATUS_CODES[code],
    };

    return this.res.status(code).json(responseMessage) as Response;
  }

  public success(message: string): Response {
    const code = 200;
    const responseMessage = {
      message: message || http.STATUS_CODES[code],
    };

    return this.res.status(code).json(responseMessage) as Response;
  }

  public created(obj): Response {
    const code = 201;
    const responseMessage = {
      _id: obj._id,
    };

    return this.res.status(code).json(responseMessage) as Response;
  }

  public NoContent(message: string): Response {
    const code = 204;
    const responseMessage = {
      message: message || http.STATUS_CODES[code],
    };

    return this.res.status(code).json(responseMessage) as Response;
  }
}

export default function responseMiddleware(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    // noinspection TypeScriptUnresolvedVariable
    res.responses = new ResponseFactory(res);
    next();
  };
}
