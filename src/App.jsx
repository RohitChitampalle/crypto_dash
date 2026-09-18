import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Gauge,
  LogOut,
  Moon,
  RefreshCw,
  ShieldCheck,
  Sun,
  Target,
  TrendingDown,
  TrendingUp,
  Wifi,
  Zap,
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

/* =========================================================
   GLOBAL THEME CSS
========================================================= */

const themeStyles = `
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
    width: 100%;
  }

  body {
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  .crypto-app {
    min-height: 100vh;
    transition:
      background 0.35s ease,
      color 0.35s ease;
  }

  /* =====================================================
     DARK MODE
  ===================================================== */

  .crypto-app.theme-dark {
    --bg-primary: #080d16;
    --bg-secondary: #0d1421;
    --bg-card: #111a29;
    --bg-card-hover: #162235;
    --bg-input: #0c1523;

    --border: #243247;
    --border-light: #2d3b51;

    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    --text-dim: #64748b;

    --accent: #38bdf8;
    --accent-soft: rgba(56, 189, 248, 0.12);

    --green: #22c55e;
    --green-soft: rgba(34, 197, 94, 0.12);

    --red: #ef4444;
    --red-soft: rgba(239, 68, 68, 0.12);

    --yellow: #f59e0b;
    --yellow-soft: rgba(245, 158, 11, 0.12);

    --purple: #a78bfa;
    --purple-soft: rgba(167, 139, 250, 0.12);

    background: var(--bg-primary);
    color: var(--text-primary);
  }

  /* =====================================================
     NIGHT MODE
  ===================================================== */

  .crypto-app.theme-night {
    --bg-primary: #02040a;
    --bg-secondary: #050812;
    --bg-card: #080d18;
    --bg-card-hover: #0c1422;
    --bg-input: #030711;

    --border: #172235;
    --border-light: #20304a;

    --text-primary: #e8eef7;
    --text-secondary: #aebbd0;
    --text-muted: #718096;
    --text-dim: #4b5b72;

    --accent: #60a5fa;
    --accent-soft: rgba(96, 165, 250, 0.09);

    --green: #22c55e;
    --green-soft: rgba(34, 197, 94, 0.08);

    --red: #f87171;
    --red-soft: rgba(248, 113, 113, 0.08);

    --yellow: #fbbf24;
    --yellow-soft: rgba(251, 191, 36, 0.08);

    --purple: #8b5cf6;
    --purple-soft: rgba(139, 92, 246, 0.08);

    background: var(--bg-primary);
    color: var(--text-primary);
  }

  /* =====================================================
     GLOBAL COMPONENTS
  ===================================================== */

  .theme-bg {
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  .theme-secondary {
    background: var(--bg-secondary);
  }

  .theme-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-primary);
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      transform 0.2s ease;
  }

  .theme-card:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-light);
  }

  .theme-border {
    border-color: var(--border);
  }

  .theme-text {
    color: var(--text-primary);
  }

  .theme-text-secondary {
    color: var(--text-secondary);
  }

  .theme-muted {
    color: var(--text-muted);
  }

  .theme-dim {
    color: var(--text-dim);
  }

  .theme-input {
    background: var(--bg-input);
    border: 1px solid var(--border);
    color: var(--text-primary);
    outline: none;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .theme-input:focus {
    border-color: var(--accent);
  }

  .theme-input::placeholder {
    color: var(--text-dim);
  }

  /* =====================================================
     LOGIN BACKGROUND
  ===================================================== */

  .login-background {
    background:
      radial-gradient(
        circle at 15% 20%,
        rgba(56, 189, 248, 0.12),
        transparent 28%
      ),
      radial-gradient(
        circle at 85% 80%,
        rgba(99, 102, 241, 0.1),
        transparent 30%
      ),
      var(--bg-primary);
    position: relative;
    overflow: hidden;
  }

  .theme-night .login-background {
    background:
      radial-gradient(
        circle at 15% 20%,
        rgba(37, 99, 235, 0.07),
        transparent 25%
      ),
      radial-gradient(
        circle at 85% 80%,
        rgba(79, 70, 229, 0.06),
        transparent 25%
      ),
      #02040a;
  }

  .login-grid {
    position: absolute;
    inset: 0;
    opacity: 0.15;
    background-image:
      linear-gradient(
        rgba(148, 163, 184, 0.08) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(148, 163, 184, 0.08) 1px,
        transparent 1px
      );
    background-size: 50px 50px;
    pointer-events: none;
  }

  .login-card {
    background: rgba(17, 26, 41, 0.88);
    border: 1px solid var(--border);
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.45),
      0 0 80px rgba(56, 189, 248, 0.05);
    backdrop-filter: blur(20px);
  }

  .theme-night .login-card {
    background: rgba(6, 10, 18, 0.94);
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.7),
      0 0 100px rgba(37, 99, 235, 0.04);
  }

  /* =====================================================
     THEME SWITCHER
  ===================================================== */

  .theme-switcher {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    border-radius: 12px;
    background: var(--bg-card);
    border: 1px solid var(--border);
  }

  .theme-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    border-radius: 8px;
    padding: 7px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    color: var(--text-muted);
    background: transparent;
    transition: all 0.2s ease;
  }

  .theme-button:hover {
    color: var(--text-primary);
    background: var(--bg-card-hover);
  }

  .theme-button.active {
    color: var(--text-primary);
    background: var(--accent-soft);
    box-shadow: inset 0 0 0 1px rgba(96, 165, 250, 0.15);
  }

  /* =====================================================
     SCROLLBAR
  ===================================================== */

  .crypto-app ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .crypto-app ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  .crypto-app ::-webkit-scrollbar-thumb {
    background: var(--border-light);
    border-radius: 10px;
  }

  .crypto-app ::-webkit-scrollbar-thumb:hover {
    background: var(--text-dim);
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media (max-width: 768px) {
    .theme-switcher {
      width: 100%;
      justify-content: center;
    }

    .theme-button {
      flex: 1;
      justify-content: center;
    }
  }
`;

