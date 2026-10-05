import { describe, it, expect } from "vitest";
import { CATALOG } from "../discover/catalog";
import { photoFor } from "../discover/media";
import { eventMatches, eventReviewWarning, eventObservationLabel } from "../discover/events";
import { resolveExperienceMetadata } from "./metadata";
import { neighborhoodDescription, recommendationProvenanceLabel } from "./provenance";
import type { RuntimeExperience, RuntimeMedia } from "./types";
const clock = () => new Date("2026-09-23T12:00:00Z");
const runtime = (patch: Partial<RuntimeExperience> = {}): RuntimeExperience => ({
  placeId: "research-synthetic", identity: "wikidata:Q3000:EVENT:2026-10-31:2026-11-01", kind: "EVENT",
  sourceUrl: "https://www.wikidata.org/wiki/Q3000", eventStart: "2026-10-31", eventEnd: "2026-11-01", eventTimeZone: "Europe/Lisbon", eventStatus: "PUBLISHED",
  observedAt: new Date("2026-09-23"), recheckAfter: new Date("2026-10-07"), media: null, withdrawn: false, ...patch,
});
const media: RuntimeMedia = { subjectId: "Q3000", asset: "https://upload.wikimedia.org/wikipedia/commons/synthetic.svg", sourcePage: "https://commons.wikimedia.org/wiki/File:Synthetic.svg",
  title: "Synthetic media contract", creator: "Fixture author", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", capturedAt: "unknown", retrievedAt: "2026-09-23T12:00:00Z", subjectMatch: "REVIEWED", rightsBasis: "Synthetic metadata only", exterior: true };
const curatedEvent = CATALOG.find(p => p.event)!;
describe("shared experience metadata", () => {
  it("preserves every curated event, kind, source and local credit without writes", () => {
    const before = JSON.stringify(CATALOG);
    for (const p of CATALOG) {
      const m = resolveExperienceMetadata(p.id);
      expect(m.kind).toBe(p.kind ?? "VENUE"); expect(m.event).toEqual(p.event); expect(m.sourceUrl).toBe(p.url); expect(m.photo).toEqual(photoFor(p.id));
    }
    expect(JSON.stringify(CATALOG)).toBe(before);
  });
  it("keeps unknown metadata neutral", () => {
    expect(resolveExperienceMetadata("missing")).toEqual({kind:"UNKNOWN",photo:null,event:undefined,eventReview:"unknown",neighborhoodAuthorship:"unknown",sourceUrl:null,unavailable:false});
  });
  it.each(["VENUE", "NEIGHBORHOOD", "EVENT"])("preserves runtime %s without giving it curated authorship", kind => {
    const r = runtime({kind}); const before = structuredClone(r); const m = resolveExperienceMetadata("curated-ginza", r);
    expect(m.kind).toBe(kind); expect(m.neighborhoodAuthorship).toBe("unknown"); expect(m.sourceUrl).toBe(r.sourceUrl); expect(r).toEqual(before);
    expect(m.event === undefined).toBe(kind !== "EVENT");
  });
  it.each(["CANCELLED", "POSTPONED", "UNKNOWN", "invalid"])("never substitutes the catalog event for runtime status %s", eventStatus => {
    const m = resolveExperienceMetadata(curatedEvent.id, runtime({eventStatus}));
    expect(m.event?.timeZone).toBe("Europe/Lisbon"); expect(eventMatches(m.event!, "2026-10-31", undefined, clock)).toBe(false);
  });
  it.each([{eventStart:null},{eventTimeZone:null},{eventStart:"2026-02-30"},{recheckAfter:new Date("2026-09-22")},{withdrawn:true}])("holds invalid/stale/withdrawn runtime occurrences rather than falling back: %j", patch => {
    const m = resolveExperienceMetadata(curatedEvent.id, runtime(patch));
    expect(eventMatches(m.event!, "2026-10-31", undefined, clock)).toBe(false);
  });
  it("does not restore a catalog event when runtime identifies a venue or rejects its kind", () => {
    expect(resolveExperienceMetadata(curatedEvent.id,runtime({kind:"VENUE"})).event).toBeUndefined();
    expect(resolveExperienceMetadata(curatedEvent.id,runtime({kind:"unrecognized"})).unavailable).toBe(true);
  });
  it("uses catalog metadata only when the runtime record is absent", () => expect(resolveExperienceMetadata(curatedEvent.id,null).event).toEqual(curatedEvent.event));
  it("uses local media only for genuinely absent runtime media; rejected media stays missing", () => {
    expect(resolveExperienceMetadata("curated-sensoji",runtime()).photo?.storage).toBe("local");
    expect(resolveExperienceMetadata("curated-sensoji",runtime({media:{subjectId:"wrong"}})).photo).toBeNull();
    expect(resolveExperienceMetadata("curated-sensoji",runtime({withdrawn:true})).photo).toBeNull();
  });
  it("keeps remote provenance without fabricating dimensions, transformations or review dates", () => {
    const m=resolveExperienceMetadata("research-synthetic",runtime({media}));
    expect(m.photo).toMatchObject({storage:"remote",creator:media.creator,license:media.license,rightsBasis:media.rightsBasis,retrievedAt:media.retrievedAt,capturedAt:"unknown",caption:"Exterior view"});
    for (const field of ["width","height","observedAt","changes","visualCheck"]) expect(m.photo).not.toHaveProperty(field);
  });
  it("distinguishes app-authored walks from runtime neighborhoods and unknown provenance", () => {
    const walk=CATALOG.find(p=>p.kind==="NEIGHBORHOOD")!;
    expect(neighborhoodDescription(resolveExperienceMetadata(walk.id).neighborhoodAuthorship)).toContain("App-authored");
    expect(neighborhoodDescription(resolveExperienceMetadata(walk.id,runtime({kind:"NEIGHBORHOOD"})).neighborhoodAuthorship)).toBe("Neighborhood recommendation");
    expect(neighborhoodDescription()).toBe("Neighborhood recommendation");
  });
  it("does not equate observed or automatically processed events with human review", () => {
    const m=resolveExperienceMetadata("research-synthetic",runtime());
    expect(eventObservationLabel(m.event!,m.eventReview)).toContain("human review not recorded");
    expect(eventObservationLabel(m.event!)).toContain("review method unknown");
    expect(eventObservationLabel(curatedEvent.event!,"human-reviewed")).toContain("manually checked");
    expect(eventReviewWarning(m.event!,"2026-10-31",clock,m.eventReview)).not.toContain("manually checked");
  });
  it("retains named timezone midnight validation and saved-plan warnings", () => {
    const m=resolveExperienceMetadata("research-synthetic",runtime({eventTimeZone:"Asia/Tokyo"}));
    expect(eventMatches(m.event!,"2026-10-31",undefined,()=>new Date("2026-10-07T14:59:59Z"))).toBe(true);
    expect(eventMatches(m.event!,"2026-10-31",undefined,()=>new Date("2026-10-07T15:00:00Z"))).toBe(false);
    expect(eventReviewWarning(m.event!,"2026-10-31",()=>new Date("2026-10-08"),m.eventReview)).toContain("have not been changed");
  });
});

describe("recommendation provenance labels", () => {
  it("does not label missing or unknown evidence curated", () => {
    expect(recommendationProvenanceLabel([])).toBe("Source review not recorded");
    expect(recommendationProvenanceLabel([{sourceKind:"unknown",retrievedAt:"2026-09-23"}])).toBe("Source review not recorded");
  });
  it("preserves explicit synthetic, researched and curated labels", () => {
    expect(recommendationProvenanceLabel([{sourceKind:"DEVELOPMENT_FIXTURE",retrievedAt:"2026-09-23"}])).toBe("Synthetic test idea");
    expect(recommendationProvenanceLabel([{sourceKind:"RUNTIME_STRUCTURED_REFERENCE",retrievedAt:"2026-09-23"}])).toBe("Researched · structured reference · access unverified");
    expect(recommendationProvenanceLabel([{sourceKind:"OFFICIAL_CURATED",retrievedAt:"2026-09-23"}])).toBe("Curated · checked 2026-09-23");
  });
});