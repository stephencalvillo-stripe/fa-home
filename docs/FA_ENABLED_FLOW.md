# FA enabled flow (V2)

Four steps for **Version 2 + FA enabled** (`data-fa-enabled-flow-step="1"` … `"4"` on `<body>`).

| Step | UI |
|------|-----|
| 1 | **Figma** [1609-95416](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1609-95416) hero (right column: feature card [1614-98890](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1614-98890) — Recommendation + **Get started**) + [1609-95495](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1609-95495) overview. After **1s**, All balances spotlight ([1607-88255](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1607-88255)) below **$500,000.00**. **Get started** opens the Step 1 modal ([1609-95761](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1609-95761)); **Done** → Step 2. |
| 2 | **Figma** [1610-95997](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1610-95997) hero (Gross volume, All balances + **View**, Incoming earnings; right column feature card [1614-99323](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1614-99323) — same chrome as step 1). **Same overview as step 1** ([1609-95495](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1609-95495)). After **1s**, incoming earnings spotlight ([1602-34801](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1602-34801)) below **$25,000.00**. **Get started** → Step 2 modal ([1611-96343](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1611-96343)); **Done** → Step 3. |
| 3 | **Figma** [1611-96461](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1611-96461) hero — gross volume (**~2/3**) + column with All balances, divider, Incoming earnings (info icon) (**~1/3**, same **2:1** flex ratio as Step 4). No offer card. **Same overview** as steps 1–2 ([1609-95495](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1609-95495)). After **1s**, overview **Add** spotlight ([1594-41139](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1594-41139)) below the **Add** button. **Add** opens **Add charts** modal ([1602-39986](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1602-39986)); **Apply** → Step 4 (**Cancel** closes). **Get started** → generic flow modal; **Continue** → Step 4. |
| 4 | **Final** — existing `.fa-hero-v2-fa` (gross **~2/3**, balances column **~1/3** via flex **2:1**) and default overview grids. |

- While navigating in the same tab (without a full reload), the flow step is stored in `sessionStorage` under `fa-enabled-flow-step` so switching away from **FA enabled** and back can restore progress. **A full page load (refresh)** clears that key, so the flow always starts at **step 1**.
- Default step is **1** (Figma step-1 hero + overview). Step **4** is the full final layout.

## Prototype API (console)

```js
// Jump to another step, then FA enabled (default is already step 1)
faFlow.setStep(4);
document.querySelector('[data-state="fa-enabled"]').click();
```

## Files

- `components/fa-enabled-flow/fa-enabled-flow.css` — visibility rules
- `components/add-charts-modal/add-charts-modal.css` — Step 3 **Add charts** modal ([1602-39986](https://www.figma.com/design/pxCb6JmndiqMDe2umeT9nY/FA-Home-Sessions?node-id=1602-39986))
- `index.html` — placeholders, insight strip, `#fa-fa-flow-modal*`, `#fa-add-charts-modal*`, script, `setDashboardState` hook

Spotlights (1s delay): Step 1 — `__faHomeOnFlowStep1AllBalancesSpotlightContext` + `#fa-flow-step1-all-balances-spotlight`; Step 2 — `__faHomeOnIncomingEarningsSpotlightContext` + `#fa-incoming-earnings-spotlight` (anchor `--step2` on Incoming earnings); Step 3 — `__faHomeOnOverviewAddSpotlightContext` + `#fa-overview-add-spotlight` (anchor `#fa-overview-add-spotlight-anchor` on **Add**). See `components/balances-spotlight/balances-spotlight.css`.
