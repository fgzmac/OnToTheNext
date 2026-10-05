import { CATALOG, type CatalogPlace } from "@/src/modules/discover/catalog";
import type { GoogleConfig } from "@/src/modules/google-places/config";
import type { GooglePlace } from "@/src/modules/google-places/types";
import type { HttpTransport } from "@/src/modules/research/http";
export const googleTestConfig:GoogleConfig={key:"synthetic-not-a-key",approval:"synthetic-google-only",ceilingMicros:10_000_000,googleMicros:10_000_000,maxSearch:40,maxDetails:100,maxPhotos:20};
export function googlePlace(app:CatalogPlace):GooglePlace {
  return {id:"synthetic_"+app.id,displayName:{text:app.name},formattedAddress:[app.location,app.city,"Japan"].filter(Boolean).join(", "),
    addressComponents:[{shortText:"JP",longText:"Japan",types:["country"]},{longText:app.city,types:["locality"]}],websiteUri:app.id==="curated-teamlab-planets"?"https://teamlabplanets.dmm.com/en":app.url,businessStatus:"OPERATIONAL",
    googleMapsUri:"https://maps.google.com/?cid=synthetic",attributions:[{provider:"Synthetic provider credit",providerUri:"https://example.com/credit"}]};
}
export const syntheticPhoto=Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jz1sAAAAASUVORK5CYII=","base64");
export function googleHttp(onCall?:(path:string,mask?:string)=>void):HttpTransport {return async input=>{
  const u=new URL(input.url); if(u.hostname!=="places.googleapis.com") throw Error("UNEXPECTED_GOOGLE_ENDPOINT");
  onCall?.(u.pathname,input.headers?.["X-Goog-FieldMask"]);
  let data:unknown;
  if(u.pathname.endsWith(":searchText")) {
    const q=JSON.parse(input.body!).textQuery as string;
    const app=CATALOG.find(a=>q.startsWith(a.name+","));
    data={places:app?[googlePlace(app)]:[]};
  } else if(u.pathname.endsWith("/media")) data={photoUri:"https://lh3.googleusercontent.com/synthetic-only"};
  else {
    const app=CATALOG.find(a=>u.pathname.endsWith("synthetic_"+a.id)); if(!app)throw Error("SYNTHETIC_PLACE_NOT_FOUND");
    const p=googlePlace(app), mask=input.headers?.["X-Goog-FieldMask"]??"";
    if(mask.includes("rating")) Object.assign(p,{rating:4.3,userRatingCount:123,currentOpeningHours:{weekdayDescriptions:["Synthetic Tuesday: 10:00–17:00"],openNow:true},regularOpeningHours:{weekdayDescriptions:["Synthetic weekly hours; not future availability"]}});
    if(mask.includes("reviews")) p.reviews=[{rating:4,text:{text:"Synthetic translated review, not traveler evidence.",languageCode:"en"},originalText:{text:"合成レビュー",languageCode:"ja"},publishTime:"2032-04-01T00:00:00Z",authorAttribution:{displayName:"Synthetic author",photoUri:"https://lh3.googleusercontent.com/synthetic-avatar",uri:"https://maps.google.com/?author=synthetic"},googleMapsUri:"https://maps.google.com/?review=synthetic"}];
    if(mask.includes("photos"))p.photos=[{name:"places/"+p.id+"/photos/synthetic",authorAttributions:[{displayName:"Synthetic photo author",photoUri:"https://lh3.googleusercontent.com/synthetic-avatar",uri:"https://maps.google.com/?author=photo"}],googleMapsUri:"https://maps.google.com/?photo=synthetic"}];
    if(app.id==="curated-teamlab-planets"&&p.photos){const first=p.photos[0];p.photos=[0,1,2].map(n=>({...first,name:first.name!+n}));}
    data=p;
  }
  return {status:200,headers:{},body:JSON.stringify(data)};
};}
