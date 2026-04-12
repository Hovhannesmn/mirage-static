# Architecture

**Analysis Date:** 2026-04-11

## Pattern Overview

**Overall:** Multi-page static site with client-side data management and dynamic content rendering.

**Key Characteristics:**
- No server-side processing
- Single-page data source (`js/data.js`)
- DOM-driven UI updates via vanilla JavaScript
- SEO-optimized with structured data (Schema.org)
- Mobile-first responsive design

## Layers

**Presentation Layer:**
- Location: `index.html`, `product.html`, `css/style.css`
- Purpose: Render UI, handle user interactions
- Contains: HTML markup, CSS styling, inline event handlers
- Depends on: Data layer (js/data.js)
- Used by: Browser/end user

**Data Layer:**
- Location: `js/data.js`
- Purpose: Centralized product catalog and configuration
- Contains: Products array with 11 items, contact phone, social media links
- Depends on: None
- Used by: Both HTML pages for rendering galleries and product details

**Asset Layer:**
- Location: `images/mirage/*/`
- Purpose: Product imagery and video assets
- Contains: JPEG images (multiple per product), MOV videos (optional per product)
- Depends on: None
- Used by: Product pages for display

## Data Flow

**Homepage Gallery Render:**

1. Browser loads `index.html`
2. Script imports `js/data.js` (products array)
3. Inline script iterates `products.forEach()` → generates card HTML
4. Each card links to `product.html?id={productId}`
5. Gallery renders with product images, names, descriptions, prices

**Product Detail Page Render:**

1. Browser loads `product.html?id=1` (or any product ID)
2. Script imports `js/data.js`
3. URLSearchParams extracts `id` from query string
4. `products.find(p => p.id === id)` retrieves product data
5. If found:
   - Updates page title, meta tags (SEO)
   - Renders image gallery with thumbnails
   - Displays product info (name, price, sizes, description)
   - Generates action buttons (Call, WhatsApp, Facebook, Instagram)
   - Renders related products (random 4, excluding current)
6. If not found: Shows "Product not found" message

**Contact Form Submission:**

1. User fills form: name, phone, message
2. `sendMessage()` function reads input values
3. Builds WhatsApp message text with format: "Hi. My name is X. Phone: Y. [message]"
4. Encodes text and opens WhatsApp web: `wa.me/37493511288?text=...`
5. Shows success message, hides form

**Image Gallery Lightbox:**

1. User clicks main product image
2. `openLightbox(index)` sets `currentImg` state
3. Lightbox modal appears with full-size image
4. Navigation arrows call `lbNav(±1)` to cycle through images
5. Close button or clicking background removes lightbox

## Key Abstractions

**Product Object:**
- Purpose: Standardized representation of a handmade item
- Structure (from `js/data.js`):
  ```javascript
  {
    id: number,              // unique identifier
    tag: string,             // category in Armenian (e.g., "Սկյուռել")
    name: string,            // product name in Armenian
    shortDesc: string,       // brief description (gallery card)
    fullDesc: string,        // detailed description (product page)
    price: string,           // price in AMD (e.g., "֏ 12,000")
    sizes: [string],         // array of size/dimension specs
    images: [string],        // array of image paths
    video: string | null     // optional MOV video path
  }
  ```
- Used by: Gallery rendering, product detail page, related products

**Card Template:**
- Purpose: Reusable product card component
- Classes: `.card`, `.card-img`, `.card-tag`, `.card-body`
- Used by: Homepage gallery, related products section

**Contact Configuration:**
- Constants in `js/data.js`:
  - `PHONE`: `+37493511288`
  - `WA_LINK`: `https://wa.me/37493511288`
  - `FB_LINK`: Facebook profile URL
  - `IG_LINK`: Instagram profile URL
- Used by: All pages for contact buttons and links

## Entry Points

**Homepage:**
- Location: `index.html`
- Triggers: Direct navigation to `/` or `/index.html`
- Responsibilities: Display hero section, gallery grid, about section, process steps, contact form, footer

**Product Detail:**
- Location: `product.html?id={id}`
- Triggers: Click from gallery card with `?id=X` parameter
- Responsibilities: Load product data, render image gallery, display product info, show related items

**Assets:**
- Images: Served from `images/mirage/{product-name}/` directories
- CSS: Single unified file `css/style.css` (173 lines)
- Fonts: External CDN from Google Fonts

## Error Handling

**Strategy:** Fail gracefully with user-friendly messages

**Patterns:**

1. **Missing Product:**
   - Condition: Product ID in URL doesn't exist
   - Handler: Display "Կտորը չի գտնվել։ Վերադառնալ" (Product not found. Go back)
   - Code: `product.html` line 97-98

2. **Form Validation:**
   - Condition: Name or message fields empty
   - Handler: Alert: "Խնդրում ենք լրացնել անունը և հաղորդագրությունը։" (Please fill in name and message)
   - Code: `index.html` line 179

3. **Missing Image:**
   - Condition: Image file not found
   - Handler: Browser default broken image icon
   - Mitigation: All image paths stored in `js/data.js`, verified on upload

## Cross-Cutting Concerns

**Logging:** None - no error logging implemented

**Validation:**
- Form fields: Client-side `.trim()` and truthiness checks
- Product IDs: Runtime check with `products.find()`
- Image loading: Lazy loading attribute (`loading="lazy"`)

**Authentication:** None - fully public site

**Localization:**
- Content language: Armenian (hy)
- HTML `lang="hy"` attribute
- All text hardcoded in Armenian and English

**SEO Optimization:**
- Canonical URL: `miragehandmade.com`
- Meta tags: description, keywords, author, viewport
- Open Graph: og:title, og:description, og:image, og:type, og:locale (hy_AM)
- Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image
- Schema.org:
  - LocalBusiness (homepage): name, description, address, phone, images, social media
  - Product (product page): dynamically updated name, price, image, brand, availability

**Responsive Design:**
- Mobile breakpoint: 768px (max-width)
- Desktop-first approach with mobile overrides
- Grid layouts switch to single column on mobile
- Hamburger menu replaces horizontal nav on mobile

---

*Architecture analysis: 2026-04-11*
