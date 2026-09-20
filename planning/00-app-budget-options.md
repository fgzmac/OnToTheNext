# Section 1 Supporting Note — App Budget Policy and Options

**Status:** FREE-FIRST POLICY CONFIRMED — D-017. Cost scenarios remain reference options; no provider or purchase approved.  
**Related section:** [Product Vision and Problem Brief](00-product-brief.md), especially 1.16.  
**Related question:** Q-004 — app operating policy, separate from traveler spending; Q-005 — the owner's product-acceptance standards.  
**Prepared / policy updated:** 2026-09-19.  
**Currency for app-cost references:** USD; this does not settle the currency of the owner's separate travel budget.  
**Next decision:** Define the high-level standards the working product must meet before increasing spending.  
**Scope:** Remain in Section 1; cost examples are not approval of architecture or implementation.

## Adopted rule — free first, spending only when justified

The owner accepted the recommended budget rule **with an explicit modification**: it is not fixed, development should use free options until spending becomes necessary, and greater spending can follow a working product that meets the owner's standards. See D-017.

**Current priority:** Aim for no additional app-service spending while the necessary design, development, and testing can be done adequately with suitable free options. Do not activate paid plans merely because a budget reference exists.

**Flexible reference:** Retain approximately **$100 per month as the initial paid-operation planning target**, with **$150 as the previously discussed upper reference**, not a hard ceiling or an amount to spend. Neither is a purchase authorization, mandatory minimum, automatic service cutoff, or guarantee of a future bill. The owner may revise the allowance downward or upward as evidence warrants.

**Before a necessary expense:** Identify the specific requirement or test that is blocked, the free alternatives considered, the smallest useful paid option, expected recurring/usage costs and overages, and the consequence of postponing it. Obtain a specific spending decision rather than assuming permission from this policy. A limited necessary expense may be considered before overall product acceptance; discretionary expansion should wait for the owner's acceptance of a working product.

**Before larger spending:** Demonstrate the product, compare it with the owner's agreed standards, surface missing or simulated functionality, and obtain the owner's decision on whether it meets those standards and warrants more investment. The standards and measurable acceptance criteria are not yet approved; Q-005 addresses the high-level expectations and Q-304 will detail the test later.

**Preserve scope and honesty:** Free-first does not remove existing hotel/transport organization and recommendation requirements, reservation-aware planning, or other confirmed needs. Prepared data and simulated services may support prototypes, but they do not prove real provider coverage, durable storage, routing accuracy, or travel readiness. Surface a paid dependency early; do not hide it behind a polished prototype or promise every production dependency will be free.

**Keep expenses separate:** Development tools and their overages, domains, store enrollment, one-time purchases, and unpriced commercial data contracts remain outside the monthly runtime reference and require their own decisions. The separate travel budget is not available for app spending.

The first complete test target remains **November 10, 2026**. D-003 still applies: finish the design phase before Codex implementation. No paid services need to be activated merely to complete planning, and this policy does not authorize scaffolding, deployment, billing enrollment, purchases, or new recurring commitments.

## What the retained cost scenarios mean

The following tiers and allocations are planning envelopes from the earlier comparison for a self-built app, not vendor packages, fixed development quotes, user-capacity promises, a selected architecture, or proof that all desired data is available. They are retained for future evaluation; **the free-first policy above takes precedence over the earlier recommendation to start on paid Tier 2 infrastructure**.

**Included categories:** Application hosting, database/storage/auth where selected, ordinary place/routing data usage, runtime AI if selected, basic operational email/monitoring where needed, and a contingency allowance.

**Separate or unpriced:** Developer labor, Codex/other development-tool subscriptions and overages, hardware, domain registration, app-store enrollment, store/payment transaction charges, premium assets, marketing, legal/accounting work, customer-support labor, taxes, and any negotiated hotel/reservation-data license or minimum commitment. None has been priced as a guaranteed $0. Live hotel-rate and reservation access are unresolved dependencies, not secretly included in a small API allowance.

The owner's trip budget is per person with plane tickets excluded (D-014, clarified in D-016). Private numerical travel amounts stay in the conversation. They are not available for app spending.

## Tier comparison — options, not an upgrade schedule

