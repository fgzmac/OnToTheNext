import type { DomainIssue } from "./types";

export interface TripActionState {
  status: "idle" | "success" | "error";
  message?: string;
  errors: DomainIssue[];
  warnings: DomainIssue[];
}

export const initialTripActionState: TripActionState = {
  status: "idle",
  errors: [],
  warnings: [],
};
