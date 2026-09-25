"use server";
import { enrichGoogle } from "./service";
import type { GoogleInput, Enrichment } from "./types";
// Same-origin server action; ownership and reservation gates remain in the service.
export async function googleEnrichmentAction(input:GoogleInput):Promise<Enrichment> {
 try { return await enrichGoogle(input); }
 catch(error) {
  const code=error instanceof Error ? error.message : "";
  const status=code==="BUDGET_EXHAUSTED"?"budget_exhausted":code==="MATCH_EXPIRED"?"expired":"unavailable";
  const diagnostic=process.env.NODE_ENV==="development" && process.env.GOOGLE_PLACES_DIAGNOSTICS==="bounded"
   && ["BUDGET_EXHAUSTED","DUPLICATE_REQUEST","MATCH_EXPIRED","MATCH_CHANGED","TRIP_UNAVAILABLE"].includes(code) ? code : undefined;
  return {status,diagnostic,message:status==="budget_exhausted"?"Place details allowance reached.":status==="expired"?"Location confirmation expired.":"Place details are unavailable."};
 }
}
