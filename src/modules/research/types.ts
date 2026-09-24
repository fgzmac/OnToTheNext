import type { RuntimeMedia } from "../experiences/types";
import type { DiscoverInterest } from "@/src/generated/prisma/enums";
import type { EventOccurrence } from "../experiences/types";
export interface ResearchContext { tripId:string; segmentId:string; destination:string; country:string; language:string; start:string; end:string; tripStart:string; tripEnd:string; interests:DiscoverInterest[] }
export interface Claim { locator:string; text:string; status:"FACT"|"ATTRIBUTED_OPINION"|"EDITORIAL_ESTIMATE" }
export interface Document { id:string; url:string; policyId:string; sourceRole:string; retrievedAt:string; revision:string;
  entityId:string; name:string; originalName:string; description:string; country:string; destinationId:string; locationIds:string[];
  claims:Claim[]; contentHash:string }
export interface Candidate { documentId:string; entityId:string; name:string; originalName:string; kind:"VENUE"|"NEIGHBORHOOD"|"EVENT";
  description:string; category:string; interests:DiscoverInterest[]; claimLocators:string[]; uncertainties:string[]; conflicts:string[];
  event:EventOccurrence|null; media:RuntimeMedia|null }
export type { RuntimeMedia } from "../experiences/types";
export interface Evaluated { candidate:Candidate; document:Document; reasons:string[] }
export interface Counts { searches:number; documents:number; extractions:number; candidates:number; held:number; published:number; inputTokens:number; outputTokens:number; reservedUsd:number }
