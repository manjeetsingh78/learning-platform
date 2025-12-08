const app = require("./server");
const request = require("supertest");

test("server responds", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});
