export const RESET_BLOCKED_MESSAGE =
  "DATABASE RESET BLOCKED — TARGET DOES NOT BELONG TO ON TO THE NEXT";

/** Validate identity only. This does not authorize deleting development data. */
export function verifyResetTarget(databaseUrl: string | undefined) {
  try {
    if (!databaseUrl || databaseUrl !== databaseUrl.trim()) throw new Error();
    const target = new URL(databaseUrl);
    const user = decodeURIComponent(target.username);
    const database = decodeURIComponent(target.pathname.slice(1));
    const host = target.hostname.toLowerCase();
    if (
      !["postgres:", "postgresql:"].includes(target.protocol) ||
      !["localhost", "127.0.0.1"].includes(host) ||
      user !== "ontothenext" ||
      !/^(ontothenext|ontothenext_test|ontothenext_verify_[A-Za-z0-9_]+)$/.test(database) ||
      target.hash ||
      // Connection query overrides could redirect an otherwise valid URL.
      [...target.searchParams.keys()].some((key) => key !== "schema") ||
      target.searchParams.getAll("schema").length > 1
    ) {
      throw new Error();
    }
    return { host, user, database };
  } catch {
    // Never include the URL, password, or parser exception in diagnostics.
    throw new Error(RESET_BLOCKED_MESSAGE);
  }
}

/** Injectable command runner keeps ordering/failure tests entirely non-destructive. */
export function runVerifiedReset(
  databaseUrl: string | undefined,
  runPrisma: (args: readonly string[]) => number,
): number {
  verifyResetTarget(databaseUrl);
  const resetExit = runPrisma(["migrate", "reset", "--force"]);
  if (resetExit !== 0) return resetExit;
  return runPrisma(["db", "seed"]);
}