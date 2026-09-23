ALTER TABLE "Reservation" ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Unlinked activity reservation',
 ADD COLUMN "revision" INTEGER NOT NULL DEFAULT 0,
 ADD COLUMN "cancelledAt" TIMESTAMPTZ(3), ADD COLUMN "cancellationNote" TEXT;
UPDATE "Reservation" r SET "title" = i."title" FROM "ItineraryItem" i WHERE r."itineraryItemId" = i."id";
UPDATE "Reservation" SET "title" = 'Unlinked transportation reservation' WHERE "itineraryItemId" IS NULL AND "type" = 'TRANSPORTATION';
UPDATE "Reservation" SET "title" = 'Unlinked hotel reservation' WHERE "itineraryItemId" IS NULL AND "type" = 'HOTEL';
CREATE TYPE "ReleasePrecision" AS ENUM ('UNKNOWN', 'NOT_ANNOUNCED', 'DATE_ONLY', 'EXACT', 'WINDOW');
CREATE TYPE "AvailabilityObservation" AS ENUM ('UNKNOWN', 'AVAILABLE', 'UNAVAILABLE', 'LIMITED');
CREATE TYPE "EvidenceAttribution" AS ENUM ('OFFICIAL', 'THIRD_PARTY', 'USER_REPORTED', 'DEVELOPMENT_FIXTURE');
CREATE TABLE "ReleaseObservation" (
 "evidenceRecordId" TEXT NOT NULL, "availability" "AvailabilityObservation" NOT NULL DEFAULT 'UNKNOWN',
 "precision" "ReleasePrecision" NOT NULL, "releaseDate" DATE, "releaseAt" TIMESTAMPTZ(3), "sourceTimeZone" TEXT,
 "windowStartDate" DATE, "windowEndDate" DATE, "windowDescription" TEXT, "observedAt" TIMESTAMPTZ(3) NOT NULL,
 "recheckAfter" TIMESTAMPTZ(3), "attribution" "EvidenceAttribution" NOT NULL, "sourceUrl" TEXT,
 "recordedByUser" BOOLEAN NOT NULL DEFAULT true,
 CONSTRAINT "ReleaseObservation_pkey" PRIMARY KEY ("evidenceRecordId"),
 CONSTRAINT "ReleaseObservation_window_order" CHECK ("windowEndDate" >= "windowStartDate"),
 CONSTRAINT "ReleaseObservation_recheck_order" CHECK ("recheckAfter" >= "observedAt")
);
ALTER TABLE "ReleaseObservation" ADD CONSTRAINT "ReleaseObservation_evidenceRecordId_fkey" FOREIGN KEY ("evidenceRecordId") REFERENCES "EvidenceRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
