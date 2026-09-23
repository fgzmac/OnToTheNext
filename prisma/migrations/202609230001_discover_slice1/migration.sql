-- CreateEnum
CREATE TYPE "RecommendationOutcome" AS ENUM ('ACCEPTED', 'DENIED', 'SAVED', 'MUST_DO');

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseLabel" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "tripSegmentId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "factualSummary" TEXT NOT NULL,
    "durationMinutes" INTEGER,
    "costContext" TEXT,
    "logisticsNote" TEXT,
    "displayRank" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationDecision" (
    "id" TEXT NOT NULL,
    "recommendationId" TEXT NOT NULL,
    "outcome" "RecommendationOutcome" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecommendationDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceRecord" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "factualText" TEXT NOT NULL,
    "retrievedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "EvidenceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Recommendation_tripId_tripSegmentId_displayRank_id_idx" ON "Recommendation"("tripId", "tripSegmentId", "displayRank", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_tripSegmentId_placeId_key" ON "Recommendation"("tripSegmentId", "placeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecommendationDecision_recommendationId_key" ON "RecommendationDecision"("recommendationId");

-- CreateIndex
CREATE INDEX "EvidenceRecord_sourceId_idx" ON "EvidenceRecord"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "EvidenceRecord_placeId_sourceId_topic_key" ON "EvidenceRecord"("placeId", "sourceId", "topic");

-- CreateIndex
CREATE UNIQUE INDEX "TripSegment_id_tripId_key" ON "TripSegment"("id", "tripId");

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_tripSegmentId_tripId_fkey" FOREIGN KEY ("tripSegmentId", "tripId") REFERENCES "TripSegment"("id", "tripId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationDecision" ADD CONSTRAINT "RecommendationDecision_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "Recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceRecord" ADD CONSTRAINT "EvidenceRecord_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceRecord" ADD CONSTRAINT "EvidenceRecord_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
