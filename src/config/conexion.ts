import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ log: ["query", "info", "warn"] });
// export const prisma = new PrismaClient();
