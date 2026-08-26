# missariadne.github.io

Landing page for **Beyond the Vault**, a Plot Point Studios product bundle.

Static site, no build step. Open `index.html` or serve the folder.

```
index.html            markup and copy
support.js            progressive enhancement (nav, FAQ, sticky CTA, image fallbacks)
assets/css/styles.css brand system tokens and layout
assets/README.md      the image files the page expects, and their export sizes
```

## Before publishing

- Paste the live checkout URL into `CHECKOUT_URL` at the bottom of `support.js`.
  Every buy button reads from it.
- Confirm the prices in the offer section of `index.html` (search for `TODO`).
- Drop the real exports into `assets/` using the paths in `assets/README.md`.
  Until then, `support.js` shows an on-brand placeholder panel in each image slot.
- Real testimonials go in the commented-out `#proof` block in `index.html`.

## Brand

Plot Point Studios (PPS register): Tiffany Blue `#97ccc0` primary, Arylide Yellow
`#e8cd66` for calls to action, Midnight Green `#14545b` as anchor, Gamboge
`#f39914` sparingly. Display type is The Seasons, substituted here by Cormorant
Garamond from Google Fonts. Body type is Montserrat.
