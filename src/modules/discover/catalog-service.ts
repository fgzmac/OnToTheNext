import { createHash } from "node:crypto";
import { catalogRank, LOCAL_CONTEXT } from "./tokyo-pilot";
import { eventMatches } from "./events";
import type { Prisma } from "@/src/generated/prisma/client";
import { CATALOG, supportedCity } from "./catalog";

// Called only after the owned Trip then Segment locks. Evidence is append-only by
// observation version; synchronization never touches decisions, batches or snapshots.
export async function provisionSegmentCatalog(tx: Prisma.TransactionClient, tripId: string, segmentId: string) {
  const segment = await tx.tripSegment.findFirst({ where: { id: segmentId, tripId } });
  if (!segment) return;
  // Explicit synthetic provenance isolates the entire regression Trip, without product fixture IDs.
  if (await tx.recommendation.findFirst({ where: { tripId,
    place: { evidence: { some: { source: { kind: "DEVELOPMENT_FIXTURE" } } } } } })) return;
  const city = supportedCity(segment.baseName);
  if (!city) return;
  const entries = CATALOG.filter(place => place.city === city && (!place.event || eventMatches(place.event, segment.arrivalDate.toISOString().slice(0, 10), segment.departureDate.toISOString().slice(0, 10))));
  for (const [displayRank, item] of entries.entries()) {
    const facts = { name: item.name, baseLabel: item.city, category: item.category, address: item.location, interestTags: item.interests };
    // ON CONFLICT DO NOTHING also serializes shared records across different Trip locks.
    const old = await tx.place.findUnique({ where: { id: item.id } });
    if (!old) await tx.place.createMany({ data: [{ id: item.id, ...facts }], skipDuplicates: true });
    else if (old.name !== facts.name || old.baseLabel !== facts.baseLabel || old.category !== facts.category || old.address !== facts.address || old.interestTags.join() !== facts.interestTags.join()) {
      await tx.place.update({ where: { id: item.id }, data: facts });
    }
    const sourceId = item.id + "-source-" + item.checkedAt + "-" + createHash("sha256").update(item.summary + item.durationMinutes).digest("hex").slice(0, 12);
    await tx.source.createMany({ data: [{ id: sourceId, name: item.url, kind: "OFFICIAL_CURATED" }], skipDuplicates: true });
    await tx.evidenceRecord.createMany({ skipDuplicates: true,
      data: [{ placeId: item.id, sourceId, topic: "Catalog description", factualText: item.summary + (item.durationMinutes === null ? "" : " Planning estimate: " + item.durationMinutes + " minutes. Source: " + (item.durationSource ?? item.url)),
        retrievedAt: new Date(item.checkedAt + "T00:00:00Z"), status: "CURATED_OBSERVATION" }] });
    for (const [index, evidence] of [...(item.sources ?? []), ...(LOCAL_CONTEXT[item.id] ?? [])].entries()) {
      const id = item.id + "-context-" + evidence.observedAt + "-" + index + "-" + createHash("sha256").update(evidence.url + evidence.summary).digest("hex").slice(0, 12);
      await tx.source.createMany({ data: [{ id, name: evidence.url, kind: evidence.role }], skipDuplicates: true });
      await tx.evidenceRecord.createMany({ skipDuplicates: true, data: [{ placeId: item.id, sourceId: id, topic: "Context", factualText: evidence.summary,
        retrievedAt: new Date(evidence.observedAt + "T00:00:00Z"), status: "CURATED_OBSERVATION" }] });
    }
    // Existing recommendation content is also a historical snapshot. New versions
    // add evidence above; they never silently rewrite a previously presented idea.
    await tx.recommendation.upsert({ where: { tripSegmentId_placeId: { tripSegmentId: segmentId, placeId: item.id } }, update: {},
      create: { tripId, tripSegmentId: segmentId, placeId: item.id, factualSummary: item.summary,
        durationMinutes: item.durationMinutes, displayRank: city === "Tokyo" ? catalogRank(item.id, displayRank) : displayRank } });
  }
}
