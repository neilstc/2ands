import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { errorHandler } from '@nmgmz/common';
import { NotFoundError } from '@nmgmz/common';

const app = express();
app.set('trust proxy', true); // trust http
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test"  // will only allow requests over https connection!! | won't work with supertest switch to false when testing.
}));



app.all("*", () => {    // for un existing route/
  throw new NotFoundError();
})
app.use(errorHandler);

export { app };
