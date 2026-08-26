// Five static ad-creative families for the Morally Gray Love Interest Prompt Deck.
// Copy is lifted verbatim from the "mORALLY gREY CREATIVES" angle doc.

const B = require('./brand.js');
const { C, DISPLAY, BODY } = B;

// Real cards from the deck, verified against the live build.
const CARDS = {
  cost:    { q: 'They would choose her over the world,<br>and your story treats that as a flaw.',
             no: 29, angle: 'THE COST OF LOVING HER', seed: 7 },
  tells:   { q: 'They never sit with their back<br>to a door.',
             no: 12, angle: 'BODY LANGUAGE AND TELLS', seed: 4 },
  secrets: { q: 'They have already decided how this ends.<br>No one else knows the plan.',
             no: 5,  angle: 'POWER AND SECRETS', seed: 11 },
};

// Per-format metrics. Width is always 1080; only vertical room changes, so the
// square board is the tight one and everything scales off it.
const M = {
  square:   { k: 0.84, padV: 52,  padH: 70, bar: 36, barFs: 23 },
  portrait: { k: 1.00, padV: 70,  padH: 74, bar: 44, barFs: 25 },
  story:    { k: 1.14, padV: 110, padH: 78, bar: 52, barFs: 27 },
};

// Reads the format metrics, scaled by how much visual weight a family can carry.
function metrics(size, weight = 1) {
  const base = M[size];
  return { ...base, k: base.k * weight };
}

// Shared bottom CTA bar: midnight banner, offer line, wordmark.
function ctaBar(m, line, cta, bg = C.midnight, fg = C.tiffany) {
  return `<div style="background:${bg};padding:${m.bar}px 62px;display:flex;align-items:center;
    justify-content:space-between;gap:36px;position:relative;z-index:3;flex-shrink:0">
    <div style="font-family:${BODY};font-size:${m.barFs}px;font-weight:500;color:${C.tiffany};
      line-height:1.42;max-width:600px">${line}</div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:12px;flex-shrink:0">
      <div style="font-family:${BODY};font-size:${m.barFs - 1}px;font-weight:800;color:${C.arylide};
        letter-spacing:2.2px;white-space:nowrap">${cta}</div>
      ${B.wordmark(0.92, C.tiffany, C.gunmetal)}
    </div></div>`;
}

// Content well: takes the space the CTA bar leaves and never pushes it off-board.
function well(m, inner, extra = '') {
  return `<div style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;
    justify-content:center;padding:${m.padV}px ${m.padH}px;text-align:center;position:relative;
    z-index:2;${extra}">${inner}</div>`;
}

function eyebrow(text, color = C.gunmetal, k = 1) {
  return `<div style="font-family:${BODY};font-size:${Math.round(22 * k)}px;font-weight:700;
    color:${color};letter-spacing:${(5.4 * k).toFixed(1)}px;opacity:.85">${text}</div>`;
}

/* ---------- 1. HOT ISN'T A PERSONALITY ---------- */
function hotIsntAPersonality(size) {
  const [w, h] = B.SIZES[size], m = metrics(size, 1.14), k = m.k;
  const body = `<div class="board" style="background:${C.tiffany}">
    ${B.cornerFloral('tl', 1.05, C.white, 0.62)}
    ${B.cornerFloral('br', 0.85, C.white, 0.42)}
    ${well(m, `
      ${eyebrow('FREE INTERACTIVE PROMPT DECK', C.gunmetal, k)}
      <h1 style="font-family:${DISPLAY};font-size:${Math.round(122 * k)}px;line-height:1.0;
        color:${C.midnight};font-weight:600;margin:${Math.round(40 * k)}px 0 0;
        letter-spacing:-1px">HOT ISN&rsquo;T<br>A PERSONALITY</h1>
      <div style="width:${Math.round(126 * k)}px;height:3px;background:${C.gamboge};
        margin:${Math.round(44 * k)}px 0 ${Math.round(38 * k)}px"></div>
      <p style="font-family:${DISPLAY};font-style:italic;font-size:${Math.round(50 * k)}px;
        line-height:1.32;color:${C.gunmetal};max-width:820px">He&rsquo;s hot. He&rsquo;s dangerous.<br>
        Now make him <em style="color:${C.midnight};font-weight:600">interesting</em>.</p>`)}
    ${ctaBar(m, '30 prompts for a love interest readers can&rsquo;t quite figure out.', 'GET THE FREE DECK')}
  </div>`;
  return B.page(w, h, body, C.tiffany);
}

