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
  
  // app.post("/api/pogs", async (req: Request, res: Response) => {
  //   const { name, ticker_symbol, price, color } = req.body;
  
  //   const newPog = await prisma.pogs.create({
  //     data: {
  //       name,
  //       ticker_symbol,
  //       price,
  //       color
  //     }
  //   });
  
  //   res.status(201).json(newPog);
  // }); 


//admin side APIs
  app.get("/api/admin/pogs", async (req: Request, res: Response) => {
    try {
      const adminPogs = prisma.pogs.findMany()
      res.status(200).json(adminPogs)

    } catch {
      res.status(500).json({ error: 'Interal Server Error'})
    }

  })

  app.post("/api/admin/pogs", async (req: Request, res: Response) => {
    try {
      const { name, ticker_symbol, current_price, color} = req.body
      const previous_price = current_price
  
      const newPogs = prisma.pogs.create({
        data: {
          name,
          ticker_symbol,
          previous_price,
          current_price,
          color
        }
      }
      )
  
      res.status(201).json(newPogs);
    } catch {
      return res.status(500).json({ error: 'Internal Server Error'})
    }

  })

  app.put("/api/admin/pogs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, ticker_symbol, current_price, color } = req.body;
    
      const updatedPog = await prisma.pogs.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name,
          ticker_symbol,
          current_price,
          color
        }
      });
    
      res.status(200).json(updatedPog);
    } catch {
      res.status(500).json({ error: "Internal Server Error"})
    }
  
  });

  app.delete("/api/admin/pogs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      await prisma.pogs.delete({
        where: {
          id: parseInt(id)
        }
      });
      res.status(202).json({ message: "Pogs deleted successfully" });
    } catch {
      res.status(500).json({ error: "Internal Server Error"})
    }

  });

}

export default routes;