| Tier | Monthly operating envelope | Intended scenario | Possibilities to evaluate | Pros | Cons and limits |
| --- | --- | --- | --- | --- | --- |
| 1 — Lean prototype | $0–$50 | Local design tests and a tiny, tightly controlled online demonstration. | Activity selection, hotel/transport input, recommendation experiments, and sharing/reveal tests using prepared data and small live-data samples. | Lowest recurring commitment; useful for discovering incorrect assumptions before paying for production services. | Free-tier restrictions and missing operational safeguards must be checked. Prepared data does not prove live coverage. This is an interim prototype, not a downgrade of the approved pilot requirements or automatically a travel-ready system. |
| 2 — Practical pilot | $75–$150 | Two travelers and limited development/test traffic. One developer; bounded searches and regeneration. | Evaluate the full core planning/sharing workflow with paid entry-level persistence when needed, controlled real-data calls, optional economical runtime AI, and backup/recovery checks. | Gives room for real-use testing without paying for speculative scale; protects the hotel/transport organization and recommendation requirements. | Not unlimited. Hotel/restaurant/event access must be proven; manual entry and external booking handoff are proposed methods, not approved defaults. It cannot promise worldwide live inventory or automatic reservations. |
| 3 — Expanded private beta | $150–$400 | Wider invited testing and heavier measured usage after the pilot works. | Extra test environments, more API experiments, comparison of recommendation approaches, better monitoring, and more frequent test cycles. | More room to learn from people beyond the owner; can separate experiments from the main pilot data. | Higher monthly burn without automatic improvement in data quality, correctness, or product demand. No fixed user count is guaranteed. |
| 4 — Early commercial operations | $400–$1,500+ | A public product with measured traffic and an explicit operating model. | Usage-driven compute/storage increases, transactional messaging, support tooling, broader data calls, and operational monitoring as required. | Budget for a growing real workload and commercial operations rather than only a demonstration. | Premature for an unvalidated two-person pilot. Does not include a full team, marketing, legal work, all commercial data contracts, or guaranteed profitability. Costs can exceed the range. |

The tier labels are our planning categories, not supplier plan names. Actual consumption can fit below a tier or exceed it. Spending more does not by itself make recommendations accurate or make a booking integration available. Even a small cost within Tier 1 is not automatically authorized; aim for free until an expense has a demonstrated need.

## Price references from the prior comparison — not selected providers

The previous comparison recorded these official sources on 2026-09-19. This policy-only revision does not refresh or revalidate the prices. Recheck before using them for a purchase, and include taxes, regional conditions, add-ons, and overages when relevant.

| Component | Published reference price in prior comparison | Important qualification | Source |
| --- | --- | --- | --- |
| Vercel Pro hosting | $20/month platform fee with one deploying seat and $20 usage credit. | Additional seats, add-ons, and usage can increase the bill. Vercel Hobby is restricted to non-commercial personal use; do not assume that an unmonetized commercial project qualifies. | [S1], [S2] |
| Supabase database/auth/storage | Free plan; Pro starts at $25/month. | Paid plan includes $10 compute credit sufficient for one Micro instance. Additional projects/compute can add cost. Free projects can pause after a week of inactivity and do not include automatic backups; Pro includes daily database backups with seven-day retention. Verify file-storage recovery separately. | [S3] |
| Cloudflare Workers | Paid plan minimum $5/month. | This is an alternative hosting/runtime option, not a complete app price. It has separate usage limits and platform-specific requirements. | [S4] |
| Google Places Text Search Pro | 5,000 monthly free billable events; then $32 per 1,000 in the first paid band. | Other fields/SKUs, place details, photos, map loads, and routes have their own billing. An app action can trigger several charges. Do not treat this as the price of all recommendation data. | [S5], [S6] |
| OpenAI GPT-5.4 mini runtime example | $0.75 per million input tokens; $4.50 per million output tokens. | Illustrative economical-model price, not a selected model or quality recommendation. Use total billable tokens; tools, retries, reasoning output, and other services affect cost. | [S7] |
| Apple Developer Program | $99 per membership year. | Separate enrollment/distribution cost; does not cover backend hosting or applicable sales-related charges. | [S8] |
| Google Play developer registration | $25 one-time. | Separate enrollment cost; publication also has account, testing, and other requirements. | [S9] |

A cheaper runtime does not automatically mean less development effort. Compare compatibility, supported libraries, deployment, and maintenance when architecture is actually selected. Check any free option's permitted use, data terms, expiry, auto-upgrade behavior, usage limits, and recovery approach before relying on it. Avoid a free workaround that compromises the required correctness, privacy, or recoverability; raise the tradeoff instead.

## An illustrative $100 monthly paid-pilot allocation — not current spending

This retained example uses a managed web-hosting/database pair for budgeting. It is not an architecture decision, required spending pattern, or a cart to purchase. Under D-017, stay below it—including $0 in additional service costs—while suitable free options meet the current needs.