/* ---------- 2. THE CHARACTER-CLICK MOMENT ---------- */
function characterClick(size) {
  const [w, h] = B.SIZES[size], m = metrics(size, 1.04), k = m.k;
  const cw = Math.round(370 * k);
  const body = `<div class="board" style="background:
    radial-gradient(ellipse at 50% 42%, #1D4A30 0%, ${C.forest} 50%, ${C.forestDeep} 100%)">
    ${B.cornerFloral('tr', 0.9, C.gold, 0.20)}
    ${B.cornerFloral('bl', 0.8, C.gold, 0.14)}
    ${well(m, `
      <h1 style="font-family:${DISPLAY};font-size:${Math.round(70 * k)}px;line-height:1.14;
        color:${C.white};font-weight:500;max-width:880px">Something about him<br>isn&rsquo;t clicking.</h1>
      <div style="margin:${Math.round(42 * k)}px 0 ${Math.round(38 * k)}px">
        ${B.card(CARDS.tells.q, { w: cw, rotate: -3.5, glow: true, ...CARDS.tells })}</div>
      <p style="font-family:${DISPLAY};font-style:italic;font-size:${Math.round(50 * k)}px;
        color:${C.arylide};line-height:1.28">One question might fix that.</p>`)}
    ${ctaBar(m, 'Turn over a card. Discover what&rsquo;s underneath.', 'DRAW YOUR FIRST CARD',
      'rgba(6,18,11,.92)', C.cream)}
  </div>`;
  return B.page(w, h, body, C.gunmetal);
}

/* ---------- 3. BUILD THE "BUT LISTEN" GUY ---------- */
function butListen(size) {
  const [w, h] = B.SIZES[size], m = metrics(size, 1.10), k = m.k;
  const bubble = (txt, { bg, fg, rot, fs = 34, weight = 600, italic = false, ml = 0 }) =>
    `<div style="background:${bg};color:${fg};border-radius:${Math.round(32 * k)}px;
      padding:${Math.round(23 * k)}px ${Math.round(36 * k)}px;font-family:${BODY};
      font-size:${Math.round(fs * k)}px;font-weight:${weight};line-height:1.3;
      ${italic ? 'font-style:italic;' : ''}transform:rotate(${rot}deg);
      margin-left:${Math.round(ml * k)}px;box-shadow:0 14px 32px rgba(8,36,43,.20)">${txt}</div>`;

  const body = `<div class="board" style="background:${C.tiffany}">
    ${B.cornerFloral('tl', 0.8, C.white, 0.4)}
    ${B.cornerFloral('br', 0.9, C.white, 0.5)}
    ${well(m, `
      <div style="display:flex;flex-direction:column;gap:${Math.round(20 * k)}px;
        align-items:flex-start;width:100%;margin-bottom:${Math.round(52 * k)}px">
        ${bubble('NO YOU DON&rsquo;T UNDERSTAND HIM', { bg: C.white, fg: C.gunmetal, rot: -2, weight: 800, fs: 33 })}
        ${bubble('i can explain', { bg: C.arylide, fg: C.gunmetal, rot: 1.6, italic: true, ml: 210 })}
        ${bubble('HE HAD HIS REASONS', { bg: C.midnight, fg: C.tiffany, rot: -1.2, weight: 800, fs: 33, ml: 80 })}
        ${bubble('okay BUT LISTEN&mdash;', { bg: C.white, fg: C.gunmetal, rot: 2.2, ml: 250 })}
      </div>
      <h1 style="font-family:${DISPLAY};font-size:${Math.round(100 * k)}px;line-height:1.04;
        color:${C.midnight};font-weight:600">Make readers<br>defend him.</h1>`)}
    ${ctaBar(m, '30 prompts for deliciously complicated love interests.', 'GET THE FREE DECK')}
  </div>`;
  return B.page(w, h, body, C.tiffany);
}

/* ---------- 4. ASK BETTER QUESTIONS ---------- */
function askBetterQuestions(size) {
  const [w, h] = B.SIZES[size], m = metrics(size, 1.02), k = m.k;
  const cw = Math.round(348 * k);
  const strike = q => `<div style="position:relative;display:inline-block;font-family:${DISPLAY};
    font-size:${Math.round(46 * k)}px;color:${C.gunmetal};opacity:.5;padding:0 6px">
    ${q}<div style="position:absolute;left:0;right:0;top:52%;height:3px;background:${C.gamboge};
      transform:rotate(-1.6deg)"></div></div>`;

  const body = `<div class="board" style="background:${C.white}">
    ${B.cornerFloral('tr', 0.78, C.tiffany, 0.55)}
    ${B.cornerFloral('bl', 0.6, C.tiffany, 0.3)}
    ${well(m, `
      ${eyebrow('STOP INTERVIEWING YOUR CHARACTERS', C.midnight, k)}
      <div style="display:flex;flex-direction:column;align-items:center;
        gap:${Math.round(10 * k)}px;margin:${Math.round(30 * k)}px 0 ${Math.round(16 * k)}px">
        ${strike('Favorite color?')}${strike('Birthday?')}${strike('Coffee order?')}
      </div>
      <div style="font-family:${BODY};font-size:${Math.round(58 * k)}px;font-weight:800;
        color:${C.gamboge};line-height:1;margin:${Math.round(12 * k)}px 0 ${Math.round(22 * k)}px">&darr;</div>
      ${B.card(CARDS.cost.q, { w: cw, rotate: 2.5, ...CARDS.cost })}
      <h1 style="font-family:${DISPLAY};font-size:${Math.round(82 * k)}px;line-height:1.06;
        color:${C.midnight};font-weight:600;margin-top:${Math.round(38 * k)}px">Ask better questions.</h1>`)}
    ${ctaBar(m, '30 story-changing prompts. Zero favorite colors.', 'GET BETTER PROMPTS FREE')}
  </div>`;
  return B.page(w, h, body, C.white);
}

/* ---------- 5. DRAW AT YOUR OWN RISK ---------- */
function drawAtYourOwnRisk(size) {
  const [w, h] = B.SIZES[size], m = metrics(size, 1.04), k = m.k;
  const cw = Math.round(372 * k);
  const body = `<div class="board" style="background:
    radial-gradient(ellipse at 50% 48%, #17402A 0%, ${C.forest} 56%, #060F0A 100%)">
    ${B.cornerFloral('tl', 0.95, C.gold, 0.13)}
    ${B.cornerFloral('br', 0.95, C.gold, 0.13)}
    ${well(m, `
      <h1 style="font-family:${DISPLAY};font-size:${Math.round(76 * k)}px;line-height:1.12;
        color:${C.white};font-weight:500">Go ahead. Draw one.</h1>
      <div style="margin:${Math.round(44 * k)}px 0 ${Math.round(40 * k)}px">
        ${B.card(CARDS.secrets.q, { w: cw, rotate: -2, glow: true, ...CARDS.secrets })}</div>
      <p style="font-family:${DISPLAY};font-style:italic;font-size:${Math.round(52 * k)}px;
        color:${C.arylide};line-height:1.26">Just don&rsquo;t blame me afterward.</p>
      <div style="margin-top:${Math.round(34 * k)}px">${eyebrow('DRAW AT YOUR OWN RISK', C.gold, k)}</div>`)}
    ${ctaBar(m, '30 prompts. Six angles. One dangerously interesting love interest.',
      'DRAW YOUR FIRST CARD', 'rgba(4,14,9,.93)', C.cream)}
  </div>`;
  return B.page(w, h, body, C.gunmetal);
}

module.exports = {
  'hot-isnt-a-personality':  { fn: hotIsntAPersonality, label: "Hot Isn't a Personality" },
  'character-click':         { fn: characterClick,      label: 'The Character-Click Moment' },
  'but-listen':              { fn: butListen,           label: 'Build the "But Listen" Guy' },
  'ask-better-questions':    { fn: askBetterQuestions,  label: 'Ask Better Questions' },
  'draw-at-your-own-risk':   { fn: drawAtYourOwnRisk,   label: 'Draw at Your Own Risk' },
};
