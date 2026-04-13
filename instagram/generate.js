#!/usr/bin/env node
/**
 * Generates Instagram post folders for the first 3 products.
 * Each folder contains:
 *   slide-1.html  — branded hero (image 1)
 *   slide-N.html  — clean detail shots
 *   slide-last.html — CTA / contact slide
 *   caption.txt   — ready-to-paste Instagram caption
 *
 * Run from the project root:
 *   node instagram/generate.js
 */

const fs   = require('fs');
const path = require('path');

// ── load product data ────────────────────────────────────────────────
const dataPath = path.join(__dirname, '../js/data.js');
const dataCode = fs.readFileSync(dataPath, 'utf8')
  .replace(/^const (\w+)/gm, 'global.$1');
eval(dataCode);

const PHONE   = global.PHONE;
const WA_LINK = global.WA_LINK;
const IG_LINK = global.IG_LINK;
const products = global.products;

// ── config ───────────────────────────────────────────────────────────
const HANDLE  = '@nari_miragedolls';
const WEBSITE = 'miragehandmade.com';

// hashtags
// pull tagline straight from the site's hero badge
const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const badgeMatch = indexHtml.match(/hero-badge[^>]*>([^<]+)</);
const TAGLINE = badgeMatch ? badgeMatch[1].trim() : 'Ձerraqorts · Еzakhi · Haykakan';

const HASHTAGS = [
  '#MirageHandmade', '#ՁեռagorcArvestaget', '#PapyeMashe',
  '#HandmadeArmenia', '#ArmenianCraft', '#ՁeraqortsNver',
  '#PapierMache', '#HandmadeOrnament', '#UniqueGift',
  '#HandmadeDolls', '#Armenia', '#ArtFromArmenia',
].join(' ');

// ── HTML helpers ─────────────────────────────────────────────────────
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;600&display=swap" rel="stylesheet"/>`;

