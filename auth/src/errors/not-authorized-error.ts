import { CustomeError } from './custome-error';


export class NotAuthorizedError extends CustomeError {

  constructor() {
    super("Not Authorized");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  statusCode: number = 401;
  serializeErrors() {
    return [{ message: "Not Authorized" }];
  }




}