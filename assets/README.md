# Assets

The landing page references these files by the exact paths used in the
Claude Design source. Drop the real exports in and nothing else needs to change.
Until a file exists, `support.js` swaps that image for an on-brand placeholder
panel rather than a broken-image icon.

| Path | Used in | Suggested export |
|---|---|---|
| `assets/web/banner-header.jpg` | Hero background wash | 2400 x 1000, JPG |
| `assets/web/bundle-fan.png` | Hero product shot | 1800 x 1400, PNG, transparent |
| `assets/toolkit-character.png` | What's inside, card 1 | 1200 x 900, PNG |
| `assets/toolkit-plot.png` | What's inside, card 2 | 1200 x 900, PNG |
| `assets/web/toolkit-planner.png` | What's inside, card 3 | 1200 x 900, PNG |
| `assets/web/photo-ramp.jpg` | The problem section | 1400 x 1100, JPG |
| `assets/web/flow-infographic.png` | How it works | 2400 x 1200, PNG |
| `assets/bonus-start-here.png` | Bonuses, card 1 | 1200 x 900, PNG |
| `assets/bonus-roadmap-laptop.png` | Bonuses, card 2 | 1200 x 900, PNG |
| `assets/web/bundle-fan-39.jpg` | Offer section (see note) | 1600 x 1200, JPG |
| `assets/web/photo-faq.jpg` | About headshot | 1120 x 1120, JPG, square crop |

**Note on `bundle-fan-39.jpg`:** the offer section currently uses the price card
rather than a second product shot. To use the image instead, add an
`.offer__media` block before `.price-card` in `index.html`.

Photography follows the brand flat-lay formula: latte, reading glasses,
clipboard or open notebook, greenery, natural wood or marble, warm natural light.
