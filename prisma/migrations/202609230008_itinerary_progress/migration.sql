CREATE TYPE "ItineraryProgress" AS ENUM ('PENDING', 'COMPLETED', 'SKIPPED');
ALTER TABLE "ItineraryItem"
 ADD COLUMN "progress" "ItineraryProgress" NOT NULL DEFAULT 'PENDING',
 ADD COLUMN "progressChangedAt" TIMESTAMPTZ(3),
 ADD COLUMN "progressActionKey" TEXT;
