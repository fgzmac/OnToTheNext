-- CreateEnum
CREATE TYPE "TravelOriginKind" AS ENUM ('ENTERED', 'EARLIER_ITEM');

-- CreateEnum
CREATE TYPE "TravelTimeBasis" AS ENUM ('PLANNED', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "TravelClockContext" AS ENUM ('SAME_LOCAL_CLOCK', 'REQUIRES_REVIEW');

-- AlterTable
ALTER TABLE "ItineraryItem" ADD COLUMN     "travelPlanActionKey" TEXT;

-- CreateTable
CREATE TABLE "ItineraryTravelPlan" (
    "itemId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "originKind" "TravelOriginKind" NOT NULL,
    "sourceItemId" TEXT,
    "originLabel" TEXT NOT NULL,
    "travelMinutes" INTEGER NOT NULL,
    "bufferMinutes" INTEGER NOT NULL,
    "basis" "TravelTimeBasis" NOT NULL,
    "clockContext" "TravelClockContext" NOT NULL,
    "reviewedContext" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItineraryTravelPlan_pkey" PRIMARY KEY ("itemId")
);

-- CreateIndex
CREATE INDEX "ItineraryTravelPlan_sourceItemId_tripId_idx" ON "ItineraryTravelPlan"("sourceItemId", "tripId");

-- CreateIndex
CREATE INDEX "ItineraryTravelPlan_tripId_idx" ON "ItineraryTravelPlan"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraryTravelPlan_itemId_tripId_key" ON "ItineraryTravelPlan"("itemId", "tripId");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraryItem_id_tripId_key" ON "ItineraryItem"("id", "tripId");

-- AddForeignKey
ALTER TABLE "ItineraryTravelPlan" ADD CONSTRAINT "ItineraryTravelPlan_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryTravelPlan" ADD CONSTRAINT "ItineraryTravelPlan_itemId_tripId_fkey" FOREIGN KEY ("itemId", "tripId") REFERENCES "ItineraryItem"("id", "tripId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryTravelPlan" ADD CONSTRAINT "ItineraryTravelPlan_sourceItemId_tripId_fkey" FOREIGN KEY ("sourceItemId", "tripId") REFERENCES "ItineraryItem"("id", "tripId") ON DELETE NO ACTION ON UPDATE CASCADE;
