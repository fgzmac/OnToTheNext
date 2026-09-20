# Section 1 Supporting Note — App Budget Options

**Status:** RESEARCHED OPTIONS / PROPOSED — no tier, budget, provider, or purchase approved.  
**Related section:** [Product Vision and Problem Brief](00-product-brief.md), especially 1.16.  
**Related question:** Q-004 — app operating budget, separate from traveler spending.  
**Prepared:** 2026-09-19.  
**Currency for this comparison:** USD; this does not settle the currency of the owner's separate travel budget.  
**Next decision:** Choose or revise a monthly app operating envelope.  
**Scope:** Remain in Section 1; examples are not approval of architecture or implementation.

## Recommendation for review

For the two-traveler Japan pilot, evaluate **Tier 2: $75–$150 per month**, with a **$100 normal planning target and a $150 monthly operating ceiling**. Both numbers are proposals, not approved spending or guarantees of the eventual bill. Do not spend to fill the budget. A provider access requirement or a larger measured workload could require a different plan.

No operating subscriptions need to be started merely to finish the design documents. Paid services should be activated only when an approved implementation or live-data test needs them. The first complete test target remains November 10, 2026.

## What these numbers mean

These are bottom-up planning envelopes for a self-built app, not vendor packages, fixed development quotes, user-capacity promises, or proof that all desired data is available. The amounts cover ordinary hosting/database costs plus explicitly bounded metered API and operational usage under each scenario.

**Included categories:** Application hosting, database/storage/auth where selected, ordinary place/routing data usage, runtime AI if selected, basic operational email/monitoring where needed, and a contingency allowance.

**Separate or unpriced:** Developer labor, Codex/other development-tool subscriptions and overages, hardware, domain registration, app-store enrollment, store/payment transaction charges, premium assets, marketing, legal/accounting work, customer-support labor, taxes, and any negotiated hotel/reservation-data license or minimum commitment. None has been priced as a guaranteed $0. Live hotel-rate and reservation access are unresolved dependencies, not secretly included in a small API allowance.

The owner's trip budget is per person with plane tickets excluded (D-014, clarified in D-016). Private numerical travel amounts stay in the conversation. They are not available for app spending.

## Tier comparison

| Tier | Monthly operating envelope | Intended scenario | Possibilities to evaluate | Pros | Cons and limits |
| --- | --- | --- | --- | --- | --- |
| 1 — Lean prototype | $0–$50 | Local design tests and a tiny, tightly controlled online demonstration. | Activity selection, hotel/transport input, recommendation experiments, and sharing/reveal tests using prepared data and small live-data samples. | Lowest recurring commitment; useful for discovering incorrect assumptions before paying for production services. | Free-tier restrictions and missing operational safeguards must be checked. Prepared data does not prove live coverage. This is an interim prototype, not a downgrade of the approved pilot requirements or automatically a travel-ready system. |
| 2 — Practical pilot | $75–$150 | Two travelers and limited development/test traffic. One developer; bounded searches and regeneration. | Evaluate the full core planning/sharing workflow with paid entry-level persistence, controlled real-data calls, optional economical runtime AI, and backup/recovery checks. | Gives room for real-use testing without paying for speculative scale; protects the hotel/transport organization and recommendation requirements. | Not unlimited. Hotel/restaurant/event access must be proven; manual entry and external booking handoff are proposed methods, not approved defaults. It cannot promise worldwide live inventory or automatic reservations. |
| 3 — Expanded private beta | $150–$400 | Wider invited testing and heavier measured usage after the pilot works. | Extra test environments, more API experiments, comparison of recommendation approaches, better monitoring, and more frequent test cycles. | More room to learn from people beyond the owner; can separate experiments from the main pilot data. | Higher monthly burn without automatic improvement in data quality, correctness, or product demand. No fixed user count is guaranteed. |
| 4 — Early commercial operations | $400–$1,500+ | A public product with measured traffic and an explicit operating model. | Usage-driven compute/storage increases, transactional messaging, support tooling, broader data calls, and operational monitoring as required. | Budget for a growing real workload and commercial operations rather than only a demonstration. | Premature for an unvalidated two-person pilot. Does not include a full team, marketing, legal work, all commercial data contracts, or guaranteed profitability. Costs can exceed the range. |

