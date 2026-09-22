import type { PrismaClient } from "../src/generated/prisma/client";
import { PROTOTYPE_OWNER_ID } from "../src/modules/identity/prototype-owner";
import { buildDayPlan } from "../src/modules/trips/domain";
import { formatDateOnly, toUtcDate } from "../src/modules/trips/date-only";

export const DEMO_TRIP_ID = "cmg00000000000000000000002";
const date = toUtcDate;

// Replace only the synthetic fixture, atomically. User-created trips are preserved.
export async function seedDemoTrip(prisma: PrismaClient) {
  await prisma.$transaction(async (tx) => {
    await tx.prototypeUser.upsert({
      where: { id: PROTOTYPE_OWNER_ID },
      update: { displayName: "Prototype Owner" },
      create: { id: PROTOTYPE_OWNER_ID, displayName: "Prototype Owner" },
    });

    await tx.trip.deleteMany({ where: { id: DEMO_TRIP_ID } });

    await tx.trip.create({
      data: {
        id: DEMO_TRIP_ID,
        ownerId: PROTOTYPE_OWNER_ID,
        name: "Japan Demo Trip",
        destinationLabel: "Japan",
        destinationScope: "COUNTRY_REGION",
        startDate: date("2030-04-01"),
        endDate: date("2030-04-15"),
        travelerCount: 2,
        preferenceProfile: {
          create: {
            budgetComfort: "Value-conscious and comfortable",
            planningNote: "Development fixture only; not real travel dates.",
          },
        },
        segments: {
          create: [
            { id: "cmg00000000000000000000011", baseName: "Tokyo", arrivalDate: date("2030-04-01"), departureDate: date("2030-04-05"), position: 0 },
            { id: "cmg00000000000000000000012", baseName: "Kyoto", arrivalDate: date("2030-04-05"), departureDate: date("2030-04-09"), position: 1 },
            { id: "cmg00000000000000000000013", baseName: "Osaka", arrivalDate: date("2030-04-09"), departureDate: date("2030-04-12"), position: 2 },
            { id: "cmg00000000000000000000014", baseName: "Tokyo", arrivalDate: date("2030-04-12"), departureDate: date("2030-04-15"), position: 3 },
          ],
        },
      },
    });


    const trip = await tx.trip.findUniqueOrThrow({
      where: { id: DEMO_TRIP_ID }, include: { segments: { orderBy: { position: "asc" } } },
    });
    const segments = trip.segments.map(segment => ({
      ...segment, arrivalDate: formatDateOnly(segment.arrivalDate), departureDate: formatDateOnly(segment.departureDate),
    }));
    const days = buildDayPlan({
      ...trip, startDate: formatDateOnly(trip.startDate), endDate: formatDateOnly(trip.endDate),
    }, segments);
    await tx.day.createMany({
      data: days.map(day => ({ ...day, date: toUtcDate(day.date) })),
    });

  });
}
