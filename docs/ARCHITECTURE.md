# FA Home — Architecture & layout

Reference for how the dashboard is structured and how to extend it.

## Page structure

```
.fa-page (body)
├── [inline SVG sprite]     # Icons by #id (search, help, settings, etc.)
├── .fa-nav (aside)         # Fixed left nav, 228px wide
├── main.fa-center          # Main column (margin-left: 228px)
│   ├── header.fa-header   # Fixed top bar (search + actions)
│   └── .fa-content        # Scrollable content
│       ├── .fa-welcome    # "Today" + action buttons
│       └── .fa-main       # Cards and sections
│           ├── .fa-primary-hero      # Balance + Gross (+ Insight when on)
│           ├── .fa-cards-4           # Four hero modules (Money in/out, etc.)
│           └── .fa-overview          # Overview header + .fa-overview-data
│               └── .fa-overview-grid # Spending limits | Payments | Failed payments
└── .fa-floating-toggles   # Fixed lower-left; contains State toggle + Insight card toggle (16px gap)
```

## Key layout classes

| Class | Purpose |
|-------|--------|
| `.fa-page` | Root flex container; body background and font |
| `.fa-nav` | Left sidebar; `position: fixed`, 228px wide, `z-index: 200` |
| `.fa-center` | Main column; `margin-left: 228px`, flex column |
| `.fa-header` | Top bar; `position: fixed`, `left: 228px` `right: 0`, `z-index: 100` |
| `.fa-content` | Content wrapper; `padding: 60px 16px 24px` (60px for header), no max-width |
| `.fa-main` | Inner content; `padding: 0 0 24px` |
| `.fa-primary-hero` | Row for Total balance + Gross volume; grid 1fr 1fr, or flex when insight on |
| `.fa-cards-4` | Grid for four hero modules; `repeat(4, 1fr)`, gap 16px |
| `.fa-overview-data` | Wrapper for overview section; bg `#F4F7FA`, padding 8px, radius 8px |
| `.fa-overview-grid` | Flex row for Spending limits, Payments, Failed payments; gap 8px; each card 350px height |

## Insight card behavior

- **Toggle off:** `.fa-primary-hero` is a 2-column grid; only Balance and Gross modules show; they span full width.
- **Toggle on:** `.fa-primary-hero--insight-visible` is applied; layout becomes flex; Balance and Gross get `flex: 1 1 0`; Insight card (324px) animates in from the right (slide + fade).
- Toggle lives in lower-left (`position: fixed`, `left: 16px`, `bottom: 16px`, `z-index: 300`). Clicking the card’s “X” also turns the toggle off.

## Fonts

The app uses **system fonts** (no external font requests): `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Defined on `.fa-page` in `shared.css` as `--font-sans`.

To use **Sail or Stripe fonts** (e.g. if your design system provides them): load the font CSS in `index.html`, then in your tokens or `shared.css` set `--font-sans` to that family (e.g. `"Stripe Sans", var(--font-sans)` so system fonts remain the fallback). Stripe’s public sites use custom type; for Elements they reference [font customization](https://docs.stripe.com/payments/checkout/customization/font-compatibility).

## Design tokens (shared.css)

| Token | Value | Use |
|-------|--------|-----|
| `--fa-bg-offset` | #F4F7FA | Offset backgrounds |
| `--fa-text` | #1a2c44 | Primary text |
| `--fa-text-subdued` | #596171 | Secondary text |
| `--fa-border` | #D8DEE4 | Borders |
| `--fa-neutral-50` | #ECF1F6 | Inputs, dividers |
| `--fa-brand` | #675DFF | Links, primary actions |
| `--fa-brand-25` | #F7F5FD | Light purple bg (buttons, insight card) |
| `--fa-chart-1` | #9966FF | Chart line (balance, gross) |
| `--fa-chart-4` | #ED6804 | Spending limits bar |
| `--fa-chart-5` | #B3063D | Failed badge, chart |

## Responsive behavior

- No max-width on `.fa-content` or header content; layout grows with viewport.
- Horizontal padding: 16px on both header and `.fa-content`.
- Left nav stays fixed; main content has `margin-left: 228px`.
- Header search bar is flexible (`flex: 1 1 0`, `max-width: 450px`) so action icons stay visible.

## Z-index

| Layer | Z-index |
|-------|---------|
| Nav | 200 |
| Header | 100 |
| Insight card toggle | 300 |
