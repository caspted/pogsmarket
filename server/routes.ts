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
}

export default routes;