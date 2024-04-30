import { prisma } from "../routes";
import createServer from "../utils/createServer";
import supertest from "supertest";

const app = createServer()

describe("Users", () => {
  describe("given a couple of user exist in the database", () => {
    beforeEach(async () => {
      await prisma.user.deleteMany();
    })


    it("should READ or return all users", async () => {

      await prisma.user.createMany({
        data: [
          {
            name: "Matthew",
            email: "letsgoo@gmail.com",
            password: "1234",
            is_admin: true,
            wallet: 10000
          },
          {
            name: "Teddie",
            email: "Heyyyo@gmail.com",
            password: "5678",
            is_admin: true,
            wallet: 10000
          },
        ]
      })

      const res = await supertest(app).get("/api/user")

      expect(res.statusCode).toBe(200)
      expect(res.body.length).toBe(2)
    })

    it("should READ or return a single user", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Mykiell",
          email: "mamamia@yahoo.com",
          password: "heythere",
          is_admin: true,
          wallet: 10000
        }
      })

      const res = await supertest(app).get(`/api/user/${user.id}`);

      expect(res.statusCode).toBe(200)
      expect(res.body).toMatchObject(user)
    })

    it("should CREATE a new user", async () => {

      const newUser = {
        name: "John",
        email: "caldo@yahoo.com",
        password: "yukimura",
        is_admin: true,
        wallet: 10000
      }

      const res = await supertest(app).post("/api/user").send(newUser)

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(newUser)

    })

    it("should UPDATE a user", async () => {
      const user = await prisma.user.create({
        data: {
        name: "John",
        email: "caldo@yahoo.com",
        password: "yukimura",
        is_admin: true,
        wallet: 10000
        }
      });

      const updateUserWallet = {
        name: "John",
        email: "caldo@yahoo.com",
        password: "yukimura",
        is_admin: true,
        wallet: 15000
      };

      const res = await supertest(app).put(`/api/user/${user.id}`).send(updateUserWallet)

      expect(res.statusCode).toBe(201)
      expect(res.body).toMatchObject(updateUserWallet)
    })

    it("should DELETE a user", async () => {

      const user = await prisma.user.create({
        data: {
          name: "Jade",
          email: "catty@yahoo.com",
          password: "yukimura",
          is_admin: true,
          wallet: 10000
          }
      })

      const res = await supertest(app).delete(`/api/user/${user.id}`);

      expect(res.statusCode).toBe(202);
      expect(res.body).toMatchObject({ message: 'User deleted successfully' })
    })
  })
})