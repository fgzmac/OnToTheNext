import type { ExperienceMetadata } from "./types";
export function neighborhoodDescription(authorship: ExperienceMetadata["neighborhoodAuthorship"] = "unknown") {
  return authorship === "app-authored-walk"
    ? "App-authored, self-directed walk. Not a purchasable guided tour. Mentioned stops are optional and are not scheduled separately."
    : "Neighborhood recommendation";
}


export function recommendationProvenanceLabel(evidence: readonly { sourceKind: string; retrievedAt: string }[]): string {
  if (evidence.some(e => e.sourceKind === "DEVELOPMENT_FIXTURE")) return "Synthetic test idea";
  if (evidence.some(e => e.sourceKind.startsWith("RUNTIME_"))) return "Researched · structured reference · access unverified";
  const curated = evidence.find(e => e.sourceKind === "OFFICIAL_CURATED");
  return curated ? "Curated · checked " + curated.retrievedAt.slice(0,10) : "Source review not recorded";
}
