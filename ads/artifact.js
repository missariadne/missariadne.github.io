// Builds a self-contained review sheet with every creative inlined as a data URI.
// Usage: node artifact.js [outPath]
const fs = require('fs');
const path = require('path');
const FAMILIES = require('./creatives.js');
const COPY = require('./copy.json');

const PREV = JSON.parse(fs.readFileSync(path.join(__dirname, '.previews.json'), 'utf8'));
const MAN = JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'manifest.json'), 'utf8'));
const outPath = process.argv[2] || path.join(__dirname, '.artifact', 'review.html');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const RATIOS = [
  ['square',   '1:1',  '1080 × 1080', 'Feed, Marketplace, right column'],
  ['portrait', '4:5',  '1080 × 1350', 'Feed — most real estate'],
  ['story',    '9:16', '1080 × 1920', 'Stories &amp; Reels'],
];

const nav = Object.keys(FAMILIES)
  .map(k => `<a href="#${k}">${esc(FAMILIES[k].label)}</a>`).join('');

const bands = Object.keys(FAMILIES).map(key => {
  const fam = FAMILIES[key];
  const c = COPY.creatives[key];
  const angleNo = c.angle.match(/^(\d+)\./)[1];
  const angleName = c.angle.replace(/^\d+\.\s*/, '');

  const strip = RATIOS.map(([size, ratio, dims, use]) => `
    <figure class="shot">
      <div class="frame ${size}"><img src="${PREV[key][size]}" alt="${esc(fam.label)}, ${ratio}" loading="lazy"></div>
      <figcaption><span class="ratio">${ratio}</span><span class="dims">${dims}</span>
        <span class="use">${use}</span></figcaption>
    </figure>`).join('');

  return `<section class="band" id="${key}">
    <header class="band-head">
      <div class="rule"><span class="stamp">Morally Gray &middot; Angle ${angleNo}</span></div>
      <h2>${esc(fam.label)}</h2>
      <p class="angle">${esc(angleName)}</p>
    </header>
    <div class="strip">${strip}</div>
    <div class="copy">
      <div class="col">
        <h3>Primary text</h3>
        <p class="primary">${esc(c.primaryText).replace(/\n/g, '<br>')}</p>
      </div>
      <div class="col">
        <h3>Headline options</h3>
        <ul class="heads">${c.headlines.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <h3 class="mt">Description</h3>
        <p class="desc">${esc(c.description)}</p>
        <h3 class="mt">CTA button</h3>
        <p><span class="cta">${esc(c.cta)}</span></p>
      </div>
    </div>
    <p class="files">${RATIOS.map(([s]) => `<code>${key}--${s}.png</code>`).join('')}</p>
  </section>`;
}).join('');

