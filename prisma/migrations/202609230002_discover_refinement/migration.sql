-- CreateEnum
CREATE TYPE "DiscoverInterest" AS ENUM ('SIGHTSEEING_LANDMARKS', 'ARCHITECTURE_DESIGN', 'CULTURE_HISTORY', 'FOOD_DRINK', 'SHOPPING', 'NATURE_OUTDOORS', 'NIGHTLIFE', 'ENTERTAINMENT', 'WELLNESS_RELAXATION');

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "interestTags" "DiscoverInterest"[] DEFAULT ARRAY[]::"DiscoverInterest"[];

-- AlterTable
ALTER TABLE "Recommendation" ADD COLUMN     "presentationBatch" INTEGER,
ADD COLUMN     "presentationOrder" INTEGER;

-- AlterTable
ALTER TABLE "TripPreferenceProfile" ADD COLUMN     "discoverInterests" "DiscoverInterest"[] DEFAULT ARRAY[]::"DiscoverInterest"[];

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_tripSegmentId_presentationBatch_presentation_key" ON "Recommendation"("tripSegmentId", "presentationBatch", "presentationOrder");

-- Slice 1 had stable rank windows but no presentation history. Preserve every
-- existing window as history rather than reshuffling possibly viewed cards.
WITH ranked AS (
  SELECT "id", ROW_NUMBER() OVER (PARTITION BY "tripSegmentId" ORDER BY "displayRank", "id") - 1 AS ordinal
  FROM "Recommendation"
)
UPDATE "Recommendation" AS recommendation
SET "presentationBatch" = (ranked.ordinal / 4)::INTEGER,
    "presentationOrder" = (ranked.ordinal % 4)::INTEGER
FROM ranked WHERE recommendation."id" = ranked."id";

ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_presentation_check"
CHECK (("presentationBatch" IS NULL AND "presentationOrder" IS NULL)
    OR ("presentationBatch" IS NOT NULL AND "presentationBatch" >= 0
        AND "presentationOrder" IS NOT NULL AND "presentationOrder" BETWEEN 0 AND 3));
