-- AlterTable
ALTER TABLE "ImportBatch" ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "undatedItems" JSONB,
ALTER COLUMN "tripId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ImportBatch_ownerId_requestHash_key" ON "ImportBatch"("ownerId", "requestHash");