| Line | Monthly amount | Basis |
| --- | --- | --- |
| Hosting | $20 | Vercel Pro base example [S1]. |
| Database/auth/storage | $25 | Supabase Pro, one Micro project covered by included compute credit [S3]. |
| Ordinary maps/place/routing calls | $20 | Our usage allowance, not a supplier quote or an allowance for negotiated hotel-data contracts. |
| Runtime AI | $15 | Our bounded usage allowance; only if AI is selected. |
| Operational email/monitoring | $5 | Our allowance; actual services and limits remain unselected. |
| Contingency | $15 | Unspent reserve for variation, not a required purchase. |
| **Planning reference** | **$100** | Arithmetic sum, not measured monthly consumption or current spend. |

The previously proposed $150 fixed ceiling has been replaced by a **flexible upper planning reference**. It is $50 above this example, but spending that difference—or exceeding the reference—is not automatically approved. A booking-data license, heavy test run, or premium feature must be evaluated before assuming it is appropriate.

If an appropriate implementation fits Cloudflare Workers plus the same $25 database plan, their reference base is $30 instead of $45, before usage and other costs [S3], [S4]. That saves $15 at the base level, not necessarily overall once engineering work is considered.

## Usage sensitivity: why user counts alone do not price the app

**AI arithmetic example:** At the retained GPT-5.4 mini standard rates, 10,000 input tokens plus 2,000 total billable output tokens costs $0.0165. One thousand identical calls would cost $16.50 in those text tokens alone. This is not the cost of one complete itinerary: a workflow may require multiple calls, longer outputs, retries, search tools, and external travel data [S7].

**Place-search arithmetic example:** Under the listed pay-as-you-go Text Search Pro rate, 8,000 qualifying calls in one month means 3,000 above the 5,000 free threshold. At $32/1,000, that is $96 for that one SKU, before other services [S5].

**Routing units:** Compute Route Matrix charges by origin–destination element, not just one HTTP request. Ten origins by ten destinations is 100 elements; repeated matrices multiply use. Exact applicable rate and mode must be checked [S10].

Model operating cost as:

```text
Fixed monthly services
  + billable place/search/photo/map usage after applicable allowances
  + routing queries or matrix elements
  + total billable AI tokens and tools
  + messaging/storage/compute overages
  + separately approved data licenses
```

Measure a representative planning session, including replacements, refreshes, and failed/retried requests. Then estimate wider traffic from observed usage rather than promising that a particular tier supports an arbitrary number of users.

## Hotels, restaurants, events, and reservations

There are different problems to price:

1. Recording an arrangement already made.
2. Recommending a suitable hotel, journey, event, or restaurant.
3. Confirming date-specific price/availability.
4. Making, changing, paying for, or canceling a booking.

The first-version hotel/transport requirements include the first two. D-015 requires reservation-aware restaurant/event planning. Neither decision establishes full live inventory, transactional booking, or unrestricted provider access. Free-first does not change those confirmed requirements or settle the remaining booking boundaries.

**Access example retained from prior research:** Booking.com's Demand API prerequisites require Managed Affiliate Partner registration and contracted Partner Centre access before testing [S11]. Re-verify if considering that service. A monthly infrastructure budget is not proof that access will be approved; this is one provider's example, not a universal hotel-provider rule.

**Proposed lower-cost pilot approach to evaluate:** Let the organizer enter existing bookings; recommend options from licensed or appropriately sourced data; show honest uncertainty and reservation requirements; provide a trusted external booking route; record user-entered confirmation separately from provider-verified confirmation. This still needs coverage testing and product approval. Do not silently replace required recommendations with a static booking list or present unverified availability as live.

Hotels/reservation data and event coverage remain unresolved cost/feasibility risks. Investigate access and free sample data early within the approved design workflow; do not wait for every screen to be finished to reveal a dependency. Any necessary paid experiment requires a separate decision. Increasing the operating reference alone does not resolve data access.

## Delivery possibilities

**Mobile-friendly web pilot:** Retained assistant proposal. It would let the organizer share a page rather than requiring app-store publication as a pilot prerequisite. This is a sequencing recommendation, not a settled platform choice. A web client can later coexist with a native client if the architecture supports it.

**Native mobile pilot:** A valid alternative if device-specific behavior is essential. Budget for the same backend/data usage plus the relevant membership/registration and build/test needs. Store fees are not the main unknown; the client implementation and release process also need planning [S8], [S9].

