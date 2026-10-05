import {beforeEach,it,expect,vi} from "vitest";
import {createHash,randomUUID} from "node:crypto";
import {catalogPlace} from "../discover/catalog";
import {GoogleClient,MASKS} from "./client";
import {enrichGoogle} from "./service";
import {PhotoSessions} from "./photo-session";
import {googleTestConfig,googleHttp,syntheticPhoto} from "../../../tests/fixtures/google";
import type {GoogleInput} from "./types";
const mocks=vi.hoisted(()=>({db:{recommendation:{findFirst:vi.fn()},googlePlaceReference:{findUnique:vi.fn()},googleOperation:{update:vi.fn()}},reserve:vi.fn()}));
vi.mock("@/src/lib/prisma",()=>({getPrismaClient:()=>mocks.db}));
vi.mock("./budget",()=>({reserveGoogle:mocks.reserve}));
const hash=(v:unknown)=>createHash("sha256").update(JSON.stringify(v)).digest("hex");
const app=catalogPlace("curated-teamlab-planets")!;
const ref={appPlaceId:app.id,googlePlaceId:"synthetic_"+app.id,identityHash:hash([app.id,app.name,app.city,app.location,app.url]),reviewedAt:"synthetic-revision"};
const reference={placeId:ref.googlePlaceId,revision:hash(ref)};
const input=(purpose:GoogleInput["purpose"],extra:Partial<GoogleInput>={}):GoogleInput=>({tripId:"owned",recommendationId:"recommendation",requestId:randomUUID(),purpose,reference,...extra});
beforeEach(()=>{vi.clearAllMocks();mocks.db.recommendation.findFirst.mockResolvedValue({placeId:app.id,place:{research:null}});mocks.db.googlePlaceReference.findUnique.mockResolvedValue(ref);mocks.reserve.mockResolvedValue(undefined);mocks.db.googleOperation.update.mockResolvedValue({});});
function fixture(patch?:(p:Record<string,unknown>)=>void){
 const calls=vi.fn(),base=googleHttp(calls),binary=vi.fn(async()=>({type:"image/png",bytes:syntheticPhoto}));
 const transport:typeof base=async i=>{const r=await base(i);if(!i.url.includes("/media")){const p=JSON.parse(r.body);if(i.headers?.["X-Goog-FieldMask"]===MASKS.photo)p.photos=[0,1,2].map(n=>({name:"places/"+ref.googlePlaceId+"/photos/synthetic"+n,authorAttributions:[{displayName:"Synthetic photo "+n}]}));patch?.(p);return {...r,body:JSON.stringify(p)};}return r;};
 const sessions=new PhotoSessions(),client=new GoogleClient("synthetic",transport,binary);
 return {calls,binary,deps:{configuration:()=>googleTestConfig,client:()=>client,photoSessions:sessions}};
}
it("every photo uses requested position, current linked ID/revision, fresh metadata and its own reservation",async()=>{const f=fixture(),overview=await enrichGoogle(input("context"),f.deps);
 for(const photoPosition of [0,1,2]){const r=await enrichGoogle(input("photo",{photoSession:overview.photoSession!.token,photoPosition}),f.deps);expect(r.matched).toBe(true);expect(r.identity).toEqual(reference);expect(JSON.stringify(r)).not.toContain("/photos/synthetic");}
 expect(f.binary).toHaveBeenCalledTimes(3);expect(f.calls.mock.calls.filter(c=>c[1]===MASKS.photo)).toHaveLength(3);
 expect(f.calls.mock.calls.filter(c=>c[0].endsWith("/media")).map(c=>c[0])).toEqual([0,1,2].map(n=>"/v1/places/"+ref.googlePlaceId+"/photos/synthetic"+n+"/media"));
 expect(mocks.reserve.mock.calls.map(c=>c[2])).toEqual(["context","photo","photo","photo"]);
});
it("rapid concurrent next/replay requests cannot charge more than three attempts",async()=>{const f=fixture(),r=await enrichGoogle(input("context"),f.deps);
 const results=await Promise.allSettled([0,1,1,2,2,3].map(photoPosition=>enrichGoogle(input("photo",{photoSession:r.photoSession!.token,photoPosition}),f.deps)));
 expect(results.filter(r=>r.status==="fulfilled")).toHaveLength(3);expect(mocks.reserve).toHaveBeenCalledTimes(4);expect(f.binary).toHaveBeenCalledTimes(3);
});
it("missing position retains conservative reservation without media or compensation",async()=>{const f=fixture(p=>{p.photos=[];}),o=await enrichGoogle(input("context"),f.deps);const r=await enrichGoogle(input("photo",{photoSession:o.photoSession!.token,photoPosition:2}),f.deps);expect(r.matched).toBe(true);expect(r.photo).toBeUndefined();expect(f.binary).not.toHaveBeenCalled();expect(mocks.reserve.mock.calls.map(c=>c[2])).toEqual(["context","photo"]);});
it("changed ordering uses fresh requested position even if it repeats a prior image",async()=>{let flip=false;const f=fixture(p=>{if(Array.isArray(p.photos)&&flip)p.photos=[p.photos[2],p.photos[0],p.photos[1]];}),o=await enrichGoogle(input("context"),f.deps);await enrichGoogle(input("photo",{photoSession:o.photoSession!.token,photoPosition:0}),f.deps);flip=true;await enrichGoogle(input("photo",{photoSession:o.photoSession!.token,photoPosition:1}),f.deps);expect(f.calls.mock.calls.filter(c=>c[0].endsWith("/media")).map(c=>c[0])).toEqual(Array(2).fill("/v1/places/"+ref.googlePlaceId+"/photos/synthetic0/media"));expect(f.binary).toHaveBeenCalledTimes(2);});
it.each(["reviews","photo"] as const)("%s refuses missing or stale revision before reservation",async purpose=>{const f=fixture();await expect(enrichGoogle(input(purpose,{reference:undefined}),f.deps)).rejects.toThrow("MATCH_CHANGED");const r=await enrichGoogle(input(purpose,{reference:{...reference,revision:"stale"}}),f.deps);expect(r.identityChanged).toBe(true);expect(mocks.reserve).not.toHaveBeenCalled();expect(f.calls).not.toHaveBeenCalled();});
it("review retrieval uses exact current ID and reviews-only mask",async()=>{const f=fixture(),r=await enrichGoogle(input("reviews"),f.deps);expect(r.identity).toEqual(reference);expect(f.calls).toHaveBeenCalledWith("/v1/places/"+ref.googlePlaceId,MASKS.reviews);expect(r.place?.reviews).toHaveLength(1);expect(mocks.reserve.mock.calls[0][2]).toBe("reviews");});
it("reference change during photo metadata refuses media and returns no stale content",async()=>{const f=fixture(p=>{if(p.photos)mocks.db.googlePlaceReference.findUnique.mockResolvedValue({...ref,reviewedAt:"changed"});}),o=await enrichGoogle(input("context"),f.deps);const r=await enrichGoogle(input("photo",{photoSession:o.photoSession!.token,photoPosition:0}),f.deps);expect(r.identityChanged).toBe(true);expect(r.photo).toBeUndefined();expect(f.binary).not.toHaveBeenCalled();expect(mocks.db.googleOperation.update).toHaveBeenLastCalledWith(expect.objectContaining({data:{state:"UNCERTAIN"}}));});
it("failure or exhausted budget cannot trigger another dispatch/retry",async()=>{const f=fixture(),o=await enrichGoogle(input("context"),f.deps);mocks.reserve.mockRejectedValueOnce(Error("BUDGET_EXHAUSTED"));const i=input("photo",{photoSession:o.photoSession!.token,photoPosition:0});await expect(enrichGoogle(i,f.deps)).rejects.toThrow("BUDGET_EXHAUSTED");await expect(enrichGoogle({...i,requestId:randomUUID()},f.deps)).rejects.toThrow("PHOTO_ATTEMPT_LIMIT");expect(f.binary).not.toHaveBeenCalled();expect(f.calls).toHaveBeenCalledTimes(1);});
