-- CreateEnum
CREATE TYPE "ItineraryItemType" AS ENUM ('ACTIVITY', 'MEAL', 'SHOPPING', 'TRANSPORTATION', 'FREE_TIME', 'HOTEL_REST', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ItineraryFlexibility" AS ENUM ('FIXED', 'FLEXIBLE');

-- CreateTable
CREATE TABLE "ItineraryItem" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "type" "ItineraryItemType" NOT NULL,
    "title" TEXT NOT NULL,
    "startMinute" INTEGER,
    "durationMinutes" INTEGER,
    "position" INTEGER NOT NULL,
    "flexibility" "ItineraryFlexibility" NOT NULL DEFAULT 'FLEXIBLE',
    "notes" TEXT,
    "sourceRecommendationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItineraryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItineraryItem_sourceRecommendationId_key" ON "ItineraryItem"("sourceRecommendationId");

-- CreateIndex
CREATE INDEX "ItineraryItem_tripId_idx" ON "ItineraryItem"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraryItem_dayId_position_key" ON "ItineraryItem"("dayId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Day_id_tripId_key" ON "Day"("id", "tripId");

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_dayId_tripId_fkey" FOREIGN KEY ("dayId", "tripId") REFERENCES "Day"("id", "tripId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_sourceRecommendationId_fkey" FOREIGN KEY ("sourceRecommendationId") REFERENCES "Recommendation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Protect date-local planning values independently of application validation.
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_startMinute_check"
CHECK ("startMinute" IS NULL OR "startMinute" BETWEEN 0 AND 1439);
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_durationMinutes_check"
CHECK ("durationMinutes" IS NULL OR "durationMinutes" > 0);
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_position_check"
CHECK ("position" >= 0);
