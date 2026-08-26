// Renders compact JPEG previews of every creative as data URIs, for embedding
// in the self-contained review artifact.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const B = require('./brand.js');
const FAMILIES = require('./creatives.js');

const SCALE = 0.48; // 1080 -> ~518px wide previews

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox'],
  });
  const out = {};
  let bytes = 0;
  for (const key of Object.keys(FAMILIES)) {
    out[key] = {};
    for (const size of Object.keys(B.SIZES)) {
      const [w, h] = B.SIZES[size];
      const page = await browser.newPage({
        viewport: { width: w, height: h }, deviceScaleFactor: SCALE,
      });
      await page.setContent(FAMILIES[key].fn(size), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const buf = await page.screenshot({ type: 'jpeg', quality: 82 });
      await page.close();
      bytes += buf.length;
      out[key][size] = `data:image/jpeg;base64,${buf.toString('base64')}`;
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname, '.previews.json'), JSON.stringify(out));
  console.log(`previews: ${Math.round(bytes / 1024)}KB raw -> ${Math.round(bytes * 1.34 / 1024)}KB base64`);
})();
