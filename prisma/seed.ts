import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedDemoTrip } from "./seed-data";
import { seedDiscoverFixtures } from "./discover-seed";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required to seed the database.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
seedDemoTrip(prisma, { preserveExisting: true })
  .then(() => seedDiscoverFixtures(prisma))
  .then(() => console.log("Ensured synthetic Japan demo and 12 Discover fixtures; existing trip state, decisions and batches preserved."))
  .catch(() => { console.error("Development seed failed."); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
