export interface RecommendationCardData {
  id: string;
  tripId: string;
  tripSegmentId: string;
  place: { id: string; name: string; baseLabel: string; category: string };
  factualSummary: string;
  durationMinutes: number | null;
  costContext: string | null;
  logisticsNote: string | null;
  decision: string | null;
  evidence: { id: string; topic: string; factualText: string; retrievedAt: string; status: string; sourceName: string; sourceKind: string }[];
}

export interface RecommendationBatch {
  cards: RecommendationCardData[];
  accepted: RecommendationCardData[];
  total: number;
  page: number;
  totalPages: number;
  exhausted: boolean;
}

export type DiscoverResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export interface DecisionActionState {
  error: string | null;
  message: string | null;
}
