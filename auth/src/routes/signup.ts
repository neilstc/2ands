import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post("/api/users/signup", [  // validation
  body("email").isEmail().withMessage("email must be valid"),
  body("password").trim().isLength({ min: 4, max: 20 }).withMessage("invalid password"),
], (req: Request, res: Response) => {
  const errors = validationResult(req); // pull the result (see error)
  if (!errors.isEmpty) {
    return res.status(400).send(errors.array());  // send the errors
  }
  const { email, password } = req.body;
  console.log("creating a new user");
  res.send({});
});

export { router as signupRouter };

