import { describe,it,expect,vi } from "vitest";
import { CATALOG, catalogPlace } from "../discover/catalog";
import { googleConfiguration } from "./config";
import { assessMatch } from "./matching";
import { GoogleClient, MASKS, photoDestination } from "./client";
import { googlePlace, googleHttp, syntheticPhoto } from "../../../tests/fixtures/google";
const place=(id:string)=>catalogPlace("curated-"+id)!;
describe("Google exact identity and request boundaries",()=>{
  for(const id of ["pokemon-shibuya","pokemon-mega-tokyo","shibuya-sky","teamlab-planets","imperial-east-gardens","kiyomizudera","kaiyukan"]){
    it("corroborates independent identity: "+id,()=>{const a=place(id);expect(a).toBeDefined();expect(assessMatch(a,googlePlace(a)).eligible).toBe(true);});
  }
  for(const [app,wrong] of [["pokemon-shibuya","Pokémon Center MEGA TOKYO"],["pokemon-mega-tokyo","Pokémon Center SHIBUYA"],["shibuya-sky","Shibuya Crossing"],["teamlab-planets","teamLab Borderless"],["imperial-east-gardens","Imperial Palace"]]) {
    it("rejects wrong branch/access: "+app,()=>{const a=place(app),p=googlePlace(a);p.displayName={text:wrong};expect(assessMatch(a,p).eligible).toBe(false);});
  }
  it("rejects name-only, wrong city, wrong country, closed, relocated and unknown status",()=>{
    const a=place("pokemon-shibuya"),p=googlePlace(a);
    for(const patch of [{websiteUri:"https://wrong-operator.example/"},{websiteUri:"https://shop.pokemon.co.jp/en/shop/pokemoncenter-megatokyo/"},{formattedAddress:"Sunshine City Ikebukuro Tokyo Japan"},{formattedAddress:"Tokyo",websiteUri:undefined},{addressComponents:[{shortText:"JP",types:["country"]},{longText:"Osaka",types:["locality"]}]},{addressComponents:[]},{businessStatus:"CLOSED_PERMANENTLY"},{businessStatus:undefined},{movedPlaceId:"other"}]) expect(assessMatch(a,{...p,...patch}).eligible).toBe(false);
  });
  it("Kyoto/Osaka prefecture alone cannot establish the destination city",()=>{
    for(const id of ["kiyomizudera","kaiyukan"]){const a=place(id),p=googlePlace(a);p.addressComponents=[{shortText:"JP",types:["country"]},{longText:a.city,types:["administrative_area_level_1"]},{longText:"Different municipality",types:["locality"]}];expect(assessMatch(a,p).eligible).toBe(false);}
  });
  it("every default/incomplete activation dispatches nothing",()=>{expect(googleConfiguration({})).toBeNull();expect(googleConfiguration({GOOGLE_PLACES_ENABLED:"owner-approved",GOOGLE_PLACES_API_KEY:"fake"})).toBeNull();});
  it("activation requires every policy, credential and cumulative cap prerequisite",()=>{
    const env={GOOGLE_PLACES_ENABLED:"owner-approved",GOOGLE_PLACES_APPROVAL:"synthetic-test",GOOGLE_PLACES_API_KEY:"synthetic-not-a-key",GOOGLE_PLACES_POLICY_CONFIRMED:"yes",GOOGLE_PLACES_KEY_RESTRICTIONS_CONFIRMED:"yes",GOOGLE_PLACES_TERMS_URL:"https://example.com/terms",GOOGLE_PLACES_PRIVACY_URL:"https://example.com/privacy",GOOGLE_PLACES_TOTAL_MICRO_USD:"10000000",GOOGLE_PLACES_PROVIDER_MICRO_USD:"10000000",GOOGLE_PLACES_MAX_SEARCH:"40",GOOGLE_PLACES_MAX_DETAILS:"100",GOOGLE_PLACES_MAX_PHOTOS:"20"};
    expect(googleConfiguration(env)?.ceilingMicros).toBe(10_000_000);
    for(const key of Object.keys(env))expect(googleConfiguration({...env,[key]:undefined})).toBeNull();
    for(const patch of [{GOOGLE_PLACES_TOTAL_MICRO_USD:"20000000"},{GOOGLE_PLACES_MAX_SEARCH:"41"},{GOOGLE_PLACES_MAX_DETAILS:"101"},{GOOGLE_PLACES_MAX_PHOTOS:"21"},{GOOGLE_PLACES_PROVIDER_MICRO_USD:"0"},{GOOGLE_PLACES_TOTAL_MICRO_USD:"100.5"},{GOOGLE_PLACES_PRIVACY_URL:"http://example.com"}])expect(googleConfiguration({...env,...patch})).toBeNull();
  });
  it("uses distinct explicit masks and no wildcard, retaining per-operation cost boundaries",()=>{expect(new Set(Object.values(MASKS)).size).toBe(4);for(const m of Object.values(MASKS))expect(m).not.toContain("*");expect(MASKS.context).not.toContain("reviews");expect(MASKS.reviews).not.toContain("photos");expect(MASKS.identity).not.toContain("rating");});
  it("real client paths work via synthetic transport; one photo and no key in media URL",async()=>{
    const spy=vi.fn(googleHttp()), binary=vi.fn(async()=>({type:"image/png",bytes:syntheticPhoto})),c=new GoogleClient("synthetic-key",spy,binary),a=place("pokemon-shibuya");
    expect(await c.search(a.name+", "+a.city)).toHaveLength(1);
    const p=await c.details(googlePlace(a).id,"photo");expect(await c.photo(p.id,p.photos![0].name!)).toMatch(/^data:image\/png;base64,/);
    expect(binary).toHaveBeenCalledTimes(1);expect(binary.mock.calls[0]).toEqual(["https://lh3.googleusercontent.com/synthetic-only"]);
    for(const [input] of spy.mock.calls){expect(input.url).not.toContain("synthetic-key");expect(input.headers?.["X-Goog-Api-Key"]).toBe("synthetic-key");}
  });
  it("rejects media proxy bypasses and cross-place resource names before network",async()=>{
    const spy=vi.fn(),c=new GoogleClient("fake",spy);
    for(const url of ["http://lh3.googleusercontent.com/a","https://evil.example/a","https://lh3.googleusercontent.com.evil/a","https://user:pass@lh3.googleusercontent.com/a","https://127.0.0.1/a"])expect(()=>photoDestination(url)).toThrow();
    await expect(c.photo("one","places/two/photos/x")).rejects.toThrow();expect(spy).not.toHaveBeenCalled();
  });
  it("does not retry an uncertain charge or follow an API redirect",async()=>{const spy=vi.fn(async()=>({status:302,headers:{location:"https://evil.example"},body:""}));await expect(new GoogleClient("fake",spy).search("Tokyo")).rejects.toThrow();expect(spy).toHaveBeenCalledTimes(1);});
  it("bounded media failures propagate without caching references",async()=>{const c=new GoogleClient("fake",googleHttp(),async()=>{throw Error("Expired");});await expect(c.photo("synthetic_curated-sensoji","places/synthetic_curated-sensoji/photos/synthetic")).rejects.toThrow("Expired");});
  it("synthetic comparison covers three cities without claiming real match quality",()=>{expect(new Set(CATALOG.filter(a=>!a.event).map(a=>a.city))).toEqual(new Set(["Tokyo","Kyoto","Osaka"]));});
});
