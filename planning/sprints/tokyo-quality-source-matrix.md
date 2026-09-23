# Tokyo quality pilot — candidate/source/photo matrix

Prepared 2026-09-23 before implementation. Original inspiration URL is unavailable and has not been viewed. Manually researched, not live discovery. Existing eight Tokyo IDs and all Kyoto/Osaka entries stay. Photo candidates require individual Commons license AND visual checks before inclusion; no official-site image reuse inferred.

| Candidate | Type / coverage | Identity authority | Photo plan |
|---|---|---|---|
| Senso-ji | Venue / temple | senso-ji.jp/english | Commons temple grounds |
| Shinjuku Gyoen | Venue / park | GO TOKYO spot/75 | Commons gardens |
| Tokyo National Museum | Venue / culture | tnm.jp/?lang=en | Commons Honkan |
| Meiji Jingu | Venue / shrine | meijijingu.or.jp/en/about | Commons shrine |
| Tokyo Skytree | Venue / observation | GO TOKYO Skytree guide | Commons tower |
| National Museum of Western Art | Venue / art | nmwa.go.jp/en | Commons museum |
| Edo-Tokyo Open Air Architectural Museum | Venue / architecture | GO TOKYO spot/417 | Commons relocated buildings |
| Sumida Aquarium | Venue / aquarium | GO TOKYO spot/67 | Commons aquarium |
| Imperial Palace East Gardens | Venue / castle foundations and garden access; not inner palace | japan.travel/en/spot/1726 | Commons East Gardens |
| Pokémon Center SHIBUYA | Venue / exact PARCO 6F branch | shop.pokemon.co.jp/en/shop/pokemoncenter-shibuya | Commons 2024.01.22 Pokémon Center Shibuya 02 |
| Pokémon Center MEGA TOKYO | Venue / Sunshine City alpa 2F branch | shop.pokemon.co.jp/en/shop/pokemoncenter-megatokyo | Commons exact branch; gap if no cleared image |
| Shibuya Crossing | Neighborhood activity / crossing walk | GO TOKYO Shibuya guide | Commons crossing |
| SHIBUYA SKY | Venue / rooftop; separate from crossing | shibuya-scramble-square.com/sky/en | Commons actual rooftop |
| Akihabara shops and arcades walk | Neighborhood activity / anime, gaming | GO TOKYO Akihabara guide | Commons district street |
| Ginza window-shopping walk | Neighborhood activity / shopping, architecture | GO TOKYO Ginza guide | Commons Ginza street |
| teamLab Planets TOKYO | Venue / immersive art, Toyosu only | teamlab.art/e/planets | Commons Planets category; artwork rights checked |
| Hama-rikyu garden and matcha stop | Venue / food, park | tokyo-park.or.jp/park/hama-rikyu; Time Out Nakajima-no-ochaya | Commons garden teahouse |
| Tsukiji Outer Market browsing | Neighborhood activity / food market | tsukiji.or.jp/english | Commons outer market |
| Yanaka shopping-lane walk | Neighborhood activity / exploration | GO TOKYO Yanaka/Nezu; WHEN IN TOKYO guide | Commons Yanaka Ginza |
| Shimokitazawa vintage-shop walk | Neighborhood activity / shopping | GO TOKYO Shimokitazawa | Commons shopping streets |
| Kappabashi kitchenware browsing | Neighborhood activity / crafts, shopping | GO TOKYO / shopping street association | Commons kitchenware street |
| Nezu-jinja Shrine | Venue / culture | GO TOKYO Nezu-jinja | Commons shrine |
| Kiyosumi Gardens | Venue / park | GO TOKYO Kiyosumi Gardens | Commons pond/stepping stones |
| Koishikawa Korakuen | Venue / park | GO TOKYO spot/24 | Commons garden |
| Tokyo Grand Tea Ceremony 2026 at Hama-rikyu | Event / tea participation, Oct 31–Nov 1 | 2026.tokyo-grand-tea-ceremony.jp; GO TOKYO ev044 | Gap unless event-specific permitted photo; venue photo not event evidence |
| Roppongi Art Night 2026 | Event / public art, Oct 31–Nov 1 | roppongiartnight.com/2026; Mori Art Museum dated notice | Gap unless event-specific permitted photo; no last-year image presented as current |

Descriptions will be original and concise. Durations are editorial planning estimates. Price, opening hours, inventory and distances remain unknown. Neighborhood walks are app-authored suggestions, not sold tours, and optional stops are not automatically scheduled.

Sources observed 2026-09-23. Local/firsthand subset will retain attribution and caveats, including Planets barefoot/water access, varying Pokémon stock, Yanaka lanes beyond the shopping street, and Hama-rikyu tea separate from garden admission. No article copying or bulk forum ingestion.

Implementation decision: typed checked-in experience/event metadata and media manifest extend the existing curated source layer. No database migration required; existing evidence records support append-only source roles. Historical batches/decisions/snapshots remain immutable. New batches diversify categories within explicit-interest priority. Events require verified dated occurrences intersecting the selected Trip/Day and a non-stale observation. Scheduled plans receive warnings, never automatic moves/deletions.

## Implemented coverage

The matrix above records the pre-implementation choices. The resulting pilot has
24 evergreen Tokyo experiences and two date-guarded events. Each evergreen entry
now has its own optimized, matched, licensed local WebP; MEGA TOKYO's image was
cleared separately from SHIBUYA. The authoritative per-file source, creator,
license, restrictions, capture date and visual-match evidence are in
`src/modules/discover/media-manifest.json`, with rights handling summarized in
`public/media/tokyo/README.md`.

Planets uses a visibly labeled Toyosu exterior only. Both events still lack a
verified reusable event-specific image and display the explicit missing-photo
state. No venue or past-event image is presented as evidence of a future event.
No Google Photos integration or live event feed was added. Final verification and
rendered evidence are recorded in `itinerary-builder-refinement.md`.
