import https from "node:https";
import { lookup } from "node:dns";
import { publicAddress, publicHttp, type HttpTransport } from "../research/http";
import type { GooglePlace } from "./types";
const identity = ["id","displayName","formattedAddress","addressComponents","websiteUri","businessStatus","googleMapsUri","attributions"];
// websiteUri makes identity/context/photo metadata Enterprise. Reviews raise Details to Enterprise + Atmosphere.
export const MASKS = {
  identity: [...identity,"movedPlaceId"].map(f => "places." + f).join(","),
  context: [...identity,"movedPlaceId","rating","userRatingCount","currentOpeningHours","regularOpeningHours"].join(","),
  reviews: [...identity,"movedPlaceId","reviews"].join(","),
  photo: [...identity,"movedPlaceId","photos"].join(","),
};
export type BinaryTransport = (url: string) => Promise<{type:string;bytes:Buffer}>;
export function photoDestination(value: string) {
  const u = new URL(value);
  if (u.protocol !== "https:" || u.username || u.password || u.port || !(u.hostname === "lh3.googleusercontent.com" || /^lh[3-6]\.googleusercontent\.com$/.test(u.hostname))) throw new Error("PHOTO_DESTINATION_REJECTED");
  return u;
}
export const photoHttp: BinaryTransport = url => new Promise((resolve,reject) => {
  let u: URL; try { u = photoDestination(url); } catch (e) { reject(e); return; }
  const req = https.request(u, { agent:false, family:4, headers:{"Accept-Encoding":"identity"},
    lookup:(host,options,callback) => lookup(host,{family:4,all:true},(err,addresses) => {
      if (err || !addresses.length || addresses.some(a=>!publicAddress(a.address))) return callback(err ?? new Error("PHOTO_ADDRESS_REJECTED"),"",4);
      if (options.all) callback(null,addresses); else callback(null,addresses[0].address,4);
    }) }, res => {
    const type = res.headers["content-type"]?.split(";")[0] ?? "";
    if (res.statusCode !== 200 || !["image/jpeg","image/png","image/webp"].includes(type) || (res.headers["content-encoding"] && res.headers["content-encoding"] !== "identity")) { res.destroy(); reject(new Error("PHOTO_RESPONSE_REJECTED")); return; }
    let size=0; const chunks:Buffer[]=[];
    res.on("data",(chunk:Buffer)=>{ size+=chunk.length; if(size>1_000_000) req.destroy(new Error("PHOTO_TOO_LARGE")); else chunks.push(chunk); });
    res.on("error",reject); res.on("end",()=>resolve({type,bytes:Buffer.concat(chunks)}));
  });
  const timer=setTimeout(()=>req.destroy(new Error("PHOTO_TIMEOUT")),15_000);
  req.on("close",()=>clearTimeout(timer)); req.on("error",reject); req.end();
});
export class GoogleClient {
  constructor(private key:string, private transport:HttpTransport=publicHttp, private binary:BinaryTransport=photoHttp) {}
  private async json(path:string,mask?:string,body?:unknown):Promise<unknown> {
    // Only internally constructed paths reach this method. No redirects or retries; never log URLs/keys/content.
    const r=await this.transport({url:"https://places.googleapis.com/v1/"+path,method:body?"POST":"GET",
      headers:{"X-Goog-Api-Key":this.key,...(mask?{"X-Goog-FieldMask":mask}:{}),"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined});
    if(r.status!==200 || r.body.length>512_000) throw new Error("GOOGLE_UNAVAILABLE");
    return JSON.parse(r.body);
  }
  async search(query:string):Promise<GooglePlace[]> {
    const data=await this.json("places:searchText",MASKS.identity,{textQuery:query,pageSize:5,languageCode:"en",regionCode:"JP"}) as {places?:GooglePlace[]};
    if(!Array.isArray(data.places)) return [];
    return data.places.slice(0,5);
  }
  async details(id:string,purpose:"context"|"reviews"|"photo"):Promise<GooglePlace> {
    if(!/^[A-Za-z0-9_-]{1,200}$/.test(id)) throw new Error("INVALID_PLACE_ID");
    return await this.json("places/"+id+"?languageCode=en",MASKS[purpose]) as GooglePlace;
  }
  async photo(id:string,name:string):Promise<string> {
    if(!/^[A-Za-z0-9_-]{1,200}$/.test(id) || !new RegExp("^places/"+id+"/photos/[A-Za-z0-9_-]{1,4096}$").test(name)) throw new Error("PHOTO_REFERENCE_REJECTED");
    const data=await this.json(name+"/media?maxWidthPx=640&maxHeightPx=480&skipHttpRedirect=true") as {photoUri?:string};
    if(!data.photoUri) throw new Error("PHOTO_MISSING");
    photoDestination(data.photoUri);
    const image=await this.binary(data.photoUri);
    if(image.bytes.length>1_000_000 || !["image/jpeg","image/png","image/webp"].includes(image.type)) throw new Error("PHOTO_RESPONSE_REJECTED");
    return "data:"+image.type+";base64,"+image.bytes.toString("base64");
  }
}
