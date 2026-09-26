import type { GoogleConfig } from "./config";
import type { HttpTransport } from "../research/http";
import type { BinaryTransport } from "./client";
// Only the verified browser-test preload installs this in its own process. There is
// no route, environment activation switch or normal launch import that installs it.
export interface SyntheticGoogle {config:GoogleConfig;transport:HttpTransport;binary:BinaryTransport}
export function browserTestTransport():SyntheticGoogle|undefined {
  const fixture=(globalThis as unknown as Record<symbol,SyntheticGoogle|undefined>)[Symbol.for("ontothenext.syntheticGoogle")];
  if(!fixture) return undefined;
  const target=new URL(process.env.TEST_DATABASE_URL??"");
  if(process.env.DATABASE_URL!==process.env.TEST_DATABASE_URL || !["localhost","127.0.0.1"].includes(target.hostname) || target.port!=="5433" || !["ontothenext_verify_20260923_discovery1","ontothenext_test"].includes(target.pathname.slice(1)) || target.username!=="ontothenext" || fixture.config.key!=="synthetic-not-a-key") throw Error("SYNTHETIC_GOOGLE_BOUNDARY_MISMATCH");
  return fixture;
}
