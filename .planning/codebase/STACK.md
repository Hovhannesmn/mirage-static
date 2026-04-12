# Technology Stack

**Analysis Date:** 2026-04-11

## Languages

**Primary:**
- HTML5 - Page markup and SEO structure
- CSS3 - Styling and responsive design
- JavaScript (ES6+) - Client-side interactivity

**Secondary:**
- None (no build process, no transpilation)

## Runtime

**Environment:**
- Browser-based (client-side only)
- No server-side runtime required

**Package Manager:**
- None - pure static HTML/CSS/JS, no npm/dependencies

## Frameworks

**Core:**
- None - vanilla HTML/CSS/JavaScript

**Templating:**
- None - direct DOM manipulation via JavaScript template literals

**Styling:**
- CSS3 Grid and Flexbox - layout system
- CSS Custom Properties (variables) - theming

## Key Dependencies

**None** - This is a zero-dependency static site.

**External Resources (CDN):**
- Google Fonts (Playfair Display, Lato) - via `https://fonts.googleapis.com/css2?...`
- SVG icons - embedded inline in HTML

**Third-party Integrations:**
- WhatsApp API (`https://wa.me/` protocol)
- Facebook (social link)
- Instagram (social link)
- Phone (tel: protocol)

## Configuration

**Environment:**
- No environment configuration required
- Contact phone hardcoded: `+37493511288`
- Social media links hardcoded in HTML and JS

**Build:**
- No build configuration - files served as-is
- No minification or bundling

## Platform Requirements

**Development:**
- Text editor (for HTML/CSS/JS)
- Live server capability (for testing, avoids CORS issues with file:// protocol)

**Production:**
- GitHub Pages (hosting)
- No build step required
- Direct file deployment

## File Structure

```
mirage-static/
├── index.html              # Homepage
├── product.html            # Product detail page
├── css/
│   └── style.css          # Unified stylesheet (173 lines, minified)
├── js/
│   └── data.js            # Product data array (128 lines)
└── images/
    └── mirage/
        ├── squirrel/      # Product images
        ├── panda/
        ├── fox/
        ├── elephant/
        ├── gift-elf/
        ├── red-girl/
        ├── green-clown/
        ├── yellow-clown/
        ├── ballerina/
        ├── blue-wizard/
        └── angel-baby/
```

## Performance Characteristics

- **Total CSS:** 173 lines (minified)
- **JavaScript:** Minimal, ~200 lines of inline script per page
- **No external JS libraries**
- **Images:** JPEG/MOV stored in `images/mirage/` subdirectories

---

*Stack analysis: 2026-04-11*
