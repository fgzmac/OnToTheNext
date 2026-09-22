import { notFound } from "next/navigation";
import { getTripSkeleton } from "@/src/modules/trips/service";
import type { TripSkeleton } from "@/src/modules/trips/types";

export async function loadTripSkeleton(tripId: string): Promise<TripSkeleton> {
  const result = await getTripSkeleton(tripId);

  if (result.ok && result.data) {
    return result.data;
  }

  if (result.errors.some((issue) => issue.code === "NOT_FOUND")) {
    notFound();
  }

  throw new Error(result.errors[0]?.message ?? "The trip could not be loaded.");
}