The tier labels are our planning categories, not supplier plan names. Actual consumption can fit below a tier or exceed it. Spending more does not by itself make recommendations accurate or make a booking integration available.

## Current price anchors, not selected providers

Official pages were reviewed on 2026-09-19. Recheck before purchase, and include taxes, regional conditions, add-ons, and overages when relevant.

| Component | Published reference price | Important qualification | Source |
| --- | --- | --- | --- |
| Vercel Pro hosting | $20/month platform fee with one deploying seat and $20 usage credit. | Additional seats, add-ons, and usage can increase the bill. Vercel Hobby is restricted to non-commercial personal use; do not assume that an unmonetized commercial project qualifies. | [S1], [S2] |
| Supabase database/auth/storage | Free plan; Pro starts at $25/month. | Paid plan includes $10 compute credit sufficient for one Micro instance. Additional projects/compute can add cost. Free projects can pause after a week of inactivity and do not include automatic backups; Pro includes daily database backups with seven-day retention. Verify file-storage recovery separately. | [S3] |
| Cloudflare Workers | Paid plan minimum $5/month. | This is an alternative hosting/runtime option, not a complete app price. It has separate usage limits and platform-specific requirements. | [S4] |
| Google Places Text Search Pro | 5,000 monthly free billable events; then $32 per 1,000 in the first paid band. | Other fields/SKUs, place details, photos, map loads, and routes have their own billing. An app action can trigger several charges. Do not treat this as the price of all recommendation data. | [S5], [S6] |
| OpenAI GPT-5.4 mini runtime example | $0.75 per million input tokens; $4.50 per million output tokens. | Illustrative economical-model price, not a selected model or quality recommendation. Use total billable tokens; tools, retries, reasoning output, and other services affect cost. | [S7] |
| Apple Developer Program | $99 per membership year. | Separate enrollment/distribution cost; does not cover backend hosting or applicable sales-related charges. | [S8] |
| Google Play developer registration | $25 one-time. | Separate enrollment cost; publication also has account, testing, and other requirements. | [S9] |

A cheaper runtime does not automatically mean less development effort. Compare compatibility, supported libraries, deployment, and maintenance when architecture is actually selected.

## An illustrative $100 monthly pilot allocation

This uses a managed web-hosting/database pair as a budgeting example. It is not an architecture decision or a cart to purchase.

| Line | Monthly amount | Basis |
| --- | --- | --- |
| Hosting | $20 | Vercel Pro base example [S1]. |
| Database/auth/storage | $25 | Supabase Pro, one Micro project covered by included compute credit [S3]. |
| Ordinary maps/place/routing calls | $20 | Our usage allowance, not a supplier quote or an allowance for negotiated hotel-data contracts. |
| Runtime AI | $15 | Our bounded usage allowance; only if AI is selected. |
| Operational email/monitoring | $5 | Our allowance; actual services and limits remain unselected. |
| Contingency | $15 | Unspent reserve for variation, not a required purchase. |
| **Planning target** | **$100** | Arithmetic sum, not measured monthly consumption. |

The proposed $150 ceiling leaves $50 beyond this target for justified variability. Development tools and the other explicitly excluded categories remain separate. A booking-data license, a heavy test run, or premium features must be evaluated before assuming they fit.

If an appropriate implementation fits Cloudflare Workers plus the same $25 database plan, their reference base is $30 instead of $45, before usage and other costs [S3], [S4]. That saves $15 at the base level, not necessarily overall once engineering work is considered.

## Usage sensitivity: why user counts alone do not price the app

**AI arithmetic example:** At GPT-5.4 mini standard rates, 10,000 input tokens plus 2,000 total billable output tokens costs $0.0165. One thousand identical calls would cost $16.50 in those text tokens alone. This is not the cost of one complete itinerary: a workflow may require multiple calls, longer outputs, retries, search tools, and external travel data [S7].

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

