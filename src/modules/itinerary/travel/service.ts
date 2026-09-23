import type { Prisma } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { formatDateOnly } from "@/src/modules/trips/date-only";
import { fingerprint, readActionPreview, signActionPreview } from "../preview-token";
import type { ProgressResult } from "../progress-service";
import { contextIssues, deriveDeparture, eligibleOrigin, parseTravelInputs, timingMismatch, type TravelInputs, type TravelItemContext, type TravelContext } from "./domain";
import { reviewedContext, sourceFacts, targetFacts } from "./context";
const include = { day: { include: { primarySegment: true } }, reservation: true, travelPlan: true } as const;
async function workspace(tx: Prisma.TransactionClient, tripId: string) {
  return tx.trip.findFirst({ where: { id: tripId, ownerId: PROTOTYPE_OWNER_ID }, include: { itineraryItems: { include, orderBy: [{ day: { position: "asc" } }, { position: "asc" }] } } });
}
type Workspace = NonNullable<Awaited<ReturnType<typeof workspace>>>;
type Item = Workspace["itineraryItems"][number];
function itemContext(item: Item): TravelItemContext {
  const segment = item.day.primarySegment, booking = item.reservation;
  return { id: item.id, tripId: item.tripId, title: item.title, type: item.type, progress: item.progress, dayId: item.dayId,
    date: formatDateOnly(item.day.date), position: item.position, startMinute: item.startMinute, durationMinutes: item.durationMinutes,
    locationLabel: item.locationLabel, originSegmentId: item.originSegmentId, segment: segment ? { id: segment.id, label: segment.baseName, arrival: formatDateOnly(segment.arrivalDate), departure: formatDateOnly(segment.departureDate) } : null,
    booking: booking ? { id: booking.id, state: booking.state, date: booking.confirmedDate ? formatDateOnly(booking.confirmedDate) : null, minute: booking.confirmedStartMinute } : null };
}
function context(w: Workspace, item: Item, sourceItemId: string | null): TravelContext {
  return { target: itemContext(item), source: sourceItemId ? w.itineraryItems.filter(i => i.id === sourceItemId).map(itemContext)[0] ?? null : null,
    tripStart: formatDateOnly(w.startDate), tripEnd: formatDateOnly(w.endDate) };
}
function formContext(w: Workspace, item: Item) {
  return fingerprint({ target: targetFacts(itemContext(item)), progress: item.progress,
    tripStart: formatDateOnly(w.startDate), tripEnd: formatDateOnly(w.endDate),
    sources: w.itineraryItems.filter(i => i.id !== item.id).map(i => sourceFacts(itemContext(i))) });
}
interface FormToken { purpose: "itinerary-travel"; tripId: string; itemId: string; revision: number; context: string }
export type TravelRequest = { tripId: string; itemId: string; token: string };
export type TravelSaveRequest = TravelRequest & Record<string, unknown>;
const fail = (code: string, message: string) => ({ ok: false as const, error: { code, message } });
const stale = () => fail("STALE_TRAVEL_PLAN", "The item, travel plan or relevant context changed, or this form expired. Refresh before saving.");
function inputs(item: Item): TravelInputs | null {
  const p = item.travelPlan;
  return p ? { originKind: p.originKind, sourceItemId: p.sourceItemId, originLabel: p.originLabel,
    travelMinutes: p.travelMinutes, bufferMinutes: p.bufferMinutes, basis: p.basis, clockContext: p.clockContext } : null;
}
export type TravelDTO = {
  itemId: string; token: string; inputs: TravelInputs | null; editable: boolean; needsAcknowledgement: boolean; canReconfirm: boolean;
  status: "MISSING" | "READY" | "NEEDS_REVIEW" | "INACTIVE";
  departure: ReturnType<typeof deriveDeparture>["departure"]; warnings: string[];
  planned: { date: string; minute: number | null }; confirmed: { state: string; date: string | null; minute: number | null } | null;
  originOptions: { id: string; title: string }[];
};
function dto(w: Workspace, item: Item, now: Date): TravelDTO {
  const p = inputs(item), c = context(w, item, p?.sourceItemId ?? null), t = c.target;
  const editable = ["ACTIVITY", "TRANSPORTATION"].includes(t.type) && t.progress === "PENDING" && t.booking?.state !== "CANCELLED";
  const issues = p ? contextIssues(c, p) : [];
  const changed = p && item.travelPlan!.reviewedContext !== reviewedContext(c, p);
  const result = p ? deriveDeparture(c, p) : { departure: null, warnings: [] };
  const status = !p ? "MISSING" : !editable ? "INACTIVE" : changed || issues.length ? "NEEDS_REVIEW" : "READY";
  return { itemId: item.id, token: signActionPreview<FormToken>({ purpose: "itinerary-travel", tripId: w.id, itemId: item.id, revision: item.revision, context: formContext(w, item) }, now.getTime()),
    inputs: p, editable, status, needsAcknowledgement: timingMismatch(t), canReconfirm: Boolean(p && changed && !issues.length),
    departure: status === "READY" ? result.departure : null,
    warnings: [...(changed ? ["Travel estimate needs review. Relevant planning context changed; reconfirm or edit the inputs."] : []), ...result.warnings],
    planned: { date: t.date, minute: t.startMinute }, confirmed: t.booking,
    originOptions: w.itineraryItems.map(itemContext).filter(s => eligibleOrigin(t, s)).map(s => ({ id: s.id, title: s.title })) };
}
export async function getTravelPlanning(tripId: string, now = new Date(), transaction?: Prisma.TransactionClient): Promise<ProgressResult<TravelDTO[]>> {
  try {
    const load = async (tx: Prisma.TransactionClient): Promise<ProgressResult<TravelDTO[]>> => {
      const w = await workspace(tx, tripId);
      return w ? { ok: true, data: w.itineraryItems.filter(i => ["ACTIVITY", "TRANSPORTATION"].includes(i.type) || i.travelPlan).map(i => dto(w, i, now)) } : fail("NOT_FOUND", "This trip is unavailable.");
    };
    return transaction ? await load(transaction) : await getPrismaClient().$transaction(load, { isolationLevel: "RepeatableRead" });
  } catch { return fail("PERSISTENCE_FAILURE", "Travel planning is unavailable. No zero-minute or alternative timing estimate has been inferred."); }
}
async function mutate(action: "save" | "clear" | "reconfirm", input: TravelSaveRequest, now: Date): Promise<ProgressResult<{ id: string }>> {
  const expected = readActionPreview<FormToken>(input.token, now.getTime());
  if (!expected || expected.purpose !== "itinerary-travel" || expected.tripId !== input.tripId || expected.itemId !== input.itemId) return stale();
  const parsed = action === "save" ? parseTravelInputs(input) : null;
  if (typeof parsed === "string") return fail("INVALID_TRAVEL_INPUT", parsed);
  const actionKey = fingerprint({ action, token: input.token, inputs: parsed, acknowledged: input.plannedAcknowledged === true });
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, input.tripId)) return fail("NOT_FOUND", "This trip is unavailable.");
    const w = await workspace(tx, input.tripId), item = w?.itineraryItems.find(i => i.id === input.itemId);
    if (!w || !item) return fail("NOT_FOUND", "This item is unavailable.");
    if (formContext(w, item) !== expected.context) return stale();
    if (item.revision === expected.revision + 1 && item.travelPlanActionKey === actionKey) return { ok: true, data: { id: item.id } };
    if (item.revision !== expected.revision) return stale();
    if (action === "clear") {
      if (!item.travelPlan) return fail("NO_TRAVEL_PLAN", "No travel plan is stored for this item.");
      await tx.itineraryTravelPlan.delete({ where: { itemId: item.id } });
    } else {
      const plan = parsed ?? inputs(item);
      if (!plan) return fail("NO_TRAVEL_PLAN", "Enter a travel plan before reconfirming it.");
      const c = context(w, item, plan.sourceItemId);
      const issues = contextIssues(c, plan).filter(issue => action === "reconfirm" || !issue.startsWith("Different time zones"));
      if (issues.length) return fail("TRAVEL_CONTEXT_UNAVAILABLE", issues.join(" "));
      if (plan.basis === "PLANNED" && timingMismatch(c.target) && input.plannedAcknowledged !== true) return fail("ACKNOWLEDGEMENT_REQUIRED", "Acknowledge using the planned start instead of the different confirmed booking time.");
      const data = { ...plan, originLabel: plan.originKind === "EARLIER_ITEM" ? c.source!.title : plan.originLabel,
        reviewedContext: reviewedContext(c, plan) };
      if (action === "reconfirm" && item.travelPlan!.reviewedContext === data.reviewedContext) return fail("NO_REVIEW_NEEDED", "This estimate already uses the reviewed context.");
      await tx.itineraryTravelPlan.upsert({ where: { itemId: item.id }, create: { itemId: item.id, tripId: input.tripId, ...data }, update: data });
    }
    await tx.itineraryItem.update({ where: { id: item.id }, data: { revision: { increment: 1 }, travelPlanActionKey: actionKey } });
    return { ok: true, data: { id: item.id } };
  }); } catch { return fail("PERSISTENCE_FAILURE", "Travel planning could not be saved. Refresh and try again."); }
}
export const saveTravelPlan = (input: TravelSaveRequest, now = new Date()) => mutate("save", input, now);
export const clearTravelPlan = (input: TravelRequest, now = new Date()) => mutate("clear", input, now);
export const reconfirmTravelPlan = (input: TravelRequest & { plannedAcknowledged?: boolean }, now = new Date()) => mutate("reconfirm", input, now);
