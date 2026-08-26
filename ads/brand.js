// Plot Point Studios brand primitives for ad creatives.
// Palette + type per the plot-point-brand-system skill.

const C = {
  // Deck palette — taken from the live Morally Gray deck, not the core brand teal.
  forest:    '#12321F',
  forestDeep:'#0A1F13',
  gold:      '#C8A951',
  goldLit:   '#DFC275',
  cream:     '#FAF8EF',
  quoteInk:  '#F4F1E4',

  midnight: '#14545B',
  tiffany:  '#97CCC0',
  arylide:  '#E8CD66',
  gamboge:  '#F39914',
  gunmetal: '#08242B',
  white:    '#FFFFFF',
};

// Display face stands in for The Seasons, which is a commercial licence.
const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const BODY    = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";

/* ---------- botanical elements ---------- */

// One five-petal blossom with a yellow centre.
function flower(size, petal = C.white, center = C.arylide, opacity = 1) {
  const petals = [0, 72, 144, 216, 288].map(a =>
    `<ellipse cx="50" cy="28" rx="13" ry="21" transform="rotate(${a} 50 50)"
      fill="${petal}" opacity="0.92"/>`).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" style="opacity:${opacity}">
    ${petals}<circle cx="50" cy="50" r="8.5" fill="${center}"/></svg>`;
}

// Small bud on a stem, for filling gaps in a cluster.
function bud(size, petal = C.white, opacity = 1) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" style="opacity:${opacity}">
    <path d="M50 92 C50 70 50 52 50 40" stroke="${petal}" stroke-width="4"
      fill="none" stroke-linecap="round" opacity="0.7"/>
    <ellipse cx="50" cy="30" rx="14" ry="22" fill="${petal}" opacity="0.9"/>
    <path d="M50 66 C36 62 30 52 30 42 C42 44 49 54 50 66Z" fill="${petal}" opacity="0.55"/>
  </svg>`;
}

