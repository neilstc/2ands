
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose, { Collection } from 'mongoose';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;

    }

  }

}


let mongo: any
beforeAll(async () => {    // run before all tests 
  process.env.JWT_KEY = 'asdasd'
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});      // run before each test.

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();

});


global.signin = async () => {
  // 
  const email = "test@test.com";
  const password = "123123";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;

}
