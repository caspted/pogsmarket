import { PrismaClient } from "@prisma/client";
import { deflate } from "zlib";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 81 },
    update: {},
    create: {
      id: 81,
      name: 'John Doe',
      email: 'johndoe@sample.com',
      password: 'password',
      is_admin: true,
      wallet: 50000,
    }
  });

  const pogs1 = await prisma.pogs.upsert({
    where: { ticker_symbol: 'AAPL' },
    update: {},
    create: {
      name: "Apple",
      current_price: 1000,
      previous_price: 1200,
      color: "silver",
      ticker_symbol: "AAPL"
    }
  });

  const pogs2 = await prisma.pogs.upsert({
    where: { ticker_symbol: 'GOOG' },
    update: {},
    create: {
      name: "Alphabet Inc. (Google)",
      current_price: 2000,
      previous_price: 1900,
      color: "red",
      ticker_symbol: "GOOG"
    }
  });

  const pogs3 = await prisma.pogs.upsert({
    where: { ticker_symbol: 'HPQ' },
    update: {},
    create: {
      name: "Hewlett-Packard Enterprise Company",
      current_price: 800,
      previous_price: 790,
      color: "yellow",
      ticker_symbol: "HPQ"
    }
  });

  const pogs4 = await prisma.pogs.upsert({
    where: { ticker_symbol: 'INTC' },
    update: {},
    create: {
      name: "Intel Corporation",
      current_price: 1500,
      previous_price: 1600,
      color: "blue",
      ticker_symbol: "INTC"
    }
  });

  const pogs5 = await prisma.pogs.upsert({
    where: { ticker_symbol: 'BRK.A' },
    update: {},
    create: {
      name: "Berkshire Hathaway Inc.",
      current_price: 900,
      previous_price: 910,
      color: "green",
      ticker_symbol: "BRK.A"
    }
  });

  console.log({ user, pogs1, pogs2, pogs3, pogs4, pogs5});
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
);