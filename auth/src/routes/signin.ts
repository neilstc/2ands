import express from 'express';
import { json } from 'body-parser';

const router = express.Router();
//router.use(json());
router.get("/api/users/signin", (req, res) => {
  // const { email, password } = req.body();

  res.send("hello signin");
});


export { router as signinRouter };
