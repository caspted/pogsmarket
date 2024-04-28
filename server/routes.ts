import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"

export const prisma = new PrismaClient();

function routes(app: Express) {

  app.use(cors())

//pogs market APIs
  app.get("/api/pogs", async (req: Request, res: Response) => {
    try {
      const pogs = await prisma.pogs.findMany();
      res.status(200).json(pogs); 
    } catch {
      res.status(500).json({ error: 'Internal Server Error'})
    }

  })

  app.get("/api/pogs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const pog = await prisma.pogs.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      res.status(200).json(pog);
    } catch {
      res.status(500).json({ error: 'Internal Server Error'})
    }

  });

  app.put("/api/pogs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { current_price } = req.body


      const pog = await prisma.pogs.findUnique({
        where: {
          id: parseInt(id)
        },
      })

      if (!pog) {
        return res.status(404).json({ error: 'Pog not found' });
      }

      const previous_price = pog.current_price

      const updatedValue = prisma.pogs.update({
        where: {
          id: parseInt(id)
        },
        data: {
          previous_price,
          current_price
        }
      })
      res.status(201).json(updatedValue)

    } catch {
      res.status(500).json({ error: 'Internal Server Error'})
    }
  })

  // user information APIs



//admin side APIs
  app.get("/api/admin/pogs", async (req: Request, res: Response) => {
    try {
      const adminPogs = await prisma.pogs.findMany()
      res.status(200).json(adminPogs)

    } catch {
      res.status(500).json({ error: 'Interal Server Error'})
    }

  })

  app.get("/api/admin/pogs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const adminPog = await prisma.pogs.findUnique({
        where: {
          id: parseInt(id)
        }
      })
      res.status(200).json(adminPog)

    } catch {
      res.status(500).json({ error: 'Interal Server Error'})
    }

  })

  app.post("/api/admin/pogs", async (req: Request, res: Response) => {
    try {
      const { name, ticker_symbol, previous_price, current_price, color} = req.body
  
      const newPogs = await prisma.pogs.create({
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
      const { name, ticker_symbol, previous_price, current_price, color } = req.body;
    
      const updatedPog = await prisma.pogs.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name,
          ticker_symbol,
          previous_price,
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
