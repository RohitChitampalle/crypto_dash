Read-only preview of README.md
README
Strategy Maker — Paper Trading Guide
A beginner-friendly guide to understanding and running the Strategy Maker with Zerodha Kite Connect market data. This setup is for virtual (paper) trading only. It does not place real orders.
1. The idea in plain English
Think of Paper Trading as a driving simulator. You can practise a strategy using real market prices, but the trades are pretend: no money is sent to a broker and no real order is placed.
Market data is the live road view: candle prices arrive from your existing API.
Your strategy is the driving plan: for example, “buy when EMA 9 is above EMA 20.”
The paper engine is the simulator: it checks the rules and records pretend entries and exits.
The Paper execution panel is the dashboard: it shows whether monitoring is active, the latest price, virtual position, closed paper trades, and simulated P/L.
Important: a simulated BUY or SELL signal is not a recommendation or a guarantee of profit.
2. Visual overview
flowchart TD
    A[Save a strategy in Strategy Maker] --> B[Click Load & activate paper]
    B --> C[Frontend requests market candles]
    C --> D[Flask paper API validates the strategy and candles]
    D --> E{Do all Entry rules match?}
    E -- No --> F[Keep monitoring; no virtual entry]
    E -- Yes --> G[Create a virtual BUY or SELL position]
    G --> H[Check stop-loss and take-profit on new candles]
    H --> I[Record virtual exit and simulated P/L]
    F --> C
    I --> C
    J[Click Stop paper monitoring] --> K[Stop browser polling]
Save a strategy in Strategy Maker

Click Load & activate paper

Frontend requests market candles

Flask paper API validates the strategy and candles

Do all Entry rules match?

Keep monitoring; no virtual entry

Create a virtual BUY or SELL position

Check stop-loss and take-profit on new candles

Record virtual exit and simulated P/L

Click Stop paper monitoring

Stop browser polling

No

Yes

​
3. What happens when you load a strategy?
Create or select a saved strategy in the Strategy Maker.
Click Load & activate paper.
The frontend sends the strategy to Flask in paper mode.
Flask validates the strategy before activating it.
While the Strategy Maker page remains open, the browser requests candles about every 15 seconds.
The backend evaluates the latest candle once per candle timestamp. Entry rules use AND logic, meaning every Entry rule must match.
If the rules match, the engine records a virtual position. It checks configured stop-loss/take-profit conditions on new candles and records the simulated result.
Click Stop paper monitoring when you want to stop.
4. Files in this bundle

Clicking Stop paper monitoring stops polling.

Confirm that no real order was sent; this implementation has no live-order call.
12. Troubleshooting
No price appears: Check the relevant candle endpoint directly and confirm it returns OHLCV records in a shape supported by normalizeCandles().
Strategy does not enter a trade: Verify all Entry rules. Every rule must match because the engine uses AND logic. Also check that candle timestamps are valid and new candles are arriving.
Indian symbol fails: Verify Zerodha is connected, the chart endpoint accepts the selected exchange/symbol/interval, and the selected symbol maps to the correct instrument.
Backend route returns 404: Confirm paper_strategy_bp is registered in app.py and restart Flask.
In one sentence: Strategy Maker watches market candles, checks your saved rules, and records pretend trades so you can test the idea without placing real orders.