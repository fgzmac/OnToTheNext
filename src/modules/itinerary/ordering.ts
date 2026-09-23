import type { Prisma } from "@/src/generated/prisma/client";

// Caller holds the Trip lock. Disjoint temporary positions avoid unique-key collisions.
export async function normalizeDayPositions(tx: Prisma.TransactionClient, dayId: string, orderedIds?: string[]) {
  const existing = await tx.itineraryItem.findMany({ where: { dayId }, orderBy: { position: "asc" } });
  if (!existing.length) return;
  const ids = orderedIds ?? existing.map(item => item.id);
  if (ids.length !== existing.length || new Set(ids).size !== ids.length || ids.some(id => !existing.some(item => item.id === id))) throw new Error("Invalid Day ordering");
  const offset = Math.max(...existing.map(item => item.position)) + 1;
  await tx.itineraryItem.updateMany({ where: { dayId }, data: { position: { increment: offset } } });
  for (const [position, id] of ids.entries()) await tx.itineraryItem.update({ where: { id }, data: { position, revision: { increment: 1 } } });
}
