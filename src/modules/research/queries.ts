import type { ResearchContext } from "./types";
const localized:Record<string,string[]> = {pt:["experiências culturais bairros","agenda eventos"],ko:["동네 문화 체험","행사 일정"],es:["experiencias barrios cultura","agenda eventos"]};
export function researchQueries(c:ResearchContext) {
  const at=c.destination+", "+c.country;
  return [...new Set([
    at+" distinctive experiences site:wikidata.org/wiki/",
    at+" neighborhoods local editorial experiences",
    ...c.interests.slice(0,4).map(i=>at+" "+i.toLowerCase().replaceAll("_"," ")+" site:wikidata.org/wiki/"),
    at+" firsthand practical cautions -site:reddit.com",
    at+" official organizer events "+c.start+" "+c.end,
    ...(localized[c.language]??[]).map(q=>at+" "+q+" "+c.start),
  ])].slice(0,11);
}
