import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import type { ItineraryProgress } from "@/src/generated/prisma/enums";
import { fingerprint, readActionPreview } from "./preview-token";
import { progressContext, progressInclude, progressToken, type ProgressContext } from "./progress-context";
import { canChangeProgress } from "./progress";
export type ProgressResult<T> = { ok: true; data: T } | { ok: false; error: { code: string; message: string } };
export type ProgressInput = { tripId: string; itemId: string; token: string };
export type SkipPreview = { token: string; title: string; fixed: boolean; booked: boolean };
const fail = (code: string, message: string) => ({ ok: false as const, error: { code, message } });
const stale = () => fail("STALE_PROGRESS", "The item or booking changed, or this request expired. Refresh the day and try again.");
function read(input: ProgressInput, purpose: ProgressContext["purpose"], now: Date) {
  const token = readActionPreview<ProgressContext>(input.token, now.getTime());
  return token?.purpose === purpose && token.tripId === input.tripId && token.itemId === input.itemId ? token : null;
}
export async function previewSkipItineraryItem(input: ProgressInput, now = new Date()): Promise<ProgressResult<SkipPreview>> {
  const expected = read(input, "itinerary-progress", now);
  if (!expected) return stale();
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, input.tripId)) return fail("NOT_FOUND", "This trip is unavailable.");
    const item = await tx.itineraryItem.findFirst({ where: { id: input.itemId, tripId: input.tripId }, include: progressInclude });
    if (!item) return fail("NOT_FOUND", "This item is unavailable.");
    if (item.revision !== expected.revision || item.progress !== expected.progress || progressContext(item) !== expected.context) return stale();
    if (item.progress !== "PENDING") return fail("INVALID_TRANSITION", "Only a pending item can be skipped. Restore it first if needed.");
    return { ok: true, data: { token: progressToken(item, now, "itinerary-skip"), title: item.title, fixed: item.flexibility === "FIXED", booked: item.reservation?.state === "BOOKED" } };
  }); } catch { return fail("PERSISTENCE_FAILURE", "The skip preview could not be loaded."); }
}
async function change(input: ProgressInput & { bookingAcknowledged?: boolean }, target: ItineraryProgress, now: Date): Promise<ProgressResult<{ id: string }>> {
  const expected = read(input, target === "SKIPPED" ? "itinerary-skip" : "itinerary-progress", now);
  if (!expected) return stale();
  const actionKey = fingerprint({ target, token: input.token });
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, input.tripId)) return fail("NOT_FOUND", "This trip is unavailable.");
    const item = await tx.itineraryItem.findFirst({ where: { id: input.itemId, tripId: input.tripId }, include: progressInclude });
    if (!item) return fail("NOT_FOUND", "This item is unavailable.");
    if (progressContext(item) !== expected.context) return stale();
    if (target === "SKIPPED" && item.reservation?.state === "BOOKED" && input.bookingAcknowledged !== true) return fail("ACKNOWLEDGEMENT_REQUIRED", "Acknowledge that this booking remains Booked. Skipping does not cancel it.");
    // An exact retry succeeds without rewriting action time, only while its
    // resulting revision and all relevant context are still current.
    if (item.progressActionKey === actionKey && item.progress === target && item.revision === expected.revision + 1) return { ok: true, data: { id: item.id } };
    if (item.revision !== expected.revision || item.progress !== expected.progress) return stale();
    if (!canChangeProgress(item.progress, target)) return fail("INVALID_TRANSITION", "Refresh the day and choose a valid progress action.");
    await tx.itineraryItem.update({ where: { id: item.id }, data: { progress: target, progressChangedAt: now, progressActionKey: actionKey, revision: { increment: 1 } } });
    return { ok: true, data: { id: item.id } };
  }); } catch { return fail("PERSISTENCE_FAILURE", "Progress could not be saved. Refresh and try again."); }
}
export const markItineraryItemCompleted = (input: ProgressInput, now = new Date()) => change(input, "COMPLETED", now);
export const restoreItineraryItemToPending = (input: ProgressInput, now = new Date()) => change(input, "PENDING", now);
export const skipItineraryItem = (input: ProgressInput & { bookingAcknowledged?: boolean }, now = new Date()) => change(input, "SKIPPED", now);
