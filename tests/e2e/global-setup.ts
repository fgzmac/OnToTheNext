import pg from "pg";
import { verifyResetTarget } from "../../src/lib/database-reset";

// Browser acceptance starts empty and is destructive only to an explicit test DB.
export default async function setup() {
  const target = verifyResetTarget(process.env.TEST_DATABASE_URL);
  if (target.database === "ontothenext" || process.env.DATABASE_URL !== process.env.TEST_DATABASE_URL) {
    throw new Error("Browser tests require matching isolated DATABASE_URL and TEST_DATABASE_URL.");
  }
  const client = new pg.Client({ connectionString: process.env.TEST_DATABASE_URL });
  await client.connect();
  try {
    const { rows } = await client.query("SELECT current_database() AS database, current_user AS username");
    if (rows[0].database !== target.database || rows[0].username !== target.user) throw new Error("Test database identity mismatch.");
    console.log("Empty browser fixture target:", { host: target.host, database: target.database, user: target.user });
    await client.query('BEGIN');
    await client.query('DELETE FROM "Trip"');
    await client.query('DELETE FROM "PrototypeUser"');
    await client.query('COMMIT');
  } finally {
    await client.end();
  }
}
