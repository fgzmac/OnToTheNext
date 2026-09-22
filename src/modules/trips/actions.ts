"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { TripActionState } from "./action-state";
import {
  addSegment,
  createTrip,
  removeSegment,
  reorderSegments,
  updateSegment,
  updateTrip,
} from "./service";
import type { DateOnly, DestinationScope, Result, TripSkeleton } from "./types";

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function int(formData: FormData, key: string, fallback: number): number {
  const parsed = Number.parseInt(text(formData, key), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function stateFromResult(result: Result<TripSkeleton>, successMessage: string): TripActionState {
  return {
    status: result.ok ? "success" : "error",
    message: result.ok ? successMessage : undefined,
    errors: result.errors,
    warnings: result.warnings,
  };
}

function refreshTrip(tripId: string) {
  revalidatePath("/");
  revalidatePath(`/trips/${tripId}`);
  revalidatePath(`/trips/${tripId}/itinerary`);
  revalidatePath(`/trips/${tripId}/discover`);
}

export async function createTripAction(_previous: TripActionState, formData: FormData): Promise<TripActionState> {
  const result = await createTrip({
    name: text(formData, "name") || null,
    destinationLabel: text(formData, "destinationLabel"),
    destinationScope: (text(formData, "destinationScope") || "COUNTRY_REGION") as DestinationScope,
    startDate: text(formData, "startDate") as DateOnly,
    endDate: text(formData, "endDate") as DateOnly,
    travelerCount: int(formData, "travelerCount", 1),
    budgetComfort: text(formData, "budgetComfort") || null,
  });

  if (!result.ok || !result.data) return stateFromResult(result, "Trip created.");
  redirect(`/trips/${result.data.trip.id}`);
}

export async function updateTripAction(_previous: TripActionState, formData: FormData): Promise<TripActionState> {
  const tripId = text(formData, "tripId");
  const result = await updateTrip({
    tripId,
    name: text(formData, "name") || null,
    startDate: text(formData, "startDate") as DateOnly,
    endDate: text(formData, "endDate") as DateOnly,
    travelerCount: int(formData, "travelerCount", 1),
  });
  if (result.ok) refreshTrip(tripId);
  return stateFromResult(result, "Trip details saved.");
}

export async function addSegmentAction(_previous: TripActionState, formData: FormData): Promise<TripActionState> {
  const tripId = text(formData, "tripId");
  const result = await addSegment({
    tripId,
    baseName: text(formData, "baseName"),
    arrivalDate: text(formData, "arrivalDate") as DateOnly,
    departureDate: text(formData, "departureDate") as DateOnly,
  });
  if (result.ok) refreshTrip(tripId);
  return stateFromResult(result, "Destination added.");
}

export async function updateSegmentAction(_previous: TripActionState, formData: FormData): Promise<TripActionState> {
  const tripId = text(formData, "tripId");
  const result = await updateSegment({
    tripId,
    segmentId: text(formData, "segmentId"),
    baseName: text(formData, "baseName"),
    arrivalDate: text(formData, "arrivalDate") as DateOnly,
    departureDate: text(formData, "departureDate") as DateOnly,
  });
  if (result.ok) refreshTrip(tripId);
  return stateFromResult(result, "Destination saved.");
}

export async function removeSegmentAction(_previous: TripActionState, formData: FormData): Promise<TripActionState> {
  const tripId = text(formData, "tripId");
  const result = await removeSegment(tripId, text(formData, "segmentId"));
  if (result.ok) refreshTrip(tripId);
  return stateFromResult(result, "Destination removed.");
}

export async function reorderSegmentsAction(_previous: TripActionState, formData: FormData): Promise<TripActionState> {
  const tripId = text(formData, "tripId");
  const orderedSegmentIds = text(formData, "orderedSegmentIds").split(",").filter(Boolean);
  const result = await reorderSegments(tripId, orderedSegmentIds);
  if (result.ok) refreshTrip(tripId);
  return stateFromResult(result, "Destination order updated.");
}
