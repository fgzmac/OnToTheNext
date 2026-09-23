"use client";
import Image from "next/image";
import { useState } from "react";
import type { ExperiencePhoto } from "@/src/modules/discover/media";
export function RecommendationPhoto({ photo, name }: { photo?: ExperiencePhoto | null; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!photo || failed) return <div className="idea-photo-fallback" role="img" aria-label={"Photo unavailable for " + name}>{failed ? "Photo could not load" : "No verified reusable photo yet"}</div>;
  return <figure className="idea-photo">
    <Image src={photo.asset} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 100vw, 560px" onError={() => setFailed(true)} />
    <figcaption>{photo.caption ? <span>{photo.caption} </span> : null}<a href={photo.sourcePage} target="_blank" rel="noopener noreferrer">Photo: {photo.creator}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></figcaption>
  </figure>;
}
