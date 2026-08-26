# Morally Gray Deck — Facebook & Instagram Ad Creatives

Static ad creatives for the **Morally Gray Love Interest Prompt Deck** (free
interactive deck, 30 prompts, 6 angles). Plot Point Studios register, cold /
TOFU lead generation.

Open **[`index.html`](index.html)** for the review sheet: every creative paired
with the primary text, headline options, and CTA it ships with in Ads Manager.

## What's here

Five creative families, each rendered at all three placement ratios — **15 PNGs**
in [`out/`](out/), all 1080px wide and ready to upload.

| Family | Hook | Ground |
|---|---|---|
| `hot-isnt-a-personality` | "Hot isn't a personality" | Tiffany Blue, typographic |
| `character-click` | "Something about him isn't clicking" | Midnight, card hero |
| `but-listen` | "Make readers defend him" | Tiffany Blue, reader-reaction bubbles |
| `ask-better-questions` | "Ask better questions" | White, struck-out vs. card |
| `draw-at-your-own-risk` | "Go ahead. Draw one." | Dark, single glowing card |

| Ratio | Size | Placement |
|---|---|---|
| `square` | 1080×1080 | Feed (1:1), Marketplace, right column |
| `portrait` | 1080×1350 | Feed (4:5) — most feed real estate |
| `story` | 1080×1920 | Stories & Reels (9:16) |

Files are named `<family>--<ratio>.png`.

## Copy

All ad copy in [`copy.json`](copy.json) is quoted **verbatim** from the
*mORALLY gREY CREATIVES* angle doc — nothing was rewritten. Each creative maps
to one of the 20 angles:

| Creative | Angle |
|---|---|
| `hot-isnt-a-personality` | 1. The "He's Hot. But Is He Interesting?" Angle |
| `character-click` | 3. The "Something's Missing" Angle |
| `but-listen` | 10. The Reader Obsession Angle |
| `ask-better-questions` | 18. The Character Questionnaire Hater |
| `draw-at-your-own-risk` | 20. The "Dangerous Question" Angle |

## Rebuilding

```bash
npm install        # playwright-core only; uses the system Chromium
npm run fonts      # installs Montserrat + Cormorant Garamond
npm run build      # renders all PNGs, then regenerates index.html
```

`npm run review` builds a single self-contained HTML review sheet with every
creative inlined, for sharing with someone who does not have the repo.

`node build.js <family>` rebuilds a single family. The build audits every board
and **exits non-zero** if content overflows, a headline rewraps, or the CTA bar
gets pushed off the artboard — so a copy edit that breaks a layout fails loudly
instead of shipping clipped.

## Files

| File | Purpose |
|---|---|
| `brand.js` | Palette, type, botanicals, `plotpoint` wordmark, the deck card |
| `creatives.js` | The five families and their per-format metrics |
| `build.js` | Renders PNGs + runs the layout audit |
| `gallery.js` | Builds `index.html` |
| `previews.js` | Renders inline JPEG previews for the shareable review sheet |
| `artifact.js` | Builds a single self-contained HTML review sheet |
| `copy.json` | Ad copy for each creative |

## Two notes before these go live

1. **Display type is a stand-in.** The brand display face is **The Seasons**, a
   commercial licence that can't be redistributed here, so these render in
   **Cormorant Garamond**. It's close in feel, but swap The Seasons back in if
   you rebuild these in Canva.
2. **The botanicals are rebuilt, not the originals.** The floral and corner
   florals are drawn as SVG in `brand.js` to brand spec, because the original
   `assets/floral.png`, `assets/corner-floral.png`, and `assets/mark.png`
   weren't reachable from this environment. Drop the real PNGs in and swap the
   `cornerFloral()` calls if you want the originals.
