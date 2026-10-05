CREATE TABLE "ProviderPilotBudget" (
 "id" TEXT PRIMARY KEY, "ceilingMicros" INTEGER NOT NULL, "googleLimitMicros" INTEGER NOT NULL,
 "googleReservedMicros" INTEGER NOT NULL DEFAULT 0, "searches" INTEGER NOT NULL DEFAULT 0,
 "details" INTEGER NOT NULL DEFAULT 0, "photos" INTEGER NOT NULL DEFAULT 0,
 "maxSearch" INTEGER NOT NULL, "maxDetails" INTEGER NOT NULL, "maxPhotos" INTEGER NOT NULL
);
CREATE TABLE "GoogleOperation" (
 "id" TEXT PRIMARY KEY, "requestHash" TEXT NOT NULL, "purpose" TEXT NOT NULL, "approval" TEXT NOT NULL,
 "reservedMicros" INTEGER NOT NULL, "searches" INTEGER NOT NULL, "details" INTEGER NOT NULL,
 "photos" INTEGER NOT NULL, "state" TEXT NOT NULL DEFAULT 'RESERVED', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "GooglePlaceReference" (
 "appPlaceId" TEXT PRIMARY KEY, "googlePlaceId" TEXT NOT NULL, "identityHash" TEXT NOT NULL,
 "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
