# External Integrations

**Analysis Date:** 2026-04-11

## APIs & External Services

**Social Media Links:**
- **Facebook** - `https://www.facebook.com/profile.php?id=100069396610679`
  - Used in: `index.html`, `product.html`, contact section, footer
  
- **Instagram** - `https://www.instagram.com/nari_miragedolls` (also `mirage_naritoys`)
  - Used in: `index.html`, `product.html`, contact links, footer
  
- **WhatsApp** - `https://wa.me/37493511288`
  - Used in: `index.html`, `product.html`
  - Pre-populated text messages for orders via `encodeURIComponent()`
  - Example: `?text=Բարև ձեզ։ Կցանկանայի պատվիրել "Squirrel" (֏ 12,000)`

**Communication:**
- **Phone** - `tel:+37493511288`
  - Used in: `index.html` (contact form), `product.html` (product detail page)
  - Direct click-to-call on mobile

## Data Storage

**Database:**
- None - data is static JSON array in `js/data.js`

**File Storage:**
- Local filesystem (`images/mirage/*/`)
  - Product images: JPEG format
  - Product videos: MOV format
  - Static assets served from repo root

**Caching:**
- Browser cache (no explicit cache control headers set)
- GitHub Pages default caching

## Authentication & Identity

**Auth Provider:**
- None - fully public site

**Identity:**
- Contact phone: `+37493511288`
- Business name: "Mirage Handmade"
- Creator: Nari (implied from `mirage_naritoys` Instagram handle)

## Monitoring & Observability

**Error Tracking:**
- None - no error monitoring service

**Logs:**
- Browser console only (for debugging)

**Analytics:**
- None detected - no Google Analytics or similar

## CI/CD & Deployment

**Hosting:**
- GitHub Pages: `https://hovhannesmn.github.io/mirage-static/`
- Repository: `https://github.com/Hovhannesmn/mirage-static`
- Deployment: Automatic on push to `main` branch (GitHub Pages default)

**CI Pipeline:**
- None - pure static files, no build process

**Git Configuration:**
- SSH key required for pushes: `./id_ed25519` and `./id_ed25519.pub` (stored in repo root, gitignored)
- SSH command for push: `GIT_SSH_COMMAND="ssh -i ./id_ed25519 -o IdentitiesOnly=yes" git push origin main`

## Environment Configuration

**Required env vars:**
- None - fully static

**Secrets location:**
- None - contact phone and social media links are intentionally public
- SSH key files in repo root: `id_ed25519`, `id_ed25519.pub` (gitignored)

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## External CDN Resources

**Google Fonts:**
```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;600&display=swap
```
- Used for typography: `Playfair Display` (serif, headings), `Lato` (sans-serif, body)
- Fallback: System fonts if CDN unavailable

## Favicon

- Inline SVG data URI (emoji: 🎨 art palette)
- No external file dependency

---

*Integration audit: 2026-04-11*
