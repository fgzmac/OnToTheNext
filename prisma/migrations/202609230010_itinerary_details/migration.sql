-- AlterTable
ALTER TABLE "ItineraryItem" ADD COLUMN     "editActionKey" TEXT,
ADD COLUMN     "editResultContext" TEXT,
ADD COLUMN     "enteredManually" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "locationLabel" TEXT,
ADD COLUMN     "referenceUrl" TEXT;

-- CreateTable
CREATE TABLE "ManualActivitySubmission" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "itemId" TEXT,
    "requestHash" TEXT NOT NULL,

    CONSTRAINT "ManualActivitySubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ManualActivitySubmission_itemId_key" ON "ManualActivitySubmission"("itemId");

-- CreateIndex
CREATE INDEX "ManualActivitySubmission_tripId_idx" ON "ManualActivitySubmission"("tripId");

-- AddForeignKey
ALTER TABLE "ManualActivitySubmission" ADD CONSTRAINT "ManualActivitySubmission_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualActivitySubmission" ADD CONSTRAINT "ManualActivitySubmission_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItineraryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
