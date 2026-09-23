import { catalogPlace } from "@/src/modules/discover/catalog";
import { eventMatches } from "@/src/modules/discover/events";
import type { Prisma, ItineraryItemType, TransportationMode } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { formatDateOnly } from "@/src/modules/trips/date-only";
import { validatePlanning } from "./domain";
import { BLOCK_TYPES, TRANSPORT_MODES, MODE_LABELS, deriveTimeIssues, isEligibleMoveDay, reorderIds, requiresFixedConfirmation, previewStateMatches } from "./planning";
import { normalizeDayPositions } from "./ordering";
import { fingerprint, readPreview, signPreview } from "./preview-token";
import type { ItineraryIssueCode, ItineraryResult, MoveDirection, MovePreview } from "./types";

const failure = (code: ItineraryIssueCode, message: string) => ({ ok: false as const, error: { code, message } });
const stale = () => failure("MOVE_PREVIEW_STALE", "The plan changed or this preview expired. Preview the move again before confirming.");

export async function createPlanningBlock(input: {
  tripId: string; dayId: string; type: string; startMinute?: unknown; durationMinutes?: unknown;
  flexibility?: unknown; notes?: string; transportationMode?: string; originSegmentId?: string; destinationSegmentId?: string;
}): Promise<ItineraryResult<{ id: string }>> {
  if (!BLOCK_TYPES.includes(input.type as typeof BLOCK_TYPES[number])) return failure("INVALID_BLOCK", "Choose Free Time, Hotel / Rest, or Transportation.");
  const startMinute = input.startMinute ?? null;
  const durationMinutes = input.durationMinutes ?? null;
  const flexibility = input.flexibility ?? "FLEXIBLE";
  const issue = validatePlanning({ startMinute, durationMinutes, flexibility });
  if (issue) return { ok: false, error: issue };
  if (input.type === "FREE_TIME" && durationMinutes === null) return failure("INVALID_DURATION", "Free Time needs a positive duration in minutes.");
  if ((input.notes?.length ?? 0) > 2000) return failure("INVALID_BLOCK", "Keep notes to 2,000 characters or fewer.");
  const transport = input.type === "TRANSPORTATION";
  const mode = input.transportationMode || "OTHER";
  if (transport && !TRANSPORT_MODES.includes(mode as TransportationMode)) return failure("INVALID_TRANSPORTATION", "Choose a transportation mode.");
  if (!transport && (input.originSegmentId || input.destinationSegmentId || input.transportationMode)) return failure("INVALID_TRANSPORTATION", "Only Transportation can have mode or Segment references.");
  try {
    return await getPrismaClient().$transaction(async tx => {
      if (!await lockPrototypeTrip(tx, input.tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
      const day = await tx.day.findFirst({ where: { id: input.dayId, tripId: input.tripId } });
      if (!day) return failure("WRONG_DAY", "Choose a day in this trip.");
      const originId = input.originSegmentId || null;
      const destinationId = input.destinationSegmentId || null;
      const segments = await tx.tripSegment.findMany({ where: { tripId: input.tripId, id: { in: [originId, destinationId].filter((id): id is string => id !== null) } } });
      const origin = segments.find(segment => segment.id === originId);
      const destination = segments.find(segment => segment.id === destinationId);
      if ((originId && !origin) || (destinationId && !destination) || (originId && originId === destinationId)) return failure("INVALID_TRANSPORTATION", "Use different origin and destination Segments from this trip.");
      if (originId && (day.primarySegmentId !== null || destinationId !== null) && day.primarySegmentId !== originId) return failure("WRONG_SEGMENT", "Choose a day owned by the origin Segment.");
      const title = input.type === "FREE_TIME" ? "Free time" : input.type === "HOTEL_REST" ? "Hotel / Rest" : MODE_LABELS[mode] + (origin && destination ? " · " + origin.baseName + " → " + destination.baseName : " transportation");
      const last = await tx.itineraryItem.aggregate({ where: { dayId: day.id }, _max: { position: true } });
      const item = await tx.itineraryItem.create({ data: {
        tripId: input.tripId, dayId: day.id, type: input.type as ItineraryItemType, title,
        startMinute: startMinute as number | null, durationMinutes: durationMinutes as number | null,
        flexibility: flexibility === "FIXED" ? "FIXED" : "FLEXIBLE", notes: input.notes?.trim() || null,
        transportationMode: transport ? mode as TransportationMode : null, originSegmentId: originId, destinationSegmentId: destinationId,
        position: (last._max.position ?? -1) + 1,
      } });
      return { ok: true as const, data: { id: item.id } };
    });
  } catch { return failure("PERSISTENCE_FAILURE", "The planning block could not be added. Please try again."); }
}

async function context(tx: Prisma.TransactionClient, tripId: string) {
  return tx.trip.findFirst({ where: { id: tripId, ownerId: PROTOTYPE_OWNER_ID }, include: {
    segments: { orderBy: { position: "asc" } },
    days: { orderBy: { position: "asc" }, include: { itineraryItems: { orderBy: { position: "asc" }, include: { sourceRecommendation: { select: { tripSegmentId: true, placeId: true } } } } } },
  } });
}
type Context = NonNullable<Awaited<ReturnType<typeof context>>>;
function dayLabel(plan: Context, dayId: string): string {
  const day = plan.days.find(day => day.id === dayId)!;
  const segment = plan.segments.find(segment => segment.id === day.primarySegmentId);
  return formatDateOnly(day.date) + " · " + (segment ? (segment.position + 1) + ". " + segment.baseName : "Unassigned");
}
function previewFor(plan: Context, itemId: string, targetDayId: string, direction: MoveDirection | null): ItineraryResult<MovePreview> {
  const source = plan.days.find(day => day.itineraryItems.some(item => item.id === itemId));
  const item = source?.itineraryItems.find(item => item.id === itemId);
  const target = plan.days.find(day => day.id === targetDayId);
  if (!item || !source) return failure("NOT_FOUND", "This scheduled item is unavailable.");
  if (!target) return failure("WRONG_DAY", "Choose another day in this trip.");
  let fixedWarning = item.flexibility === "FIXED" ? "This item is marked Fixed." : null;
  if (direction) {
    if (target.id !== source.id) return failure("WRONG_DAY", "Reordering stays within one day.");
    const before = source.itineraryItems.map(item => item.id);
    const after = reorderIds(before, item.id, direction);
    if (!after) return failure("ORDER_BOUNDARY", "This item cannot move any further in that direction.");
    if (!fixedWarning && requiresFixedConfirmation(source.itineraryItems, before, after)) fixedWarning = "This reorder also changes the position of an item marked Fixed.";
  } else if (!isEligibleMoveDay({ ...item, sourceSegmentId: item.sourceRecommendation?.tripSegmentId ?? null }, { ...target, date: formatDateOnly(target.date) })) {
    return failure("WRONG_SEGMENT", "Choose another day owned by this item's source or origin Segment, or any other trip day when it has no Segment constraint.");
  }
  const event = catalogPlace(item.sourceRecommendation?.placeId ?? "")?.event;
  if (!direction && event && !eventMatches(event, formatDateOnly(target.date))) return failure("WRONG_DAY", "This event has no verified occurrence on the target Day. Keep the saved item and check its source.");
  return { ok: true, data: {
    token: signPreview({ tripId: plan.id, itemId, targetDayId, direction, fingerprint: fingerprint(plan) }),
    itemId, title: item.title, flexibility: item.flexibility, sourceDay: dayLabel(plan, source.id), targetDay: dayLabel(plan, target.id),
    position: direction ? (direction === "EARLIER" ? "One position earlier" : "One position later") : "End of day",
    fixedWarning, issues: deriveTimeIssues(direction ? source.itineraryItems : [...target.itineraryItems, item]), operation: direction ? "REORDER" : "MOVE",
  } };
}
export async function previewMoveItineraryItem(input: { tripId: string; itemId: string; targetDayId: string }): Promise<ItineraryResult<MovePreview>> {
  try {
    return await getPrismaClient().$transaction(async tx => {
      const plan = await context(tx, input.tripId);
      return plan ? previewFor(plan, input.itemId, input.targetDayId, null) : failure("NOT_FOUND", "This trip is unavailable.");
    }, { isolationLevel: "RepeatableRead" });
  } catch { return failure("PERSISTENCE_FAILURE", "The move could not be previewed. Please try again."); }
}
export async function reorderItineraryItem(input: { tripId: string; itemId: string; direction: MoveDirection }): Promise<ItineraryResult<{ preview: MovePreview | null }>> {
  if (input.direction !== "EARLIER" && input.direction !== "LATER") return failure("ORDER_BOUNDARY", "Choose earlier or later.");
  try {
    return await getPrismaClient().$transaction(async tx => {
      if (!await lockPrototypeTrip(tx, input.tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
      const plan = (await context(tx, input.tripId))!;
      const source = plan.days.find(day => day.itineraryItems.some(item => item.id === input.itemId));
      if (!source) return failure("NOT_FOUND", "This scheduled item is unavailable.");
      const before = source.itineraryItems.map(item => item.id);
      const after = reorderIds(before, input.itemId, input.direction);
      if (!after) return failure("ORDER_BOUNDARY", "This item cannot move any further in that direction.");
      if (requiresFixedConfirmation(source.itineraryItems, before, after)) {
        const preview = previewFor(plan, input.itemId, source.id, input.direction);
        return preview.ok ? { ok: true as const, data: { preview: preview.data } } : preview;
      }
      await normalizeDayPositions(tx, source.id, after);
      return { ok: true as const, data: { preview: null } };
    });
  } catch { return failure("PERSISTENCE_FAILURE", "The item could not be reordered. Please try again."); }
}
export async function confirmMoveItineraryItem(tripId: string, token: string): Promise<ItineraryResult<{ id: string }>> {
  const expected = readPreview(token);
  if (!expected || expected.tripId !== tripId) return stale();
  try {
    return await getPrismaClient().$transaction(async tx => {
      if (!await lockPrototypeTrip(tx, tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
      const plan = (await context(tx, tripId))!;
      if (!previewStateMatches(expected.fingerprint, fingerprint(plan))) return stale();
      const valid = previewFor(plan, expected.itemId, expected.targetDayId, expected.direction);
      if (!valid.ok) return valid;
      const source = plan.days.find(day => day.itineraryItems.some(item => item.id === expected.itemId))!;
      const target = plan.days.find(day => day.id === expected.targetDayId)!;
      if (expected.direction) {
        await normalizeDayPositions(tx, source.id, reorderIds(source.itineraryItems.map(item => item.id), expected.itemId, expected.direction)!);
      } else {
        await tx.itineraryItem.update({ where: { id: expected.itemId }, data: { dayId: target.id, position: target.itineraryItems.length, revision: { increment: 1 } } });
        await normalizeDayPositions(tx, source.id);
      }
      return { ok: true as const, data: { id: expected.itemId } };
    });
  } catch { return failure("PERSISTENCE_FAILURE", "The move could not be applied. Please preview again."); }
}
