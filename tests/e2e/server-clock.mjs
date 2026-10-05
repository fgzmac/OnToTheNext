import pg from "pg";
import { verifyResetTarget } from "../../src/lib/database-reset.ts";

// Test-process-only clock: never imported by the app or its normal launch command.
// Verify the same isolated database boundary as browser setup before starting Next.
const target = verifyResetTarget(process.env.TEST_DATABASE_URL);
if (target.database === "ontothenext" || process.env.DATABASE_URL !== process.env.TEST_DATABASE_URL) {
  throw new Error("Browser clock requires matching isolated test database URLs.");
}
const db = new pg.Client({ connectionString: process.env.TEST_DATABASE_URL });
await db.connect();
try {
  const { rows } = await db.query("SELECT current_database() AS database, current_user AS username");
  if (rows[0].database !== target.database || rows[0].username !== target.user) throw new Error("Browser clock database identity mismatch.");
} finally { await db.end(); }
const ActualDate = Date;
const instant = ActualDate.parse("2026-09-23T12:00:00Z");
const started = performance.now();
// Keep time moving: cancellation/review tokens must get distinct expiry instants.
const now = () => instant + Math.floor(performance.now() - started);
// Preserve native own descriptors (parse/UTC) for Next's Date instrumentation.
globalThis.Date = new Proxy(ActualDate, {
  construct(target, args, newTarget) { return Reflect.construct(target, args.length ? args : [now()], newTarget); },
  apply() { return new ActualDate(now()).toString(); },
  get(target, key, receiver) { return key === "now" ? now : Reflect.get(target, key, receiver); },
});
console.log("Browser test server clock anchored at 2026-09-23T12:00:00Z, advancing (isolated fixtures only)");
// Synthetic Google requests only. Installed after the actual isolated DB check above;
// normal development/start/build never imports this browser-test preload.
const {googleTestConfig,googleHttp,syntheticPhoto}=await import("../fixtures/google.ts");
let photoRequests=0;
globalThis[Symbol.for("ontothenext.syntheticGoogle")]={config:googleTestConfig,transport:googleHttp(),binary:async()=>{
  photoRequests++;
  if(photoRequests%2===0)throw Error("Synthetic expired media response");
  return {type:"image/png",bytes:syntheticPhoto};
}};
