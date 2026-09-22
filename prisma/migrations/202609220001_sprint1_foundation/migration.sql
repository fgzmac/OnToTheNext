CREATE TYPE "DestinationScope" AS ENUM ('CITY_BASE', 'COUNTRY_REGION');

CREATE TABLE "PrototypeUser" (
    "id" TEXT NOT NULL,
    "displayName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PrototypeUser_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT,
    "destinationLabel" TEXT NOT NULL,
    "destinationScope" "DestinationScope" NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "travelerCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Trip_valid_date_range" CHECK ("endDate" >= "startDate"),
    CONSTRAINT "Trip_valid_traveler_count" CHECK ("travelerCount" >= 1)
);

CREATE TABLE "TripSegment" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "baseName" TEXT NOT NULL,
    "arrivalDate" DATE NOT NULL,
    "departureDate" DATE NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TripSegment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "TripSegment_valid_date_range" CHECK ("departureDate" >= "arrivalDate")
);

CREATE TABLE "Day" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "primarySegmentId" TEXT,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TripPreferenceProfile" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "budgetComfort" TEXT,
    "planningNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TripPreferenceProfile_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Trip_ownerId_idx" ON "Trip"("ownerId");
CREATE UNIQUE INDEX "TripSegment_tripId_position_key" ON "TripSegment"("tripId", "position");
CREATE INDEX "TripSegment_tripId_arrivalDate_departureDate_idx" ON "TripSegment"("tripId", "arrivalDate", "departureDate");
CREATE UNIQUE INDEX "Day_tripId_date_key" ON "Day"("tripId", "date");
CREATE UNIQUE INDEX "Day_tripId_position_key" ON "Day"("tripId", "position");
CREATE INDEX "Day_primarySegmentId_idx" ON "Day"("primarySegmentId");
CREATE UNIQUE INDEX "TripPreferenceProfile_tripId_key" ON "TripPreferenceProfile"("tripId");

ALTER TABLE "Trip" ADD CONSTRAINT "Trip_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "PrototypeUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TripSegment" ADD CONSTRAINT "TripSegment_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Day" ADD CONSTRAINT "Day_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Day" ADD CONSTRAINT "Day_primarySegmentId_fkey" FOREIGN KEY ("primarySegmentId") REFERENCES "TripSegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TripPreferenceProfile" ADD CONSTRAINT "TripPreferenceProfile_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
