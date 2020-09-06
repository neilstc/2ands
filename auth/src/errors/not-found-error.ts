import { CustomeError } from './custome-error'

export class NotFoundError extends CustomeError {
  statusCode = 404;
  constructor() {
    super("route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      { message: "not found" }
    ];
  }
}