import type { Prisma } from "@/src/generated/prisma/client";
import { ensurePrototypeOwner, PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { getPrismaClient } from "@/src/lib/prisma";
import { buildDayPlan, structureWarnings, validateTripBasics, validateTripStructure } from "./domain";
import { formatDateOnly, toUtcDate } from "./date-only";
import type {
  DateOnly,
  DestinationScope,
  DomainIssue,
  Result,
  SegmentShape,
  TripShape,
  TripSkeleton,
} from "./types";
import { errorResult, okResult } from "./types";

type Tx = Prisma.TransactionClient;

class TransactionAbort extends Error {
  constructor(readonly issues: DomainIssue[]) {
    super(issues[0]?.message ?? "Transaction aborted.");
    this.name = "TransactionAbort";
  }
}

function persistenceIssue(message = "The trip could not be saved. Please try again."): DomainIssue {
  return { code: "PERSISTENCE_FAILURE", message };
}

function resultFromCaughtError(error: unknown, fallbackMessage?: string): Result<TripSkeleton> {
  if (error instanceof TransactionAbort) return errorResult(error.issues);
  return errorResult([persistenceIssue(fallbackMessage)]);
}

export interface CreateTripInput {
  name?: string | null;
  destinationLabel: string;
  destinationScope: DestinationScope;
  startDate: DateOnly;
  endDate: DateOnly;
  travelerCount: number;
  budgetComfort?: string | null;
}

export interface UpdateTripInput {
  tripId: string;
  name?: string | null;
  startDate: DateOnly;
  endDate: DateOnly;
  travelerCount: number;
}

export interface SegmentInput {
  tripId: string;
  baseName: string;
  arrivalDate: DateOnly;
  departureDate: DateOnly;
  position?: number;
}

export interface UpdateSegmentInput extends SegmentInput {
  segmentId: string;
}

function toTripShape(record: {
  id: string;
  name: string | null;
  destinationLabel: string;
  destinationScope: DestinationScope;
  startDate: Date;
  endDate: Date;
  travelerCount: number;
}): TripShape {
  return {
    id: record.id,
    name: record.name,
    destinationLabel: record.destinationLabel,
    destinationScope: record.destinationScope,
    startDate: formatDateOnly(record.startDate),
    endDate: formatDateOnly(record.endDate),
    travelerCount: record.travelerCount,
  };
}

function toSegmentShape(record: {
  id: string;
  tripId: string;
  baseName: string;
  arrivalDate: Date;
  departureDate: Date;
  position: number;
}): SegmentShape {
  return {
    id: record.id,
    tripId: record.tripId,
    baseName: record.baseName,
    arrivalDate: formatDateOnly(record.arrivalDate),
    departureDate: formatDateOnly(record.departureDate),
    position: record.position,
  };
}

async function getTripSkeletonTx(tx: Tx, tripId: string): Promise<TripSkeleton | null> {
  const trip = await tx.trip.findUnique({
    where: { id: tripId },
    include: {
      segments: { orderBy: { position: "asc" } },
      days: { orderBy: { position: "asc" } },
      preferenceProfile: true,
    },
  });

  if (!trip) return null;

  const days = trip.days.map((day) => ({
    id: day.id,
    tripId: day.tripId,
    date: formatDateOnly(day.date),
    primarySegmentId: day.primarySegmentId,
    position: day.position,
  }));

  return {
    trip: toTripShape(trip),
    segments: trip.segments.map(toSegmentShape),
    days,
    preferences: trip.preferenceProfile
      ? {
          budgetComfort: trip.preferenceProfile.budgetComfort,
          planningNote: trip.preferenceProfile.planningNote,
        }
      : null,
    unassignedDates: days.filter((day) => day.primarySegmentId === null).map((day) => day.date),
  };
}

async function normalizeSegmentPositionsTx(tx: Tx, tripId: string, orderedIds: string[]): Promise<void> {
  if (orderedIds.length === 0) return;

  await tx.tripSegment.updateMany({
    where: { tripId },
    data: { position: { increment: 10_000 } },
  });

  for (let position = 0; position < orderedIds.length; position += 1) {
    await tx.tripSegment.update({
      where: { id: orderedIds[position] },
      data: { position },
    });
  }
}

async function regenerateDaysTx(tx: Tx, tripId: string): Promise<Result<TripSkeleton>> {
  const tripRecord = await tx.trip.findUnique({ where: { id: tripId } });
  const segmentRecords = await tx.tripSegment.findMany({ where: { tripId }, orderBy: { position: "asc" } });

  if (!tripRecord) {
    throw new TransactionAbort([{ code: "NOT_FOUND", message: "Trip not found." }]);
  }

  const trip = toTripShape(tripRecord);
  const segments = segmentRecords.map(toSegmentShape);
  const structuralErrors = validateTripStructure(trip, segments);
  if (structuralErrors.length > 0) throw new TransactionAbort(structuralErrors);

  const plannedDays = buildDayPlan(trip, segments);

  try {
    await tx.day.updateMany({
      where: { tripId },
      data: { position: { increment: 10_000 } },
    });

    const expectedDates = plannedDays.map((day) => toUtcDate(day.date));
    await tx.day.deleteMany({
      where: {
        tripId,
        date: { notIn: expectedDates },
      },
    });

    for (const day of plannedDays) {
      const date = toUtcDate(day.date);
      await tx.day.upsert({
        where: { tripId_date: { tripId, date } },
        update: {
          primarySegmentId: day.primarySegmentId,
          position: day.position,
        },
        create: {
          tripId,
          date,
          primarySegmentId: day.primarySegmentId,
          position: day.position,
        },
      });
    }
  } catch {
    throw new TransactionAbort([{ code: "DAY_GENERATION_FAILED", message: "Trip days could not be regenerated." }]);
  }

  const skeleton = await getTripSkeletonTx(tx, tripId);
  if (!skeleton) throw new TransactionAbort([{ code: "NOT_FOUND", message: "Trip not found after save." }]);
  return okResult(skeleton, structureWarnings(skeleton.days));
}

export async function listTripsForPrototypeOwner() {
  await ensurePrototypeOwner();
  const prisma = getPrismaClient();
  const trips = await prisma.trip.findMany({
    where: { ownerId: PROTOTYPE_OWNER_ID },
    orderBy: { updatedAt: "desc" },
  });

  return trips.map((trip) => toTripShape(trip));
}

export async function getTripSkeleton(tripId: string): Promise<Result<TripSkeleton>> {
  try {
    const prisma = getPrismaClient();
    const skeleton = await prisma.$transaction((tx) => getTripSkeletonTx(tx, tripId));
    if (!skeleton) return errorResult([{ code: "NOT_FOUND", message: "Trip not found." }]);
    return okResult(skeleton, structureWarnings(skeleton.days));
  } catch {
    return errorResult([persistenceIssue("The trip could not be loaded.")]);
  }
}

export async function createTrip(input: CreateTripInput): Promise<Result<TripSkeleton>> {
  const validationErrors = validateTripBasics({
    startDate: input.startDate,
    endDate: input.endDate,
    travelerCount: input.travelerCount,
  });
  if (!input.destinationLabel.trim()) {
    validationErrors.push({ code: "INVALID_DESTINATION", message: "Destination is required.", field: "destinationLabel" });
  }
  if (validationErrors.length > 0) return errorResult(validationErrors);

  try {
    const prisma = getPrismaClient();
    return await prisma.$transaction(async (tx) => {
      await tx.prototypeUser.upsert({
        where: { id: PROTOTYPE_OWNER_ID },
        update: {},
        create: { id: PROTOTYPE_OWNER_ID, displayName: "Prototype Owner" },
      });

      const trip = await tx.trip.create({
        data: {
          ownerId: PROTOTYPE_OWNER_ID,
          name: input.name?.trim() || `${input.destinationLabel.trim()} Trip`,
          destinationLabel: input.destinationLabel.trim(),
          destinationScope: input.destinationScope,
          startDate: toUtcDate(input.startDate),
          endDate: toUtcDate(input.endDate),
          travelerCount: input.travelerCount,
          preferenceProfile: input.budgetComfort?.trim()
            ? { create: { budgetComfort: input.budgetComfort.trim() } }
            : undefined,
        },
      });

      if (input.destinationScope === "CITY_BASE") {
        await tx.tripSegment.create({
          data: {
            tripId: trip.id,
            baseName: input.destinationLabel.trim(),
            arrivalDate: toUtcDate(input.startDate),
            departureDate: toUtcDate(input.endDate),
            position: 0,
          },
        });
      }

      return regenerateDaysTx(tx, trip.id);
    });
  } catch (error) {
    return resultFromCaughtError(error);
  }
}

export async function updateTrip(input: UpdateTripInput): Promise<Result<TripSkeleton>> {
  const basicErrors = validateTripBasics({
    startDate: input.startDate,
    endDate: input.endDate,
    travelerCount: input.travelerCount,
  });
  if (basicErrors.length > 0) return errorResult(basicErrors);

  try {
    const prisma = getPrismaClient();
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.trip.findUnique({ where: { id: input.tripId } });
      if (!existing) return errorResult([{ code: "NOT_FOUND", message: "Trip not found." }]);

      const segments = (await tx.tripSegment.findMany({ where: { tripId: input.tripId } })).map(toSegmentShape);
      const proposedTrip: TripShape = {
        ...toTripShape(existing),
        name: input.name?.trim() || null,
        startDate: input.startDate,
        endDate: input.endDate,
        travelerCount: input.travelerCount,
      };
      const errors = validateTripStructure(proposedTrip, segments);
      if (errors.length > 0) return errorResult(errors);

      await tx.trip.update({
        where: { id: input.tripId },
        data: {
          name: input.name?.trim() || null,
          startDate: toUtcDate(input.startDate),
          endDate: toUtcDate(input.endDate),
          travelerCount: input.travelerCount,
        },
      });

      return regenerateDaysTx(tx, input.tripId);
    });
  } catch (error) {
    return resultFromCaughtError(error);
  }
}

