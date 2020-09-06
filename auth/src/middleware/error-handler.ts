import { Response, Request, NextFunction } from 'express';
import { CustomeError } from '../errors/custome-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomeError) {
    console.log("validation catch");
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });    // specific information
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }]
  });

} 