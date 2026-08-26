// Plot Point Studios brand primitives for ad creatives.
// Palette + type per the plot-point-brand-system skill.

const C = {
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

// A single prompt card from the deck. The hero object in several creatives.
function card(question, { no = '07', angle = 'THE COST', w = 470, rotate = 0, glow = false } = {}) {
  const h = Math.round(w * 1.45);
  const s = w / 470;
  return `<div style="width:${w}px;height:${h}px;transform:rotate(${rotate}deg);
    background:linear-gradient(160deg,${C.midnight} 0%,${C.gunmetal} 100%);
    border:${2 * s}px solid ${C.gamboge};border-radius:${20 * s}px;position:relative;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:${52 * s}px ${40 * s}px;box-sizing:border-box;overflow:hidden;
    box-shadow:${glow
      ? `0 0 ${90 * s}px rgba(232,205,102,.42), 0 ${26 * s}px ${60 * s}px rgba(0,0,0,.55)`
      : `0 ${22 * s}px ${52 * s}px rgba(8,36,43,.42)`}">
    <div style="position:absolute;inset:${13 * s}px;border:${1 * s}px solid rgba(232,205,102,.34);
      border-radius:${12 * s}px"></div>
    <div style="position:absolute;top:${-34 * s}px;left:${-34 * s}px;opacity:.20">
      ${flower(140 * s, C.tiffany, C.arylide)}</div>
    <div style="position:absolute;bottom:${-30 * s}px;right:${-30 * s}px;opacity:.20;
      transform:rotate(180deg)">${flower(120 * s, C.tiffany, C.arylide)}</div>
    <div style="font-family:${BODY};font-size:${15 * s}px;font-weight:700;color:${C.gamboge};
      letter-spacing:${4.4 * s}px;margin-bottom:${30 * s}px">${angle}</div>
    <div style="width:${52 * s}px;height:${1.5 * s}px;background:${C.gamboge};opacity:.65;
      margin-bottom:${34 * s}px"></div>
    <div style="font-family:${DISPLAY};font-size:${43 * s}px;line-height:1.28;color:${C.white};
      text-align:center;font-weight:400">${question}</div>
    <div style="position:absolute;bottom:${30 * s}px;font-family:${BODY};font-size:${13 * s}px;
      font-weight:600;color:${C.tiffany};letter-spacing:${3.4 * s}px;opacity:.75">
      MORALLY GRAY &nbsp;&middot;&nbsp; No. ${no}</div>
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

module.exports = { C, DISPLAY, BODY, flower, bud, sprig, cornerFloral, wordmark, badge, card, page, SIZES };
