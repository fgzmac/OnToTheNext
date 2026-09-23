import { randomUUID } from "node:crypto";
import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { fingerprint, readActionPreview, signActionPreview } from "./preview-token";
import { normalizeDayPositions } from "./ordering";
import { emptyDetails, itemDetails, materialDetailsChange, parseItemDetails, type ItemDetails } from "./details-domain";
import { detailsInclude, editContext, type EditToken } from "./details-context";
import type { ProgressResult } from "./progress-service";
const fail = (code: string, message: string) => ({ ok: false as const, error: { code, message } });
const stale = () => fail("STALE_EDIT", "The item, its Day or booking changed, or this form expired. Refresh and reopen Edit; your saved plan has not been overwritten.");
type CreateToken = { purpose: "manual-activity-create"; tripId: string; requestId: string };
export function manualActivityToken(tripId: string, now = new Date()) {
  return signActionPreview<CreateToken>({ purpose: "manual-activity-create", tripId, requestId: randomUUID() }, now.getTime());
}
export async function createManualActivity(input: { tripId: string; dayId: string; token: string; details: Record<string, unknown> }, now = new Date()): Promise<ProgressResult<{ id: string }>> {
  const token = readActionPreview<CreateToken>(input.token, now.getTime());
  if (!token || token.purpose !== "manual-activity-create" || token.tripId !== input.tripId) return fail("STALE_CREATE", "Refresh and open Add activity again; this form is unavailable or expired.");
  const details = parseItemDetails(input.details, emptyDetails, "ACTIVITY");
  if (typeof details === "string") return fail("INVALID_DETAILS", details);
  const requestHash = fingerprint({ dayId: input.dayId, details });
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, input.tripId)) return fail("NOT_FOUND", "This trip is unavailable.");
    const receipt = await tx.manualActivitySubmission.findUnique({ where: { id: token.requestId } });
    if (receipt) {
      if (receipt.tripId !== input.tripId || receipt.requestHash !== requestHash) return fail("DUPLICATE_CONFLICT", "This submission was already used for different details. Reopen Add activity for another item.");
      return receipt.itemId ? { ok: true, data: { id: receipt.itemId } } : fail("ITEM_REMOVED", "This activity was already added and later removed. Reopen Add activity to create another.");
    }
    const day = await tx.day.findFirst({ where: { id: input.dayId, tripId: input.tripId } });
    if (!day) return fail("WRONG_DAY", "Choose an existing Day in this trip.");
    const existing = await tx.itineraryItem.findMany({ where: { dayId: day.id }, orderBy: { position: "asc" }, select: { position: true } });
    if (existing.some((item, i) => item.position !== i)) await normalizeDayPositions(tx, day.id);
    const item = await tx.itineraryItem.create({ data: { ...details, tripId: input.tripId, dayId: day.id, type: "ACTIVITY", enteredManually: true, position: existing.length } });
    await tx.manualActivitySubmission.create({ data: { id: token.requestId, tripId: input.tripId, itemId: item.id, requestHash } });
    return { ok: true, data: { id: item.id } };
  }); } catch { return fail("PERSISTENCE_FAILURE", "The activity could not be added. Your entered details are retained; try again."); }
}
export type EditPreview = { token: string; before: ItemDetails; after: ItemDetails; fixed: boolean; booked: boolean };
export type EditResult = { id: string; preview: EditPreview | null };
export type EditRequest = { tripId: string; itemId: string; token: string; details: Record<string, unknown> };
async function edit(input: EditRequest, confirm: boolean, now: Date): Promise<ProgressResult<EditResult>> {
  const token = readActionPreview<EditToken>(input.token, now.getTime());
  if (!token || token.purpose !== (confirm ? "itinerary-edit-confirm" : "itinerary-edit") || token.tripId !== input.tripId || token.itemId !== input.itemId) return stale();
  const actionKey = fingerprint({ token: input.token, details: input.details, confirm });
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, input.tripId)) return fail("NOT_FOUND", "This trip is unavailable.");
    const item = await tx.itineraryItem.findFirst({ where: { id: input.itemId, tripId: input.tripId }, include: detailsInclude });
    if (!item) return fail("NOT_FOUND", "This item is unavailable.");
    const current = editContext(item);
    if (item.revision === token.revision + 1 && item.editActionKey === actionKey && item.editResultContext === current) return { ok: true, data: { id: item.id, preview: null } };
    if (item.revision !== token.revision || token.context !== current) return stale();
    const before = itemDetails(item), after = parseItemDetails(input.details, before, item.type);
    if (typeof after === "string") return fail("INVALID_DETAILS", after);
    const changesHash = fingerprint(after);
    if (confirm && token.changesHash !== changesHash) return stale();
    if (fingerprint(before) === changesHash) return { ok: true, data: { id: item.id, preview: null } };
    const fixed = item.flexibility === "FIXED", booked = item.reservation?.state === "BOOKED";
    if (!confirm && materialDetailsChange(before, after) && (fixed || booked)) {
      return { ok: true, data: { id: item.id, preview: { before, after, fixed, booked,
        token: signActionPreview<EditToken>({ purpose: "itinerary-edit-confirm", tripId: input.tripId, itemId: item.id, revision: item.revision, context: current, changesHash }, now.getTime()) } } };
    }
    await tx.itineraryItem.update({ where: { id: item.id }, data: { ...after, revision: { increment: 1 }, editActionKey: actionKey, editResultContext: editContext({ ...item, ...after }) } });
    return { ok: true, data: { id: item.id, preview: null } };
  }); } catch { return fail("PERSISTENCE_FAILURE", "The edit could not be saved. Your entered details are retained; refresh before trying again."); }
}
export const editItineraryItem = (input: EditRequest, now = new Date()) => edit(input, false, now);
export const confirmItineraryEdit = (input: EditRequest, now = new Date()) => edit(input, true, now);
