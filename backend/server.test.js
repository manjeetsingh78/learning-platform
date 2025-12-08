const request = require("supertest");
const app = require("./server");

test("server responds", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(404); // Root route doesn't exist = 404
});
