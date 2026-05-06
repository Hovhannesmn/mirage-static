# Mirage Handmade — Business Review & Action Log

**Date:** 2026-05-06
**Page:** facebook.com/profile.php?id=100069396610679 (Mirage Handmade — Artist, 241 followers, Yerevan)
**Website:** miragehandmade.com

---

## 1. Business Diagnosis

### Strengths
- Distinctive niche product (handmade papier-mache from Armenia)
- Bilingual website (Armenian + English) with clean design
- Good SEO/Schema.org markup
- WhatsApp ordering optimized for local market
- Reasonable pricing (9,000–12,000 AMD per piece)
- **Confirmed: It IS a real Facebook Business Page** (not personal profile) — has Manage Page sidebar, Insights, Ad Center, Boost options

### Weaknesses
- Only 10 products in catalog (thin)
- 1 review (low social proof)
- Inconsistent Instagram handle across files (`@mirage_naritoys` vs `@nari_miragedolls`)
- 241 followers — visible to all visitors
- **Biggest issue:** ~16-month posting gap (Nov 2024 → Mar 2026). Algorithm stops promoting silent pages.
- Generic Instagram captions with identical hashtags every post
- No customer testimonials/reviews displayed
- No email capture
- No online checkout (everything funnels through WhatsApp)

---

## 2. Top Recommendations (Priority Order)

| # | Action | Why |
|---|--------|-----|
| 1 | **Post 3x/week minimum** for 2 months | Reverses the algorithmic suppression caused by inactivity |
| 2 | **Get 5–10 reviews** | Ask past buyers; 1 review looks worse than 0 |
| 3 | **Post Reels of making process** | Process videos get 3–10x more reach in craft niche |
| 4 | **Run Page Likes ads** (1000–2000 AMD/day for 2 weeks) | Cheapest way to grow real Armenian followers |
| 5 | **List on Facebook Marketplace** | Where Armenian buyers actively browse |
| 6 | **Invite personal FB friends** to follow page | Free, 10 min, can yield 50–100 followers |
| 7 | **Cross-promote** Instagram ↔ Facebook ↔ Website | Stop splitting the audience |

### What NOT to do
- Don't use friend-request automation tools (account ban guaranteed)
- Don't buy followers (bots, hurts reach)
- Don't spam Facebook groups with sales posts (gets you banned)
- Don't bother with Etsy yet — not the Armenian market

---

## 3. Code Changes Made

### Commits pushed to `main`
- `1b94e0a` — Updated ballerina images, added blue-wizard photos
- `66bdbfb` — Renamed ballerina images to sequential numbering (`IMG_*` → `1.jpg`–`4.jpg`)
- `89868dd` — Removed audio from ballerina `video.mov`
- `9c401da` — Updated `data.js` ballerina images (5 → 3) and pushed `index.html` changes

### Files created
- `instagram/posts.txt` — Armenian-only descriptions for all 10 products, one per line
- `CONVERSATION-SUMMARY.md` — this file

### Other changes
- Fixed Instagram handle in HTML files (then user reverted to `@nari_miragedolls`)
- Added new **Custom Order section** (`#custom`) to `index.html` with 3 cards (idea / handcrafting / unique gift) + WhatsApp CTA
- Added matching CSS in `css/style.css` (`.custom-order`, `.custom-cards`, `.custom-cta`)
- Added "Պատվեր" link to nav

---

## 4. Outstanding Items (Not Yet Done)

- [ ] Resolve final Instagram handle decision (`@mirage_naritoys` vs `@nari_miragedolls`) and unify everywhere
- [ ] Review the new Custom Order section in browser and push if approved
- [ ] Draft 2-week posting calendar with varied captions/hashtags
- [ ] Set up Page Likes ad campaign (manual — needs user action in Ad Center)
- [ ] Ask past customers for reviews
- [ ] Add testimonials section to website once reviews collected
- [ ] List products on Facebook Marketplace

---

## 5. Key Facts to Remember

- **Phone/WhatsApp:** +374 93 511288
- **FB Page ID:** 104097984435154
- **FB Profile URL:** facebook.com/profile.php?id=100069396610679
- **IG handle (per CLAUDE.md):** @mirage_naritoys
- **IG handle (per HTML):** @nari_miragedolls — NEEDS RESOLUTION
- **Domain:** miragehandmade.com (GitHub Pages)
- **Repo:** github.com/Hovhannesmn/mirage-static
- **SSH push:** `GIT_SSH_COMMAND="ssh -i ./id_ed25519 -o IdentitiesOnly=yes" git push origin main`
- **Last post on FB before gap:** Nov 12, 2024
- **Resumed posting:** Mar 19, 2026
