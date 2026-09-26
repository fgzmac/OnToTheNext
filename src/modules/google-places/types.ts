/** Transient provider data. Never serialize into catalog, research or itinerary rows. */
export interface GooglePlace {
  id: string; displayName?: { text?: string }; formattedAddress?: string;
  addressComponents?: { longText?: string; shortText?: string; types?: string[] }[];
  websiteUri?: string; googleMapsUri?: string; businessStatus?: string; movedPlaceId?: string;
  rating?: number; userRatingCount?: number;
  currentOpeningHours?: { weekdayDescriptions?: string[]; openNow?: boolean; nextOpenTime?: string; nextCloseTime?: string };
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  attributions?: { provider?: string; providerUri?: string }[];
  reviews?: { rating?: number; text?: {text?: string; languageCode?: string}; originalText?: {text?: string; languageCode?: string}; authorAttribution?: Author; googleMapsUri?: string; publishTime?: string }[];
  photos?: {name?: string; authorAttributions?: Author[]; googleMapsUri?: string}[];
}
export interface Author { displayName?: string; uri?: string; photoUri?: string }
export type Purpose = "identity" | "context" | "reviews" | "photo";
export interface Candidate { place: GooglePlace; eligible: boolean; reason: string; token?: string }
export type DetailOutcome = "disabled" | "loading" | "needs_confirmation" | "ambiguous" | "ready" | "unavailable" | "budget_exhausted" | "expired";
export interface PlaceIdentity { placeId:string; revision:string }
export interface Enrichment {
  status?: DetailOutcome; identity?: PlaceIdentity; identityChanged?: boolean; diagnostic?: string; warning?: string;
  message: string; candidates?: Candidate[]; place?: GooglePlace; matched?: boolean;
  photoSession?: {token:string;expiresAt:number};
  photo?: { data: string; authors: Author[]; source?: string }; observedAt?: string;
}
export interface GoogleInput { tripId: string; recommendationId: string; requestId: string; purpose: Purpose | "confirm" | "open"; token?: string; reference?: PlaceIdentity; photoSession?: string; photoPosition?: number }
