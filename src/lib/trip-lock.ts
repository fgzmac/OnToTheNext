import type { Prisma } from "@/src/generated/prisma/client";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";

// Serialize scheduling, removal, structural edits and decision edits per Trip.
// A concurrent date shrink cannot race past a scheduling content check.
export async function lockPrototypeTrip(tx: Prisma.TransactionClient, tripId: string): Promise<boolean> {
  const rows = await tx.$queryRaw<{ id: string }[]>`
    SELECT "id" FROM "Trip" WHERE "id" = ${tripId} AND "ownerId" = ${PROTOTYPE_OWNER_ID} FOR UPDATE
  `;
  return rows.length === 1;
}
