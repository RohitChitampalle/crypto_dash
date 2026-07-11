import { useEffect, useState } from "react";
import Select from "react-select";
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Activity,
  Target,
} from "lucide-react";

const API_BASE = "https://www.santoshalgotread.com";

const TIMEFRAMES = [
  "5s",
  "1m",
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "12h",
  "1d",
  "1w",
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [symbol, setSymbol] = useState(
  localStorage.getItem("selectedSymbol") || "BTCUSD"
);

  const [timeframe, setTimeframe] = useState(
  localStorage.getItem("selectedTimeframe") || "5m"
);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/products`
      );

      const data = await res.json();

      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalysis = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/analysis/${symbol}?timeframe=${timeframe}`
      );

      const data = await res.json();

      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchAnalysis();

    const interval = setInterval(() => {
      fetchAnalysis();
    }, 30000);

    return () => clearInterval(interval);
  }, [symbol, timeframe]);

  const options = products.map((p) => ({
    value: p,
    label: p,
  }));

  const market =
    analysis?.market_summary || {};

  const trade =
    analysis?.trade || {};

  const decision =
    analysis?.decision || {};

  const structure =
    analysis?.market_structure || {};

  const isBuy =
    decision.action === "BUY";

    useEffect(() => {
  localStorage.setItem("selectedSymbol", symbol);
}, [symbol]);

useEffect(() => {
  localStorage.setItem("selectedTimeframe", timeframe);
}, [timeframe]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <div className="sticky top-0 z-50 bg-white border-b border-slate-700 shadow-lg">

        <div className="max-w-7xl mx-auto p-4">

          <div className="grid lg:grid-cols-2 gap-4">

            <Select
              options={options}
              isSearchable
              placeholder="Search Product..."
              value={{
                value: symbol,
                label: symbol,
              }}
              onChange={(o) => setSymbol(o.value)}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#1e293b",
                  borderColor: "#475569",
                  color: "#fff",
                  minHeight: 48,
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1e293b",
                  color: "#fff",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "#334155"
                    : "#1e293b",
                  color: "#fff",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                input: (base) => ({
                  ...base,
                  color: "#fff",
                }),
              }}
            />

            <div className="flex flex-wrap gap-2">

              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() =>
                    setTimeframe(tf)
                  }
                  className={`px-4 py-2 rounded-xl font-medium transition ${timeframe === tf
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 border border-slate-700 text-white"
                    }`}
                >
                  {tf}
                </button>
              ))}

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-6">

        {loading ? (
          <div className="text-center text-xl">
            Loading...
          </div>
        ) : (
          <>
            {/* HERO */}

            <div
              className={`rounded-3xl p-8 text-white mb-6 ${isBuy
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-red-500 to-rose-500"
                }`}
            >
              <div className="flex justify-between items-center">

                <div>
                  <h1 className="text-5xl font-bold">
                    {symbol}
                  </h1>

                  <p className="mt-2 text-lg">
                    Timeframe: {timeframe}
                  </p>
                </div>

                <div className="text-right">

                  <h2 className="text-6xl font-bold">
                    {decision.action ||
                      "HOLD"}
                  </h2>

                  <p>
                    {market.trend}
                  </p>

                </div>

              </div>
            </div>

            {/* METRICS */}

            <div className="grid md:grid-cols-4 gap-4 mb-6">

              <MetricCard
                title="Price"
                value={market.price}
                icon={<Activity />}
              />

              <MetricCard
                title="RSI"
                value={market.rsi}
                icon={<TrendingUp />}
              />

              <MetricCard
                title="EMA 9"
                value={market.ema9}
                icon={<TrendingUp />}
              />

              <MetricCard
                title="EMA 20"
                value={market.ema20}
                icon={<TrendingDown />}
              />

            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">

              <MetricCard
                title="ATR"
                value={market.atr}
              />

              <MetricCard
                title="Momentum"
                value={market.momentum}
              />

              <MetricCard
                title="Trend"
                value={market.trend}
              />

            </div>

            {/* MARKET STRUCTURE + TRADE */}

            <div className="grid lg:grid-cols-2 gap-6 mb-6">

              <div className="bg-slate-900 text-white rounded-3xl border border-slate-700 p-6 shadow-lg">

                <h2 style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold"
                }}>
                  MARKET STRUCTURE TEST
                </h2>

                <Row
                  label="Support"
                  value={
                    structure.support
                  }
                />

                <Row
                  label="Resistance"
                  value={
                    structure.resistance
                  }
                />

              </div>

              <div className="bg-slate-900 text-white rounded-3xl border border-slate-700 p-6 shadow-lg">

                <h2 style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold"
                }}>
                  Trade Setup
                </h2>


                <Row
                  label="Entry"
                  value={trade.entry}
                />

                <Row
                  label="Stop Loss"
                  value={
                    trade.stop_loss
                  }
                />

                <Row
                  label="Target 1"
                  value={
                    trade.target_1
                  }
                />

                <Row
                  label="Target 2"
                  value={
                    trade.target_2
                  }
                />

                <Row
                  label="Target 3"
                  value={
                    trade.target_3
                  }
                />

              </div>

            </div>

            {/* AI REASONS */}

            <div className="bg-slate-900 rounded-3xl border border-slate-700 p-6 shadow-lg mb-6">

              <h2 style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                AI Decision Factors
              </h2>



              <div className="grid md:grid-cols-2 gap-4">

                {(decision.reason ||
                  []).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3"
                      >
                        <ShieldCheck
                          size={20}
                        />

                        {item}
                      </div>
                    )
                  )}

              </div>

            </div>

            {/* POTENTIAL MOVE */}

            <div className="bg-slate-900 text-white rounded-3xl border border-slate-700 p-6 shadow-lg">


              <h2 style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                Potential Move
              </h2>



              <div className="space-y-4">

                <ProgressBar
                  title="Upside"
                  value={75}
                />

                <ProgressBar
                  title="Downside"
                  value={25}
                />

              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-lg p-5">

      <div className="flex justify-between items-center mb-3">
        <div className="text-slate-500">
          {title}
        </div>

        {icon}
      </div>

      <div className="text-3xl font-bold text-white">
        {value ?? "-"}
      </div>

    </div>
  );
}

function Row({
  label,
  value,
}) {
  return (
    <div className="flex justify-between py-3 border-b border-slate-700">

      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-bold text-white">
        {value ?? "-"}
      </span>

    </div>
  );
}

function ProgressBar({
  title,
  value,
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{title}</span>
        <span>{value}%</span>
      </div>

      <div className="h-3 bg-slate-200 rounded-full">

        <div
          className="h-3 bg-blue-500 rounded-full"
          style={{
            width: `${value}%`,
          }}
        />

      </div>
    </div>
  );
}