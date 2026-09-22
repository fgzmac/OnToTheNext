import "dotenv/config";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { RESET_BLOCKED_MESSAGE, runVerifiedReset } from "../src/lib/database-reset";

// Snapshot the resolved target once; both Prisma commands receive this same value.
const databaseUrl = process.env.DATABASE_URL;
try {
  process.exitCode = runVerifiedReset(databaseUrl, (args) => {
    const packagePath = createRequire(import.meta.url).resolve("prisma/package.json");
    const packageInfo = JSON.parse(readFileSync(packagePath, "utf8")) as { bin: { prisma: string } };
    const prismaCli = resolve(dirname(packagePath), packageInfo.bin.prisma);
    const result = spawnSync(process.execPath, [prismaCli, ...args], {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL: databaseUrl },
    });
    if (result.error || result.signal) {
      console.error("Database reset command failed to complete.");
      return 1;
    }
    return result.status ?? 1;
  });
} catch (error) {
  console.error(
    error instanceof Error && error.message === RESET_BLOCKED_MESSAGE
      ? RESET_BLOCKED_MESSAGE
      : "Database reset command failed to start.",
  );
  process.exitCode = 1;
}