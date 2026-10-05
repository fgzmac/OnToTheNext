import type { RuntimeMedia } from "./types";
/** Check stored shape before independently checking rights/subject constraints. */
export function isRuntimeMedia(value: unknown): value is RuntimeMedia {
  if (!value || typeof value !== "object") return false;
  return "subjectId" in value && typeof value.subjectId === "string"
    && "asset" in value && typeof value.asset === "string"
    && "sourcePage" in value && typeof value.sourcePage === "string"
    && "title" in value && typeof value.title === "string"
    && "creator" in value && typeof value.creator === "string"
    && "license" in value && typeof value.license === "string"
    && "licenseUrl" in value && typeof value.licenseUrl === "string"
    && "capturedAt" in value && typeof value.capturedAt === "string"
    && "retrievedAt" in value && typeof value.retrievedAt === "string"
    && "subjectMatch" in value && value.subjectMatch === "REVIEWED"
    && "rightsBasis" in value && typeof value.rightsBasis === "string"
    && "exterior" in value && typeof value.exterior === "boolean";
}
