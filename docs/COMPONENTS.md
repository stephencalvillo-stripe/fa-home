# FA Home — Component reference

Where each UI piece lives and how it behaves. Use this when editing or rebuilding components.

---

## Layout & shell

### Nav (left sidebar)
- **Path:** `components/nav/nav.css`, `nav.html`
- **Classes:** `.fa-nav`, `.fa-nav-account`, `.fa-nav-list`, `.fa-nav-item`, `.fa-nav-section-title`, `.fa-nav-workload`
- **Behavior:** Fixed left, 228px wide; account block, nav links, Shortcuts, Products with expandable workloads. Active state on Home.
- **Figma:** 1149:85857

### Header (top bar)
- **Path:** `components/header/header.css`, `header.html`
- **Classes:** `.fa-header`, `.fa-header-content`, `.fa-header-search`, `.fa-header-actions`
- **Behavior:** Fixed below nav; search bar (flex, max 450px) + action icons (help, notifications, settings, add). Icons use sprite `#help`, `#notifications`, `#settings`, `#addCircleFilled`.
- **Figma:** 1099-4621 (Login/header), 1099-4626 (actions)

### Welcome section
- **Path:** `components/welcome-section/welcome-section.css`, `welcome-section.html`
- **Classes:** `.fa-welcome`, `.fa-welcome-title`, `.fa-home-actions`, `.fa-action-btn`
- **Behavior:** “Today” heading + horizontal action buttons (Instant payout, Move money, Payment link, etc.).

---

## Primary hero (top row)

### Total balance module
- **Path:** `components/balance-module/balance-module.css`, `balance-module.html`, `balance-module.js`
- **Classes:** `.fa-balance-module`, `.fa-balance-heading`, `.fa-balance-dropdowns`, `.fa-balance-value`, `.fa-balance-chart`, `.fa-balance-action`
- **Behavior:** Dropdowns (balance type, time range), value, currency breakdown, line chart. Hover: border + shadow, action button (arrow) appears. Dropdown panels open on click.
- **Figma:** 1149:85903, 1104-106804 (hover), 1211-89675 (dropdown)

### Gross volume module
- **Path:** `components/gross-volume-module/gross-volume-module.css`, `gross-volume-module.html`
- **Classes:** `.fa-gross-module`, `.fa-gross-metrics`, `.fa-gross-action`, `.fa-gross-chart`
- **Behavior:** Same height (250px) and hover/action behavior as Total balance; two metric blocks (Net volume, Yesterday) + chart. Action uses `#arrowRight`.
- **Figma:** 1179:9511, 1104-106806

### Insight card (conditional)
- **Path:** `components/insight-card/insight-card.css`
- **Classes:** `.fa-insight-card`, `.fa-insight-card__body`, `.fa-insight-card__title`, `.fa-insight-card__close`, `.fa-insight-card__view-more`
- **Behavior:** In default hero row when Insight toggle is on (Balance + Gross + this card). 324px wide, Brand/25 background, “Insight card” title, description, “Learn more” link, dismiss (X). Slide+fade animation.
- **Figma:** 1237-10212

### Hero when insight ON — Payments only (1451:145651)
- **Path:** `components/hero-insight-on/hero-insight-on.css`
- **Behavior:** When State is **Payments only** and Insight toggle is **on**, the hero-modules section switches to: left 680px (Gross volume 230px + row of Balances and Debits compact cards), right 324px **Add FA** card. Add FA card: offset bg, 16px radius, “Get a card and spend directly from your balance”, “Store, send, and spend in multiple currencies”, card visual, “Get started” button, dismiss. Fade transition (0.28s). **FA enabled** with insight ON keeps the default hero (Balance + Gross + insight card in row, four cards below).
- **Figma:** 1451:145651

### Hero modules — Payments only (1451:143187)
- **Path:** `components/hero-modules-payments/hero-modules-payments.css`
- **Classes:** `.fa-hero-state-payments`, `.fa-hero-modules-payments`, `.fa-hero-modules-payments__col`, `.fa-gross-module--payments-hero`, `.fa-hero-module-compact`, `.fa-hero-module-compact--balances`, `.fa-hero-module-compact--debits`
- **Behavior:** Shown when State toggle is “Payments only”. One row: Gross volume (flex 1, 230px height) + 324px column with two compact cards — **Balances** ($72,450.32, link to balances.html) and **Debits** (“Debited Nov 25, 2024”, $42,000.00). FA enabled / FA Borderless show `.fa-hero-state-fa` (primary hero + four cards) instead.
- **Figma:** 1451:143187

### State toggle
- **Path:** `components/state-toggle/state-toggle.css`
- **Classes:** `.fa-state-toggle`, `.fa-state-toggle__track`, `.fa-state-toggle__option`
- **Behavior:** Three-state segmented control (Payments only | FA enabled | FA Borderless). Sits to the left of the insight card toggle with 16px gap. Sets `data-dashboard-state` on `body` (`payments-only`, `fa-enabled`, `fa-borderless`) for future view switching; each state can later control insight card on/off independently.
- **Figma:** 1451:144211

### Floating toggles wrapper
- **Class:** `.fa-floating-toggles` (in `insight-card-toggle.css`)
- **Behavior:** Fixed lower-left (16px inset), flex row with 16px gap; contains State toggle then Insight card toggle.