export async function addSegment(input: SegmentInput): Promise<Result<TripSkeleton>> {
  if (!input.baseName.trim()) {
    return errorResult([{ code: "INVALID_SEGMENT_NAME", message: "City / base is required.", field: "baseName" }]);
  }

  try {
    const prisma = getPrismaClient();
    return await prisma.$transaction(async (tx) => {
      const tripRecord = await tx.trip.findUnique({ where: { id: input.tripId } });
      if (!tripRecord) return errorResult([{ code: "NOT_FOUND", message: "Trip not found." }]);

      const existingRecords = await tx.tripSegment.findMany({ where: { tripId: input.tripId }, orderBy: { position: "asc" } });
      const insertAt = Math.max(0, Math.min(input.position ?? existingRecords.length, existingRecords.length));
      const candidateId = "candidate-segment";
      const existing = existingRecords.map(toSegmentShape);
      const proposed: SegmentShape[] = [...existing];
      proposed.splice(insertAt, 0, {
        id: candidateId,
        tripId: input.tripId,
        baseName: input.baseName.trim(),
        arrivalDate: input.arrivalDate,
        departureDate: input.departureDate,
        position: insertAt,
      });
      const normalized = proposed.map((segment, position) => ({ ...segment, position }));
      const errors = validateTripStructure(toTripShape(tripRecord), normalized);
      if (errors.length > 0) return errorResult(errors);

      const created = await tx.tripSegment.create({
        data: {
          tripId: input.tripId,
          baseName: input.baseName.trim(),
          arrivalDate: toUtcDate(input.arrivalDate),
          departureDate: toUtcDate(input.departureDate),
          position: existingRecords.length + 10_000,
        },
      });
      const orderedIds = normalized.map((segment) => (segment.id === candidateId ? created.id : segment.id));
      await normalizeSegmentPositionsTx(tx, input.tripId, orderedIds);
      return regenerateDaysTx(tx, input.tripId);
    });
  } catch (error) {
    return resultFromCaughtError(error);
  }
}

