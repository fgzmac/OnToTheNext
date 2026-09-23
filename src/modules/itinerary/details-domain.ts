import { validatePlanning } from "./domain";
import { optionalText, safeBookingUrl } from "@/src/modules/reservations/domain";
export type ItemDetails = {
  title: string; startMinute: number | null; durationMinutes: number | null;
  flexibility: "FIXED" | "FLEXIBLE"; notes: string | null;
  locationLabel: string | null; referenceUrl: string | null;
};
export const emptyDetails: ItemDetails = { title: "", startMinute: null, durationMinutes: null, flexibility: "FLEXIBLE", notes: null, locationLabel: null, referenceUrl: null };
const keys = Object.keys(emptyDetails);
export function parseItemDetails(patch: Record<string, unknown>, previous: ItemDetails, type: string): ItemDetails | string {
  if (Object.keys(patch).some(key => !keys.includes(key))) return "Only item details can be edited here. Use Move for Day changes.";
  if (type !== "ACTIVITY" && ((patch.locationLabel !== undefined && patch.locationLabel !== previous.locationLabel) || (patch.referenceUrl !== undefined && patch.referenceUrl !== previous.referenceUrl))) return "Location and reference fields are available only for Activities.";
  const value = { ...previous, ...Object.fromEntries(Object.entries(patch).filter(([,v]) => v !== undefined)) };
  const title = optionalText(value.title, 160), notes = optionalText(value.notes, 2000), locationLabel = optionalText(value.locationLabel, 300);
  if (!title) return "Enter an activity or item name of 1–160 characters.";
  if (notes === undefined) return "Keep notes to 2,000 characters or fewer.";
  if (locationLabel === undefined) return "Keep the location/address label to 300 characters or fewer.";
  const referenceUrl = safeBookingUrl(value.referenceUrl);
  if (referenceUrl === undefined) return "Reference URL must use HTTP or HTTPS without credentials or whitespace (up to 2,048 characters).";
  const issue = validatePlanning(value);
  if (issue) return issue.message;
  if (type === "FREE_TIME" && value.durationMinutes === null) return "Free Time needs a positive duration in minutes.";
  return { title, notes, locationLabel, referenceUrl, startMinute: value.startMinute as number | null,
    durationMinutes: value.durationMinutes as number | null, flexibility: value.flexibility as ItemDetails["flexibility"] };
}
export function materialDetailsChange(before: ItemDetails, after: ItemDetails) {
  return before.startMinute !== after.startMinute || before.durationMinutes !== after.durationMinutes ||
    before.locationLabel !== after.locationLabel || before.flexibility !== after.flexibility;
}
export function itemDetails(item: ItemDetails): ItemDetails {
  return { title: item.title, startMinute: item.startMinute, durationMinutes: item.durationMinutes,
    flexibility: item.flexibility, notes: item.notes, locationLabel: item.locationLabel, referenceUrl: item.referenceUrl };
}
