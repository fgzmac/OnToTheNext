# D-083 — Defer production authentication/privacy/security; keep a minimal prototype safety baseline

**Status:** CONFIRMED Section 7 architecture decision. Production authentication, privacy controls, and security hardening are intentionally deferred until the product is tested and moving toward commercial release.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the managed-authentication direction for a later commercial product, but does not want production-grade security/auth/privacy work to slow the current personal-use prototype.  
**Related:** D-074 Identity vs Trip Membership; D-081 modular monolith; D-082 responsive web/PWA V1; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed prototype direction

For the current personal-use/testing phase:

- Do **not** spend significant implementation time on a full production authentication system.
- Do **not** prioritize account recovery, password-reset flows, social login, enterprise-grade role management, consent systems, privacy-policy UI, or commercial-grade security hardening yet.
- Companion-account flows may be mocked, simplified, or implemented later when multi-user testing actually requires them.
- The prototype may run primarily in a single-owner/personal mode.

## Future commercial direction

Before public/commercial launch, return to the previously approved architecture direction:

- managed authentication,
- full accounts,
- lightweight guest identities,
- guest-to-account upgrade,
- revocable/expiring invites,
- secure sessions,
- privacy controls,
- access rules,
- production-grade security review.

## Minimum safety baseline that is **not** deferred

Even for a personal prototype, keep these basic safeguards:

- API/provider secrets stay server-side and in environment variables.
- Do not commit secrets, tokens, passwords, or private keys to GitHub.
- Do not store passwords in plaintext.
- Avoid exposing private Trip/expense data through publicly guessable URLs.
- Keep development/test deployments private or access-restricted where practical.
- Do not log sensitive credentials or full payment data.
- Use HTTPS when deployed through a managed host.
- Do not store payment-card or bank credentials in the prototype.

These are basic implementation hygiene, not a full commercial security program.

## Architecture implication

Authentication becomes a **replaceable boundary** rather than a blocker for the first personal-use build.

Prototype:
```text
Personal / private-use app
→ minimal access layer
→ focus on product behavior
```

Later:
```text
Validated product
→ managed auth
→ guest/member lifecycle
→ privacy/security hardening
→ commercial release readiness
```

## Next Section 7 decision

Continue with infrastructure choices that materially affect the personal prototype now, starting with database/data-access strategy.
