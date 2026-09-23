import type { DiscoverInterest } from "@/src/generated/prisma/enums";

export const INTEREST_OPTIONS = [
  { value: "SIGHTSEEING_LANDMARKS", label: "Sightseeing & landmarks" },
  { value: "ARCHITECTURE_DESIGN", label: "Architecture & design" },
  { value: "CULTURE_HISTORY", label: "Culture & history" },
  { value: "FOOD_DRINK", label: "Food & drink" },
  { value: "SHOPPING", label: "Shopping" },
  { value: "NATURE_OUTDOORS", label: "Nature & outdoors" },
  { value: "NIGHTLIFE", label: "Nightlife" },
  { value: "ENTERTAINMENT", label: "Entertainment" },
  { value: "WELLNESS_RELAXATION", label: "Wellness & relaxation" },
] as const satisfies readonly { value: DiscoverInterest; label: string }[];

export function validateDiscoverInterests(input: unknown): DiscoverInterest[] | null {
  if (!Array.isArray(input) || input.some(value => !INTEREST_OPTIONS.some(option => option.value === value))) return null;
  // Canonical ordering and deduplication; an empty selection is valid.
  return INTEREST_OPTIONS.filter(option => input.includes(option.value)).map(option => option.value);
}

export interface RankedCandidate {
  id: string;
  displayRank: number;
  interestTags: readonly DiscoverInterest[];
  presentationBatch: number | null;
  decision: string | null;
}
export interface DecisionSignal {
  outcome: string;
  interestTags: readonly DiscoverInterest[];
}

// Signals are bounded: explicit interests always dominate reactions. Repeated
// denials never accumulate into an exclusion or an inferred permanent preference.
export function rankUnassignedRecommendations<T extends RankedCandidate>(
  candidates: readonly T[], interests: readonly DiscoverInterest[], decisions: readonly DecisionSignal[],
): T[] {
  const accepted = new Set(decisions.filter(item => item.outcome === "ACCEPTED").flatMap(item => [...item.interestTags]));
  const denied = new Set(decisions.filter(item => item.outcome === "DENIED").flatMap(item => [...item.interestTags]));
  const score = (item: T) => new Set(item.interestTags.filter(tag => interests.includes(tag))).size * 10
    + (item.interestTags.some(tag => accepted.has(tag)) ? 3 : 0)
    - (item.interestTags.some(tag => denied.has(tag)) ? 1 : 0);
  return candidates.filter(item => item.presentationBatch === null && item.decision === null)
    .sort((a, b) => score(b) - score(a) || a.displayRank - b.displayRank || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
