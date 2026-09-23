-- Preserve linked source observations if a reusable Place is later removed.
ALTER TABLE "EvidenceRecord" DROP CONSTRAINT "EvidenceRecord_placeId_fkey";
ALTER TABLE "EvidenceRecord" ALTER COLUMN "placeId" DROP NOT NULL;
ALTER TABLE "EvidenceRecord" ADD CONSTRAINT "EvidenceRecord_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
