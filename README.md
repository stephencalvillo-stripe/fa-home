# FA Home — Componentized

Each UI module lives in `components/` so you can edit and refine it in isolation.

## Structure

| File / folder | Purpose |
|---------------|--------|
| `index.html` | Full dashboard page (uses all component CSS) |
| `components/shared.css` | FA tokens + layout (`.fa-page`, `.fa-center`, `.fa-main`, grid) |
| `components/card.css` | Base card (`.fa-card`, `.fa-card-lg`, `.fa-card-sm`, title, value, chart, link) |
| `components/list-item.css` | List row, progress bar, badges (for spending limits & failed payments) |
| `components/nav/` | Left sidebar — account, nav items, shortcuts, products |
| `components/header/` | Top bar — search + action icons |
| `components/welcome-section/` | “Today” title + action buttons (Instant payout, Move money, etc.) |
| `components/hero-card/` | Large metric cards with chart (Total balance, Gross volume) |
| `components/summary-cards/` | Four small cards (Money in/out, Incoming earnings, Lifetime yield) |
| `components/overview-header/` | “Your overview” title + chips + Customize button |
| `components/spending-limits-card/` | List with progress bars + View all |
| `components/payments-card/` | Segmented bar + legend + View more |
| `components/failed-payments-card/` | List with Failed/Canceled badges + View more |

## How to refine a component

1. Open **`components/index.html`** in your browser for the component list and iframe preview.
2. Or open a component directly, e.g. **`components/nav/nav.html`**.
3. Edit that component’s **`.css`** and/or **`.html`** in the same folder.
4. Refresh the browser to see changes. The full page (`index.html`) will pick up CSS changes automatically.

## Full page

Open **`index.html`** (or use the Dashboard Prototypes hub) to view the full FA Home dashboard. It loads all component styles from the `components/` folder.
