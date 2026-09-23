-- CreateEnum
CREATE TYPE "ResearchState" AS ENUM ('QUEUED', 'RUNNING', 'PARTIAL', 'COMPLETED', 'FAILED', 'CANCELLED');

-- AlterTable
ALTER TABLE "EvidenceRecord" ADD COLUMN     "locator" TEXT,
ADD COLUMN     "permissionBasis" TEXT,
ADD COLUMN     "sourceUrl" TEXT;

-- CreateTable
CREATE TABLE "ResearchJob" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "segmentId" TEXT NOT NULL,
    "requestKey" TEXT NOT NULL,
    "context" JSONB NOT NULL,
    "state" "ResearchState" NOT NULL DEFAULT 'QUEUED',
    "approval" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "budgetUsd" DOUBLE PRECISION NOT NULL,
    "reservedUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "searches" INTEGER NOT NULL DEFAULT 0,
    "documents" INTEGER NOT NULL DEFAULT 0,
    "extractions" INTEGER NOT NULL DEFAULT 0,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "actualInputTokens" INTEGER NOT NULL DEFAULT 0,
    "actualOutputTokens" INTEGER NOT NULL DEFAULT 0,
    "requestLog" JSONB NOT NULL DEFAULT '[]',
    "published" INTEGER NOT NULL DEFAULT 0,
    "held" INTEGER NOT NULL DEFAULT 0,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchCandidate" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "reasons" TEXT[],
    "publishedPlaceId" TEXT,

    CONSTRAINT "ResearchCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchPlace" (
    "placeId" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL,
    "recheckAfter" TIMESTAMP(3) NOT NULL,
    "eventStart" TEXT,
    "eventEnd" TEXT,
    "eventTimeZone" TEXT,
    "eventStatus" TEXT,
    "eventPrecision" TEXT,
    "media" JSONB,
    "withdrawn" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResearchPlace_pkey" PRIMARY KEY ("placeId")
);

-- CreateIndex
CREATE INDEX "ResearchJob_state_createdAt_idx" ON "ResearchJob"("state", "createdAt");

-- CreateIndex
CREATE INDEX "ResearchJob_tripId_segmentId_requestKey_idx" ON "ResearchJob"("tripId", "segmentId", "requestKey");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchCandidate_jobId_identity_key" ON "ResearchCandidate"("jobId", "identity");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchPlace_identity_key" ON "ResearchPlace"("identity");

-- AddForeignKey
ALTER TABLE "ResearchJob" ADD CONSTRAINT "ResearchJob_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchCandidate" ADD CONSTRAINT "ResearchCandidate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "ResearchJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchPlace" ADD CONSTRAINT "ResearchPlace_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