const BASE_CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    background:#111; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    min-height:100vh; gap:14px; padding:40px 0;
    font-family:'Lato',sans-serif;
  }
  .meta { color:#555; font-size:11px; letter-spacing:2px; text-transform:uppercase; }
  /* 1080×1080 canvas at 540×540 preview */
  .canvas { width:540px; height:540px; position:relative; overflow:hidden; }
`;

function page(title, body) {
  return `<!DOCTYPE html>
<html lang="hy">
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  ${FONTS}
  <style>${BASE_CSS}</style>
</head>
<body>
  <div class="meta">1080 × 1080 · preview at 540 × 540 · screenshot at 2× for full res</div>
  ${body}
  <div class="meta">Open in Chrome → DevTools → Capture full size screenshot</div>
</body>
</html>`;
}

// ── Slide 1: Hero (branded, product photo bg) ────────────────────────
function heroSlide(p, imgPath) {
  const armOnly = p.shortDesc.split('\n')[0]; // Armenian line only
  return page(`${p.name} — Hero`, `
  <style>
    .bg { position:absolute; inset:0; background:url('${imgPath}') center 15%/cover no-repeat; }
    .bg::after {
      content:''; position:absolute; inset:0;
      background:
        linear-gradient(to top, rgba(61,43,31,.93) 0%, rgba(61,43,31,.50) 42%, transparent 66%),
        linear-gradient(to bottom, rgba(61,43,31,.46) 0%, transparent 26%);
    }
    .top {
      position:absolute; top:0; left:0; right:0;
      padding:22px 26px; display:flex; justify-content:space-between; align-items:center; z-index:2;
    }
    .brand { font-family:'Playfair Display',serif; font-size:14px; letter-spacing:3px; color:#f5ede0; text-transform:uppercase; }
    .brand em { color:#c4956a; font-style:italic; }
    .pill { background:#c4956a; color:#fff; font-size:9px; letter-spacing:2px; text-transform:uppercase; padding:5px 14px; border-radius:20px; }
    .bottom { position:absolute; bottom:0; left:0; right:0; padding:22px 28px 30px; z-index:2; }
    .rule { width:36px; height:2px; background:#c4956a; margin-bottom:12px; }
    .name { font-family:'Playfair Display',serif; font-size:38px; color:#f5ede0; line-height:1.05; margin-bottom:9px; }
    .desc { font-size:12.5px; font-weight:300; color:#e8d5bc; line-height:1.65; margin-bottom:18px; max-width:380px; }
    .footer { display:flex; justify-content:space-between; align-items:flex-end; }
    .price { font-family:'Playfair Display',serif; font-size:26px; color:#c4956a; font-weight:700; }
    .cta { text-align:right; }
    .cta-top { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#c9b89e; margin-bottom:4px; }
    .handle { font-size:12.5px; color:#c4956a; letter-spacing:.5px; }
  </style>
  <div class="canvas">
    <div class="bg"></div>
    <div class="top">
      <div class="brand">Mirage <em>Handmade</em></div>
      <div class="pill">${p.tag}</div>
    </div>
    <div class="bottom">
      <div class="rule"></div>
      <div class="name">${p.name}</div>
      <div class="desc">${armOnly.replace('։ ', '։<br/>')}</div>
      <div class="footer">
        <div class="price">${p.price}</div>
        <div class="cta">
          <div class="cta-top">\u054A\u0561\u057F\u057E\u056B\u0580\u0565\u0584 WhatsApp\u2011\u0578\u057E</div>
          <div class="handle">${HANDLE}</div>
        </div>
      </div>
    </div>
  </div>`);
}

// ── Slide N: Clean detail (photo + subtle watermark) ─────────────────
function detailSlide(p, imgPath, slideNum, total) {
  return page(`${p.name} — Photo ${slideNum}`, `
  <style>
    .bg { position:absolute; inset:0; background:url('${imgPath}') center 10%/cover no-repeat; }
    .bg::after {
      content:''; position:absolute; inset:0;
      background: linear-gradient(to bottom, rgba(61,43,31,.30) 0%, transparent 20%);
    }
    .watermark {
      position:absolute; top:18px; right:20px; z-index:2;
      font-family:'Playfair Display',serif; font-size:12px;
      letter-spacing:2px; color:rgba(245,237,224,.70); text-transform:uppercase;
    }
    .watermark em { color:rgba(196,149,106,.80); font-style:italic; }
    .counter {
      position:absolute; bottom:18px; right:20px; z-index:2;
      font-size:10px; letter-spacing:2px; color:rgba(245,237,224,.55);
    }
  </style>
  <div class="canvas">
    <div class="bg"></div>
    <div class="watermark">Mirage <em>Handmade</em></div>
    <div class="counter">${slideNum} / ${total}</div>
  </div>`);
}

// ── Last slide: CTA (dark bg, no photo) ──────────────────────────────
function ctaSlide(p, slideNum, total) {
  const [armDesc, engDesc] = p.fullDesc.split('\n\n');
  return page(`${p.name} — CTA`, `
  <style>
    .canvas { background:var(--dark,#3d2b1f); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0; }
    .canvas::before {
      content:''; position:absolute; inset:0;
      background:radial-gradient(ellipse at 50% 40%, rgba(196,149,106,.18) 0%, transparent 65%);
    }
    .inner { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; text-align:center; padding:40px 50px; gap:0; }
    .rule { width:40px; height:2px; background:#c4956a; margin:0 auto 22px; }
    .brand { font-family:'Playfair Display',serif; font-size:20px; letter-spacing:3px; color:#f5ede0; text-transform:uppercase; margin-bottom:6px; }
    .brand em { color:#c4956a; font-style:italic; }
    .tagline { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#7a5c42; margin-bottom:28px; }
    .divider { width:28px; height:1px; background:#7a5c42; margin:0 auto 28px; }
    .prod-name { font-family:'Playfair Display',serif; font-size:26px; color:#f5ede0; margin-bottom:6px; }
    .prod-price { font-size:20px; color:#c4956a; font-weight:600; font-family:'Playfair Display',serif; margin-bottom:26px; }
    .contact { display:flex; flex-direction:column; gap:7px; margin-bottom:22px; }
    .contact-row { font-size:12px; color:#c9b89e; letter-spacing:.5px; }
    .contact-row strong { color:#f5ede0; }
    .handle { font-size:13px; color:#c4956a; letter-spacing:1px; margin-top:2px; }
    .website { font-size:10px; color:#7a5c42; letter-spacing:2px; text-transform:uppercase; margin-top:10px; }
    .counter { position:absolute; bottom:18px; right:20px; z-index:2; font-size:10px; letter-spacing:2px; color:rgba(245,237,224,.35); }
  </style>
  <div class="canvas">
    <div class="inner">
      <div class="rule"></div>
      <div class="brand">Mirage <em>Handmade</em></div>
      <div class="tagline">${TAGLINE}</div>
      <div class="divider"></div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-price">${p.price}</div>
      <div class="contact">
        <div class="contact-row">📲 WhatsApp &nbsp;<strong>${PHONE}</strong></div>
        <div class="contact-row">📸 Instagram &nbsp;<strong>${HANDLE}</strong></div>
      </div>
      <div class="handle">${WEBSITE}</div>
    </div>
    <div class="counter">${slideNum} / ${total}</div>
  </div>`);
}

// ── Caption text ─────────────────────────────────────────────────────
function caption(p) {
  const [armFull, engFull] = p.fullDesc.split('\n\n');
  return `${p.name} · ${p.price}

${armFull}

${engFull}

✨ ${TAGLINE}
🎁 \u053c\u0561\u057e \u0576\u057e\u0565\u0580 \u0562\u0578\u056c\u0578\u0580 \u057f\u0561\u0580\u056b\u0584\u056b \u0570\u0561\u0574\u0561\u0580

📲 \u054a\u0561\u057f\u057e\u056b\u0580\u0565\u0584 WhatsApp-\u0578\u057e · ${PHONE}
🌐 ${WEBSITE}

${HASHTAGS}
`;
}

// ── Generate folders + files ─────────────────────────────────────────
const slugs = ['post-1-squirrel', 'post-2-panda', 'post-3-fox'];

products.slice(0, 3).forEach((p, pi) => {
  const dir = path.join(__dirname, slugs[pi]);
  fs.mkdirSync(dir, { recursive: true });

  // pick which images to use (max 4 product shots)
  const imgSlots = p.images.slice(0, 4);
  const totalSlides = imgSlots.length + 1; // +1 for CTA

  imgSlots.forEach((imgSrc, ii) => {
    const rel = `../../${imgSrc}`;
    let html;
    if (ii === 0) {
      html = heroSlide(p, rel);
    } else {
      html = detailSlide(p, rel, ii + 1, totalSlides);
    }
    fs.writeFileSync(path.join(dir, `slide-${ii + 1}.html`), html);
  });

  // CTA slide
  const ctaHtml = ctaSlide(p, totalSlides, totalSlides);
  fs.writeFileSync(path.join(dir, `slide-${totalSlides}.html`), ctaHtml);

  // caption
  fs.writeFileSync(path.join(dir, 'caption.txt'), caption(p));

  console.log(`✓ ${slugs[pi]}/  (${totalSlides} slides + caption.txt)`);
});

console.log('\nDone. Open any slide-N.html in Chrome and screenshot at 2× for 1080px export.');