### Insight card toggle
- **Path:** `components/insight-card-toggle/insight-card-toggle.css`
- **Classes:** `.fa-insight-card-toggle`, `.fa-insight-card-toggle__track`, `.fa-insight-card-toggle__thumb`, `.fa-insight-card-toggle__label`
- **Behavior:** Inside `.fa-floating-toggles`. Pill switch + “Insight card” label. Toggle on adds `.fa-primary-hero--insight-visible` and shows insight card; off removes it. Dismiss on card also turns toggle off.
- **Figma:** 1246-29898

---

## Four hero modules (second row)

- **Money in:** `components/money-in-module/` — label, period dropdown, value, info tooltip, arrow on hover.
- **Money out:** `components/money-out-module/` — same pattern.
- **Incoming earnings:** `components/incoming-earnings-module/` — same pattern (no info icon).
- **Lifetime yield:** In `index.html` as `.fa-lifetime-yield-card`; shared hero styles in `shared.css` (`.fa-hero-module-icon-slot`, `.fa-hero-module-arrow`).

Shared: hover border + shadow; arrow 4px slide on hover; info (row 1) and arrow (row 2) aligned in right “icon slot.” **Figma:** 1104-106808, 1104-106770, 1149:85907, 85908, etc.

---

## Overview section

### Overview header
- **Path:** `components/overview-header/overview-header.css`, `overview-header.html`
- **Classes:** `.fa-overview-header`, `.fa-overview-title`, `.fa-overview-actions-row`, `.fa-chip`, `.fa-btn-customize`
- **Behavior:** “Your overview” title + filter chips + Customize button.
- **Figma:** 1149-85912

### Spending limits card
- **Path:** `components/spending-limits-card/spending-limits-card.css`, `spending-limits-card.html`
- **Classes:** `.fa-spending-limits-card`, `.fa-spending-limits-header`, `.fa-spending-limits-list`, `.fa-spending-limits-item`, `.fa-spending-limits-bar`, `.fa-spending-limits-bar-fill`, `.fa-spending-limits-data`, `.fa-spending-limits-view-all`
- **Behavior:** Title + info + “This month”; list of rows with 12px progress bar (orange #ED6804 + grey #D4DEE9), mask (•••• 2345), name, amount, limit; “View all” footer.
- **Figma:** 1237-9614

### Payments card
- **Path:** `components/payments-card/payments-card.css`, `payments-card.html`
- **Classes:** `.fa-payments-card`, `.fa-payments-header`, `.fa-payments-content`, `.fa-payments-bar`, `.fa-payments-legend`, `.fa-payments-legend-row`, `.fa-payments-legend-chip`, `.fa-payments-view-more`
- **Behavior:** Title + info; 16px meter bar (1px gap, 5 segments: Succeeded, Uncaptured, Refunded, Blocked, Failed); legend rows with chip + label + value; “View more” footer.
- **Figma:** 1237-9615

### Overview — Payments only (1451:143192)
- When State toggle is **Payments only**, the overview grid shows three cards: **Payments**, **Failed payments**, **Dispute activity** (no Spending limits). Toggled via `.fa-overview-grid--default` / `.fa-overview-grid--payments` in `hero-modules-payments.css`.

### Dispute activity card (Payments only)
- **Path:** `components/dispute-activity-card/dispute-activity-card.css`
- **Classes:** `.fa-dispute-activity-card`, `.fa-dispute-activity-header`, `.fa-dispute-activity-title`, `.fa-dispute-activity-metric`, `.fa-dispute-activity-value`, `.fa-dispute-activity-delta`, `.fa-dispute-activity-chart`
- **Behavior:** Title “Dispute activity” + info icon; metric “37%” + “+1.2%” (red); line chart (Dec 1–Dec 7, 0–40%), purple current period line, dashed grey previous period. Same 350px height as other overview cards.
- **Figma:** 1451:145488 (within 1451:143192)

### Failed payments card
- **Path:** `components/failed-payments-card/failed-payments-card.css`, `failed-payments-card.html`
- **Classes:** `.fa-failed-payments-card`, `.fa-failed-payments-header`, `.fa-failed-payments-list`, `.fa-failed-payments-item`, `.fa-failed-payments-value`, `.fa-failed-payments-meta`, `.fa-badge-failed`, `.fa-badge-canceled`, `.fa-failed-payments-view-more`
- **Behavior:** “Failed payments” title; list rows with amount, meta (date • pi_id), and Failed/Canceled badge; “View more” footer.
- **Figma:** 1237-9634

---

## Shared / base

- **shared.css:** Tokens, `.fa-page`, `.fa-center`, `.fa-content`, grids, hero hover/arrow, icon slot.
- **card.css:** `.fa-card`, `.fa-card-title-row`, `.fa-card-value`, `.fa-card-meta`, `.fa-link`, overview card base.
- **list-item.css:** `.fa-list-item`, `.fa-progress-wrap`, `.fa-badge`; used by some cards and previews.
- **Tooltip:** `components/tooltip/tooltip.css` — used for info icon tooltips on hero modules.

---

## Icon sprite (index.html)

Icons are inline `<symbol id="...">` in an SVG sprite; components use `<use href="#id"/>`.  
IDs include: `home`, `balance`, `transfer`, `settings`, `search`, `help`, `notifications`, `addCircleFilled`, `info`, `chevronDown`, `arrowRight`, `cancel`, etc.  
Sprite is hidden with `position:absolute;width:0;height:0;overflow:hidden` so `<use>` refs work from fixed header.
