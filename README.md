# SlideCraft Showcase — Component Forge

> **⚠️ All data på dessa slides är fiktiv/demo — siffror, citat och påståenden är illustrativa exempel.**

## Vad är detta?

En interaktiv showcase av SlideCrafts 9 animerade slide-typer och 17 teman. Zero-dependency, ren HTML/CSS/JS.

## Live

**https://hktcr.github.io/slidecraft-showcase/**

## Slide-typer (9 st)

| Sprint | Typ | Animation |
|--------|-----|-----------|
| 1 | `word-cascade` | Ord som faller ner ett i taget |
| 1 | `box-reveal` | Boxar som bouncar in med glassmorphism |
| 1 | `bullet-build` | Punkter som glider in stegvis |
| 2 | `line-chart` | SVG-linjer som ritas med stroke-dashoffset |
| 2 | `comparison` | Kolumner som glider in från varsitt håll |
| 2 | `timeline-vertical` | Vertikal linje som ritas med noder |
| 3 | `progress-ring` | Cirkulär mätare med countUp |
| 3 | `number-wall` | Grid av siffror som räknar upp |
| 3 | `bar-race` | Animerade staplar sorterade efter värde |

## Filer

- `shell.html` — Presentationsvy (card-grid → fullskärm)
- `slides.json` — Slide-data (alla markerade som FIKTIV/DEMO)
- `component-forge.js` — Modulen med alla 9 renderers
- `index.html` — Redirect till shell.html

## Teknik

- Noll externa beroenden (utom Google Fonts)
- Alla animationer: ren CSS `@keyframes`
- SVG-baserade diagram (line-chart, progress-ring)
- CountUp via `requestAnimationFrame` + `easeOutQuart`
