import {describe,it,expect} from "vitest";
import {catalogPlace} from "../discover/catalog";
import {googlePlace} from "../../../tests/fixtures/google";
import {VENUE_IDENTITIES,websiteEvidence} from "./venue-identities";
import {assessMatch} from "./matching";
const shibuya=catalogPlace("curated-pokemon-shibuya")!;
describe("independently verified branch URL equivalence",()=>{
 for(const url of VENUE_IDENTITIES[shibuya.id].urls)it("accepts same-branch reviewed variant "+url,()=>{
  expect(websiteEvidence(shibuya,url)).toBe("equivalent");
  expect(assessMatch(shibuya,{...googlePlace(shibuya),websiteUri:url}).eligible).toBe(true);
 });
 it("accepts optional trailing slash, never a string-prefix sibling",()=>{expect(websiteEvidence(shibuya,shibuya.url.replace(/\/$/,""))).toBe("equivalent");expect(assessMatch(shibuya,{...googlePlace(shibuya),websiteUri:shibuya.url.replace(/\/$/,"")+"-other/"}).eligible).toBe(false);});
 for(const url of [undefined,"https://www.pokemon.co.jp/","https://shop.pokemon.co.jp/","https://shop.pokemon.co.jp/en/shop/","https://shop.pokemon.co.jp/en/shop/pokemoncenter-shibuya/?redirect=other"])
  it("holds missing/generic/unknown evidence separately: "+url,()=>{expect(websiteEvidence(shibuya,url)).toBe("insufficient");expect(assessMatch(shibuya,{...googlePlace(shibuya),websiteUri:url}).eligible).toBe(false);});
 for(const url of ["https://shop.pokemon.co.jp/en/shop/pokemoncenter-megatokyo/","https://www.pokemon.co.jp/shop/pokecen/megatokyo/","https://shop.pokemon.co.jp/en/shop/pokemoncenter-shibuya-other/","https://other.pokemon.co.jp/en/shop/pokemoncenter-shibuya/","https://shop.pokemon.co.jp.evil.example/en/shop/pokemoncenter-shibuya/","https://attacker.example/?next=https://shop.pokemon.co.jp/en/shop/pokemoncenter-shibuya/","https://user:pass@shop.pokemon.co.jp/en/shop/pokemoncenter-shibuya/","https://shop.pokemon.co.jp:444/en/shop/pokemoncenter-shibuya/"])
  it("rejects competing/unverified operator or branch "+url,()=>{expect(websiteEvidence(shibuya,url)).not.toBe("equivalent");expect(assessMatch(shibuya,{...googlePlace(shibuya),websiteUri:url}).eligible).toBe(false);});
 it("verified URL cannot override wrong name, country, city, area, closed/moved status",()=>{
  for(const patch of [{displayName:{text:"Pokémon Center MEGA TOKYO"}},{formattedAddress:"Ikebukuro Tokyo Japan"},{addressComponents:[]},{addressComponents:[{shortText:"JP",types:["country"]},{longText:"Osaka",types:["locality"]}]},{businessStatus:"CLOSED_TEMPORARILY"},{businessStatus:undefined},{movedPlaceId:"other"}])
   expect(assessMatch(shibuya,{...googlePlace(shibuya),websiteUri:VENUE_IDENTITIES[shibuya.id].urls[0],...patch}).eligible).toBe(false);
 });
 it("MEGA TOKYO cannot borrow a SHIBUYA URL",()=>{const app=catalogPlace("curated-pokemon-mega-tokyo")!;expect(assessMatch(app,{...googlePlace(app),websiteUri:shibuya.url}).eligible).toBe(false);});
 it("Planets rejects Borderless, prefix siblings and generic brand evidence",()=>{const app=catalogPlace("curated-teamlab-planets")!;for(const url of ["https://www.teamlab.art/e/borderless/","https://www.teamlab.art/e/planets-other/","https://www.teamlab.art/"])expect(assessMatch(app,{...googlePlace(app),websiteUri:url}).eligible).toBe(false);});
});

describe("Planets exact official identities, reviewed 2026-09-25",()=>{
 const app=catalogPlace("curated-teamlab-planets")!;
 for(const url of VENUE_IDENTITIES[app.id].urls)it("corroborates reviewed Planets URL "+url,()=>{const p={...googlePlace(app),displayName:{text:"teamLab Planets TOKYO DMM"},websiteUri:url};expect(assessMatch(app,p)).toMatchObject({eligible:true,code:"MATCH_CORROBORATED"});});
 for(const url of ["https://www.teamlab.art/e/borderless/","https://www.teamlab.art/e/forest/","https://teamlabplanets.dmm.com/en-other","https://teamlabplanets.dmm.com/en?next=other","https://other.dmm.com/en","https://teamlabplanets.dmm.com.evil.example/en","https://planets.teamlab.art/tokyo-other","https://www.teamlab.art/","http://teamlabplanets.dmm.com/en","https://user:pass@teamlabplanets.dmm.com/en"])
 it("does not borrow unknown or conflicting identity "+url,()=>expect(assessMatch(app,{...googlePlace(app),websiteUri:url}).eligible).toBe(false));
 it("alternate URL cannot override name/country/city/address/closure evidence",()=>{for(const patch of [{displayName:{text:"teamLab Borderless"}},{addressComponents:[{shortText:"US",types:["country"]}]},{addressComponents:[{shortText:"JP",types:["country"]},{longText:"Osaka",types:["locality"]}]},{formattedAddress:"Azabudai Tokyo Japan"},{businessStatus:"CLOSED_PERMANENTLY"},{movedPlaceId:"elsewhere"}])expect(assessMatch(app,{...googlePlace(app),websiteUri:"https://teamlabplanets.dmm.com/en",...patch}).eligible).toBe(false);});
 it("reports all checks and distinguishes missing evidence from contradiction",()=>{expect(assessMatch(app,{...googlePlace(app),websiteUri:undefined,addressComponents:[]})).toMatchObject({code:"MATCH_COUNTRY_MISSING",checks:{country:"missing",website:"missing",name:"passed",area:"passed"}});expect(assessMatch(app,{...googlePlace(app),websiteUri:"https://www.teamlab.art/e/borderless/"})).toMatchObject({code:"MATCH_WEBSITE_CONFLICT",checks:{website:"failed",country:"passed"}});});
});
