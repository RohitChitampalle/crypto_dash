import { useEffect, useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalysis = async () => {
    try {
      const response = await fetch(
        "https://www.santoshalgotread.com/api/analysis/btc"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analysis");
      }

      const result = await response.json();

      setData(result);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();

    const interval = setInterval(() => {
      fetchAnalysis();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Analysis...
      </div>
    );
  }

  if (error || !data?.analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error || "Unable to load data"}
      </div>
    );
  }

  const { analysis } = data;

  const isBuy =
    analysis?.decision?.action?.toUpperCase() === "BUY";

  const confidence = Math.min(
    99,
    Math.max(
      50,
      Math.round(
        analysis.market_summary?.rsi || 50
      )
    )
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div
          className={`rounded-3xl p-6 md:p-8 mb-6 border shadow-sm ${
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
              className={`px-6 py-3 rounded-2xl text-2xl md:text-3xl font-bold text-white shadow-lg ${
                isBuy
                  ? "bg-green-500"
                  : "bg-red-500"
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

            <h1
              className={`text-3xl md:text-5xl font-bold ${
                isBuy
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {Number(
                analysis.market_summary.price
              ).toLocaleString()}
            </h1>

            <div className="flex items-center mt-4 gap-2 text-green-500">
              <TrendingUp size={20} />

              <span>
                Momentum{" "}
                {analysis.market_summary.momentum_1h ??
                  analysis.market_summary.momentum}
              </span>
            </div>
          </div>

          {/* CONFIDENCE */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex justify-center items-center">

            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-[10px] md:border-[12px] flex items-center justify-center ${
                isBuy
                  ? "border-green-400"
                  : "border-red-400"
              }`}
            >
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                  {confidence}%
                </h1>

                <p className="text-center text-slate-500">
                  Confidence
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
                  <span>Upside</span>

                  <span className="text-green-500">
                    +
                    {analysis.potential_move
                      ?.upside_points ?? 0} pts
                  </span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 rounded-full bg-green-500 w-[30%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Downside</span>

                  <span className="text-red-500">
                    -
                    {analysis.potential_move
                      ?.downside_points ?? 0} pts
                  </span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 rounded-full bg-red-500 w-[80%]" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* METRICS */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">

          <Metric
            title="RSI"
            value={analysis.market_summary.rsi}
          />

          <Metric
            title="EMA20"
            value={analysis.market_summary.ema20}
          />

          <Metric
            title="EMA50"
            value={analysis.market_summary.ema50}
          />

          <Metric
            title="ATR"
            value={analysis.market_summary.atr}
          />

          <Metric
            title="Momentum"
            value={
              analysis.market_summary.momentum_1h ??
              analysis.market_summary.momentum
            }
          />

          <Metric
            title="Candles"
            value={data.total_candles}
          />

        </div>

        {/* LOWER GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* MARKET STRUCTURE */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <h2 className="font-bold text-xl mb-5">
              Market Structure
            </h2>

            <div className="space-y-6">

              <Level
                label="Resistance"
                value={
                  analysis.market_structure
                    .resistance
                }
                color="text-red-500"
              />

              <Level
                label="Current"
                value={
                  analysis.market_summary.price
                }
                color="text-slate-900"
              />

              <Level
                label="Support"
                value={
                  analysis.market_structure
                    .support
                }
                color="text-green-500"
              />

            </div>

          </div>

          {/* TRADE SETUP */}

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

            <h2 className="font-bold text-xl mb-5">
              Trade Setup
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <TradeCard
                title="Entry"
                value={analysis.trade.entry}
              />

              <TradeCard
                title="Stop Loss"
                value={analysis.trade.stop_loss}
                danger
              />

              <TradeCard
                title="Safe Target"
                value={
                  analysis.trade.targets.safe
                }
                success
              />

              <TradeCard
                title="Medium Target"
                value={
                  analysis.trade.targets.medium
                }
                success
              />

              <TradeCard
                title="Aggressive Target"
                value={
                  analysis.trade.targets
                    .aggressive
                }
                success
              />

              <TradeCard
                title="Max Target"
                value={
                  analysis.trade
                    .maximum_expected_target
                }
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {analysis.decision.reason.map(
              (item) => (
                <div
                  key={item}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-3"
                >
                  <ShieldCheck className="text-green-500" />

                  <span className="text-slate-900">
                    {item}
                  </span>
                </div>
              )
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-lg md:text-2xl font-bold mt-2 text-slate-900">
        {Number(value).toLocaleString()}
      </h2>
    </div>
  );
}

function Level({
  label,
  value,
  color,
}) {
  return (
    <div>
      <p className="text-slate-500 text-sm">
        {label}
      </p>

      <h2
        className={`text-2xl md:text-3xl font-bold ${color}`}
      >
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