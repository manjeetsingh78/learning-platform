const request = require("supertest");
const app = require("../server");

describe("Auth routes", () => {

  test("signup fails if body is empty", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test("login fails if body is empty", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({});
    expect(res.statusCode).toBe(400);
  });

});
