// Independently reviewed operator URLs, not URLs learned from Google.
// Reviewed 2026-09-24: each SHIBUYA legacy page redirects to the corresponding
// current language page. Exact branch paths only; never fetch provider URLs.
export const VENUE_IDENTITIES: Record<string, { reviewedAt: string; urls: string[] }> = {
 "curated-pokemon-shibuya": {reviewedAt:"2026-09-24",urls:[
  "https://www.pokemon.co.jp/shop/pokecen/shibuya/",
  "https://www.pokemon.co.jp/shop/en/pokecen/shibuya/",
  "https://shop.pokemon.co.jp/ja/shop/pokemoncenter-shibuya/",
  "https://shop.pokemon.co.jp/en/shop/pokemoncenter-shibuya/"
 ]},
 "curated-pokemon-mega-tokyo": {reviewedAt:"2026-09-24",urls:[
  "https://shop.pokemon.co.jp/en/shop/pokemoncenter-megatokyo/",
  "https://www.pokemon.co.jp/shop/pokecen/megatokyo/",
  "https://shop.pokemon.co.jp/ja/shop/pokemoncenter-megatokyo/"
 ]}
};
export type WebsiteEvidence = "equivalent" | "insufficient" | "conflicting";
function parsed(value:string) {
 const u=new URL(value);
 if(u.protocol!=="https:" || u.username || u.password || u.port) throw Error("UNSAFE_WEBSITE");
 return {host:u.hostname,path:u.pathname.replace(/\/$/,"")||"/",query:u.search};
}
const tourism=new Set(["gotokyo.org","www.gotokyo.org","osaka-info.jp","japan.travel","www.japan.travel"]);
export function websiteEvidence(app:{id:string;url:string},actual?:string):WebsiteEvidence {
 if(!actual) return "insufficient";
 try {
  const a=parsed(app.url),b=parsed(actual);
  const identities=VENUE_IDENTITIES[app.id]?.urls ?? [app.url];
  const known=identities.map(parsed);
  if(!tourism.has(a.host) && known.some(u=>u.host===b.host && u.path===b.path && u.query===b.query)) return "equivalent";
  if(tourism.has(a.host)) return "insufficient";
  if(app.id.startsWith("curated-pokemon-")) {
   if(!["www.pokemon.co.jp","pokemon.co.jp","shop.pokemon.co.jp"].includes(b.host)) return "insufficient";
   // Only independently recorded other branches establish a branch conflict.
   for(const [id,record] of Object.entries(VENUE_IDENTITIES))
    if(id!==app.id && record.urls.map(parsed).some(u=>u.host===b.host && u.path===b.path)) return "conflicting";
   return "insufficient";
  }
  if(a.host!==b.host) return "conflicting";
  if(app.id==="curated-teamlab-planets" && b.path.startsWith("/e/") && b.path!==a.path) return "conflicting";
  return "insufficient";
 }catch{return "conflicting";}
}
