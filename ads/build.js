// Renders every ad creative to a PNG at native Facebook/Instagram ad dimensions,
// and fails loudly if any board overflows (clipped CTA bar, wrapped headline, etc).
// Usage: node build.js [familyKey ...]

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const B = require('./brand.js');
const FAMILIES = require('./creatives.js');

const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = path.join(__dirname, 'out');

const PLACEMENTS = {
  square:   { dims: '1080x1080', use: 'Feed (1:1), Marketplace, right column' },
  portrait: { dims: '1080x1350', use: 'Feed (4:5) — most feed real estate' },
  story:    { dims: '1080x1920', use: 'Stories & Reels (9:16)' },
};

// Measures the rendered board: does the content well overflow, and does the CTA
// bar actually sit flush on the bottom edge of the artboard?
async function audit(page, h) {
  return page.evaluate((boardH) => {
    const board = document.querySelector('.board');
    const well = board.children[board.children.length - 2];
    const bar = board.lastElementChild;
    const barBox = bar.getBoundingClientRect();
    return {
      boardH: Math.round(board.getBoundingClientRect().height),
      wellOverflow: Math.max(0, well.scrollHeight - well.clientHeight),
      barBottom: Math.round(barBox.bottom),
      barTextOverflow: Math.max(0, bar.scrollHeight - bar.clientHeight),
      expected: boardH,
    };
  }, h);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const want = process.argv.slice(2);
  const keys = want.length ? want : Object.keys(FAMILIES);

  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const built = [];
  const problems = [];

  for (const key of keys) {
    const fam = FAMILIES[key];
    if (!fam) { console.error(`unknown family: ${key}`); process.exitCode = 1; continue; }
    for (const size of Object.keys(B.SIZES)) {
      const [w, h] = B.SIZES[size];
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.setContent(fam.fn(size), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);

      const a = await audit(page, h);
      const bad = [];
      if (a.wellOverflow > 1) bad.push(`content overflows well by ${a.wellOverflow}px`);
      if (a.barTextOverflow > 1) bad.push(`CTA bar text clipped by ${a.barTextOverflow}px`);
      if (Math.abs(a.barBottom - h) > 1) bad.push(`CTA bar bottom at ${a.barBottom}, expected ${h}`);
      if (a.boardH !== h) bad.push(`board is ${a.boardH}px tall, expected ${h}`);

      const file = path.join(OUT, `${key}--${size}.png`);
      await page.screenshot({ path: file });
      await page.close();

      const kb = Math.round(fs.statSync(file).size / 1024);
      const flag = bad.length ? `  ⚠ ${bad.join('; ')}` : '';
      console.log(`  ${key}--${size}.png  ${w}x${h}  ${kb}KB${flag}`);
      if (bad.length) problems.push(`${key}--${size}: ${bad.join('; ')}`);
      built.push({ key, label: fam.label, size, file: path.basename(file), w, h });
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, 'manifest.json'),
    JSON.stringify({ placements: PLACEMENTS, creatives: built }, null, 2));

  console.log(`\n${built.length} creatives -> ads/out/`);
  if (problems.length) {
    console.error(`\n${problems.length} LAYOUT PROBLEM(S):`);
    problems.forEach(p => console.error(`  - ${p}`));
    process.exitCode = 1;
  } else {
    console.log('layout audit: all boards clean');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
