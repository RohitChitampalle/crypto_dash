Strategy Maker — Paper Trading Guide
A beginner-friendly guide to understanding and running the Strategy Maker with Zerodha Kite Connect market data. This setup is for virtual (paper) trading only. It does not place real orders.
1. The idea in plain English
Think of Paper Trading as a driving simulator. You can practise a strategy using real market prices, but the trades are pretend: no money is sent to a broker and no real order is placed.
- Market data is the live road view: candle prices arrive from your existing API.
- Your strategy is the driving plan: for example, “buy when EMA 9 is above EMA 20.”
- The paper engine is the simulator: it checks the rules and records pretend entries and exits.
- The Paper execution panel is the dashboard: it shows whether monitoring is active, the latest price, virtual position, closed paper trades, and simulated P/L.
Important: a simulated BUY or SELL signal is not a recommendation or a guarantee of profit.

2. Visual overview
The workflow below uses ordinary Markdown, so it displays clearly in GitHub's README view.
┌─────────────────────────────┐
│ 1. Create or save strategy  │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ 2. Click "Load & activate   │
│    paper"                   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ 3. Frontend requests market │
│    candles                  │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ 4. Flask validates strategy │
│    and candle data          │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ 5. Do ALL entry rules match?│
└───────────┬─────────┬───────┘
            │ No      │ Yes
            ↓         ↓
┌─────────────────┐  ┌─────────────────────┐
│ Keep monitoring │  │ Record a virtual    │
│ and wait        │  │ BUY or SELL         │
└────────┬────────┘  └──────────┬──────────┘
         │                      ↓
         │          ┌─────────────────────┐
         │          │ Check stop-loss and │
         │          │ take-profit on new  │
         │          │ candles             │
         │          └──────────┬──────────┘
         │                     ↓
         │          ┌─────────────────────┐
         │          │ Save virtual exit   │
         │          │ and simulated P/L   │
         │          └──────────┬──────────┘
         └─────────────────────┴──→ Continue monitoring

To stop: click **Stop paper monitoring**. The browser stops polling for new candles.
What each part means
- Strategy Maker (frontend): where you create or load the rules.
- Market data API: provides candle prices for the selected instrument.
- Flask paper API (backend): validates the strategy, checks the rules, and stores virtual trades.
- SQLite database: stores paper-session information.
- Paper execution panel: shows monitoring status, latest price, virtual position, closed trades, and simulated P/L.
3. What happens when you load a strategy?
1. Create or select a saved strategy in the Strategy Maker.
2. Click Load & activate paper.
3. The frontend sends the strategy to Flask in paper mode.
4. Flask validates the strategy before activating it.
5. While the Strategy Maker page remains open, the browser requests candles about every 15 seconds.
6. The backend evaluates the latest candle once per candle timestamp. Entry rules use AND logic, meaning every Entry rule must match.
7. If the rules match, the engine records a virtual position. It checks configured stop-loss/take-profit conditions on new candles and records the simulated result.
8. Click Stop paper monitoring when you want to stop.
4. Files in this bundle
File	Purpose
App_Strategy_Maker_Integrated.jsx	React frontend with the Strategy Maker paper-monitoring panel.
paper_strategy_api.py	Flask Blueprint for validating strategies, evaluating candles, and recording virtual trades.
STRATEGY_PAPER_SETUP.md	Short technical setup notes and API details.


5. Setup
Frontend
1. Back up your current React app file.
2. Copy App_Strategy_Maker_Integrated.jsx into your frontend project.
3. If this is the app entry component, rename it to App.jsx or update your imports accordingly.
4. Confirm API_BASE points to your backend, currently configured in the file as https://www.santoshalgotread.com.
5. Build and deploy the frontend using your existing Vite deployment process.
Flask backend
Copy paper_strategy_api.py beside your existing app.py. In app.py, register the Blueprint after creating the Flask app:
from paper_strategy_api import paper_strategy_bp
app.register_blueprint(paper_strategy_bp)
Keep your existing CORS(app) configuration. Restart Flask after the change. Flask must already be installed in your environment. The SQLite database paper_strategies.sqlite3 is created automatically next to paper_strategy_api.py; make sure that location is writable and persistent.
6. API endpoints
Method	Endpoint	What it does
POST	/api/strategy/paper/activate	Validates a strategy and activates it in paper mode.
POST	/api/strategy/paper/tick	Receives candle data, checks entry/exit rules, and updates the virtual session.
GET	/api/strategy/paper/status?strategy_id=...	Reads paper-session status.
POST	/api/strategy/paper/stop	Stops a paper session.


7. Market data requirements
The frontend expects the existing backend endpoints to return candle records containing open, high, low, close, and volume values.
- Crypto: /api/market/candle?symbol=...&timeframe=...
- Indian instruments: /api/kite/chart?exchange=...&symbol=...&interval=...
If your endpoint returns a different JSON structure, update the frontend's normalizeCandles() function. For Indian futures/options, the existing chart route must correctly resolve the selected instrument and exchange.
8. Supported strategy rules
The paper engine supports these indicators/values: EMA 9, EMA 20, SMA 50, RSI 14, MACD, Signal Line, Bollinger middle-band SMA proxy, ATR, VWAP, Volume, and Price. Rule targets can be one of the supported series or a numeric value.
For example:
- Entry rule 1: EMA 9 > EMA 20
- Entry rule 2: RSI 14 > 50
Because rules use AND logic, both rules must be true before a virtual entry is created.
9. Safety: paper trading versus real trading
- This bundle is paper-only. It does not import Kite Connect for order placement and contains no live-order endpoint.
- The UI marks live order placement as disabled. A checkbox or acknowledgement in the UI does not authorize real trading.
- Do not add live execution by simply calling a broker order method. A future live-trading implementation should separately require authenticated users, an explicit confirmation step, server-side order and quantity validation, risk limits, instrument allowlists, and audit logs.
- Simulated P/L is price difference per unit. It does not include quantity, lot size, brokerage, taxes, slippage, or margin.
10. Important limitations
- Keep the page open: monitoring is driven by the browser. Closing the tab or leaving the page stops candle polling. The SQLite session record remains stored.
- Candle-based exits: stop-loss/take-profit are evaluated when new candles are processed, not tick-by-tick. The simulated exit may therefore differ from a real market fill.
- Not a performance guarantee: paper results may differ significantly from live execution.
- No full integration test is claimed: confirm your real candle API response shapes and run the checks below in your own deployment.
11. Quick test checklist
- [ ] Flask starts successfully after registering the Blueprint.
- [ ] The frontend can reach the backend API without CORS errors.
- [ ] The selected market's candle endpoint returns valid OHLCV candles.
- [ ] A saved strategy contains at least one Entry rule.
- [ ] Clicking Load & activate paper changes the panel to monitoring.
- [ ] The panel updates the latest price and shows virtual position/trade information when rules match.
- [ ] Clicking Stop paper monitoring stops polling.
- [ ] Confirm that no real order was sent; this implementation has no live-order call.
12. Troubleshooting
No price appears: Check the relevant candle endpoint directly and confirm it returns OHLCV records in a shape supported by normalizeCandles().
Strategy does not enter a trade: Verify all Entry rules. Every rule must match because the engine uses AND logic. Also check that candle timestamps are valid and new candles are arriving.
Indian symbol fails: Verify Zerodha is connected, the chart endpoint accepts the selected exchange/symbol/interval, and the selected symbol maps to the correct instrument.
Backend route returns 404: Confirm paper_strategy_bp is registered in app.py and restart Flask.
In one sentence: Strategy Maker watches market candles, checks your saved rules, and records pretend trades so you can test the idea without placing real orders.