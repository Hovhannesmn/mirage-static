# Codebase Structure

**Analysis Date:** 2026-04-11

## Directory Layout

```
mirage-static/
├── .git/                          # Git repository
├── .gitignore                     # Git ignore rules
├── .planning/                     # GSD planning documents (this directory)
├── .claude/                       # Claude workspace metadata
├── CLAUDE.md                      # Project instructions
├── README.md                      # Repository readme
├── index.html                     # Homepage (12.3 KB)
├── product.html                   # Product detail template (14.8 KB)
├── css/
│   └── style.css                  # Main stylesheet (173 lines, minified)
├── js/
│   └── data.js                    # Product data & constants (128 lines)
├── images/
│   └── mirage/
│       ├── squirrel/              # Product images + video
│       ├── panda/
│       ├── fox/
│       ├── elephant/
│       ├── gift-elf/
│       ├── red-girl/
│       ├── green-clown/
│       ├── yellow-clown/
│       ├── ballerina/
│       ├── blue-wizard/
│       └── angel-baby/
├── get-shit-done/                 # GSD CLI tools (not part of static site)
└── id_ed25519, id_ed25519.pub     # SSH keys for GitHub push (gitignored)
```

## Directory Purposes

**Root Level:**
- `index.html`: Main entry point, homepage with gallery
- `product.html`: Dynamic product detail page (template)
- `.gitignore`: Excludes build artifacts, .idea, SSH keys
- `CLAUDE.md`: Project context and SSH key instructions

**`css/`:**
- Purpose: All styling for the site
- Contains: Single minified stylesheet (no SCSS/LESS)
- Key files: `style.css` - defines color variables, layout grids, responsive breakpoints

**`js/`:**
- Purpose: Client-side logic and data
- Contains: Product data source and JavaScript constants
- Key files: `data.js` - products array, contact info, social media links
- No framework dependencies, no build tooling

**`images/mirage/`:**
- Purpose: Product imagery and video assets
- Organization: One subdirectory per product (11 total)
- Content: Multiple JPEG images per product (3-7 images), optional MOV video
- Examples:
  - `squirrel/`: 7 images + 1 video
  - `panda/`: 2 images + 1 video
  - `angel-baby/`: 4 images, no video

## Key File Locations

**Entry Points:**
- `index.html` - Homepage, accessible at `/` or `/index.html`
- `product.html` - Product detail, accessible at `/product.html?id=1` through `/product.html?id=11`

**Configuration:**
- `js/data.js` - Central data source, contact info, social media URLs
- `css/style.css` - All styling, CSS variables (--cream, --terra, --dark, etc.)

**Core Logic:**
- `index.html` - Gallery rendering, contact form handling (lines 157-185)
- `product.html` - Product detail rendering, image gallery, lightbox (lines 92-214)
- `js/data.js` - Product definitions, constants

**Assets:**
- `images/mirage/{product-name}/{1-7}.jpg` - Product images
- `images/mirage/{product-name}/video.mov` - Product videos (optional)
- Google Fonts CDN - Playfair Display, Lato typography

## Naming Conventions

**Files:**
- HTML: `{name}.html` (lowercase, kebab-case) - `index.html`, `product.html`
- CSS: `{name}.css` (single file strategy) - `style.css`
- JS: `{name}.js` (lowercase, kebab-case) - `data.js`
- Images: `{number}.{ext}` (numeric, ordered) - `1.jpg`, `2.jpg`, `video.mov`

**Directories:**
- Data: `{category-name}/` (lowercase) - `mirage/`, `squirrel/`, `panda/`
- Assets: Semantic names by product - `gift-elf/`, `green-clown/`, `blue-wizard/`

**HTML Elements (classes/IDs):**
- Kebab-case: `.gallery-grid`, `#productDetail`, `.card-img`
- BEM-inspired: `.card-body`, `.btn-primary`, `.contact-links`
- Semantic: `.hero`, `.about`, `.section`, `.gallery`

**JavaScript:**
- Constants: UPPERCASE - `PHONE`, `WA_LINK`, `FB_LINK`, `IG_LINK`, `products`
- Functions: camelCase - `sendMessage()`, `setImg()`, `openLightbox()`, `closeLightbox()`, `lbNav()`
- Variables: camelCase - `currentImg`, `mainImg`, `productDetail`

**CSS Variables:**
- Color palette: `--cream`, `--warm`, `--terra`, `--dark`, `--mid`, `--light`
- Usage: Applied to body, inherited throughout

## Where to Add New Code

**New Product:**
1. Add entry to `products` array in `js/data.js` with unique ID (>11)
   - Include: id, tag, name, shortDesc, fullDesc, price, sizes, images, video (optional)
2. Create directory: `images/mirage/{product-name}/`
3. Add images: `{number}.jpg` (1.jpg, 2.jpg, etc.)
4. Add video (optional): `video.mov`
5. Deploy: Push to `main` branch, GitHub Pages auto-deploys

**New Section (Homepage):**
1. Add `<section class="section {name}" id="{name}">` in `index.html` after existing sections
2. Add CSS for section in `css/style.css`:
   - Define background color: `background: var(--warm);` or similar
   - Define padding: `padding: 80px 5%;`
3. Update navigation: Add link in `<nav>` to `#{name}`
4. Add styling for content elements within section

**New Stylesheet (if needed):**
- Do NOT create separate files; add rules to `css/style.css`
- Add comments with `/* ── SECTION NAME ── */` for organization
- Use existing color variables for consistency

**New JavaScript Module (if needed):**
- Do NOT create separate files unless significant
- Add inline `<script>` tags before closing `</body>` in HTML
- Use IIFE if needed to avoid global scope pollution
- Follow existing camelCase conventions

**Contact/Social Updates:**
- Update constants in `js/data.js`: `PHONE`, `WA_LINK`, `FB_LINK`, `IG_LINK`
- Update social links in footer (appears in both HTML files)
- Update contact section in `index.html` (lines 120-139)

## Special Directories

**`.planning/`:**
- Purpose: GSD CLI metadata and analysis documents
- Generated: By GSD commands
- Committed: Yes (included in git)

**`.claude/`:**
- Purpose: Claude workspace context
- Generated: By Claude
- Committed: Optional

**`get-shit-done/`:**
- Purpose: GSD CLI tools and templates
- Generated: By GSD setup
- Committed: Yes, for team consistency

## File Size Analysis

- `index.html`: 12.3 KB (unminified)
- `product.html`: 14.8 KB (unminified)
- `css/style.css`: 5-6 KB (minified)
- `js/data.js`: 4-5 KB (unminified)
- **Total JS/CSS payload:** ~15 KB uncompressed

## Import Dependencies

- HTML imports: Only Google Fonts (CDN)
- JS imports: None (no modules, all inline)
- CSS imports: None (single file)
- Build imports: None (no bundler, no preprocessor)

---

*Structure analysis: 2026-04-11*
