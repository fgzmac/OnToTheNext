import type {RecommendationCardData} from "@/src/modules/discover/types";
/** Labels only from existing recommendation data; no inferred popularity or amenities. */
export function ExperienceChips({item}:{item:RecommendationCardData}) {
 return <ul className="experience-chips" aria-label="Activity facts">
  {item.place.category?<li>{item.place.category}</li>:null}
  {item.durationMinutes!==null?<li title="Editorial planning estimate">About {item.durationMinutes} min <span className="sr-only">(estimate)</span></li>:null}
 </ul>;
}
