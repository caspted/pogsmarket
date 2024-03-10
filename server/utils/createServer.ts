import express, { Express } from "express";
import routes from "../routes";

function createServer() {
  const app: Express = express();
  app.use(express.json());

  routes(app);

  return app;
}

export default createServer;