The first-version hotel/transport requirements include the first two. D-015 requires reservation-aware restaurant/event planning. Neither decision establishes full live inventory, transactional booking, or unrestricted provider access.

**Verified access example:** Booking.com's Demand API prerequisites require Managed Affiliate Partner registration and contracted Partner Centre access before testing. A monthly infrastructure budget is not proof that this access will be approved [S11]. This is one provider's rule, not a claim that every hotel provider has the same terms.

**Proposed lower-cost pilot approach to evaluate:** Let the organizer enter existing bookings; recommend options from licensed or appropriately sourced data; show honest uncertainty and reservation requirements; provide a trusted external booking route; record user-entered confirmation separately from provider-verified confirmation. This still needs coverage testing and product approval. Do not silently replace required recommendations with a static booking list or present unverified availability as live.

Hotels/reservation data and event coverage are unresolved cost/feasibility risks. Increasing the operating tier alone does not resolve them.

## Delivery possibilities

**Mobile-friendly web pilot:** My proposed first test approach. It would let the organizer share a page rather than requiring app-store publication as a pilot prerequisite. This is a sequencing recommendation, not a settled platform choice. A web client can later coexist with a native client if the architecture supports it.

**Native mobile pilot:** A valid alternative if device-specific behavior is essential. Budget for the same backend/data usage plus the relevant membership/registration and build/test needs. Store fees are not the main unknown; the client implementation and release process also need planning [S8], [S9].

**Both interfaces immediately:** Possible, but not my recommended first commitment unless the owner identifies a pilot need that requires it. It expands the number of interfaces and workflows we must build and verify; a higher cloud allowance does not do that work automatically.

SaaS is a service/business model and app-store distribution is a delivery channel; they are not inherently exclusive. No native-versus-web, framework, operating system, or billing architecture has been chosen.

## Costs outside monthly runtime

**Coding assistance:** Track Codex/other development tools separately. An existing subscription may cover the owner's needs, but current limits and any upgrade/overage should be checked rather than assumed. ChatGPT and OpenAI API billing are separate; a ChatGPT subscription is not runtime API credit [S12].

**Domain and assets:** Optional at the prototype stage; quote the actual domain and any fonts/images/templates before spending. Do not assume a premium product name has a standard low registration price.

**Public monetization:** Payment processing, app-store sales-related charges, tax handling, customer support, privacy work, and ad integration are not included as a finalized commercial budget. Their requirements depend on the eventual distribution and business model; evaluate them before launch.

**Build cost:** These operating tiers are not outsourced implementation quotes. The self-build workflow still requires the owner's time for design, coding oversight, tests, releases, and maintenance. A separate build budget can be created once scope and capacity are known.

## Proposed spend controls

Use a $100 normal target and $150 monthly operating ceiling only if approved. Implementation should combine provider quotas/limits where supported, bounded retries, per-session limits, and application-level accounting. Alert before the ceiling, not only after it.

Google Cloud alerts-only budgets do not automatically cap Google Cloud or Maps spending [S13]. Supabase's spend cap also does not cover every billable category, including compute [S14]. Reporting delays and concurrent requests mean a proposed ceiling is not a promise of a penny-exact provider stop.

Keep saved itinerary viewing and editing available when optional paid recommendation generation must pause. Before travel, explicitly test this fallback and data restoration. These are proposed acceptance conditions, not implemented features.

Reduce unnecessary fetches and request only needed fields [S6]. Do not promise indefinite caching of third-party data as a universal cost solution: Google Places limits content caching/storage and requires attribution, with specific exceptions such as place IDs [S15].

## Decision to make

**Proposed:** Tier 2, $100/month target, $150/month operating ceiling, separate from development tools and one-time/unpriced costs.

**OPEN:** Owner approval, actual vendor/model selection, precise data access, app usage limits, and how the ceiling will be enforced. No paid account, API key, deployment, reservation, reminder, or automatic monitoring task has been created.

If approved later, record the budget decision in the main decision register and update Q-004. Choosing a budget does not approve every proposed implementation detail in this note.

## Official sources

Prices and policies were reviewed on 2026-09-19. Examples use published standard reference rates, not private negotiated offers.

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
