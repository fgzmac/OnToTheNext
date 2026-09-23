export const BATCH_SIZE = 4;
export type OrganizerDecision = "ACCEPTED" | "DENIED";

export function isOrganizerDecision(value: unknown): value is OrganizerDecision {
  return value === "ACCEPTED" || value === "DENIED";
}

export function parseBatchPage(value: string | undefined): number {
  if (!value || !/^\d+$/.test(value)) return 0;
  const page = Number(value);
  return Number.isSafeInteger(page) && page <= 100_000 ? page : 0;
}

// Decisions never affect pagination: changing a decision cannot shift other cards.
export function batchWindow(requestedPage: number, total: number) {
  const totalPages = Math.ceil(total / BATCH_SIZE);
  const page = Math.min(Math.max(0, requestedPage), totalPages);
  return { page, totalPages, skip: page * BATCH_SIZE, take: BATCH_SIZE, exhausted: total > 0 && page === totalPages };
}

export function decisionLabel(outcome: string | null): string {
  if (outcome === "ACCEPTED") return "Accepted";
  if (outcome === "DENIED") return "Denied";
  if (outcome === "SAVED") return "Saved";
  if (outcome === "MUST_DO") return "Must-do";
  return "No decision yet";
}