const html = `<title>Morally Gray Deck Ad Creatives</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600;700;800&display=swap">
<style>
:root{
  --paper:#F2F7F6; --surface:#FFFFFF; --sunk:#E7F0EE;
  --ink:#08242B; --muted:#5C7378; --line:#D3E3DF;
  --primary:#14545B; --secondary:#97CCC0; --accent:#F39914; --highlight:#E8CD66;
  --card-ink:#F4FAF9;
  --display:'Cormorant Garamond',Georgia,'Times New Roman',serif;
  --body:'Montserrat',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
  --shadow:0 10px 30px rgba(8,36,43,.10);
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --paper:#061A1F; --surface:#0D272D; --sunk:#123138;
    --ink:#E8F2F0; --muted:#93ADB1; --line:#1E4249;
    --primary:#97CCC0; --secondary:#14545B; --accent:#F0A63A; --highlight:#E8CD66;
    --shadow:0 10px 30px rgba(0,0,0,.42);
  }
}
:root[data-theme="dark"]{
  --paper:#061A1F; --surface:#0D272D; --sunk:#123138;
  --ink:#E8F2F0; --muted:#93ADB1; --line:#1E4249;
  --primary:#97CCC0; --secondary:#14545B; --accent:#F0A63A; --highlight:#E8CD66;
  --shadow:0 10px 30px rgba(0,0,0,.42);
}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--body);
  font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
.wrap{max-width:1120px;margin:0 auto;padding:0 28px 96px}
a{color:var(--primary)}
h1,h2,h3{text-wrap:balance;margin:0}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;
  background:var(--sunk);color:var(--muted);padding:3px 8px;border-radius:5px}

/* masthead */
.mast{padding:74px 0 34px}
.eyebrow{font-size:11px;font-weight:800;letter-spacing:3.2px;text-transform:uppercase;
  color:var(--accent)}
h1{font-family:var(--display);font-weight:600;font-size:clamp(42px,6.4vw,74px);
  line-height:1.04;letter-spacing:-.5px;margin:16px 0 0}
h1 em{font-style:italic;font-weight:500;color:var(--primary)}
.lede{max-width:64ch;color:var(--muted);margin:20px 0 0;font-size:17px}
.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:26px}
.chip{font-size:12.5px;font-weight:600;padding:7px 15px;border-radius:999px;
  background:var(--sunk);color:var(--ink);border:1px solid var(--line);
  font-variant-numeric:tabular-nums}
.chip.key{background:var(--primary);color:var(--paper);border-color:var(--primary)}

/* nav */
nav{position:sticky;top:0;z-index:20;display:flex;flex-wrap:wrap;gap:4px;
  padding:12px 0;margin-bottom:8px;background:color-mix(in srgb,var(--paper) 92%,transparent);
  backdrop-filter:blur(9px);border-bottom:1px solid var(--line)}
nav a{font-size:12.5px;font-weight:600;text-decoration:none;color:var(--muted);
  padding:6px 12px;border-radius:7px}
nav a:hover,nav a:focus-visible{color:var(--ink);background:var(--sunk)}

/* band */
.band{padding:60px 0;border-bottom:1px solid var(--line)}
.rule{display:flex;align-items:center;gap:14px;margin-bottom:16px}
.rule::after{content:"";flex:1;height:1px;background:var(--line)}
.stamp{font-size:10.5px;font-weight:700;letter-spacing:2.8px;text-transform:uppercase;
  color:var(--accent);white-space:nowrap;font-variant-numeric:tabular-nums}
h2{font-family:var(--display);font-weight:600;font-size:clamp(30px,4vw,44px);line-height:1.1}
.angle{color:var(--muted);font-size:14px;margin:6px 0 0}

/* creative strip */
.strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:26px;align-items:end;margin:34px 0 32px}
.frame{border-radius:9px;overflow:hidden;border:1px solid var(--line);
  box-shadow:var(--shadow);background:var(--surface)}
.frame img{display:block;width:100%;height:auto}
figure{margin:0}
figcaption{display:flex;flex-direction:column;gap:1px;margin-top:11px}
.ratio{font-size:12px;font-weight:800;letter-spacing:1.6px;color:var(--ink)}
.dims{font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}
.use{font-size:12px;color:var(--muted);opacity:.8}

/* copy block */
.copy{display:grid;grid-template-columns:1.15fr 1fr;gap:34px;background:var(--surface);
  border:1px solid var(--line);border-left:4px solid var(--accent);
  border-radius:10px;padding:30px 32px}
h3{font-size:10.5px;font-weight:800;letter-spacing:2.4px;text-transform:uppercase;
  color:var(--accent);margin-bottom:10px}
h3.mt{margin-top:26px}
.primary{font-size:16.5px;line-height:1.72;margin:0}
.heads{margin:0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:7px}
.heads li{font-family:var(--display);font-size:22px;font-weight:600;line-height:1.25;
  padding-left:16px;border-left:2px solid var(--secondary)}
.desc{margin:0;color:var(--muted);font-size:15px}
.cta{display:inline-block;background:var(--primary);color:var(--paper);font-weight:700;
  font-size:13.5px;letter-spacing:.4px;padding:8px 17px;border-radius:7px}
.files{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 0}

/* footer */
footer{padding-top:52px}
footer h3{color:var(--accent)}
.notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:26px;
  margin-top:16px}
.note{background:var(--sunk);border-radius:10px;padding:22px 24px;font-size:14.5px;
  line-height:1.62;color:var(--muted)}
.note b{color:var(--ink)}
.note h4{margin:0 0 8px;font-size:14.5px;color:var(--ink);font-weight:700}

@media (max-width:760px){
  .copy{grid-template-columns:1fr;gap:26px}
  .strip{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:18px}
  .mast{padding-top:48px}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>

<div class="wrap">
<header class="mast">
  <div class="eyebrow">Plot Point Studios &middot; Paid Social</div>
  <h1>Morally Gray Deck<br><em>ad creatives</em></h1>
  <p class="lede">Five hook families for the free prompt deck, each built at all three
    placement ratios and paired with the copy it runs with. Fifteen finished files,
    ready to upload.</p>
  <div class="chips">
    <span class="chip key">15 creatives</span>
    <span class="chip">5 hooks &times; 3 ratios</span>
    <span class="chip">Cold / TOFU &middot; lead gen</span>
    <span class="chip">Free deck &middot; 30 prompts</span>
  </div>
</header>
<nav>${nav}</nav>
${bands}
<footer>
  <h3>Before these go live</h3>
  <div class="notes">
    <div class="note"><h4>The display face is a stand-in</h4>
      These render in <b>Cormorant Garamond</b> because <b>The Seasons</b> is a commercial
      licence. It is close in feel, but swap the real face back in if you rebuild
      any of these in Canva.</div>
    <div class="note"><h4>The botanicals are rebuilt</h4>
      The florals and corner clusters are drawn to brand spec rather than using your
      original asset files, which were not reachable from this session. Drop the real
      PNGs in and they will swap straight through.</div>
    <div class="note"><h4>Every word is yours</h4>
      All primary text, headlines, descriptions, and CTAs are quoted verbatim from
      <b>mORALLY gREY CREATIVES</b>. Nothing was rewritten &mdash; the angle number on each
      band points back to its entry in that doc.</div>
  </div>
</footer>
</div>`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html);
console.log(`${outPath} — ${Math.round(fs.statSync(outPath).size / 1024)}KB`);
