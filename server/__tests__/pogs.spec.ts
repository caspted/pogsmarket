import { prisma } from "../routes";
import createServer from "../utils/createServer";
import supertest from "supertest";

const app = createServer();

describe("Pogs", () => {
  describe("given a couple of pogs exist in the database", () => {
    beforeEach(async () => {
      // Clear the database before each test
      await prisma.pogs.deleteMany();
    });

    it("should READ or return all pogs", async () => { // test for READ
      // setup
      await prisma.pogs.createMany({
        data: [
          {
            name: "Tepig",
            ticker_symbol: "TPIG",
            color: "orange",
            previous_price: 50,
            current_price: 75,
          },
          {
            name: "Snivy",
            ticker_symbol: "SNIV",
            color: "green",
            previous_price: 80,
            current_price: 70,
          },
          {
            name: "Oshawott",
            ticker_symbol: "OSWT",
            color: "blue",
            previous_price: 75,
            current_price: 70,
          }
        ]
      })

      // invocation
      const res = await supertest(app).get("/api/admin/pogs");

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3); // since we expect that there will be 3 new pogs

    }); 

    it("should READ or return a single pog", async () => { // test for READ
      // setup
      const pog = await prisma.pogs.create({
        data: {
          name: "Tepig",
          ticker_symbol: "TPIG",
          color: "orange",
          current_price: 75,
          previous_price: 50
        }
      });

      // invocation
      const res = await supertest(app).get(`/api/admin/pogs/${pog.id}`);

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(pog);

    });

    it("should CREATE a new pog", async () => { // test for CREATE
      // setup
      const pog = {
        name: "Tepig",
        ticker_symbol: "TPIG",
        color: "orange",
        previous_price: 20,
        current_price: 10,
      };

      // invocation
      const res = await supertest(app).post("/api/admin/pogs").send(pog);

      // assessment
      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(pog);

    });
    
    it("should UPDATE a pog", async () => { // test for UPDATE
      // setup
      const pog = await prisma.pogs.create({
        data: {
          name: "Tepig",
          ticker_symbol: "TPIG",
          color: "orange",
          current_price: 75,
          previous_price: 50
        }
      });

      const updatedPog = {
        name: "Tepig",
        ticker_symbol: "TPIG",
        color: "green",
        current_price: 70,
        previous_price: 75
      };

      // invocation
      const res = await supertest(app).put(`/api/admin/pogs/${pog.id}`).send(updatedPog);

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(updatedPog);

    });

    it("should DELETE a pog", async () => { // test for DELETE
      // setup
      const pog = await prisma.pogs.create({
        data: {
          name: "Oshawott",
          ticker_symbol: "OSWT",
          color: "blue",
          current_price: 70,
          previous_price: 75
        }
      });

      // invocation
      const res = await supertest(app).delete(`/api/admin/pogs/${pog.id}`);

      // assessment
      expect(res.statusCode).toBe(202);
      expect(res.body).toMatchObject({ message: "Pogs deleted successfully" });

    });

    it("this DELETE test should FAIL", async () => { // test for DELETE //Why should it fail?
      // setup
      const pog = await prisma.pogs.create({
        data: {
          name: "Snivy",
          ticker_symbol: "SNIV",
          color: "green",
          current_price: 70,
          previous_price: 80
        }
      });

      // invocation
      const res = await supertest(app).delete(`/api/admin/pogs/${pog.id}`);

      // assessment
      expect(res.statusCode).toBe(202);
      expect(res.body).toMatchObject({ message: "Pogs deleted successfully" });

    });
  });
});
