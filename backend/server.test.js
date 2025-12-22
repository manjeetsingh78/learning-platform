const request = require("supertest");
const app = require("./server");

describe("Server basic tests", () => {
  test("unknown route returns 404", async () => {
    const res = await request(app).get("/random");
    expect(res.statusCode).toBe(404);
  });
});
