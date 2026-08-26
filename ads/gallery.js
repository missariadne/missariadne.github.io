// Builds ads/index.html — a review sheet pairing every rendered creative with
// the ad copy it ships alongside in Ads Manager.

const fs = require('fs');
const path = require('path');
const FAMILIES = require('./creatives.js');
const COPY = require('./copy.json');
const { C, BODY, DISPLAY } = require('./brand.js');

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'manifest.json'), 'utf8'));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const sections = Object.keys(FAMILIES).map((key, i) => {
  const fam = FAMILIES[key];
  const c = COPY.creatives[key];
  const shots = manifest.creatives.filter(x => x.key === key);

  const thumbs = shots.map(s => `
    <figure class="shot">
      <a href="out/${s.file}" target="_blank"><img src="out/${s.file}" alt="${esc(fam.label)} — ${s.size}"></a>
      <figcaption><b>${s.size}</b> · ${s.w}&times;${s.h}<br>
        <span class="use">${esc(manifest.placements[s.size].use)}</span></figcaption>
    </figure>`).join('');

  return `<section>
    <header class="sec-head">
      <span class="num">${String(i + 1).padStart(2, '0')}</span>
      <div><h2>${esc(fam.label)}</h2><p class="angle">${esc(c.angle)}</p></div>
    </header>
    <div class="shots">${thumbs}</div>
    <div class="copy">
      <div class="field"><h3>Primary text</h3><pre>${esc(c.primaryText)}</pre></div>
      <div class="field"><h3>Headline options</h3><ol>${
        c.headlines.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
      <div class="field"><h3>Description</h3><p>${esc(c.description)}</p></div>
      <div class="field"><h3>CTA button</h3><p class="cta">${esc(c.cta)}</p></div>
    </div>
  </section>`;
}).join('');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Morally Gray Deck — Facebook Ad Creatives</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{--midnight:${C.midnight};--tiffany:${C.tiffany};--arylide:${C.arylide};
    --gamboge:${C.gamboge};--gunmetal:${C.gunmetal};--paper:#F7FAF9}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--paper);color:var(--gunmetal);font-family:${BODY};line-height:1.6;
    padding:0 24px 100px}
  .wrap{max-width:1180px;margin:0 auto}
  .masthead{padding:72px 0 44px;border-bottom:3px solid var(--midnight);margin-bottom:16px}
  .kicker{font-size:13px;font-weight:700;letter-spacing:3.4px;color:var(--gamboge);
    text-transform:uppercase}
  h1{font-family:${DISPLAY};font-size:clamp(40px,6vw,68px);color:var(--midnight);
    font-weight:600;line-height:1.08;margin:14px 0 18px}
  .meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
  .tag{background:var(--midnight);color:var(--tiffany);border-radius:999px;
    padding:7px 17px;font-size:13px;font-weight:600;letter-spacing:.4px}
  .tag.alt{background:var(--tiffany);color:var(--gunmetal)}
  .lede{margin-top:20px;max-width:70ch;color:#31474d}
  section{padding:56px 0;border-bottom:1px solid #d8e5e2}
  .sec-head{display:flex;gap:20px;align-items:baseline;margin-bottom:28px}
  .num{font-family:${DISPLAY};font-size:52px;color:var(--tiffany);font-weight:600;line-height:1}
  h2{font-family:${DISPLAY};font-size:38px;color:var(--midnight);font-weight:600;line-height:1.15}
  .angle{font-size:14px;color:#5d7176;margin-top:2px}
  .shots{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:22px;
    margin-bottom:34px}
  .shot img{width:100%;display:block;border-radius:10px;border:1px solid #cfdedb;
    box-shadow:0 8px 22px rgba(8,36,43,.10);background:#fff}
  .shot img:hover{box-shadow:0 12px 30px rgba(8,36,43,.20)}
  figcaption{font-size:12px;color:#5d7176;margin-top:10px;line-height:1.45}
  figcaption b{color:var(--midnight);text-transform:capitalize}
  .use{color:#7b8f94}
  .copy{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:26px;
    background:#fff;border:1px solid #dceae7;border-left:5px solid var(--gamboge);
    border-radius:10px;padding:28px 30px}
  h3{font-size:11px;font-weight:800;letter-spacing:2.4px;text-transform:uppercase;
    color:var(--gamboge);margin-bottom:9px}
  pre{font-family:${BODY};font-size:15px;white-space:pre-wrap;line-height:1.62}
  ol{padding-left:19px;font-size:15px}li{margin-bottom:5px}
  .cta{display:inline-block;background:var(--midnight);color:var(--arylide);
    padding:7px 17px;border-radius:6px;font-weight:700;font-size:14px}
  footer{padding-top:44px;font-size:13px;color:#5d7176;max-width:74ch}
  footer b{color:var(--midnight)}
</style></head><body><div class="wrap">
<header class="masthead">
  <div class="kicker">Plot Point Studios &middot; Paid Social</div>
  <h1>Morally Gray Deck<br>Facebook &amp; Instagram Ad Creatives</h1>
  <p class="lede">Five static creative families, each rendered at all three placement ratios and
    paired with its primary text, headline options, and CTA. Click any image for the
    full-resolution PNG.</p>
  <div class="meta">
    <span class="tag">${manifest.creatives.length} creatives</span>
    <span class="tag alt">1080&times;1080 &middot; 1080&times;1350 &middot; 1080&times;1920</span>
    <span class="tag alt">Cold / TOFU &middot; lead gen</span>
    <span class="tag alt">Free deck &middot; 30 prompts</span>
  </div>
</header>
${sections}
<footer>
  <p>Copy is quoted verbatim from <b>mORALLY gREY CREATIVES</b>. Display type is set in
  <b>Cormorant Garamond</b>, standing in for <b>The Seasons</b>, which is a commercial licence
  not redistributable in this repo &mdash; swap it in when rebuilding these in Canva.</p>
  <p style="margin-top:12px">Regenerate everything with <b>npm run build</b> in <b>/ads</b>.</p>
</footer>
</div></body></html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log(`index.html -> ${manifest.creatives.length} creatives across ${Object.keys(FAMILIES).length} families`);
