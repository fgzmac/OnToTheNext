"use client";

import Link from "next/link";
import { homeContextQuery } from "@/src/modules/trips/home-context";
import { usePathname, useSearchParams } from "next/navigation";

export function TripNav({ tripId }: { tripId: string }) {
  const pathname = usePathname();
  const query = useSearchParams();
  const atHome = pathname === "/trips/" + tripId;
  const view = query.get(atHome ? "view" : "homeView");
  const day = query.get(atHome ? "day" : "homeDay");
  const context = (home: boolean) => { const value = homeContextQuery(view, day, home); return value ? "?" + value : ""; };
  const items = [
    { label: "Home", href: `/trips/${tripId}` },
    { label: "Itinerary", href: `/trips/${tripId}/itinerary` },
    { label: "Discover", href: `/trips/${tripId}/discover` },
  ];

  return (
    <nav className="trip-nav" aria-label="Trip navigation">
      {items.map((item) => {
        const active = item.href === `/trips/${tripId}` ? (pathname === item.href || pathname === `/trips/${tripId}/reservations`) : pathname.startsWith(item.href);
        return <Link key={item.href} className={active ? "active" : undefined} href={item.href + context(item.label === "Home")}>{item.label}</Link>;
      })}
    </nav>
  );
}
