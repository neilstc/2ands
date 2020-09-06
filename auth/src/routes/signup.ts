import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { body, validationResult } from 'express-validator';
import { RequestValidaionError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
const router = express.Router();

router.post("/api/users/signup", [  // validation
  body("email").isEmail().withMessage("email must be valid"),
  body("password").trim().isLength({ min: 4, max: 20 }).withMessage("invalid password"),
], (req: Request, res: Response) => {
  const errors = validationResult(req); // pull the result (see error)

  if (!errors.isEmpty()) {
    console.log("validation error");
    throw new RequestValidaionError(errors.array());
  }
  const { email, password } = req.body;
  console.log("creating a new user");
  throw new DatabaseConnectionError();
  res.send({});
});

export { router as signupRouter };

