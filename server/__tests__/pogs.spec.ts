import { prisma } from "../routes";
import createServer from "../utils/createServer";
import supertest from "supertest";

const app = createServer();

describe("Pogs", () => {
  describe("show all pogs", () => {
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
      
      it("should return all pogs", async () => {
        // setup
        await prisma.pogs.createMany({
          data: [
            {
              name: "Tepig",
              ticker_symbol: "TPIG",
              price: 75,
              color: "orange"
            },
            {
              name: "Snivy",
              ticker_symbol: "SNIV",
              price: 70,
              color: "green"
            },
            {
              name: "Oshawott",
              ticker_symbol: "OSWT",
              price: 70,
              color: "blue"
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
      
    });
  });
});