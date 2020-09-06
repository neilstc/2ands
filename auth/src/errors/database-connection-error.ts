
import { CustomeError } from './custome-error';

export class DatabaseConnectionError extends CustomeError {
  reason = "Error Connectiong to Database";
  statusCode = 500;
  constructor() {
    super("error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [
      { message: this.reason }
    ];
  }
}