export async function updateSegment(input: UpdateSegmentInput): Promise<Result<TripSkeleton>> {
  if (!input.baseName.trim()) {
    return errorResult([{ code: "INVALID_SEGMENT_NAME", message: "City / base is required.", field: "baseName" }]);
  }

  try {
    const prisma = getPrismaClient();
    return await prisma.$transaction(async (tx) => {
      const tripRecord = await tx.trip.findUnique({ where: { id: input.tripId } });
      const segmentRecord = await tx.tripSegment.findUnique({ where: { id: input.segmentId } });
      if (!tripRecord || !segmentRecord || segmentRecord.tripId !== input.tripId) {
        return errorResult([{ code: "NOT_FOUND", message: "Trip segment not found." }]);
      }

      const existing = (await tx.tripSegment.findMany({ where: { tripId: input.tripId }, orderBy: { position: "asc" } })).map(toSegmentShape);
      const proposed = existing.map((segment) =>
        segment.id === input.segmentId
          ? {
              ...segment,
              baseName: input.baseName.trim(),
              arrivalDate: input.arrivalDate,
              departureDate: input.departureDate,
            }
          : segment,
      );
      const errors = validateTripStructure(toTripShape(tripRecord), proposed);
      if (errors.length > 0) return errorResult(errors);

      await tx.tripSegment.update({
        where: { id: input.segmentId },
        data: {
          baseName: input.baseName.trim(),
          arrivalDate: toUtcDate(input.arrivalDate),
          departureDate: toUtcDate(input.departureDate),
        },
      });

      return regenerateDaysTx(tx, input.tripId);
    });
  } catch (error) {
    return resultFromCaughtError(error);
  }
}

