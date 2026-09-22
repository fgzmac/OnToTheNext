import { notFound } from "next/navigation";
import { TripNav } from "@/app/components/trip-nav";
import { getTripSkeleton } from "@/src/modules/trips/service";

export const dynamic = "force-dynamic";

export default async function TripLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ tripId: string }> }>) {
  const { tripId } = await params;
  const result = await getTripSkeleton(tripId);
  if (!result.ok || !result.data) notFound();
  const { trip } = result.data;

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