**Both interfaces immediately:** Possible, but not the recommended first commitment unless the owner identifies a pilot need requiring it. It expands the interfaces and workflows to build and verify; a higher cloud allowance does not do that work automatically.

SaaS is a service/business model and app-store distribution is a delivery channel; they are not inherently exclusive. Free-first has not chosen native/web, a framework, an operating system, a host, or a billing architecture.

## Costs outside monthly runtime

**Coding assistance:** Track Codex/other development tools separately. An existing subscription may cover the owner's needs, but current limits and any upgrade/overage should be checked rather than assumed. The prior comparison notes that ChatGPT and OpenAI API billing are separate [S12]; no coding subscription is presumed to supply runtime API credit.

**Domain and assets:** Optional at the prototype stage; quote the actual domain and any fonts/images/templates before spending. Do not assume a premium product name has a standard low registration price.

**Public monetization:** Payment processing, app-store sales-related charges, tax handling, customer support, privacy work, and ad integration are not included as a finalized commercial budget. Their requirements depend on the eventual distribution and business model; evaluate them before launch.

**Build cost:** These operating tiers are not outsourced implementation quotes. The self-build workflow still requires the owner's time for design, coding oversight, tests, releases, and maintenance. A separate build budget can be created once scope and capacity are known. Existing personal subscriptions are not claimed to be free; the immediate goal is avoiding unnecessary new service costs.

## Proposed controls under the flexible policy

Flexibility is not unlimited spending. Define provider-specific allowances and approved usage limits when choosing a paid service; use bounded retries, per-session limits, accounting, and early alerts. Do not hardcode a product-wide $150 cutoff or enroll in metered paid usage merely because it is below the reference amount.

The prior comparison notes that Google Cloud alerts-only budgets do not automatically cap spending [S13], and Supabase's spend cap does not cover every billable category [S14]. Verify actual limits for any selected provider; reporting delays and concurrent requests should be considered rather than promising a penny-exact cutoff.

Keep saved itinerary access available when optional paid recommendation generation must pause. Test that fallback and data restoration before real trip use. These are proposed acceptance conditions, not implemented features or a guarantee that an entirely local prototype can be shared or used offline.

Reduce unnecessary fetches and request only needed fields [S6]. Do not assume indefinite caching is permitted: the prior comparison records Google Places content-storage and attribution restrictions, including exceptions such as place IDs [S15]. Recheck applicable terms for any selected source.

## Current decision and next discussion

**CONFIRMED — D-017:** Free-first development, necessary spending only after review, flexible $100/month target and $150 upper reference for later paid operations, and greater investment after a working product meets the owner's standards. The old fixed-ceiling proposal is superseded. This is a decision rule, not a paid tier activation.

**OPEN:** The owner's concrete product-acceptance standards (Q-005), exact vendor/model selection, data access, one-time/tool costs, available development time, and any future paid-service quote/approval. No account, API key, deployment, reservation, reminder, monitoring task, or purchase was created by this documentation update.

Continue within Section 1 by asking what the app must do well for the owner to consider the first version successful. Detailed acceptance tests belong in the later scope/feature sections. Do not ask the owner to re-approve the budget rule merely because later numerical allowances are intentionally flexible.

## Official source references retained from the prior comparison

Recorded 2026-09-19; not refreshed by this policy edit. Re-verify relevant rates and terms before provider selection or spending.

- [S1 — Vercel Pro plan](https://vercel.com/docs/plans/pro-plan)
- [S2 — Vercel Hobby restrictions](https://vercel.com/docs/plans/hobby)
- [S3 — Supabase pricing](https://supabase.com/pricing)
- [S4 — Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [S5 — Google Maps Platform core pricing](https://developers.google.com/maps/billing-and-pricing/pricing)
- [S6 — Places usage, billing, and field masks](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing)
- [S7 — OpenAI GPT-5.4 mini pricing](https://developers.openai.com/api/docs/models/gpt-5.4-mini)
- [S8 — Apple memberships](https://developer.apple.com/support/compare-memberships/)
- [S9 — Google Play registration](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- [S10 — Routes billing units](https://developers.google.com/maps/documentation/routes/usage-and-billing)
- [S11 — Booking.com Demand API prerequisites](https://developers.booking.com/demand/docs/getting-started/prerequisites)
- [S12 — ChatGPT and API billing separation](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)
- [S13 — Google Cloud budget alerts](https://docs.cloud.google.com/billing/docs/how-to/budgets)
- [S14 — Supabase cost control](https://supabase.com/docs/guides/platform/cost-control)
- [S15 — Places content policies](https://developers.google.com/maps/documentation/places/web-service/policies)
