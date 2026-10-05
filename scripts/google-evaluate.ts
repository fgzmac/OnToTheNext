import { CATALOG } from "../src/modules/discover/catalog";
import { assessMatch } from "../src/modules/google-places/matching";
import { GoogleClient } from "../src/modules/google-places/client";
import { COST } from "../src/modules/google-places/config";
import { googleHttp, googlePlace, syntheticPhoto } from "../tests/fixtures/google";
// No database and no live transport. These are contract probes, not model evaluation.
const ids=["pokemon-shibuya","pokemon-mega-tokyo","shibuya-sky","shibuya-crossing","teamlab-planets","imperial-east-gardens","kiyomizudera","kaiyukan"];
for(const id of ids){
 const app=CATALOG.find(a=>a.id==="curated-"+id)!;let requests=0;
 const client=new GoogleClient("synthetic-not-a-key",googleHttp(()=>{requests++;}),async()=>({type:"image/png",bytes:syntheticPhoto}));
 const candidates=await client.search(app.name+", "+app.city),match=assessMatch(app,candidates[0]);
 const context=await client.details(candidates[0].id,"context"),reviews=await client.details(candidates[0].id,"reviews"),photo=await client.details(candidates[0].id,"photo");
 await client.photo(photo.id,photo.photos![0].name!);
 const wrong=googlePlace(app);wrong.addressComponents=[{shortText:"JP",types:["country"]},{longText:"Wrong city",types:["locality"]}];
 console.log(JSON.stringify({city:app.city,independentExperience:app.name,correct:match.eligible,wrongCity:assessMatch(app,wrong).eligible,
  ambiguous:"two eligible IDs require explicit review",unmatched:"retain independent recommendation",ratingAvailable:context.rating!==undefined,reviewSample:reviews.reviews?.length??0,
  photo:"synthetic 1px transport fixture; relevance/quality NOT evaluated",decisionContext:"hours/access limitations visible; usefulness needs owner assessment",
  apiRequests:requests,mediaDownloads:1,reservedMicroUsd:COST.search+COST.context+COST.reviews+COST.context+COST.photo,
  disabled:"0 calls; Add remains available",providerFailure:"conservative charge; Add remains available"}));
}
