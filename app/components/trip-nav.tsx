"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TripNav({ tripId }: { tripId: string }) {
  const pathname = usePathname();
  const items = [
    { label: "Home", href: `/trips/${tripId}` },
    { label: "Itinerary", href: `/trips/${tripId}/itinerary` },
    { label: "Discover", href: `/trips/${tripId}/discover` },
  ];

  return (
    <nav className="trip-nav" aria-label="Trip navigation">
      {items.map((item) => {
        const active = item.href === `/trips/${tripId}` ? pathname === item.href : pathname.startsWith(item.href);
        return <Link key={item.href} className={active ? "active" : undefined} href={item.href}>{item.label}</Link>;
      })}
    </nav>
  );
}
