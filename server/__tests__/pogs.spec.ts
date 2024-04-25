import { prisma } from "../routes";
import createServer from "../utils/createServer";
import supertest from "supertest";

const app = createServer();

describe("Pogs", () => {
  describe("given a couple of pogs exist in the database", () => {
    // beforeEach(async () => {
    //   // setup
    //   await prisma.pogs.createMany({
    //     data: [
    //       {
    //         name: "Tepig",
    //         ticker_symbol: "TPIG",
    //         price: 75,
    //         color: "orange"
    //       },
    //       {
    //         name: "Snivy",
    //         ticker_symbol: "SNIV",
    //         price: 70,
    //         color: "green"
    //       },
    //       {
    //         name: "Oshawott",
    //         ticker_symbol: "OSWT",
    //         price: 70,
    //         color: "blue"
    //       }
    //     ]
    //   })
    // });

    // afterEach(async () => {
    //   // teardown
    //   await prisma.pogs.deleteMany(); // delete the newly inserted pogs
    // });

    // it("should return all pogs", async () => {
      
    //   // invocation
    //   const res = await supertest(app).get("/api/pogs");

    //   // assessment
    //   expect(res.statusCode).toBe(200);
    //   expect(res.body.length).toBe(3); // since we expect that there will be 3 new pogs
    // });

    // or EXAMPLE 2, it can also be setup like this 
    
    it("should READ or return all pogs", async () => { // test for READ
      // setup
      await prisma.pogs.createMany({
        data: [
          {
            name: "Tepig",
            ticker_symbol: "TPIG",
            color: "orange",
            current_price: 75,
            previous_price: 50
          },
          {
            name: "Snivy",
            ticker_symbol: "SNIV",
            color: "green",
            current_price: 70,
            previous_price: 80
          },
          {
            name: "Oshawott",
            ticker_symbol: "OSWT",
            color: "blue",
            current_price: 70,
            previous_price: 75
          }
        ]
      })

      // invocation
      const res = await supertest(app).get("/api/pogs");

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3); // since we expect that there will be 3 new pogs

      // teardown
      await prisma.pogs.deleteMany(); // delete the newly inserted pogs 
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
      const res = await supertest(app).get(`/api/pogs/${pog.id}`);

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(pog);

      // teardown
      await prisma.pogs.deleteMany(); // delete the newly inserted pogs
    });

    it("should CREATE a new pog", async () => { // test for CREATE
      // setup
      const pog = {
        name: "Tepig",
        ticker_symbol: "TPIG",
        price: 75,
        color: "orange"
      };

      // invocation
      const res = await supertest(app).post("/api/pogs").send(pog);

      // assessment
      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(pog);

      // teardown
      await prisma.pogs.deleteMany(); // delete the newly inserted pogs
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
        name: "Snivy",
        ticker_symbol: "SNIV",
        color: "green",
        current_price: 70,
        previous_price: 75
      };

      // invocation
      const res = await supertest(app).put(`/api/pogs/${pog.id}`).send(updatedPog);

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(updatedPog);

      // teardown
      await prisma.pogs.deleteMany(); // delete the newly inserted pogs
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
      const res = await supertest(app).delete(`/api/pogs/${pog.id}`);

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({ message: "Pogs deleted successfully" });

      // teardown
      await prisma.pogs.deleteMany(); // delete the newly inserted pogs
    });

    it("this DELETE test should FAIL", async () => { // test for DELETE
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
      const res = await supertest(app).delete(`/api/pogs/${pog.id}`);

      // assessment
      expect(res.statusCode).toBe(404);
      expect(res.body).toMatchObject({ message: "This is meant to FAIL" });

      // teardown
      await prisma.pogs.deleteMany(); // delete the newly inserted pogs
    });
  });
});