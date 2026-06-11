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
      resistance: 62341.0,
      support: 61172.0,
    },
    market_summary: {
      atr: 105.04,
      ema20: 61433.31,
      ema50: 61428.67,
      momentum_1h: 745.0,
      price: 62265.0,
      rsi: 94.22,
    },
    potential_move: {
      downside_points: 1093.0,
      upside_points: 76.0,
    },
    trade: {
      entry: 62265.0,
      maximum_expected_target: 62341.0,
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 mb-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold">BTCUSD</h1>

              <p className="text-slate-600 mt-3 text-lg">
                Higher probability of upside in next 1 hour
              </p>
            </div>

            <div className="bg-green-500 text-white font-bold px-8 py-4 rounded-2xl text-3xl shadow-lg">
              BUY
            </div>
          </div>
        </div>

        {/* TOP GRID */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* PRICE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <p className="text-slate-500 mb-2">Current Price</p>

            <h1 className="text-5xl font-bold text-green-500">
              {analysis.market_summary.price}
            </h1>

            <div className="flex items-center mt-4 gap-2 text-green-500">
              <TrendingUp />
              <span>
                Momentum +{analysis.market_summary.momentum_1h}
              </span>
            </div>
          </div>

          {/* CONFIDENCE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center items-center">
            <div className="w-40 h-40 rounded-full border-[12px] border-green-400 flex items-center justify-center">
              <div>
                <h1 className="text-5xl font-bold">92%</h1>

                <p className="text-center text-slate-500">
                  BUY
                </p>
              </div>
            </div>
          </div>

          {/* MOVE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-semibold text-xl mb-5">
              Potential Move
            </h2>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between">
                  <span>Upside</span>

                  <span className="text-green-500">
                    +76 pts
                  </span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 rounded-full bg-green-500 w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Downside</span>

                  <span className="text-red-500">
                    -1093 pts
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
        <div className="grid lg:grid-cols-6 gap-4 mb-6">
          <Metric title="RSI" value="94.22" />
          <Metric title="EMA20" value="61433" />
          <Metric title="EMA50" value="61428" />
          <Metric title="ATR" value="105" />
          <Metric title="Momentum" value="745" />
          <Metric title="Candles" value="241" />
        </div>

        {/* LOWER GRID */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* MARKET STRUCTURE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-xl mb-5">
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

          {/* TRADE */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-xl mb-5">
              Trade Setup
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <TradeCard
                title="Entry"
                value={analysis.trade.entry}
                icon={<Target />}
              />

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

        {/* REASONS */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mt-6">
          <h2 className="font-bold text-xl mb-5">
            AI Decision Factors
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {analysis.decision.reason.map((item) => (
              <div
                key={item}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-3"
              >
                <ShieldCheck className="text-green-500" />
                {item}
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
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5">
      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2 text-slate-900">
        {value}
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

      <h2 className={`text-3xl font-bold ${color}`}>
        {value}
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
        className={`text-2xl font-bold mt-2 ${
          success
            ? "text-green-500"
            : danger
            ? "text-red-500"
            : "text-slate-900"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}
