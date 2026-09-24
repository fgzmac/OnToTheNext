/** Existing experience contracts, independent of a destination or provider manifest. */
export type ExperienceKind = "VENUE" | "NEIGHBORHOOD" | "EVENT" | "UNKNOWN";
export type EventReview = "human-reviewed" | "source-observed" | "unknown";
export interface EventOccurrence {
  startDate: string | null; endDate: string | null; timeZone: string;
  status: "PUBLISHED" | "CANCELLED" | "POSTPONED" | "UNKNOWN";
  observedAt: string; recheckAfter: string; timeNote?: string;
}
export interface ExperienceSource { role: "official" | "local publication" | "traveler account" | "community" | "editorial estimate"; url: string; observedAt: string; summary: string }
interface PhotoCredit {
  placeId: string; asset: string; sourcePage: string; title: string; creator: string;
  license: string; licenseUrl: string; alt: string; capturedAt: string; caption: string;
}
export interface LocalExperiencePhoto extends PhotoCredit {
  storage: "local"; width: number; height: number; observedAt: string;
  changes: string; restrictions: string; visualCheck: string;
}
export interface RemoteExperiencePhoto extends PhotoCredit {
  storage: "remote"; retrievedAt: string; rightsBasis: string; subjectMatch: "REVIEWED";
}
export type ExperiencePhoto = LocalExperiencePhoto | RemoteExperiencePhoto;
export interface RuntimeMedia {
  subjectId: string; asset: string; sourcePage: string; title: string; creator: string;
  license: string; licenseUrl: string; capturedAt: string; retrievedAt: string;
  subjectMatch: "REVIEWED"; rightsBasis: string; exterior: boolean;
}
export interface RuntimeExperience {
  placeId: string; identity: string; kind: string; sourceUrl: string;
  eventStart: string | null; eventEnd: string | null; eventTimeZone: string | null;
  eventStatus: string | null; observedAt: Date; recheckAfter: Date; media: unknown; withdrawn: boolean;
}
export interface ExperienceMetadata {
  kind: ExperienceKind; photo: ExperiencePhoto | null; event?: EventOccurrence;
  eventReview: EventReview; neighborhoodAuthorship: "app-authored-walk" | "unknown";
  sourceUrl: string | null; unavailable: boolean;
}
