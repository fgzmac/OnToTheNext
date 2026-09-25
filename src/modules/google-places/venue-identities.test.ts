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
