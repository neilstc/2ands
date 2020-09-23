//  test for signup service.

import request from 'supertest';
import { app } from '../../app';


it('it returns 201 on successful signup', async () => {
  return request(app).post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123123"
    }).expect(201);
});

it("return 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "123123"
    }).expect(400);
});

it("return 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123"
    }).expect(400);
});

it("return 400 with invalid email and password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({

    }).expect(400);
});

it("return 400 with invalid email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test"
    }).expect(400);

  await request(app)
    .post("api/users/signup")
    .send({
      password: "123123"
    });
});

it("duplicate email are not allowed", async () => {
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
      password: "123123"
    }).expect(400);
});

it("sets cookie after successfull signup", async () => {
  const response = await request(app).post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123123"
    }).expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();


});