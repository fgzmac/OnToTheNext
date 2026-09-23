import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import { CATALOG, catalogPlace } from "./catalog";
import { PILOT_FIRST, groupFor, LOCAL_CONTEXT, type EventOccurrence } from "./tokyo-pilot";
import { selectDiverseBatch } from "./refinement";
import { eventMatches, eventReviewWarning } from "./events";
import { photoFor } from "./media";
import manifest from "./media-manifest.json" with { type: "json" };
const event: EventOccurrence = { ...catalogPlace("curated-tea-ceremony-2026")!.event! };
const now = "2026-09-23";
const clock = () => new Date("2026-09-23T12:00:00Z");
describe("Tokyo quality pilot", () => {
  it("retains every requested anchor with exact branches and access components", () => {
    for (const id of ["imperial-east-gardens", "pokemon-shibuya", "pokemon-mega-tokyo", "shibuya-crossing", "shibuya-sky", "akihabara", "ginza", "teamlab-planets", "sensoji", "tokyo-national-museum", "hamarikyu"]) expect(catalogPlace("curated-" + id)).toBeDefined();
    expect(catalogPlace("curated-pokemon-shibuya")!.location).toContain("PARCO 6F");
    expect(catalogPlace("curated-pokemon-mega-tokyo")!.location).toContain("Sunshine City alpa 2F");
    expect(catalogPlace("curated-teamlab-planets")!.location).toContain("Toyosu");
    expect(catalogPlace("curated-imperial-east-gardens")!.summary).toContain("not entry");
  });
  it("associates individually licensed local assets with all 24 Tokyo places", () => {
    const places = CATALOG.filter(p => p.city === "Tokyo" && !p.event);
    expect(places).toHaveLength(24); expect(manifest).toHaveLength(24);
    for (const p of places) { const photo = photoFor(p.id)!; expect(photo).not.toBeNull(); expect(photo.creator).toBeTruthy(); expect(photo.alt).toBeTruthy(); expect(photo.visualCheck).toContain("2026-09-23"); expect(photo.sourcePage).toContain("commons.wikimedia.org/wiki/File:"); expect(photo.licenseUrl).toMatch(/^https:/); expect(photo.width).toBeLessThanOrEqual(960); expect(existsSync("public" + photo.asset)).toBe(true); expect(statSync("public" + photo.asset).size).toBeLessThan(400_000); }
    expect(new Set(manifest.map(p => p.asset)).size).toBe(24);
    expect(photoFor("curated-teamlab-planets")!.alt).toContain("Exterior");
    expect(photoFor("curated-pokemon-shibuya")!.restrictions).toContain("do not crop");
    expect(photoFor("curated-pokemon-shibuya")!.sourcePage).not.toEqual(photoFor("curated-pokemon-mega-tokyo")!.sourcePage);
  });
  it("gives the initial visible pilot photographs and distinct category groups", () => {
    expect(PILOT_FIRST.slice(0, 4).every(id => photoFor(id))).toBe(true);
    expect(new Set(PILOT_FIRST.slice(0, 4).map(id => groupFor(catalogPlace(id)!))).size).toBe(4);
  });
  it("keeps neighborhood identity separate from category and types app walks", () => {
    const walks = CATALOG.filter(p => p.city === "Tokyo" && p.kind === "NEIGHBORHOOD");
    expect(walks.length).toBeGreaterThanOrEqual(6);
    expect(walks.every(p => p.location !== p.diversityGroup && /walk|browsing/i.test(p.name))).toBe(true);
  });
  it("retains attributable cautions from a meaningful local/community subset", () => {
    expect(Object.keys(LOCAL_CONTEXT)).toHaveLength(6);
    for (const sources of Object.values(LOCAL_CONTEXT)) for (const s of sources) { expect(s.observedAt).toBe(now); expect(new URL(s.url).protocol).toBe("https:"); expect(s.summary.length).toBeGreaterThan(50); }
    expect(LOCAL_CONTEXT["curated-teamlab-planets"][0].summary).toContain("conflict");
  });
});
describe("date-only sourced events", () => {
  it.each(["2026-10-31", "2026-11-01"])("includes published occurrence on %s", date => expect(eventMatches(event,date,date,clock)).toBe(true));
  it.each(["2026-10-30", "2026-11-02", "2027-10-31", "invalid"])("excludes non-occurrence %s", date => expect(eventMatches(event,date,date,clock)).toBe(false));
  it.each(["CANCELLED", "UNKNOWN"] as const)("excludes %s even when dates overlap", status => expect(eventMatches({...event,status},"2026-10-31","2026-10-31",clock)).toBe(false));
  it("rejects unknown dates, invalid calendars, stale, future observations and expired occurrences", () => {
    for (const changed of [{startDate:null},{endDate:null},{startDate:"2026-02-30"},{recheckAfter:"2026-09-22"},{observedAt:"2026-09-24"},{startDate:"2026-08-01",endDate:"2026-08-02"}]) expect(eventMatches({...event,...changed},"2026-10-31","2026-10-31",clock)).toBe(false);
    expect(eventMatches(event,"2026-10-30","2026-11-02",clock)).toBe(true);
  });
  it("surfaces a factual saved-plan warning rather than changing data", () => {
    const changed = {...event,status:"CANCELLED" as const}; const before=JSON.stringify(changed);
    expect(eventReviewWarning(changed,"2026-10-31")).toContain("have not been changed"); expect(JSON.stringify(changed)).toBe(before);
  });
});
describe("new-batch diversity", () => {
  const pool = ["heritage", "heritage", "heritage", "nature", "food", "pop"].map((group,i)=>({id:String(i),displayRank:i,interestTags:i<3?["CULTURE_HISTORY" as const]:["ENTERTAINMENT" as const],presentationBatch:null,decision:null,diversityGroup:group}));
  it("avoids a repetitive default and remains deterministic",()=>{expect(selectDiverseBatch(pool,[],[],4).map(p=>p.id)).toEqual(["0","3","4","5"]);expect(selectDiverseBatch([...pool].reverse(),[],[],4)).toEqual(selectDiverseBatch(pool,[],[],4));});
  it("explicit interests outrank diversity and denied/presented ideas never recycle",()=>{const selected=selectDiverseBatch(pool,["CULTURE_HISTORY"],[],4);expect(selected.slice(0,3).map(p=>p.id)).toEqual(["0","1","2"]);expect(selectDiverseBatch([{...pool[0],decision:"DENIED"},{...pool[1],presentationBatch:0},pool[5]],[],[],4).map(p=>p.id)).toEqual(["5"]);});
});

