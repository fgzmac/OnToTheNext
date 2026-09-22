import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedDemoTrip } from "./seed-data";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required to seed the database.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
seedDemoTrip(prisma)
  .then(() => console.log("Seeded Japan development fixture with 4 segments and 15 days."))
  .catch(() => { console.error("Development seed failed."); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
