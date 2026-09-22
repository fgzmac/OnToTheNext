# D-082 — V1 ships as responsive web with PWA-style delivery

**Status:** CONFIRMED Section 7 architecture decision. Exact PWA feature set, offline caching scope, and later native roadmap remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved responsive web + PWA-style V1 delivery, with native mobile apps deferred until usage justifies them.  
**Related:** D-037 web/mobile first-class; D-054 Today experience; D-081 modular monolith; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed V1 client strategy

V1 will use one responsive Next.js web application that treats desktop and mobile layouts as first-class experiences.

The application may support installable/PWA behavior where useful.

## V1 goals

- Desktop/laptop planning experience.
- Mobile Today experience.
- Mobile Discover and Itinerary.
- Share links that open directly into the same product.
- Responsive layouts rather than separate web/mobile products.
- Architecture that can support limited offline caching and later stronger offline behavior.

## Native apps

Separate native iOS/Android applications are **not required for V1**.

They may be added later if validated needs justify:
- App Store distribution,
- deeper device integration,
- background capabilities,
- stronger offline behavior,
- native notifications,
- performance or UX needs not met by the web/PWA client.

## Important product rule

This implementation choice does not make mobile secondary.

The approved mobile UX remains first-class; the codebase is simply shared during V1.

## Why this is approved

- Faster iteration.
- One client codebase.
- Easier feature parity.
- Simpler Share Trip/deep-link behavior.
- Less platform overhead during product validation.
- Lower maintenance cost before native-only requirements are proven.

## Next Section 7 decision

Define the authentication/account approach that supports:
- full user accounts,
- lightweight guest identities,
- unique companion invites,
- later guest-to-account upgrade,
- secure session handling,
- and minimal sign-in friction.
