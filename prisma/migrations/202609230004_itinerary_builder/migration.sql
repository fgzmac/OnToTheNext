-- CreateEnum
CREATE TYPE "TransportationMode" AS ENUM ('TRAIN', 'FLIGHT', 'BUS', 'CAR', 'TRANSIT', 'WALK', 'FERRY', 'OTHER');

-- AlterTable
ALTER TABLE "ItineraryItem" ADD COLUMN     "destinationSegmentId" TEXT,
ADD COLUMN     "originSegmentId" TEXT,
ADD COLUMN     "revision" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "transportationMode" "TransportationMode";

-- CreateIndex
CREATE INDEX "ItineraryItem_originSegmentId_idx" ON "ItineraryItem"("originSegmentId");

-- CreateIndex
CREATE INDEX "ItineraryItem_destinationSegmentId_idx" ON "ItineraryItem"("destinationSegmentId");

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_originSegmentId_fkey" FOREIGN KEY ("originSegmentId") REFERENCES "TripSegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_destinationSegmentId_fkey" FOREIGN KEY ("destinationSegmentId") REFERENCES "TripSegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
