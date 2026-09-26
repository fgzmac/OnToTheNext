"use server";
import { enrichGoogle } from "./service";
import type { GoogleInput, Enrichment } from "./types";
// Same-origin server action; ownership and reservation gates remain in the service.
export async function googleEnrichmentAction(input:GoogleInput):Promise<Enrichment> {
 try { return await enrichGoogle(input); }
 catch(error) {
  const code=error instanceof Error ? error.message : "";
  const status=code==="BUDGET_EXHAUSTED"?"budget_exhausted":["MATCH_EXPIRED","PHOTO_SESSION_EXPIRED"].includes(code)?"expired":"unavailable";
  return {status,message:status==="budget_exhausted"?"Place details allowance reached.":status==="expired"?"Location confirmation expired.":"Place details are unavailable."};
 }
}
