import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); 

const databaseUrl = process.env.DATABASE_URL


const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export default prisma;
