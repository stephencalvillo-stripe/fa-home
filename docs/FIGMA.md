# FA Home — Figma reference

Design file: **FA-Home-Sessions**  
Base URL: `https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions`

Append `?node-id=XXXX-XXXX` for a specific node (use colon in API: `1237:9612`).

---

## Implemented nodes

Use these when matching design or handing off to dev.

| Node ID | Description |
|---------|-------------|
| **Layout & shell** | |
| 1149:85857 | Left nav |
| 1099-4621 / 1099-4626 | Header (search + action icons) |
| **Primary hero** | |
| 1237-9593 | Primary modules (Balance + Gross + Insight card layout) |
| 1237-9594 | Balances module (Total balance) |
| 1149:85903 | Total balance module |
| 1104-106804 | Balance hover state (border, shadow, action) |
| 1211-89675 | Balance dropdown panel |
| 1179:9511 | Gross volume module |
| 1104-106806 | Gross volume (metrics + chart) |
| 1237-10212 | Insight card (offer card) |
| 1246-29898 | Insight card toggle (floating switch) |
| **Hero modules (4 cards)** | |
| 1104-106808 | Hero module hover (border + shadow) |
| 1104-106770 | Hero arrow animation |
| 1149:85907 | Money in |
| 1149-85908 | Money out |
| **Overview** | |
| 1237-9612 | Performance Data (overview section wrapper: offset bg, 8px padding, 3 cards 350px) |
| 1237-9614 | Spending limits card |
| 1237-9615 | Payments card (line chart / meter + legend) |
| 1237-9634 | Failed payments card |
| 1149-85912 | Overview header (title + chips) |
| 1601-33507 | Overview actions (Add + Edit buttons) |

---

## Node ID format

- In Figma URL: **hyphen** (e.g. `1237-9612`).
- In Figma API / dev mode: often **colon** (e.g. `1237:9612`).
- Both refer to the same node.

---

## Design tokens (from Figma)

Referenced in implementation:

| Figma token | Value | Where used |
|-------------|--------|------------|
| Background/Surface | #FFFFFF | Cards, nav |
| Background/Offset | #F4F7FA | Overview section, search bg |
| Neutral/50 | #ECF1F6 | Borders, inputs |
| Neutral/100 | #D4DEE9 | Bars (remainder), borders |
| Border/Default | #D8DEE4 | List borders, legend |
| Text/Default | #1A2C44, #353A44 | Body text |
| Text/Subdued | #596171 | Meta, footer links |
| Brand/25 | #F7F5FD | Action button bg, insight card |
| Brand/600 | #533AFD | Primary actions, links |
| Chart/Categorical 1 | #9966FF | Balance/Gross chart line |
| Chart/Categorical 4 | #ED6804 | Spending limits bar |
| Chart/Categorical 5 | #B3063D | Failed badge |

---

## Quick link builder

```
https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1237-9612
```

Replace `1237-9612` with the node ID you need (use hyphen in URL).