/* =========================================================
   THEME SWITCHER
========================================================= */

function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div className="theme-switcher">
      <button
        type="button"
        className={`theme-button ${
          theme === "dark" ? "active" : ""
        }`}
        onClick={() => setTheme("dark")}
      >
        <Sun size={14} />
        Dark
      </button>

      <button
        type="button"
        className={`theme-button ${
          theme === "night" ? "active" : ""
        }`}
        onClick={() => setTheme("night")}
      >
        <Moon size={14} />
        Night
      </button>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatValue(value, decimals = 2) {
  if (value === null || value === undefined || value === "") {
    return "--";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage({ onLogin, theme, setTheme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("cryptoAuthenticated", "true");
      onLogin();
      return;
    }

    setError("Invalid username or password");
  };

  return (
    <div className="crypto-app theme-dark login-background min-h-screen">
      <style>{themeStyles}</style>

      <div className={`crypto-app min-h-screen login-background ${
        theme === "night" ? "theme-night" : "theme-dark"
      }`}>
        <div className="login-grid" />

        <div className="absolute right-6 top-6 z-20">
          <ThemeSwitcher
            theme={theme}
            setTheme={setTheme}
          />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
          <div className="login-card w-full max-w-md rounded-3xl p-8 sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 ring-1 ring-sky-400/20">
                <BarChart3
                  size={30}
                  className="text-sky-400"
                />
              </div>

              <h1 className="text-3xl font-bold theme-text">
                CryptoAI
              </h1>

              <p className="mt-2 text-sm theme-muted">
                AI-powered crypto market analysis
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium theme-text-secondary">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  className="theme-input w-full rounded-xl px-4 py-3.5 text-sm"
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium theme-text-secondary">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="theme-input w-full rounded-xl px-4 py-3.5 pr-12 text-sm"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 theme-muted hover:text-white"
                  >
                    {showPassword ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/10 transition hover:bg-sky-400"
              >
                Sign In
                <ArrowUpRight size={17} />
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2 text-xs theme-muted">
              <ShieldCheck size={14} />
              Secure dashboard access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PANEL
========================================================= */

function Panel({ title, icon, children, className = "" }) {
  return (
    <section
      className={`theme-card rounded-2xl ${className}`}
    >
      <div className="flex items-center gap-3 border-b theme-border px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
          {icon}
        </div>

        <h2 className="text-sm font-semibold theme-text">
          {title}
        </h2>
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  accent = "sky",
}) {
  const accentClasses = {
    sky: "bg-sky-500/10 text-sky-400",
    green: "bg-green-500/10 text-green-400",
    red: "bg-red-500/10 text-red-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="theme-card rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider theme-muted">
          {title}
        </span>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            accentClasses[accent] || accentClasses.sky
          }`}
        >
          {icon}
        </div>
      </div>

      <div className="text-2xl font-bold theme-text">
        {value}
      </div>

      {subtitle && (
        <div className="mt-1 text-xs theme-muted">
          {subtitle}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   LEVEL ROW
========================================================= */

function LevelRow({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between border-b theme-border py-3 last:border-0">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm theme-muted">
          {label}
        </span>
      </div>

      <span className="font-semibold theme-text">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   TRADE LEVEL
========================================================= */

function TradeLevel({
  label,
  value,
  type,
}) {
  const positive = type === "target";
  const negative = type === "stop";

  return (
    <div
      className={`rounded-xl border p-4 ${
        positive
          ? "border-green-500/20 bg-green-500/5"
          : negative
          ? "border-red-500/20 bg-red-500/5"
          : "theme-border"
      }`}
    >
      <div className="mb-1 text-xs theme-muted">
        {label}
      </div>

      <div
        className={`text-lg font-bold ${
          positive
            ? "text-green-400"
            : negative
            ? "text-red-400"
            : "theme-text"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   MOVE BAR
========================================================= */

function MoveBar({
  label,
  value,
  positive,
}) {
  const percentage = Math.min(
    100,
    Math.max(0, Number(value) || 0)
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm theme-muted">
          {label}
        </span>

        <span
          className={
            positive
              ? "text-sm font-semibold text-green-400"
              : "text-sm font-semibold text-red-400"
          }
        >
          {formatValue(value, 2)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            positive
              ? "bg-green-500"
              : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   LOADING SCREEN
========================================================= */

function LoadingScreen({ theme }) {
  return (
    <div
      className={`crypto-app min-h-screen flex items-center justify-center ${
        theme === "night"
          ? "theme-night"
          : "theme-dark"
      } theme-bg`}
    >
      <style>{themeStyles}</style>

      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-sky-500/10">
          <Activity className="text-sky-400" />
        </div>

        <div className="font-semibold theme-text">
          Loading CryptoAI
        </div>

        <div className="mt-1 text-sm theme-muted">
          Preparing market analysis...
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ onLogout, theme, setTheme }) {
  const [symbol, setSymbol] = useState(
    localStorage.getItem("selectedSymbol") || "BTCUSD"
  );

  const [timeframe, setTimeframe] = useState(
    localStorage.getItem("selectedTimeframe") || "5m"
  );

  const [products, setProducts] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("selectedSymbol", symbol);
  }, [symbol]);

  useEffect(() => {
    localStorage.setItem(
      "selectedTimeframe",
      timeframe
    );
  }, [timeframe]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/products`
        );

        if (!response.ok) {
          throw new Error("Unable to load products");
        }

        const data = await response.json();

        const productList =
          data?.data ||
          data?.products ||
          [];

        setProducts(
          productList.map((item) => ({
            value:
              typeof item === "string"
                ? item
                : item.symbol,
            label:
              typeof item === "string"
                ? item
                : item.symbol,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  const fetchAnalysis = async () => {
    try {
      setRefreshing(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/api/analysis/${symbol}?timeframe=${timeframe}`
      );

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status}`
        );
      }

      const data = await response.json();

      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to fetch market analysis."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();

    const interval = setInterval(
      fetchAnalysis,
      30000
    );

    return () => clearInterval(interval);
  }, [symbol, timeframe]);

  if (loading && !analysis) {
    return <LoadingScreen theme={theme} />;
  }

  const decision = analysis?.decision || {};
  const marketStructure =
    analysis?.market_structure || {};
  const marketSummary =
    analysis?.market_summary || {};
  const trade = analysis?.trade || {};

  const action = decision?.action || "HOLD";
  const confidence =
    decision?.confidence ??
    decision?.ml_confidence ??
    0;

  const isBuy = action === "BUY";
  const isSell = action === "SELL";

  const currentPrice =
    marketSummary?.price ??
    marketSummary?.current_price ??
    analysis?.price ??
    "--";

  const ema9 = marketSummary?.ema9;
  const ema20 = marketSummary?.ema20;
  const rsi = marketSummary?.rsi;
  const atr = marketSummary?.atr;
  const momentum = marketSummary?.momentum;
  const trend = marketSummary?.trend;

  return (
    <div
      className={`crypto-app min-h-screen ${
        theme === "night"
          ? "theme-night"
          : "theme-dark"
      } theme-bg`}
    >
      <style>{themeStyles}</style>

      {/* =================================================
          TOP NAV
      ================================================= */}

      <header className="sticky top-0 z-40 border-b theme-border bg-[var(--bg-secondary)]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10">
              <BarChart3
                size={21}
                className="text-sky-400"
              />
            </div>

            <div>
              <div className="font-bold theme-text">
                CryptoAI
              </div>

              <div className="text-[10px] uppercase tracking-widest theme-muted">
                Market Intelligence
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ThemeSwitcher
              theme={theme}
              setTheme={setTheme}
            />

            <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />

            <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>

              <span className="text-xs font-medium text-green-400">
                You are online
              </span>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-xl border theme-border px-3 py-2 text-xs font-medium theme-muted transition hover:bg-[var(--bg-card-hover)] hover:text-white"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6 lg:py-8">

        {/* =================================================
            MARKET TOOLBAR
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest theme-muted">
                Market Analysis
              </span>

              <span className="rounded-md bg-sky-500/10 px-2 py-1 text-[10px] font-semibold text-sky-400">
                LIVE
              </span>
            </div>

            <h1 className="mt-1 text-2xl font-bold theme-text sm:text-3xl">
              {symbol}
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="min-w-[220px]">
              <Select
                value={
                  products.find(
                    (p) => p.value === symbol
                  ) || {
                    value: symbol,
                    label: symbol,
                  }
                }
                options={products}
                onChange={(option) =>
                  option &&
                  setSymbol(option.value)
                }
                isSearchable
                classNamePrefix="crypto-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "44px",
                    backgroundColor:
                      "var(--bg-input)",
                    borderColor:
                      "var(--border)",
                    boxShadow: "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor:
                      "var(--bg-card)",
                    border:
                      "1px solid var(--border)",
                    zIndex: 100,
                  }),
                  option: (
                    base,
                    state
                  ) => ({
                    ...base,
                    backgroundColor:
                      state.isFocused
                        ? "var(--bg-card-hover)"
                        : "var(--bg-card)",
                    color:
                      "var(--text-primary)",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color:
                      "var(--text-primary)",
                  }),
                  input: (base) => ({
                    ...base,
                    color:
                      "var(--text-primary)",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color:
                      "var(--text-muted)",
                  }),
                }}
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto rounded-xl border theme-border bg-[var(--bg-card)] p-1">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() =>
                    setTimeframe(tf)
                  }
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    timeframe === tf
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/10"
                      : "theme-muted hover:bg-[var(--bg-card-hover)] hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <button
              onClick={fetchAnalysis}
              disabled={refreshing}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border theme-border bg-[var(--bg-card)] px-4 text-xs font-semibold theme-text transition hover:bg-[var(--bg-card-hover)] disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            PRICE + AI DECISION
        ================================================= */}

        <div className="mb-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="theme-card overflow-hidden rounded-2xl">
            <div className="p-6 sm:p-7">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest theme-muted">
                <CircleDollarSign size={15} />
                Current Price
              </div>

              <div className="flex flex-wrap items-end gap-4">
                <div className="text-4xl font-bold tracking-tight theme-text sm:text-5xl">
                  {formatValue(
                    currentPrice,
                    2
                  )}
                </div>

                <div className="pb-1 text-sm theme-muted">
                  {symbol}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-xl border theme-border bg-[var(--bg-input)] px-4 py-3">
                  <div className="text-[10px] uppercase tracking-wider theme-muted">
                    Trend
                  </div>
                  <div className="mt-1 text-sm font-semibold theme-text">
                    {trend || "--"}
                  </div>
                </div>

                <div className="rounded-xl border theme-border bg-[var(--bg-input)] px-4 py-3">
                  <div className="text-[10px] uppercase tracking-wider theme-muted">
                    Timeframe
                  </div>
                  <div className="mt-1 text-sm font-semibold theme-text">
                    {timeframe}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-2xl border p-6 ${
              isBuy
                ? "border-green-500/20 bg-green-500/5"
                : isSell
                ? "border-red-500/20 bg-red-500/5"
                : "border-yellow-500/20 bg-yellow-500/5"
            }`}
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-current opacity-[0.03] blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest theme-muted">
                <Brain size={15} />
                AI Decision
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                    isBuy
                      ? "bg-green-500/10 text-green-400"
                      : isSell
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {isBuy ? (
                    <TrendingUp size={30} />
                  ) : isSell ? (
                    <TrendingDown size={30} />
                  ) : (
                    <Activity size={30} />
                  )}
                </div>

                <div>
                  <div
                    className={`text-4xl font-black ${
                      isBuy
                        ? "text-green-400"
                        : isSell
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {action}
                  </div>

                  <div className="mt-1 text-sm theme-muted">
                    Confidence:{" "}
                    <span className="font-semibold theme-text">
                      {formatValue(
                        confidence,
                        1
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {decision?.reason && (
                <div className="mt-5 rounded-xl border theme-border bg-[var(--bg-input)] p-3 text-sm theme-secondary">
                  {Array.isArray(
                    decision.reason
                  ) ? (
                    <ul className="space-y-1">
                      {decision.reason.map(
                        (reason, index) => (
                          <li
                            key={index}
                            className="theme-muted"
                          >
                            • {reason}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <span className="theme-muted">
                      {decision.reason}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            TECHNICAL METRICS
        ================================================= */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-6">
          <MetricCard
            title="RSI"
            value={formatValue(rsi, 2)}
            subtitle="Relative Strength"
            icon={<Gauge size={17} />}
            accent="purple"
          />

          <MetricCard
            title="EMA 9"
            value={formatValue(ema9, 2)}
            subtitle="Fast average"
            icon={<TrendingUp size={17} />}
            accent="sky"
          />

          <MetricCard
            title="EMA 20"
            value={formatValue(ema20, 2)}
            subtitle="Slow average"
            icon={<TrendingDown size={17} />}
            accent="yellow"
          />

          <MetricCard
            title="ATR"
            value={formatValue(atr, 2)}
            subtitle="Volatility"
            icon={<Activity size={17} />}
            accent="red"
          />

          <MetricCard
            title="Momentum"
            value={formatValue(momentum, 2)}
            subtitle="Price momentum"
            icon={<Zap size={17} />}
            accent="green"
          />

          <MetricCard
            title="Trend"
            value={trend || "--"}
            subtitle="Market direction"
            icon={<BarChart3 size={17} />}
            accent="sky"
          />
        </div>

        {/* =================================================
            MARKET STRUCTURE + TRADE SETUP
        ================================================= */}

        <div className="mb-6 grid gap-5 lg:grid-cols-2">
          <Panel
            title="Market Structure"
            icon={<BarChart3 size={16} />}
          >
            <div className="space-y-1">
              <LevelRow
                label="Resistance"
                value={formatValue(
                  marketStructure?.resistance,
                  2
                )}
                icon={
                  <ArrowUpRight
                    size={16}
                    className="text-red-400"
                  />
                }
              />

              <LevelRow
                label="Current Price"
                value={formatValue(
                  currentPrice,
                  2
                )}
                icon={
                  <CircleDollarSign
                    size={16}
                    className="text-sky-400"
                  />
                }
              />

              <LevelRow
                label="Support"
                value={formatValue(
                  marketStructure?.support,
                  2
                )}
                icon={
                  <ArrowDownRight
                    size={16}
                    className="text-green-400"
                  />
                }
              />
            </div>
          </Panel>

          <Panel
            title="Trade Setup"
            icon={<Target size={16} />}
          >
            <div className="grid grid-cols-2 gap-3">
              <TradeLevel
                label="Entry"
                value={formatValue(
                  trade?.entry ??
                    trade?.entry_price ??
                    currentPrice,
                  2
                )}
              />

              <TradeLevel
                label="Stop Loss"
                value={formatValue(
                  trade?.stop_loss ??
                    trade?.sl,
                  2
                )}
                type="stop"
              />

              <TradeLevel
                label="Target 1"
                value={formatValue(
                  trade?.target1 ??
                    trade?.target_1,
                  2
                )}
                type="target"
              />

              <TradeLevel
                label="Target 2"
                value={formatValue(
                  trade?.target2 ??
                    trade?.target_2,
                  2
                )}
                type="target"
              />

              <TradeLevel
                label="Target 3"
                value={formatValue(
                  trade?.target3 ??
                    trade?.target_3,
                  2
                )}
                type="target"
              />
            </div>
          </Panel>
        </div>

        {/* =================================================
            AI DECISION FACTORS
        ================================================= */}

        <div className="mb-6">
          <Panel
            title="AI Decision Factors"
            icon={<Brain size={16} />}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-4">
                <div className="mb-2 text-xs theme-muted">
                  EMA Relationship
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold theme-text">
                  {ema9 != null &&
                  ema20 != null &&
                  Number(ema9) >
                    Number(ema20) ? (
                    <>
                      <TrendingUp
                        size={16}
                        className="text-green-400"
                      />
                      Bullish
                    </>
                  ) : (
                    <>
                      <TrendingDown
                        size={16}
                        className="text-red-400"
                      />
                      Bearish
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-4">
                <div className="mb-2 text-xs theme-muted">
                  RSI
                </div>

                <div className="text-sm font-semibold theme-text">
                  {rsi != null
                    ? Number(rsi) < 30
                      ? "Oversold"
                      : Number(rsi) > 70
                      ? "Overbought"
                      : "Neutral"
                    : "--"}
                </div>
              </div>

              <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-4">
                <div className="mb-2 text-xs theme-muted">
                  Momentum
                </div>

                <div className="text-sm font-semibold theme-text">
                  {momentum != null
                    ? Number(momentum) > 0
                      ? "Positive"
                      : Number(momentum) < 0
                      ? "Negative"
                      : "Neutral"
                    : "--"}
                </div>
              </div>

              <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-4">
                <div className="mb-2 text-xs theme-muted">
                  Model Status
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
                  <CheckCircle2 size={16} />
                  Active
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* =================================================
            POTENTIAL MOVE
        ================================================= */}

        <Panel
          title="Potential Move"
          icon={<TrendingUp size={16} />}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <MoveBar
              label="Upside Potential"
              value={
                trade?.upside ??
                trade?.potential_upside ??
                0
              }
              positive
            />

            <MoveBar
              label="Downside Risk"
              value={
                trade?.downside ??
                trade?.potential_downside ??
                0
              }
              positive={false}
            />
          </div>
        </Panel>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t theme-border pt-5 text-xs theme-muted sm:flex-row">
          <div>
            CryptoAI Market Intelligence
          </div>

          <div className="flex items-center gap-2">
            <Wifi size={13} />
            Live data • Auto refresh 30s
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [authenticated, setAuthenticated] =
    useState(
      sessionStorage.getItem(
        "cryptoAuthenticated"
      ) === "true"
    );

  const [theme, setTheme] = useState(
    localStorage.getItem("cryptoTheme") ||
      "dark"
  );

  useEffect(() => {
    localStorage.setItem(
      "cryptoTheme",
      theme
    );

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    document.body.style.backgroundColor =
      theme === "night"
        ? "#02040a"
        : "#080d16";

    document.body.style.color =
      theme === "night"
        ? "#e8eef7"
        : "#f8fafc";
  }, [theme]);

  const handleLogout = () => {
    sessionStorage.removeItem(
      "cryptoAuthenticated"
    );

    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <LoginPage
        onLogin={() => setAuthenticated(true)}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  return (
    <Dashboard
      onLogout={handleLogout}
      theme={theme}
      setTheme={setTheme}
    />
  );
}

