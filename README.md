# FA Home — Dashboard Prototype

A static HTML/CSS/JS prototype of the FA (Financial Account) Home dashboard. Built to match Figma designs and used as a reference while building the full application.

## Quick start

- **Live link (if hosted):** Share with your team — see [docs/HOSTING.md](docs/HOSTING.md) to enable GitHub Pages or Vercel.
- **Local:** Open `index.html` in a browser.
- **Component previews:** Open `components/index.html` for a list and iframe preview of each module.
- **Edit a component:** Change the component’s `.html` and `.css` in its folder under `components/`; the full page picks up CSS automatically.

## Documentation

| Doc | Purpose |
|-----|--------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Page layout, structure, key CSS classes, and patterns |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | Component list with file paths and behavior |
| [docs/FIGMA.md](docs/FIGMA.md) | Figma file and node IDs for design reference |

Use these as the source of truth when extending or rebuilding the dashboard.

## Tech stack

- **HTML** — Single `index.html` plus component preview HTML files.
- **CSS** — Vanilla CSS; shared tokens and layout in `components/shared.css`, component styles in each component folder.
- **JS** — Minimal (balance dropdown, insight-card toggle). No framework.
- **Icons** — Inline SVG sprite in `index.html` (Sail-style icons referenced by `#id`).

## Project structure

```
fa-home/
├── index.html              # Full dashboard (nav + header + content)
├── components/
│   ├── shared.css          # Tokens, .fa-page, .fa-center, .fa-content, grids
│   ├── card.css            # Base .fa-card, .fa-link, etc.
│   ├── list-item.css       # List rows, badges (used by some cards)
│   ├── index.html          # Component index / preview hub
│   ├── nav/                # Left sidebar
│   ├── header/             # Top bar (search + actions)
│   ├── welcome-section/    # "Today" + action buttons
│   ├── balance-module/     # Total balance (chart + dropdowns)
│   ├── gross-volume-module/# Gross volume (chart)
│   ├── insight-card/       # Insight card (when toggle on)
│   ├── insight-card-toggle/# Floating toggle (lower-left)
│   ├── money-in-module/    # Money in (hero)
│   ├── money-out-module/   # Money out (hero)
│   ├── incoming-earnings-module/
│   ├── hero-card/          # Balance + Gross preview
│   ├── summary-cards/      # Four hero modules preview
│   ├── overview-header/    # "Your overview" + chips + Customize
│   ├── spending-limits-card/
│   ├── payments-card/
│   ├── failed-payments-card/
│   └── tooltip/
├── _design-system/         # tokens.css, fonts (if present)
└── docs/                   # Architecture, components, Figma reference
```

## Figma

Design source: **FA-Home-Sessions**  
Figma URL format: `https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=XXXX-XXXX`

See [docs/FIGMA.md](docs/FIGMA.md) for implemented node IDs.
