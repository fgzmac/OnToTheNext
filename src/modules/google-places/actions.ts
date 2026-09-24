"use server";
import { enrichGoogle } from "./service";
import type { GoogleInput, Enrichment } from "./types";
// Next server actions enforce same-origin POST. Ownership is checked against the prototype owner in the service.
export async function googleEnrichmentAction(input:GoogleInput):Promise<Enrichment> {
  try { return await enrichGoogle(input); }
  catch { return {message:"Google request could not proceed (budget, duplicate request, stale match or unavailable trip). Your plan and Add remain available."}; }
}
