
CREATE TYPE "ReservationType" AS ENUM ('ACTIVITY', 'HOTEL', 'TRANSPORTATION');
CREATE TYPE "ReservationState" AS ENUM ('BOOK_NOW', 'OPENS_LATER', 'CHECK_BACK', 'OPTIONAL', 'NO_RESERVATION_NEEDED', 'BOOKED', 'NEEDS_ATTENTION', 'CANCELLED');
CREATE TABLE "Reservation" (
 "id" TEXT NOT NULL, "tripId" TEXT NOT NULL, "type" "ReservationType" NOT NULL, "state" "ReservationState" NOT NULL,
 "itineraryItemId" TEXT, "desiredDate" DATE, "desiredStartMinute" INTEGER, "confirmedDate" DATE, "confirmedStartMinute" INTEGER,
 "bookingSourceLabel" TEXT, "bookingUrl" TEXT, "confirmationReference" TEXT, "notes" TEXT,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
 CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id"),
 CONSTRAINT "Reservation_desired_minute" CHECK ("desiredStartMinute" BETWEEN 0 AND 1439),
 CONSTRAINT "Reservation_confirmed_minute" CHECK ("confirmedStartMinute" BETWEEN 0 AND 1439)
);
CREATE UNIQUE INDEX "Reservation_itineraryItemId_key" ON "Reservation"("itineraryItemId");
CREATE INDEX "Reservation_tripId_idx" ON "Reservation"("tripId");
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_itineraryItemId_fkey" FOREIGN KEY ("itineraryItemId") REFERENCES "ItineraryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE TABLE "ReservationEvidence" (
 "reservationId" TEXT NOT NULL, "evidenceRecordId" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT "ReservationEvidence_pkey" PRIMARY KEY ("reservationId", "evidenceRecordId")
);
CREATE INDEX "ReservationEvidence_evidenceRecordId_idx" ON "ReservationEvidence"("evidenceRecordId");
ALTER TABLE "ReservationEvidence" ADD CONSTRAINT "ReservationEvidence_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReservationEvidence" ADD CONSTRAINT "ReservationEvidence_evidenceRecordId_fkey" FOREIGN KEY ("evidenceRecordId") REFERENCES "EvidenceRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
