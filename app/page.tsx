import Link from "next/link";
import { CreateTripForm } from "./components/create-trip-form";
import { listTripsForPrototypeOwner } from "@/src/modules/trips/service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let trips: Awaited<ReturnType<typeof listTripsForPrototypeOwner>> = [];
  let databaseError: string | null = null;

  try {
    trips = await listTripsForPrototypeOwner();
  } catch {
    databaseError = "The prototype database is not connected yet.";
  }

  return (
    <main className="page-narrow">
      <section className="hero">
        <span className="eyebrow">Foundation</span>
        <h1>Plan the trip, not the software.</h1>
        <p className="lead">Sprint 1 establishes the trip calendar and destination sequence. Recommendations and the rest of the travel experience come after this foundation is trustworthy.</p>
      </section>

      {databaseError ? (
        <section className="card setup-error stack">
          <h2>Connect PostgreSQL to begin</h2>
          <p className="muted">{databaseError}</p>
          <p>Copy <span className="code">.env.example</span> to <span className="code">.env</span>, start PostgreSQL, then run the Prisma migration.</p>
        </section>
      ) : (
        <>
          {trips.length > 0 ? (
            <section className="card">
              <div className="card-header">
                <div>
                  <span className="eyebrow">Your trips</span>
                  <h2>Continue planning</h2>
                </div>
              </div>
              <div className="trip-list">
                {trips.map((trip) => (
                  <Link className="trip-link" href={`/trips/${trip.id}`} key={trip.id}>
                    <div>
                      <strong>{trip.name ?? `${trip.destinationLabel} Trip`}</strong>
                      <small>{trip.startDate} → {trip.endDate} · {trip.travelerCount} traveler{trip.travelerCount === 1 ? "" : "s"}</small>
                    </div>
                    <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
          <div style={{ height: 18 }} />
          <CreateTripForm />
        </>
      )}
    </main>
  );
}
