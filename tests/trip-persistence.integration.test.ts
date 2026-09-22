import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";
import { getPrismaClient } from "@/src/lib/prisma";
import {
  addSegment,
  createTrip,
  getTripSkeleton,
  removeSegment,
  reorderSegments,
} from "@/src/modules/trips/service";

const databaseEnabled = Boolean(process.env.DATABASE_URL);
const integration = databaseEnabled ? describe : describe.skip;
const prisma = databaseEnabled ? getPrismaClient() : null;

async function resetDatabase() {
  if (!prisma) return;
  await prisma.$executeRawUnsafe('ALTER TABLE "Day" DROP CONSTRAINT IF EXISTS "Day_test_position_limit"');
  await prisma.trip.deleteMany();
  await prisma.prototypeUser.deleteMany();
}

integration("Trip persistence", () => {
  beforeEach(resetDatabase);

  afterEach(async () => {
    if (prisma) {
      await prisma.$executeRawUnsafe('ALTER TABLE "Day" DROP CONSTRAINT IF EXISTS "Day_test_position_limit"');
    }
  });

  afterAll(async () => {
    if (prisma) await prisma.$disconnect();
  });

  it("persists a repeated-city multi-segment trip with deterministic transfer-day ownership", async () => {
    const created = await createTrip({
      name: "Integration Japan",
      destinationLabel: "Japan",
      destinationScope: "COUNTRY_REGION",
      startDate: "2030-04-01",
      endDate: "2030-04-15",
      travelerCount: 2,
    });

    expect(created.ok).toBe(true);
    expect(created.data?.days).toHaveLength(15);
    expect(created.warnings[0]?.code).toBe("UNASSIGNED_DATES");

    const tripId = created.data!.trip.id;
    const stops = [
      ["Tokyo", "2030-04-01", "2030-04-05"],
      ["Kyoto", "2030-04-05", "2030-04-09"],
      ["Osaka", "2030-04-09", "2030-04-12"],
      ["Tokyo", "2030-04-12", "2030-04-15"],
    ] as const;

    let result = created;
    for (const [baseName, arrivalDate, departureDate] of stops) {
      result = await addSegment({ tripId, baseName, arrivalDate, departureDate });
      expect(result.ok).toBe(true);
    }

    expect(result.data?.segments.map((segment) => segment.baseName)).toEqual(["Tokyo", "Kyoto", "Osaka", "Tokyo"]);
    expect(result.data?.unassignedDates).toEqual([]);

    const byDate = new Map(result.data?.days.map((day) => [day.date, day.primarySegmentId]));
    const segments = result.data!.segments;
    expect(byDate.get("2030-04-05")).toBe(segments[0].id);
    expect(byDate.get("2030-04-09")).toBe(segments[1].id);
    expect(byDate.get("2030-04-12")).toBe(segments[2].id);

    const reopened = await getTripSkeleton(tripId);
    expect(reopened.ok).toBe(true);
    expect(reopened.data?.days).toHaveLength(15);
    expect(reopened.data?.segments).toHaveLength(4);
  });

  it("rejects an invalid reorder without changing persisted positions", async () => {
    const created = await createTrip({
      destinationLabel: "Japan",
      destinationScope: "COUNTRY_REGION",
      startDate: "2030-04-01",
      endDate: "2030-04-09",
      travelerCount: 1,
    });
    const tripId = created.data!.trip.id;

    await addSegment({
      tripId,
      baseName: "Tokyo",
      arrivalDate: "2030-04-01",
      departureDate: "2030-04-05",
    });
    const kyoto = await addSegment({
      tripId,
      baseName: "Kyoto",
      arrivalDate: "2030-04-05",
      departureDate: "2030-04-09",
    });

    const ids = kyoto.data!.segments.map((segment) => segment.id);
    const result = await reorderSegments(tripId, [ids[1], ids[0]]);

    expect(result.ok).toBe(false);
    expect(result.errors.some((issue) => issue.code === "SEGMENT_OVERLAP")).toBe(true);

    const reopened = await getTripSkeleton(tripId);
    expect(reopened.data?.segments.map((segment) => segment.baseName)).toEqual(["Tokyo", "Kyoto"]);
  });

  it("preserves Trip days and marks gaps Unassigned after a Segment is removed", async () => {
    const created = await createTrip({
      destinationLabel: "Japan",
      destinationScope: "COUNTRY_REGION",
      startDate: "2030-04-01",
      endDate: "2030-04-09",
      travelerCount: 1,
    });
    const tripId = created.data!.trip.id;

    await addSegment({
      tripId,
      baseName: "Tokyo",
      arrivalDate: "2030-04-01",
      departureDate: "2030-04-05",
    });
    const kyoto = await addSegment({
      tripId,
      baseName: "Kyoto",
      arrivalDate: "2030-04-05",
      departureDate: "2030-04-09",
    });

    const kyotoId = kyoto.data!.segments[1].id;
    const removed = await removeSegment(tripId, kyotoId);

    expect(removed.ok).toBe(true);
    expect(removed.data?.days).toHaveLength(9);
    expect(removed.data?.days.find((day) => day.date === "2030-04-05")?.primarySegmentId).toBe(removed.data?.segments[0].id);
    expect(removed.data?.days.find((day) => day.date === "2030-04-06")?.primarySegmentId).toBeNull();
  });

  it("rolls back a Segment insert when Day regeneration fails", async () => {
    const created = await createTrip({
      destinationLabel: "Japan",
      destinationScope: "COUNTRY_REGION",
      startDate: "2030-04-01",
      endDate: "2030-04-03",
      travelerCount: 1,
    });
    const tripId = created.data!.trip.id;

    await prisma!.$executeRawUnsafe(
      'ALTER TABLE "Day" ADD CONSTRAINT "Day_test_position_limit" CHECK ("position" < 10000)',
    );

    const result = await addSegment({
      tripId,
      baseName: "Tokyo",
      arrivalDate: "2030-04-01",
      departureDate: "2030-04-03",
    });

    expect(result.ok).toBe(false);
    expect(result.errors[0]?.code).toBe("DAY_GENERATION_FAILED");
    expect(await prisma!.tripSegment.count({ where: { tripId } })).toBe(0);
  });

  it("cascades Trip-owned children but preserves the prototype owner", async () => {
    const created = await createTrip({
      destinationLabel: "Tokyo",
      destinationScope: "CITY_BASE",
      startDate: "2030-04-01",
      endDate: "2030-04-03",
      travelerCount: 1,
      budgetComfort: "Value-conscious",
    });
    const tripId = created.data!.trip.id;

    await prisma!.trip.delete({ where: { id: tripId } });

    expect(await prisma!.tripSegment.count({ where: { tripId } })).toBe(0);
    expect(await prisma!.day.count({ where: { tripId } })).toBe(0);
    expect(await prisma!.tripPreferenceProfile.count({ where: { tripId } })).toBe(0);
    expect(await prisma!.prototypeUser.count()).toBe(1);
  });
});
