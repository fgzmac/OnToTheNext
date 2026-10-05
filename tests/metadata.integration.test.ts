import { beforeEach, afterAll, describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ExperienceDetails, ActivityDetails } from "@/app/components/experience-details";
import { getPrismaClient } from "@/src/lib/prisma";
import { createTrip } from "@/src/modules/trips/service";
import { getRecommendationBatch, decideRecommendation } from "@/src/modules/discover/service";
import { addRecommendationToDay, scheduleAcceptedRecommendation, getItineraryBuilder } from "@/src/modules/itinerary/service";
import { previewMoveItineraryItem, confirmMoveItineraryItem } from "@/src/modules/itinerary/builder-service";
import { createActivityReservation, markReservationBooked } from "@/src/modules/reservations/service";
import { researchStatus } from "@/src/modules/research/service";
import * as adapters from "@/src/modules/research/adapters";
import { publicHttp } from "@/src/modules/research/http";
vi.mock("@/src/modules/research/http", async importOriginal => ({
  ...await importOriginal<typeof import("@/src/modules/research/http")>(),
  publicHttp: vi.fn(async () => { throw Error("Unexpected live transport in metadata verification"); }),
}));
const suite=process.env.TEST_DATABASE_URL ? describe : describe.skip;
const db=process.env.TEST_DATABASE_URL ? getPrismaClient() : null;
function ok<T>(r:{ok:true;data:T}|{ok:false;error:unknown}):T {if(!r.ok)throw Error(JSON.stringify(r.error));return r.data;}
async function setup() {
  const created=await createTrip({destinationLabel:"Tokyo",destinationScope:"CITY_BASE",startDate:"2032-04-01",endDate:"2032-04-03",travelerCount:1});
  if(!created.ok || !created.data)throw Error("Synthetic metadata trip failed");
  const t=created.data, tripId=t.trip.id, tripSegmentId=t.segments[0].id;
  const batch=ok(await getRecommendationBatch(tripId,tripSegmentId)), r=batch.cards[0];
  return {t,r,tripId,tripSegmentId,input:{tripId,tripSegmentId,recommendationId:r.id,dayId:t.days[0].id!}};
}
suite("shared metadata in existing application paths",()=>{
  beforeEach(async()=>{await db!.trip.deleteMany();await db!.prototypeUser.deleteMany();await db!.evidenceRecord.deleteMany();await db!.source.deleteMany();await db!.place.deleteMany();vi.clearAllMocks();});
  afterAll(async()=>{await db!.researchPlace.deleteMany({where:{placeId:{startsWith:"curated-"},identity:{startsWith:"wikidata:Q3000:"}}});vi.restoreAllMocks();await db?.$disconnect();});
  it("rendering, navigation reads and Add never invoke research/search/extraction transport",async()=>{
    const searches=vi.spyOn(adapters,"braveSearch"), reads=vi.spyOn(adapters,"readEntity"), extractions=vi.spyOn(adapters,"extract");
    const s=await setup();
    expect(renderToStaticMarkup(createElement(ExperienceDetails,{item:s.r}))).toContain("View details");
    await researchStatus(s.tripId,s.tripSegmentId);
    await getRecommendationBatch(s.tripId,s.tripSegmentId,"0",s.t.days[1].id!);
    const added=ok(await addRecommendationToDay(s.input));
    await getItineraryBuilder(s.tripId);expect(ok(await addRecommendationToDay(s.input)).id).toBe(added.id);
    expect(searches).not.toHaveBeenCalled();expect(reads).not.toHaveBeenCalled();expect(extractions).not.toHaveBeenCalled();expect(publicHttp).not.toHaveBeenCalled();
    expect(await db!.researchJob.count()).toBe(0);expect(await db!.reservation.count()).toBe(0);
  });
  it("runtime event display, scheduling, Add and movement resolve the same authoritative occurrence",async()=>{
    const s=await setup();
    await db!.researchPlace.create({data:{placeId:s.r.place.id,identity:"wikidata:Q3000:EVENT:2032-04-02:2032-04-03",originalName:"Synthetic occurrence",kind:"EVENT",country:"Japan",destinationId:"Q1000",sourceUrl:"https://www.wikidata.org/wiki/Q3000",observedAt:new Date(),recheckAfter:new Date("2032-04-03"),eventStart:"2032-04-02",eventEnd:"2032-04-03",eventTimeZone:"Asia/Tokyo",eventStatus:"PUBLISHED"}});
    const cards=ok(await getRecommendationBatch(s.tripId,s.tripSegmentId,"0",s.t.days[1].id!));
    const card=cards.cards.find(c=>c.id===s.r.id)!;expect(card.event?.startDate).toBe("2032-04-02");expect(card.eventReview).toBe("source-observed");
    const html=renderToStaticMarkup(createElement(ActivityDetails,{item:card,session:null}));expect(html).toContain("human review not recorded");expect(html).not.toContain("manually checked");
    expect((await addRecommendationToDay(s.input)).ok).toBe(false);expect(await db!.recommendationDecision.count()).toBe(0);
    ok(await decideRecommendation({...s.input,outcome:"ACCEPTED"}));
    expect((await scheduleAcceptedRecommendation({tripId:s.tripId,recommendationId:s.r.id,dayId:s.input.dayId})).ok).toBe(false);
    const added=ok(await addRecommendationToDay({...s.input,dayId:s.t.days[1].id!}));
    expect((await previewMoveItineraryItem({tripId:s.tripId,itemId:added.id,targetDayId:s.input.dayId})).ok).toBe(false);
    const preview=ok(await previewMoveItineraryItem({tripId:s.tripId,itemId:added.id,targetDayId:s.t.days[2].id!}));
    const reservation=ok(await createActivityReservation({tripId:s.tripId,itineraryItemId:added.id,state:"OPTIONAL"}));ok(await markReservationBooked({tripId:s.tripId,reservationId:reservation.id}));
    const before={item:await db!.itineraryItem.findUnique({where:{id:added.id}}),recommendation:await db!.recommendation.findUnique({where:{id:s.r.id}}),decisions:await db!.recommendationDecision.findMany(),reservations:await db!.reservation.findMany()};
    await db!.researchPlace.update({where:{placeId:s.r.place.id},data:{eventStatus:"CANCELLED"}});
    expect((await confirmMoveItineraryItem(s.tripId,preview.token)).ok).toBe(false);
    const builder=ok(await getItineraryBuilder(s.tripId));expect(builder.days[1].items[0].eventWarning).toContain("have not been changed");
    expect(ok(await getRecommendationBatch(s.tripId,s.tripSegmentId,"0",s.t.days[1].id!)).cards.some(c=>c.id===s.r.id)).toBe(false);
    expect(ok(await addRecommendationToDay(s.input)).id).toBe(added.id);
    expect({item:await db!.itineraryItem.findUnique({where:{id:added.id}}),recommendation:await db!.recommendation.findUnique({where:{id:s.r.id}}),decisions:await db!.recommendationDecision.findMany(),reservations:await db!.reservation.findMany()}).toEqual(before);
    expect(publicHttp).not.toHaveBeenCalled();
  });
  it("runtime neighborhoods and unknown evidence do not gain invented authorship or human review",async()=>{
    const s=await setup();
    await db!.researchPlace.create({data:{placeId:s.r.place.id,identity:"wikidata:Q3000:NEIGHBORHOOD::",originalName:"Synthetic neighborhood",kind:"NEIGHBORHOOD",country:"Japan",destinationId:"Q1000",sourceUrl:"https://www.wikidata.org/wiki/Q3000",observedAt:new Date(),recheckAfter:new Date("2032-04-03")}});
    const card=ok(await getRecommendationBatch(s.tripId,s.tripSegmentId)).cards.find(c=>c.id===s.r.id)!;
    const html=renderToStaticMarkup(createElement(ActivityDetails,{item:card,session:null}));expect(html).toContain("Neighborhood recommendation");expect(html).not.toContain("App-authored");
    const unknown={...card,evidence:[{id:"synthetic",topic:"Source",factualText:"Synthetic observation",retrievedAt:"2026-09-23",status:"unknown",sourceName:"Unclassified source",sourceKind:"unknown"}]};
    expect(renderToStaticMarkup(createElement(ActivityDetails,{item:unknown,session:null}))).toContain("review method not recorded");
  });
});