export async function reorderSegments(tripId: string, orderedSegmentIds: string[]): Promise<Result<TripSkeleton>> {
  try {
    const prisma = getPrismaClient();
    return await prisma.$transaction(async (tx) => {
      const tripRecord = await tx.trip.findUnique({ where: { id: tripId } });
      const existing = await tx.tripSegment.findMany({ where: { tripId }, orderBy: { position: "asc" } });
      if (!tripRecord) return errorResult([{ code: "NOT_FOUND", message: "Trip not found." }]);

      const existingIds = existing.map((segment) => segment.id).sort();
      const requestedIds = [...orderedSegmentIds].sort();
      const validSet =
        existingIds.length === requestedIds.length &&
        new Set(orderedSegmentIds).size === orderedSegmentIds.length &&
        existingIds.every((id, index) => id === requestedIds[index]);

      if (!validSet) {
        return errorResult([{ code: "INVALID_REORDER", message: "Segment reorder must include every trip segment exactly once." }]);
      }

      const byId = new Map(existing.map((segment) => [segment.id, toSegmentShape(segment)]));
      const proposed = orderedSegmentIds.map((id, position) => ({ ...byId.get(id)!, position }));
      const errors = validateTripStructure(toTripShape(tripRecord), proposed);
      if (errors.length > 0) return errorResult(errors);

      await normalizeSegmentPositionsTx(tx, tripId, orderedSegmentIds);
      return regenerateDaysTx(tx, tripId);
    });
  } catch (error) {
    return resultFromCaughtError(error);
  }
}

export async function removeSegment(tripId: string, segmentId: string): Promise<Result<TripSkeleton>> {
  try {
    const prisma = getPrismaClient();
    return await prisma.$transaction(async (tx) => {
      const segment = await tx.tripSegment.findUnique({ where: { id: segmentId } });
      if (!segment || segment.tripId !== tripId) {
        return errorResult([{ code: "NOT_FOUND", message: "Trip segment not found." }]);
      }

      await tx.tripSegment.delete({ where: { id: segmentId } });
      const remaining = await tx.tripSegment.findMany({ where: { tripId }, orderBy: { position: "asc" } });
      await normalizeSegmentPositionsTx(tx, tripId, remaining.map((item) => item.id));
      return regenerateDaysTx(tx, tripId);
    });
  } catch (error) {
    return resultFromCaughtError(error);
  }
}
