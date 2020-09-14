import { ValidationError } from 'express-validator';
import { CustomeError } from './custome-error';

// interface CustomeError{
//   statusCode:number,
//   serializeError():{
//     message: string,
//     statusCode: number
//   }[];
// }


export class RequestValidationError extends CustomeError {    //implements statues error
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super("invalid request parameters");

    //only because we are extending  builf in class 
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  // adding the specific detalis to the validation error
  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });

  }

}