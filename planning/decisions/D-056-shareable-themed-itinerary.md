# D-056 — Shareable themed itinerary presentation

**Status:** CONFIRMED product capability. Exact export format, visual theming system, messaging/email integration, and public/private link behavior remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants completed itineraries to be formatted and designed so they are exciting to receive and can be shared by email or text together with a link back to the app.  
**Related:** D-037 web/mobile first-class; D-046 trip workspace; D-053 simplified companion role; Section 4 first-release scope.  
**Blueprint:** Section 4 remains DRAFT.

## Confirmed capability

Once an itinerary reaches a shareable state, the app should be able to generate a polished trip presentation suitable for sending outside the app.

The shared presentation should:
- feel themed to the destination/trip,
- be visually exciting to receive/open,
- summarize the itinerary clearly,
- work well when opened from email or text,
- include a link back into the app,
- preserve the simpler in-app experience rather than becoming another permanent dashboard.

## Example content

A shareable trip presentation may include:
- destination/trip title,
- travel dates,
- hero image or destination artwork,
- city sequence,
- day-by-day highlights,
- selected hotels,
- major booked experiences,
- optional short notes,
- map snapshot or route overview where useful,
- app/deep link.

It should not expose sensitive payment credentials or private planning data.

## Theming

The presentation should adapt visually to the trip.

Examples:
- Japan trip → visual treatment inspired by Japan/destination imagery,
- beach trip → lighter coastal imagery,
- national park trip → outdoors/nature emphasis,
- city weekend → urban photography and compact layout.

Theming should improve excitement without reducing readability or making the export feel gimmicky.

Exact art direction remains later UI/design work.

## Sharing model

Initial direction:
- **Share by text**
- **Share by email**
- **Copy link**
- potentially **export/save a shareable visual or document** later

A recipient should be able to open the shared summary and, when appropriate, continue into the app through the included link.

Exact access behavior for recipients who are not already companions remains open.

## Product distinction

This is different from companion collaboration.

The shared presentation is a polished communication artifact.

Companion membership/access remains governed by the invite model in D-040/D-041/D-053.

A share link should not silently grant edit/admin access.

## V1 scope recommendation

Include a useful first version in V1:
- generate a themed itinerary summary,
- share/copy a link,
- support device-native sharing so the user can choose text/email,
- deep-link back into the app.

Advanced versions may later include:
- PDF export,
- image/story-style export,
- custom themes,
- branded templates,
- interactive web presentation,
- social sharing,
- custom cover editing.

## Success criterion

A traveler should be able to finish planning, tap **Share Trip**, and send something that feels like an intentional trip reveal rather than a plain list of calendar events.

No implementation begins from this decision alone.
