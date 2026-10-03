-- AlterTable
ALTER TABLE "ItineraryItem" ADD COLUMN     "period" TEXT,
ALTER COLUMN "dayId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OrganizerState" (
    "tripId" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "revision" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OrganizerState_pkey" PRIMARY KEY ("tripId")
);

-- CreateTable
CREATE TABLE "ImportBatch" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "requestHash" TEXT NOT NULL,
    "originalText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizerIdea" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "batchId" TEXT,
    "itemId" TEXT NOT NULL,
    "sourceFragment" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "pending" BOOLEAN NOT NULL DEFAULT true,
    "disposition" TEXT NOT NULL DEFAULT 'INCLUDED',
    "revision" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OrganizerIdea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizerChange" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "afterHash" TEXT NOT NULL,
    "before" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizerChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImportBatch_tripId_requestHash_key" ON "ImportBatch"("tripId", "requestHash");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizerIdea_itemId_key" ON "OrganizerIdea"("itemId");

-- CreateIndex
CREATE INDEX "OrganizerIdea_tripId_idx" ON "OrganizerIdea"("tripId");

-- CreateIndex
CREATE INDEX "OrganizerChange_tripId_idx" ON "OrganizerChange"("tripId");

-- AddForeignKey
ALTER TABLE "OrganizerState" ADD CONSTRAINT "OrganizerState_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportBatch" ADD CONSTRAINT "ImportBatch_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerIdea" ADD CONSTRAINT "OrganizerIdea_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerIdea" ADD CONSTRAINT "OrganizerIdea_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ImportBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerIdea" ADD CONSTRAINT "OrganizerIdea_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItineraryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerChange" ADD CONSTRAINT "OrganizerChange_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
