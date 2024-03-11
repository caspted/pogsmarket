import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("This is a simple server!");
  });

  app.get("/api/pogs", async (req: Request, res: Response) => {
    const pogs = await prisma.pogs.findMany();

    res.json(pogs);
  });

  app.get("/api/pogs:id", async (req: Request, res: Response) => {
    const pogs = await prisma.pogs.findUnique({
      where: {
        id: 1,
      },
    });
    res.json(pogs);
  });

  app.post("/api/pogs", async (req: Request, res: Response) => {
    const pogs = await prisma.pogs.create({
      data: {
        name: "Tepig",
        ticker_symbol: "TPIG",
        price: 75,
        color: "orange",
      },
    });
    res.json(pogs);
  });

  app.put("/api/pogs:id", async (req: Request, res: Response) => {
    const pogs = await prisma.pogs.update({
      where: {
        id: 1,
      },
      data: {
        name: "Teboar",
        ticker_symbol: "TBOAR",
        price: 100,
        color: "blue",
      },
    });
    res.json(pogs);
  });

  app.delete("/api/pogs:id", async (req: Request, res: Response) => {
    const pogs = await prisma.pogs.delete({
      where: {
        id: 2,
      },
    });
  });
}

export default routes;
