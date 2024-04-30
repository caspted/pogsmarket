import { prisma } from "../routes";
import createServer from "../utils/createServer";
import supertest from "supertest";

const app = createServer();

describe("User-owned Pogs", () => {
  beforeEach(async () => {
    await prisma.userPogs.deleteMany();
  })

  it("should GET all user-owned pogs", async () => {
    const userId = 1;
    jest.spyOn(prisma.userPogs, "findMany").mockResolvedValueOnce([
      { id: 1, pogs_id: 1, user_id: userId },
      { id: 2, pogs_id: 2, user_id: userId }
    ]);

    const res = await supertest(app).get(`/api/user/${userId}/pogs`);

    expect(res.statusCode).toBe(200);

  });


  it("should POST a new user-pog association", async () => {
    const userId = 1;
    const pogId = 1;

    const res = await supertest(app).post(`/api/user/${userId}/pogs/${pogId}`);

    expect(res.statusCode).toBe(201);
  });

  

});