describe("event-local clock boundaries", () => {
  it("expires an observation at Tokyo midnight, not UTC midnight", () => {
    expect(eventMatches(event,"2026-10-31","2026-10-31",()=>new Date("2026-10-07T14:59:59Z"))).toBe(true);
    expect(eventMatches(event,"2026-10-31","2026-10-31",()=>new Date("2026-10-07T15:00:00Z"))).toBe(false);
  });
  it("expires an occurrence at the end of its local final date", () => {
    const occurrence={...event,recheckAfter:"2026-11-03"};
    expect(eventMatches(occurrence,"2026-11-01","2026-11-01",()=>new Date("2026-11-01T14:59:59Z"))).toBe(true);
    expect(eventMatches(occurrence,"2026-11-01","2026-11-01",()=>new Date("2026-11-01T15:00:00Z"))).toBe(false);
  });
  it.each(["2026-02-29","2026-04-31","2026-13-01","2026-00-01","2026-11-00"])("rejects invalid civil date %s",date=>expect(eventMatches({...event,startDate:date},date,date,clock)).toBe(false));
  it("rejects an invalid clock and accepts an actual leap day",()=>{
    expect(eventMatches(event,"2026-10-31","2026-10-31",()=>new Date(NaN))).toBe(false);
    const leap={...event,startDate:"2028-02-29",endDate:"2028-02-29",observedAt:"2028-02-28",recheckAfter:"2028-03-01"};
    expect(eventMatches(leap,"2028-02-29","2028-02-29",()=>new Date("2028-02-28T15:00:00Z"))).toBe(true);
  });
});