// A leaf sprig, angled.
function sprig(size, color = C.white, opacity = 1) {
  const leaves = [];
  for (let i = 0; i < 5; i++) {
    const y = 22 + i * 15, s = 1 - i * 0.1;
    leaves.push(`<ellipse cx="${50 - 17 * s}" cy="${y}" rx="${13 * s}" ry="${7 * s}"
        transform="rotate(-28 ${50 - 17 * s} ${y})" fill="${color}" opacity="0.75"/>`);
    leaves.push(`<ellipse cx="${50 + 17 * s}" cy="${y + 7}" rx="${13 * s}" ry="${7 * s}"
        transform="rotate(28 ${50 + 17 * s} ${y + 7})" fill="${color}" opacity="0.75"/>`);
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" style="opacity:${opacity}">
    <path d="M50 96 C50 70 50 40 50 14" stroke="${color}" stroke-width="3.5"
      fill="none" stroke-linecap="round" opacity="0.7"/>${leaves.join('')}</svg>`;
}

// Corner cluster: the signature decorative element. corner = tl | tr | bl | br
function cornerFloral(corner, scale = 1, petal = C.white, opacity = 0.9) {
  const flip = {
    tl: 'none', tr: 'scaleX(-1)', bl: 'scaleY(-1)', br: 'scale(-1,-1)',
  }[corner];
  const pos = {
    tl: 'top:-40px;left:-40px', tr: 'top:-40px;right:-40px',
    bl: 'bottom:-40px;left:-40px', br: 'bottom:-40px;right:-40px',
  }[corner];
  const inner = `
    <div style="position:absolute;top:120px;left:40px">${sprig(190 * scale, petal, 0.5)}</div>
    <div style="position:absolute;top:30px;left:150px">${sprig(150 * scale, petal, 0.4)}</div>
    <div style="position:absolute;top:60px;left:20px">${flower(130 * scale, petal, C.arylide)}</div>
    <div style="position:absolute;top:170px;left:150px">${flower(92 * scale, petal, C.arylide)}</div>
    <div style="position:absolute;top:20px;left:95px">${bud(76 * scale, petal, 0.85)}</div>
    <div style="position:absolute;top:200px;left:35px">${bud(58 * scale, petal, 0.7)}</div>`;
  return `<div style="position:absolute;${pos};width:${330 * scale}px;height:${330 * scale}px;
    transform:${flip};opacity:${opacity};pointer-events:none">${inner}</div>`;
}

/* ---------- brand marks ---------- */

// plotpoint wordmark in its dark teal lozenge.
function wordmark(scale = 1, bg = C.gunmetal, fg = C.tiffany) {
  return `<div style="display:inline-block;background:${bg};color:${fg};
    border-radius:999px;padding:${13 * scale}px ${30 * scale}px;font-family:${BODY};
    font-weight:600;font-size:${21 * scale}px;letter-spacing:${2.4 * scale}px">plotpoint</div>`;
}

// Dark circular badge with stacked caps, e.g. FREE / INTERACTIVE / DECK
function badge(lines, scale = 1, bg = C.gunmetal, fg = C.arylide) {
  const body = lines.map(l => `<div>${l}</div>`).join('');
  return `<div style="width:${168 * scale}px;height:${168 * scale}px;border-radius:50%;
    background:${bg};color:${fg};display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:${5 * scale}px;font-family:${BODY};font-weight:700;
    font-size:${17 * scale}px;letter-spacing:${2.6 * scale}px;text-align:center;
    border:${2 * scale}px solid ${C.gamboge}">${body}</div>`;
}

/* ---------- the deck card ---------- */

// The six angles the deck actually sorts its prompts into.
const ANGLES = [
  'POWER AND SECRETS', 'WOUND AND ORIGIN', 'BODY LANGUAGE AND TELLS',
  'DIALOGUE STARTERS', 'HOW OTHERS SEE THEM', 'THE COST OF LOVING HER',
];

// Deterministic gold fleck wash, matching the deck's speckled card face.
// Drawn in real pixels so the flecks stay fine at any card size.
function speckle(w, h, seed = 1) {
  let t = seed * 9301 + 49297;
  const rnd = () => (t = (t * 9301 + 49297) % 233280) / 233280;
  const n = Math.round((w * h) / 260);
  let dots = '';
  for (let i = 0; i < n; i++) {
    let x = rnd() * w, y = rnd() * h;
    // Push a share of the flecks outward so the centre stays readable.
    if (rnd() < 0.6) {
      x = x < w / 2 ? x * 0.44 : w - (w - x) * 0.44;
      y = y < h / 2 ? y * 0.44 : h - (h - y) * 0.44;
    }
    const r = (rnd() * 1.25 + 0.35).toFixed(2), o = (rnd() * 0.5 + 0.14).toFixed(2);
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#DFC275" opacity="${o}"/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
    style="position:absolute;inset:0">${dots}</svg>`;
}

// A face-up prompt card from the deck: forest ground, gold fleck, double gold
// hairline, angle label in caps, the prompt in serif, and its number out of 30.
function card(question, { no = 29, angle = 'THE COST OF LOVING HER', w = 470,
                          rotate = 0, glow = false, seed = 3 } = {}) {
  const h = Math.round(w * 1.3);
  const s = w / 470;
  return `<div style="width:${w}px;height:${h}px;transform:rotate(${rotate}deg);
    background:radial-gradient(ellipse at 50% 38%, #163A25 0%, ${C.forest} 52%, ${C.forestDeep} 100%);
    border-radius:${18 * s}px;position:relative;overflow:hidden;
    box-shadow:${glow
      ? `0 0 ${86 * s}px rgba(200,169,81,.34), 0 ${24 * s}px ${56 * s}px rgba(6,20,12,.60)`
      : `0 ${20 * s}px ${48 * s}px rgba(6,20,12,.44)`}">
    ${speckle(w, h, seed)}
    <div style="position:absolute;inset:${11 * s}px;border:${1.2 * s}px solid rgba(200,169,81,.72);
      border-radius:${11 * s}px"></div>
    <div style="position:absolute;inset:${17 * s}px;border:${0.8 * s}px solid rgba(200,169,81,.34);
      border-radius:${7 * s}px"></div>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;
      justify-content:space-between;padding:${46 * s}px ${38 * s}px ${34 * s}px;box-sizing:border-box">
      <div style="font-family:${BODY};font-size:${14 * s}px;font-weight:700;color:${C.gold};
        letter-spacing:${3.6 * s}px;line-height:1.9;text-align:center">${angle.replace(' AND ', ' AND<br>')}</div>
      <div style="font-family:${DISPLAY};font-size:${42 * s}px;line-height:1.3;color:${C.quoteInk};
        text-align:center;font-weight:400;padding:0 ${4 * s}px">${question}</div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:${11 * s}px">
        <div style="width:${34 * s}px;height:${1 * s}px;background:${C.gold};opacity:.8"></div>
        <div style="font-family:${DISPLAY};font-style:italic;font-size:${19 * s}px;color:${C.gold};
          letter-spacing:${1 * s}px">${no} / 30</div>
      </div>
    </div>
  </div>`;
}

/* ---------- artboard shell ---------- */

const SIZES = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920] };

function page(w, h, bodyHtml, bg) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:${w}px;height:${h}px;overflow:hidden}
    body{background:${bg};font-family:${BODY};-webkit-font-smoothing:antialiased}
    .board{width:${w}px;height:${h}px;position:relative;overflow:hidden;display:flex;
      flex-direction:column}
  </style></head><body>${bodyHtml}</body></html>`;
}

module.exports = { C, DISPLAY, BODY, ANGLES, speckle, flower, bud, sprig, cornerFloral, wordmark, badge, card, page, SIZES };
