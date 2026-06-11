import {
  TrendingUp,
  ShieldCheck,
  Target,
} from "lucide-react";

const data = {
  analysis: {
    decision: {
      action: "BUY",
      prediction: "Higher probability of upside in next 1 hour",
      reason: [
        "EMA20 above EMA50",
        "Bullish RSI",
        "Volume spike detected",
      ],
    },
    market_structure: {
      resistance: 62341,
      support: 61172,
    },
    market_summary: {
      atr: 105.04,
      ema20: 61433.31,
      ema50: 61428.67,
      momentum_1h: 745,
      price: 62265,
      rsi: 94.22,
    },
    potential_move: {
      downside_points: 1093,
      upside_points: 76,
    },
    trade: {
      entry: 62265,
      maximum_expected_target: 62341,
      stop_loss: 62107.45,
      targets: {
        aggressive: 63105.29,
        medium: 62790.18,
        safe: 62580.11,
      },
    },
  },
  symbol: "BTCUSD",
  total_candles: 241,
};

export default function App() {
  const { analysis } = data;
  const isBuy = analysis.decision.action === "BUY";

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div
          className={`rounded-3xl p-6 md:p-8 mb-6 border shadow-sm
          ${
            isBuy
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
              : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                {data.symbol}
              </h1>

              <p className="text-slate-600 mt-3 text-base md:text-lg">
                {analysis.decision.prediction}
              </p>
            </div>

            <div
              className={`px-6 py-3 rounded-2xl text-2xl md:text-3xl font-bold shadow-lg text-white
              ${
                isBuy ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {analysis.decision.action}
            </div>

          </div>
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* PRICE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <p className="text-slate-500 mb-2">
              Current Price
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-green-500">
              {analysis.market_summary.price.toLocaleString()}
            </h1>

            <div className="flex items-center mt-4 gap-2 text-green-500">
              <TrendingUp size={20} />

              <span>
                Momentum +
                {analysis.market_summary.momentum_1h}
              </span>
            </div>
          </div>

          {/* CONFIDENCE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex justify-center items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[10px] md:border-[12px] border-green-400 flex items-center justify-center">

              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                  92%
                </h1>

                <p className="text-center text-slate-500">
                  BUY
                </p>
              </div>

            </div>
          </div>

          {/* POTENTIAL MOVE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-semibold text-xl mb-5 text-slate-900">
              Potential Move
            </h2>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between">
                  <span className="text-slate-700">
                    Upside
                  </span>

                  <span className="text-green-500">
                    +{analysis.potential_move.upside_points} pts
                  </span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 rounded-full bg-green-500 w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="text-slate-700">
                    Downside
                  </span>

                  <span className="text-red-500">
                    -{analysis.potential_move.downside_points} pts
                  </span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 rounded-full bg-red-500 w-[90%]" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">

          <Metric title="RSI" value={analysis.market_summary.rsi} />
          <Metric title="EMA20" value={analysis.market_summary.ema20} />
          <Metric title="EMA50" value={analysis.market_summary.ema50} />
          <Metric title="ATR" value={analysis.market_summary.atr} />
          <Metric title="Momentum" value={analysis.market_summary.momentum_1h} />
          <Metric title="Candles" value={data.total_candles} />

        </div>

        {/* LOWER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* MARKET STRUCTURE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <h2 className="font-bold text-xl mb-5 text-slate-900">
              Market Structure
            </h2>

            <div className="space-y-6">

              <Level
                label="Resistance"
                value={analysis.market_structure.resistance}
                color="text-red-500"
              />

              <Level
                label="Current"
                value={analysis.market_summary.price}
                color="text-slate-900"
              />

              <Level
                label="Support"
                value={analysis.market_structure.support}
                color="text-green-500"
              />

            </div>

          </div>

          {/* TRADE SETUP */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <h2 className="font-bold text-xl mb-5 text-slate-900">
              Trade Setup
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <TradeCard title="Entry" value={analysis.trade.entry} />

              <TradeCard
                title="Stop Loss"
                value={analysis.trade.stop_loss}
                danger
              />

              <TradeCard
                title="Safe Target"
                value={analysis.trade.targets.safe}
                success
              />

              <TradeCard
                title="Medium Target"
                value={analysis.trade.targets.medium}
                success
              />

              <TradeCard
                title="Aggressive Target"
                value={analysis.trade.targets.aggressive}
                success
              />

              <TradeCard
                title="Max Target"
                value={analysis.trade.maximum_expected_target}
                success
              />

            </div>

          </div>

        </div>

        {/* AI REASONS */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mt-6">

          <h2 className="font-bold text-xl mb-5 text-slate-900">
            AI Decision Factors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {analysis.decision.reason.map((item) => (
              <div
                key={item}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-3"
              >
                <ShieldCheck className="text-green-500" />
                <span className="text-slate-900">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 md:p-5">
      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-lg md:text-2xl font-bold mt-2 text-slate-900">
        {Number(value).toLocaleString()}
      </h2>
    </div>
  );
}

function Level({ label, value, color }) {
  return (
    <div>
      <p className="text-slate-500 text-sm">
        {label}
      </p>

      <h2 className={`text-2xl md:text-3xl font-bold ${color}`}>
        {Number(value).toLocaleString()}
      </h2>
    </div>
  );
}

function TradeCard({
  title,
  value,
  success,
  danger,
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <p className="text-slate-500">
        {title}
      </p>

      <h2
        className={`text-xl md:text-2xl font-bold mt-2 ${
          success
            ? "text-green-500"
            : danger
            ? "text-red-500"
            : "text-slate-900"
        }`}
      >
        {Number(value).toLocaleString()}
      </h2>
    </div>
  );
}
