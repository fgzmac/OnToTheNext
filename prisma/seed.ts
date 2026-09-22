import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required to seed the database.");

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const PROTOTYPE_OWNER_ID = "cmg00000000000000000000001";
const DEMO_TRIP_ID = "cmg00000000000000000000002";

function date(value: string) {
  return new Date(`${value}T12:00:00.000Z`);
}

async function main() {
  await prisma.prototypeUser.upsert({
    where: { id: PROTOTYPE_OWNER_ID },
    update: { displayName: "Prototype Owner" },
    create: { id: PROTOTYPE_OWNER_ID, displayName: "Prototype Owner" },
  });

  await prisma.trip.deleteMany({ where: { id: DEMO_TRIP_ID } });

  await prisma.trip.create({
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

  const segments = await prisma.tripSegment.findMany({ where: { tripId: DEMO_TRIP_ID }, orderBy: { position: "asc" } });
  const segmentForDate = (dateOnly: string) => {
    const value = date(dateOnly);
    return segments.find((segment) => segment.arrivalDate <= value && value <= segment.departureDate)?.id ?? null;
  };

  const dates: string[] = [];
  const cursor = new Date("2030-04-01T12:00:00.000Z");
  const end = new Date("2030-04-15T12:00:00.000Z");
  while (cursor <= end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  await prisma.day.createMany({
    data: dates.map((dayDate, position) => ({
      tripId: DEMO_TRIP_ID,
      date: date(dayDate),
      primarySegmentId: segmentForDate(dayDate),
      position,
    })),
  });

  console.log(`Seeded ${DEMO_TRIP_ID} with ${segments.length} segments and ${dates.length} days.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
