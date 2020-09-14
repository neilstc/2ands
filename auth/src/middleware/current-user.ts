import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface UserPayload {      // define what exactly we are getting in the payload.
  id: string,
  email: string
}

//thats how we can modify an existing global object.
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  {
    if (!req.session?.jwt) { // if the jwt invalid return and go to the next middlerware.
      return next();
    } else {
      try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
      } catch (err) { }
      next();

    }

  }



}