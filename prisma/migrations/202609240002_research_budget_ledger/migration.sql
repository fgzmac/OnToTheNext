-- Approval-scoped reservations survive Trip/job deletion; no existing data is removed.
CREATE TABLE "ResearchBudget" (
  "approval" TEXT NOT NULL,
  "reservedUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
  CONSTRAINT "ResearchBudget_pkey" PRIMARY KEY ("approval")
);
-- Preserve reservations if research jobs already exist during a forward upgrade.
INSERT INTO "ResearchBudget" ("approval", "reservedUsd")
SELECT "approval", SUM("budgetUsd") FROM "ResearchJob" GROUP BY "approval";
