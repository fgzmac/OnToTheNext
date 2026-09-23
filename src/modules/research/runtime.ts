import type { ResearchPlace } from "@/src/generated/prisma/client";
import type { EventOccurrence } from "../discover/tokyo-pilot";
import type { ExperiencePhoto } from "../discover/media";
import { validMedia } from "./validation";
import type { RuntimeMedia } from "./types";
export function runtimeEvent(r:ResearchPlace|null|undefined):EventOccurrence|undefined{
  if(!r||r.kind!=="EVENT")return undefined;
  return {startDate:r.eventStart,endDate:r.eventEnd,timeZone:r.eventTimeZone??"invalid",
    status:(!r.withdrawn&&["PUBLISHED","CANCELLED","POSTPONED","UNKNOWN"].includes(r.eventStatus??"")?r.eventStatus:"UNKNOWN") as EventOccurrence["status"],
    observedAt:r.observedAt.toISOString().slice(0,10),recheckAfter:r.recheckAfter.toISOString().slice(0,10)};
}
export function runtimePhoto(r:ResearchPlace|null|undefined):ExperiencePhoto|null{
  if(!r?.media||r.withdrawn)return null;const m=r.media as unknown as RuntimeMedia;
  if(!validMedia(m,r.identity.split(":")[1]))return null;
  return {placeId:r.placeId,asset:m.asset,sourcePage:m.sourcePage,title:m.title,creator:m.creator,license:m.license,licenseUrl:m.licenseUrl,
    alt:(m.exterior?"Exterior: ":"")+m.title,width:960,height:640,observedAt:m.retrievedAt.slice(0,10),capturedAt:m.capturedAt,
    changes:"Original image, full framing retained.",restrictions:m.rightsBasis,visualCheck:"Explicit subject review recorded",caption:m.exterior?"Exterior view":""};
}
