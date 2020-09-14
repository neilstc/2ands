import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { body } from 'express-validator';

import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { ValidateRequest } from '../middleware/validate-request';

import jwt from 'jsonwebtoken';
const router = express.Router();

router.post("/api/users/signup", [  // validation
  body("email").isEmail()
    .withMessage("email must be valid"),
  body("password")
    .trim().isLength({ min: 4, max: 20 })
    .withMessage("invalid password"),
],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }); // look for a user with the exact email it will be null if the user not exist.
    if (existingUser) {
      console.log("user exist");
      throw new BadRequestError("Email In Use");
    } else {
      console.log("creating user");
      const user = User.build({ email, password });
      await user.save();    // save to database


      const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
      }, process.env.JWT_KEY!); // we already validate jwt 
      req.session = {
        jwt: userJwt,
      }
      //store it in session object.
      res.status(201).send(user);
    }
  });

export { router as signupRouter };

