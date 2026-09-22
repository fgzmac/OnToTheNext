import { verifyResetTarget } from "../src/lib/database-reset";

// Integration fixtures delete rows. Never fall back to the normal development DB.
if (process.env.DATABASE_URL || process.env.TEST_DATABASE_URL) {
  const target = verifyResetTarget(process.env.TEST_DATABASE_URL);
  if (target.database === "ontothenext") throw new Error("Tests require an isolated itinerary test database.");
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
}
