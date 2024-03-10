import dotenv from "dotenv";
import createServer from "./utils/createServer";

dotenv.config();

const port = process.env.PORT || 3000;
const app = createServer();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});