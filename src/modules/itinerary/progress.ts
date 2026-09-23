import type { ItineraryProgress } from "@/src/generated/prisma/enums";
export const PROGRESS_LABELS: Record<ItineraryProgress, string> = { PENDING: "Pending", COMPLETED: "Completed", SKIPPED: "Skipped" };
export function canChangeProgress(from: ItineraryProgress, to: ItineraryProgress): boolean {
  return to === "PENDING" ? from === "COMPLETED" || from === "SKIPPED" : from === "PENDING" && (to === "COMPLETED" || to === "SKIPPED");
}
export function partitionDay<T extends { id: string; position: number; progress: ItineraryProgress }>(items: T[]) {
  const ordered = [...items].sort((a, b) => a.position - b.position || a.id.localeCompare(b.id, "en"));
  const pending = ordered.filter(i => i.progress === "PENDING");
  return { next: pending[0] ?? null, remaining: pending.slice(1), processed: ordered.filter(i => i.progress !== "PENDING"), empty: ordered.length === 0 };
}
