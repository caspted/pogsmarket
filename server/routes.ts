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
  })

  app.get("/api/pogs/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const pog = await prisma.pogs.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  
    res.json(pog);
  });
  
  app.post("/api/pogs", async (req: Request, res: Response) => {
    const { name, ticker_symbol, price, color } = req.body;
  
    const newPog = await prisma.pogs.create({
      data: {
        name,
        ticker_symbol,
        price,
        color
      }
    });
  
    res.status(201).json(newPog);
  }); 

  app.put("/api/pogs/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, ticker_symbol, price, color } = req.body;
  
    const updatedPog = await prisma.pogs.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        ticker_symbol,
        price,
        color
      }
    });
  
    res.json(updatedPog);
  });

  app.delete("/api/pogs/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
  
    await prisma.pogs.delete({
      where: {
        id: parseInt(id)
      }
    });
  
    res.json({ message: "Pogs deleted successfully" });
  });
}

export default routes;