import request from 'supertest';
import { app } from '../../app';



it("fails when email that does not exist supplied ", async () => {
  await request(app).post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "123123"
    }).expect(400);
});

it("fails when incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123123"
    }).expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "asdf"
    }).expect(400);



});

it("response with a cookie - given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123123"
    }).expect(201);

  const response = await request(app).post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "123123"
    }).expect(201);
  expect(response.get('set-cookie')).toBeDefined();
});
