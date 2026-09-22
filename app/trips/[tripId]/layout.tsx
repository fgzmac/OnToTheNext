import type { ReactNode } from "react";
import { TripNav } from "@/app/components/trip-nav";
import { loadTripSkeleton } from "./load-trip";

export const dynamic = "force-dynamic";

export default async function TripLayout({ children, params }: Readonly<{ children: ReactNode; params: Promise<{ tripId: string }> }>) {
  const { tripId } = await params;
  const { trip } = await loadTripSkeleton(tripId);

  return (
    <main className="page">
      <header className="trip-header">
        <div className="trip-title-row">
          <div>
            <span className="eyebrow">{trip.destinationLabel}</span>
            <h1>{trip.name ?? `${trip.destinationLabel} Trip`}</h1>
            <div className="trip-meta">{trip.startDate} → {trip.endDate} · {trip.travelerCount} traveler{trip.travelerCount === 1 ? "" : "s"}</div>
          </div>
        </div>
        <TripNav tripId={tripId} />
      </header>
      {children}
    </main>
  );
}
