import { notFound } from "next/navigation";
import { getItineraryBuilder } from "@/src/modules/itinerary/service";
import { getRecommendationBatch } from "@/src/modules/discover/service";
import { getItineraryReservationContext } from "@/src/modules/reservations/service";
import { getTravelPlanning } from "@/src/modules/itinerary/travel/service";
import { ItineraryComposer } from "@/app/components/itinerary-composer";

export default async function ItineraryPage({ params, searchParams }: {
  params: Promise<{ tripId: string }>; searchParams: Promise<{ planDay?: string; homeDay?: string }>;
}) {
  const { tripId } = await params, query = await searchParams;
  const [result, reservations, travel] = await Promise.all([getItineraryBuilder(tripId), getItineraryReservationContext(tripId), getTravelPlanning(tripId)]);
  if (!result.ok) {
    if (result.error.code === "NOT_FOUND") notFound();
    return <p role="alert" className="issue error">{result.error.message}</p>;
  }
  const day = result.data.days.find(day => day.id === query.planDay) ?? result.data.days.find(day => day.id === query.homeDay || day.date === query.homeDay) ?? result.data.days[0];
  const recommendations = day?.primarySegmentId ? await getRecommendationBatch(tripId, day.primarySegmentId) : null;
  return <ItineraryComposer builder={result.data} selectedDayId={day?.id ?? ""} batch={recommendations?.ok ? recommendations.data : null}
    recommendationError={recommendations && !recommendations.ok ? recommendations.error : null}
    reservations={reservations.ok ? reservations.data : []} travel={travel.ok ? travel.data : []}
    contextError={!reservations.ok ? reservations.error.message : !travel.ok ? travel.error.message : null} />;
}
