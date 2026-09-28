import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Activity,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  GripVertical,
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
     DAY MODE
  ===================================================== */

  .crypto-app.theme-day {
    --bg-primary: #f6f8fb;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --bg-card-hover: #f1f5f9;
    --bg-input: #f8fafc;

    --border: #e2e8f0;
    --border-light: #cbd5e1;

    --text-primary: #0f172a;
    --text-secondary: #334155;
    --text-muted: #64748b;
    --text-dim: #94a3b8;

    --accent: #0284c7;
    --accent-soft: rgba(2, 132, 199, 0.10);

    --green: #16a34a;
    --green-soft: rgba(22, 163, 74, 0.10);

    --red: #dc2626;
    --red-soft: rgba(220, 38, 38, 0.10);

    --yellow: #d97706;
    --yellow-soft: rgba(217, 119, 6, 0.10);

    --purple: #7c3aed;
    --purple-soft: rgba(124, 58, 237, 0.10);

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
     DAY MODE LOGIN
  ===================================================== */

  .crypto-app.theme-day .login-page {
    background:
      radial-gradient(circle at 15% 15%, rgba(2, 132, 199, 0.10), transparent 32%),
      radial-gradient(circle at 85% 80%, rgba(124, 58, 237, 0.08), transparent 30%),
      #f6f8fb;
  }

  .crypto-app.theme-day .login-card {
    background: rgba(255, 255, 255, 0.97);
    border: 1px solid #dbe4ee;
    box-shadow:
      0 24px 70px rgba(15, 23, 42, 0.12),
      0 4px 16px rgba(15, 23, 42, 0.05);
  }

  .crypto-app.theme-day .login-brand-icon {
    background: linear-gradient(135deg, #0284c7, #2563eb);
    color: #fff;
    box-shadow: 0 10px 24px rgba(2, 132, 199, 0.22);
  }

  .crypto-app.theme-day .login-title {
    color: #0f172a;
  }

  .crypto-app.theme-day .login-subtitle {
    color: #64748b;
  }

  .crypto-app.theme-day .login-label {
    color: #334155;
  }

  .crypto-app.theme-day .login-input-wrap {
    background: #f8fafc;
    border: 1px solid #dbe4ee;
  }

  .crypto-app.theme-day .login-input-wrap:focus-within {
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.10);
    background: #fff;
  }

  .crypto-app.theme-day .login-input {
    color: #0f172a;
  }

  .crypto-app.theme-day .login-input::placeholder {
    color: #94a3b8;
  }

  .crypto-app.theme-day .login-input-icon {
    color: #64748b;
  }

  .crypto-app.theme-day .login-submit {
    background: linear-gradient(135deg, #0284c7, #2563eb);
    color: #fff;
    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.20);
  }

  .crypto-app.theme-day .login-submit:hover {
    box-shadow: 0 14px 28px rgba(37, 99, 235, 0.26);
    transform: translateY(-1px);
  }

  .crypto-app.theme-day .login-security {
    color: #64748b;
    background: #f8fafc;
    border-color: #e2e8f0;
  }

  .crypto-app.theme-day .login-security svg {
    color: #16a34a;
  }

  .crypto-app.theme-day .login-footer {
    color: #94a3b8;
    border-top-color: #e2e8f0;
  }

  /* =====================================================
     AI TREND MARKET CHART
  ===================================================== */

  .ai-chart-grid {
    stroke: var(--border);
    stroke-width: 1;
    stroke-dasharray: 4 5;
  }

  .ai-chart-line {
    fill: none;
    stroke: var(--accent);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .ai-chart-area {
    fill: var(--accent-soft);
  }

  .ai-chart-label {
    fill: var(--text-muted);
    font-size: 12px;
  }

  .ai-chart-value {
    fill: var(--text-primary);
    font-size: 12px;
    font-weight: 700;
  }

  .ai-chart-level {
    stroke: var(--text-muted);
    stroke-width: 1.5;
    stroke-dasharray: 7 5;
    opacity: 0.8;
  }

  .ai-chart-point {
    fill: var(--bg-card);
    stroke: var(--accent);
    stroke-width: 3;
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

  .mobile-sidebar-open {
  position: fixed;
  left: 14px;
  top: 14px;
  z-index: 1100;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border, #dbe2ea);
  border-radius: 12px;
  background: var(--panel, #ffffff);
  color: inherit;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(15,23,42,.14);
}
.mobile-sidebar-open:hover { transform: translateY(-1px); }
@media (min-width: 769px) { .mobile-sidebar-open { display: none; } }

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
          theme === "day" ? "active" : ""
        }`}
        onClick={() => setTheme("day")}
      >
        <Sun size={14} />
        Day
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
        theme === "night" ? "theme-night" : "theme-day"
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

      <div className="login-title text-2xl font-bold theme-text">
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
        <span className="login-subtitle text-sm theme-muted">
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
   AI TREND MARKET CHART
========================================================= */

function AITrendMarketChart({
  currentPrice,
  ema9,
  ema20,
  support,
  resistance,
  action,
  trend,
}) {
  const price = Number(currentPrice);
  const fastEma = Number(ema9);
  const slowEma = Number(ema20);
  const supportValue = Number(support);
  const resistanceValue = Number(resistance);

  const values = [
    price,
    fastEma,
    slowEma,
    supportValue,
    resistanceValue,
  ].filter((value) => Number.isFinite(value));

  if (!values.length) {
    return null;
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const difference = maxValue - minValue;
  const padding =
    difference > 0
      ? difference * 0.12
      : Math.max(Math.abs(maxValue) * 0.001, 1);

  const chartMin = minValue - padding;
  const chartMax = maxValue + padding;

  const width = 900;
  const height = 320;
  const left = 70;
  const right = 30;
  const top = 30;
  const bottom = 50;

  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const getY = (value) => {
    if (chartMax === chartMin) {
      return height / 2;
    }

    return (
      top +
      ((chartMax - value) /
        (chartMax - chartMin)) *
        plotHeight
    );
  };

  const chartPoints = [];

  if (Number.isFinite(slowEma)) {
    chartPoints.push({
      label: "EMA20",
      value: slowEma,
    });
  }

  if (Number.isFinite(fastEma)) {
    chartPoints.push({
      label: "EMA9",
      value: fastEma,
    });
  }

  if (Number.isFinite(price)) {
    chartPoints.push({
      label: "Current Price",
      value: price,
    });
  }

  const pointCoords = chartPoints.map(
    (point, index) => {
      const x =
        chartPoints.length === 1
          ? left + plotWidth / 2
          : left +
            (plotWidth /
              (chartPoints.length - 1)) *
              index;

      return {
        ...point,
        x,
        y: getY(point.value),
      };
    }
  );

  const linePath = pointCoords
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  const areaPath =
    pointCoords.length >= 2
      ? `${linePath}
         L ${pointCoords[pointCoords.length - 1].x} ${
          top + plotHeight
        }
         L ${pointCoords[0].x} ${
          top + plotHeight
        }
         Z`
      : "";

  const gridValues = Array.from(
    { length: 5 },
    (_, index) =>
      chartMax -
      ((chartMax - chartMin) / 4) *
        index
  );

  const normalizedTrend = String(
    trend || ""
  ).toLowerCase();

  const bullish =
    action === "BUY" ||
    normalizedTrend.includes("bull");

  const bearish =
    action === "SELL" ||
    normalizedTrend.includes("bear");

  const direction = bullish
    ? "Bullish"
    : bearish
    ? "Bearish"
    : "Neutral";

  const directionClass = bullish
    ? "text-green-400"
    : bearish
    ? "text-red-400"
    : "text-yellow-400";

  const formatPrice = (value) => {
    if (!Number.isFinite(value)) {
      return "--";
    }

    return Number(value).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  return (
    <div className="theme-card mb-6 overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b theme-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
            <Brain size={16} />
          </div>

          <div>
            <h2 className="text-sm font-semibold theme-text">
              AI Trend Market Chart
            </h2>

            <div className="mt-0.5 text-[11px] theme-muted">
              EMA trend and current market structure
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${
            bullish
              ? "bg-green-500/10 text-green-400"
              : bearish
              ? "bg-red-500/10 text-red-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {bullish ? (
            <TrendingUp size={15} />
          ) : bearish ? (
            <TrendingDown size={15} />
          ) : (
            <Activity size={15} />
          )}

          AI TREND: {direction.toUpperCase()}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="w-full overflow-x-auto rounded-xl border theme-border bg-[var(--bg-input)] p-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-[300px] w-full min-w-[680px]"
            role="img"
            aria-label="AI Trend Market Chart"
          >
            {gridValues.map(
              (value, index) => {
                const y = getY(value);

                return (
                  <g key={`grid-${index}`}>
                    <line
                      x1={left}
                      x2={width - right}
                      y1={y}
                      y2={y}
                      className="ai-chart-grid"
                    />

                    <text
                      x={left - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="ai-chart-label"
                    >
                      {formatPrice(value)}
                    </text>
                  </g>
                );
              }
            )}

            {Number.isFinite(
              resistanceValue
            ) && (
              <g>
                <line
                  x1={left}
                  x2={width - right}
                  y1={getY(resistanceValue)}
                  y2={getY(resistanceValue)}
                  className="ai-chart-level"
                />

                <text
                  x={width - right}
                  y={
                    getY(resistanceValue) - 8
                  }
                  textAnchor="end"
                  className="ai-chart-label"
                >
                  Resistance{" "}
                  {formatPrice(resistanceValue)}
                </text>
              </g>
            )}

            {Number.isFinite(
              supportValue
            ) && (
              <g>
                <line
                  x1={left}
                  x2={width - right}
                  y1={getY(supportValue)}
                  y2={getY(supportValue)}
                  className="ai-chart-level"
                />

                <text
                  x={width - right}
                  y={getY(supportValue) + 18}
                  textAnchor="end"
                  className="ai-chart-label"
                >
                  Support{" "}
                  {formatPrice(supportValue)}
                </text>
              </g>
            )}

            {areaPath && (
              <path
                d={areaPath}
                className="ai-chart-area"
              />
            )}

            {linePath && (
              <path
                d={linePath}
                className="ai-chart-line"
              />
            )}

            {pointCoords.map(
              (point, index) => (
                <g
                  key={`point-${index}`}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    className="ai-chart-point"
                  />

                  <text
                    x={point.x}
                    y={Math.max(
                      point.y - 14,
                      18
                    )}
                    textAnchor="middle"
                    className="ai-chart-value"
                  >
                    {formatPrice(
                      point.value
                    )}
                  </text>

                  <text
                    x={point.x}
                    y={height - 15}
                    textAnchor="middle"
                    className="ai-chart-label"
                  >
                    {point.label}
                  </text>
                </g>
              )
            )}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-3">
            <div className="text-[10px] uppercase tracking-wider theme-muted">
              EMA20
            </div>
            <div className="mt-1 font-bold theme-text">
              {formatPrice(slowEma)}
            </div>
          </div>

          <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-3">
            <div className="text-[10px] uppercase tracking-wider theme-muted">
              EMA9
            </div>
            <div className="mt-1 font-bold theme-text">
              {formatPrice(fastEma)}
            </div>
          </div>

          <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-3">
            <div className="text-[10px] uppercase tracking-wider theme-muted">
              Current Price
            </div>
            <div className="mt-1 font-bold text-sky-400">
              {formatPrice(price)}
            </div>
          </div>

          <div className="rounded-xl border theme-border bg-[var(--bg-input)] p-3">
            <div className="text-[10px] uppercase tracking-wider theme-muted">
              AI Direction
            </div>
            <div
              className={`mt-1 font-bold ${directionClass}`}
            >
              {direction}
            </div>
          </div>
        </div>

        <div className="mt-3 text-center text-[11px] theme-dim">
          Live market snapshot from the analysis API.
        </div>
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
          : "theme-day"
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
          : "theme-day"
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
            AI TREND MARKET CHART
        ================================================= */}

        <AITrendMarketChart
          currentPrice={currentPrice}
          ema9={ema9}
          ema20={ema20}
          support={marketStructure?.support}
          resistance={marketStructure?.resistance}
          action={action}
          trend={trend}
        />

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



const MARKET_SIDEBAR_CSS = `
.market-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: var(--panel, #ffffff);
  border-right: 1px solid var(--border, #dbe2ea);
  box-shadow: 4px 0 18px rgba(15, 23, 42, 0.06);
  transition: width 0.18s ease;
  overflow: visible;
}
.market-sidebar.collapsed { width: 72px !important; }
.market-sidebar-header {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 14px;
  border-bottom: 1px solid var(--border, #dbe2ea);
}
.market-sidebar-title { font-size: 11px; font-weight: 800; letter-spacing: .12em; opacity: .55; }
.market-sidebar-subtitle { font-size: 15px; font-weight: 800; margin-top: 3px; white-space: nowrap; }
.market-sidebar-toggle {
  border: 0; background: transparent; cursor: pointer; padding: 8px; border-radius: 9px;
  color: inherit; display: grid; place-items: center;
}
.market-sidebar-toggle:hover { background: rgba(100,116,139,.10); }
.market-sidebar-items { padding: 16px 10px; display: grid; gap: 8px; }
.market-sidebar-item {
  width: 100%; min-height: 52px; border: 0; border-radius: 12px; background: transparent;
  color: inherit; display: flex; align-items: center; gap: 12px; padding: 10px 12px;
  cursor: pointer; text-align: left; font-size: 14px; font-weight: 700;
}
.market-sidebar-item:hover { background: rgba(100,116,139,.09); }
.market-sidebar-item.active { background: #2563eb; color: #fff; box-shadow: 0 8px 18px rgba(37,99,235,.22); }
.market-sidebar.collapsed .market-sidebar-item { justify-content: center; padding: 10px; }
.market-sidebar-icon { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; flex: 0 0 auto; font-weight: 900; background: rgba(100,116,139,.12); }
.market-sidebar-item.active .market-sidebar-icon { background: rgba(255,255,255,.18); }
.market-sidebar-footer { position: absolute; left: 12px; right: 12px; bottom: 18px; display: flex; align-items: center; gap: 8px; font-size: 11px; opacity: .65; }
.market-online-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgba(34,197,94,.12); }
.market-sidebar-resizer { position: absolute; top: 0; right: -8px; width: 16px; height: 100%; cursor: col-resize; display: grid; place-items: center; opacity: 0; color: #64748b; }
.market-sidebar:hover .market-sidebar-resizer { opacity: .55; }
.market-content { margin-left: var(--market-sidebar-width, 280px); min-height: 100vh; }
.mobile-sidebar-open { display: none; }
.indian-dashboard { overflow-x: hidden; }
.market-placeholder { min-height: 100vh; padding: 48px; display: grid; place-items: center; background: var(--page-bg, #f6f8fb); }
.market-placeholder-card { width: min(900px, 100%); border: 1px solid var(--border, #dbe2ea); border-radius: 22px; padding: 42px; background: var(--panel, #fff); box-shadow: 0 18px 50px rgba(15,23,42,.08); }
.market-placeholder-icon { width: 58px; height: 58px; border-radius: 16px; display: grid; place-items: center; background: #2563eb; color: #fff; font-size: 28px; font-weight: 900; }
.market-placeholder-card h1 { margin: 22px 0 8px; font-size: 30px; }
.market-placeholder-card p { margin: 0; max-width: 680px; line-height: 1.6; opacity: .7; }
.market-placeholder-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 30px; }
.market-placeholder-grid > div { padding: 18px; border: 1px solid var(--border, #dbe2ea); border-radius: 14px; }
.market-placeholder-grid strong, .market-placeholder-grid span { display: block; }
.market-placeholder-grid span { margin-top: 5px; font-size: 12px; opacity: .6; }
@media (max-width: 1100px) and (min-width: 769px) {
  .market-sidebar { width: 240px !important; }
  .market-content { margin-left: 240px !important; }
  .indian-dashboard { padding-left: 18px !important; padding-right: 18px !important; }
  .indian-controls-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .indian-metrics-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  .indian-chart-grid { grid-template-columns: minmax(0, 1fr) !important; }
  .indian-snapshot-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
}

@media (max-width: 768px) {
  .market-sidebar {
    width: min(86vw, 320px) !important;
    transform: translateX(0);
    box-shadow: 8px 0 28px rgba(15,23,42,.16);
  }
  .market-sidebar.collapsed {
    transform: translateX(-105%);
    width: min(86vw, 320px) !important;
    pointer-events: none;
  }
  .market-sidebar.collapsed .market-sidebar-toggle { pointer-events: none; }
  .market-sidebar .market-sidebar-resizer { display: none; }

  .mobile-sidebar-open {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1100;
    display: flex;
    align-items: center;
    gap: 7px;
    min-height: 46px;
    padding: 0 14px 0 11px;
    border: 1px solid rgba(37, 99, 235, .20);
    border-left: 0;
    border-radius: 0 14px 14px 0;
    background: rgba(255,255,255,.96);
    color: #2563eb;
    box-shadow: 0 8px 24px rgba(15,23,42,.14);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    cursor: pointer;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .01em;
  }
  .mobile-sidebar-open:active { transform: translateY(-50%) scale(.97); }
  .crypto-app.theme-night .mobile-sidebar-open {
    background: rgba(10,16,27,.96);
    border-color: rgba(59,130,246,.28);
    color: #60a5fa;
    box-shadow: 0 10px 28px rgba(0,0,0,.35);
  }

  .market-content { margin-left: 0 !important; width: 100%; }
  .indian-dashboard { padding: 14px 12px 24px !important; }
  .indian-dashboard h1 { font-size: 22px !important; }
  .indian-dashboard button { max-width: 100%; }
  .indian-controls-grid { grid-template-columns: 1fr !important; }
  .indian-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .indian-chart-grid { grid-template-columns: 1fr !important; }
  .indian-snapshot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .indian-support-grid { grid-template-columns: 1fr 1fr !important; }

  .market-sidebar-header { height: 68px; padding: 0 12px; }
  .market-sidebar-items { padding: 12px 9px; }
  .market-sidebar-item { min-height: 48px; }
}

@media (max-width: 420px) {
  .indian-metrics-grid { grid-template-columns: 1fr !important; }
  .indian-snapshot-grid { grid-template-columns: 1fr !important; }
  .indian-support-grid { grid-template-columns: 1fr !important; }
}

`;

function MarketSidebarStyles() {
  return <style>{MARKET_SIDEBAR_CSS}</style>;
}

/* =========================================================
   MARKET ALGO SIDEBAR
========================================================= */

const MARKET_ALGOS = [
  {
    id: "crypto",
    label: "Crypto Analysis Algo",
    icon: "₿",
  },
  {
    id: "indian",
    label: "Indian Analysis Algo",
    icon: "₹",
  },
];

function IndianAnalysisDashboard({ onLogout, theme, setTheme }) {
  const [exchange, setExchange] = useState(localStorage.getItem("kiteExchange") || "NSE");
  const [category, setCategory] = useState(localStorage.getItem("kiteCategory") || "ALL");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try { return JSON.parse(localStorage.getItem("kiteSelectedProduct") || "null"); } catch { return null; }
  });
  const [interval, setIntervalValue] = useState(localStorage.getItem("kiteInterval") || "5minute");
  const [chart, setChart] = useState([]);
  const [profile, setProfile] = useState(null);
  const [connected, setConnected] = useState(false);
  const [checkingConnection, setCheckingConnection] = useState(true);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const isNight = theme === "night";
  const bg = isNight ? "#02040a" : "#f5f7fb";
  const card = isNight ? "#0a101b" : "#ffffff";
  const card2 = isNight ? "#0d1522" : "#f8fafc";
  const border = isNight ? "#1d2939" : "#e2e8f0";
  const text = isNight ? "#edf2f7" : "#0f172a";
  const muted = isNight ? "#8b9bb0" : "#64748b";
  const green = "#22c55e";
  const red = "#ef4444";
  const blue = "#3b82f6";

  const normalizeProducts = (payload) => {
    const raw = payload?.data?.products || payload?.data?.items || payload?.data || payload?.products || [];
    return Array.isArray(raw) ? raw : [];
  };

  const normalizeChart = (payload) => {
    const raw = payload?.data?.candles || payload?.data?.chart || payload?.data || payload?.candles || [];
    return Array.isArray(raw) ? raw.map(c => ({
      timestamp: c.timestamp || c.date || c.time,
      open: Number(c.open), high: Number(c.high), low: Number(c.low), close: Number(c.close),
      volume: Number(c.volume || 0), oi: Number(c.oi || 0)
    })).filter(c => [c.open,c.high,c.low,c.close].every(Number.isFinite)) : [];
  };

  const loadProfile = async (showError = false) => {
    setCheckingConnection(true);
    try {
      const res = await fetch(`${API_BASE}/api/kite/profile`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Zerodha is not connected");
      setProfile(json.data || null);
      setConnected(true);
      setError("");
      return true;
    } catch (e) {
      setConnected(false);
      setProfile(null);
      if (showError) setError(e.message || "Unable to connect to Zerodha");
      return false;
    } finally {
      setCheckingConnection(false);
    }
  };

  const loadProducts = async () => {
    setLoadingProducts(true); setError("");
    try {
      const params = new URLSearchParams({ exchange, category, page: "1", limit: "500" });
      if (search.trim()) params.set("search", search.trim());
      const res = await fetch(`${API_BASE}/api/kite/products?${params.toString()}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load products");
      const list = normalizeProducts(json); setProducts(list);
      if (selectedProduct) {
        const exists = list.some(p => p.tradingsymbol === selectedProduct.tradingsymbol && p.exchange === selectedProduct.exchange);
        if (!exists && list.length) setSelectedProduct(list[0]);
      } else if (list.length) {
        const nifty = list.find(p => p.tradingsymbol === "NIFTY 50");
        setSelectedProduct(nifty || list[0]);
      }
    } catch (e) { setProducts([]); setError(e.message || "Unable to load Indian market products"); }
    finally { setLoadingProducts(false); }
  };

  const loadChart = async (product = selectedProduct) => {
    if (!product?.tradingsymbol) return;
    setLoadingChart(true); setError("");
    try {
      const params = new URLSearchParams({ exchange: product.exchange || exchange, symbol: product.tradingsymbol, interval });
      const res = await fetch(`${API_BASE}/api/kite/chart?${params.toString()}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Unable to load chart");
      setChart(normalizeChart(json)); setLastUpdated(new Date());
    } catch (e) { setChart([]); setError(e.message || "Unable to load chart data"); }
    finally { setLoadingChart(false); }
  };

  useEffect(() => { loadProfile(false); }, []);
  useEffect(() => { localStorage.setItem("kiteExchange", exchange); if (connected) loadProducts(); }, [exchange, category, connected]);
  useEffect(() => { localStorage.setItem("kiteCategory", category); }, [category]);
  useEffect(() => {
    if (!search.trim()) return;
    const timer = setTimeout(loadProducts, 350);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (!selectedProduct) return;
    localStorage.setItem("kiteSelectedProduct", JSON.stringify(selectedProduct));
    loadChart(selectedProduct);
  }, [selectedProduct, interval]);
  useEffect(() => { localStorage.setItem("kiteInterval", interval); }, [interval]);
  useEffect(() => {
    if (!selectedProduct) return;
    const timer = setInterval(() => loadChart(selectedProduct), 30000);
    return () => clearInterval(timer);
  }, [selectedProduct, interval]);

  const options = products.map((p, i) => ({
    value: `${p.exchange}:${p.tradingsymbol}:${p.instrument_type || ""}:${p.expiry || ""}:${p.strike || ""}:${i}`,
    label: `${p.tradingsymbol}${p.name && p.name !== p.tradingsymbol ? ` — ${p.name}` : ""}${p.instrument_type ? ` · ${p.instrument_type}` : ""}`,
    product: p
  }));
  const selectedOption = selectedProduct ? options.find(o => o.product.tradingsymbol === selectedProduct.tradingsymbol && o.product.exchange === selectedProduct.exchange) || { value: `${selectedProduct.exchange}:${selectedProduct.tradingsymbol}`, label: selectedProduct.tradingsymbol, product: selectedProduct } : null;

  const closes = chart.map(c => c.close).filter(Number.isFinite);
  const last = closes.at(-1) || 0;
  const previous = closes.length > 1 ? closes.at(-2) : last;
  const change = previous ? ((last - previous) / previous) * 100 : 0;
  const high = chart.length ? Math.max(...chart.map(c => c.high)) : 0;
  const low = chart.length ? Math.min(...chart.map(c => c.low)) : 0;
  const volumes = chart.map(c => c.volume).filter(Number.isFinite);
  const volume = volumes.at(-1) || 0;
  const avgVolume = volumes.length ? volumes.slice(-20).reduce((a,b) => a+b, 0) / Math.min(20, volumes.length) : 0;

  const ema = (period) => {
    if (!closes.length) return 0;
    const k = 2 / (period + 1);
    let value = closes[0];
    closes.forEach(v => { value = v * k + value * (1-k); });
    return value;
  };
  const ema9 = ema(9);
  const ema20 = ema(20);
  const gains = [], losses = [];
  for (let i = Math.max(1, closes.length - 15); i < closes.length; i++) {
    const d = closes[i] - closes[i-1]; if (d >= 0) gains.push(d); else losses.push(Math.abs(d));
  }
  const avgGain = gains.length ? gains.reduce((a,b)=>a+b,0)/gains.length : 0;
  const avgLoss = losses.length ? losses.reduce((a,b)=>a+b,0)/losses.length : 0;
  const rsi = avgLoss === 0 ? (avgGain ? 100 : 50) : 100 - (100 / (1 + avgGain / avgLoss));
  const atr = chart.length ? chart.slice(-14).reduce((sum,c) => sum + (c.high-c.low), 0) / Math.min(14, chart.length) : 0;
  const momentum = closes.length > 5 ? ((last - closes[Math.max(0, closes.length-6)]) / closes[Math.max(0, closes.length-6)]) * 100 : 0;
  const bullish = ema9 > ema20 && rsi >= 50 && momentum >= 0;
  const bearish = ema9 < ema20 && rsi < 50 && momentum < 0;
  const action = bullish ? "BUY" : bearish ? "SELL" : "HOLD";
  const actionColor = action === "BUY" ? green : action === "SELL" ? red : "#f59e0b";
  const confidence = Math.min(99, Math.round(50 + Math.abs(momentum) * 8 + Math.abs(rsi - 50) * 0.6));

  const chartW = 1200, chartH = 430, pad = { l: 60, r: 20, t: 25, b: 45 };
  const range = Math.max(0.000001, high-low);
  const xFor = i => pad.l + (i / Math.max(1, chart.length-1)) * (chartW-pad.l-pad.r);
  const yFor = price => pad.t + (high-price)/range * (chartH-pad.t-pad.b);
  const candleWidth = Math.max(3, Math.min(12, ((chartW-pad.l-pad.r)/Math.max(1,chart.length))*0.62));
  const volumeMax = Math.max(1, ...volumes.slice(-80));
  const visible = chart.slice(-100);
  const offset = chart.length - visible.length;
  const gridPrices = [0, .25, .5, .75, 1].map(f => high - range*f);

  const doLogin = async () => {
    setLoginInProgress(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/kite/login`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.login_url) throw new Error(json.error || "Unable to get Zerodha login URL");
      const popup = window.open(json.login_url, "zerodhaLogin", "width=900,height=760,resizable=yes,scrollbars=yes");
      if (!popup) {
        window.location.href = json.login_url;
        return;
      }
      const poll = setInterval(async () => {
        const ok = await loadProfile(false);
        if (ok) {
          clearInterval(poll);
          setLoginInProgress(false);
          try { popup.close(); } catch {}
        }
      }, 2500);
      setTimeout(() => {
        clearInterval(poll);
        setLoginInProgress(false);
      }, 180000);
    } catch (e) {
      setLoginInProgress(false);
      setError(e.message || "Unable to start Zerodha login");
    }
  };

  const selectStyles = {
    control: base => ({ ...base, minHeight: 44, background: card2, borderColor: border, boxShadow: "none" }),
    menu: base => ({ ...base, background: card, color: text, zIndex: 100 }),
    option: (base, state) => ({ ...base, background: state.isFocused ? (isNight ? "#162033" : "#e8eef7") : card, color: text }),
    singleValue: base => ({ ...base, color: text }),
    input: base => ({ ...base, color: text }),
    placeholder: base => ({ ...base, color: muted })
  };
  const section = { background: card, border: `1px solid ${border}`, borderRadius: 16, boxShadow: isNight ? "0 12px 35px rgba(0,0,0,.18)" : "0 10px 30px rgba(15,23,42,.05)" };
  const metric = (title, value, sub, color = text) => <div style={{...section, padding: 16, minWidth: 0}}><div style={{fontSize:11,color:muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.7}}>{title}</div><div style={{fontSize:22,fontWeight:850,marginTop:7,color}}>{value}</div><div style={{fontSize:11,color:muted,marginTop:5}}>{sub}</div></div>;

  return (
    <div className="indian-dashboard" style={{ minHeight: "100vh", width: "100%", boxSizing: "border-box", background: bg, color: text, padding: "20px 24px 30px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, flexWrap:"wrap", marginBottom:18 }}>
        <div>
          <div style={{fontSize:11,color:blue,fontWeight:800,letterSpacing:1.5}}>INDIAN AI ANALYSIS</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginTop:5}}>
            <h1 style={{margin:0,fontSize:28,lineHeight:1.1}}>Indian Market Dashboard</h1>
            <span style={{fontSize:11,padding:"5px 9px",borderRadius:999,border:`1px solid ${connected ? "#166534" : border}`,color:connected?green:muted,background:connected?(isNight?"#052e16":"#f0fdf4"):card2,fontWeight:800}}>{checkingConnection ? "● CHECKING" : connected ? "● ZERODHA CONNECTED" : "● NOT CONNECTED"}</span>
          </div>
          <div style={{fontSize:12,color:muted,marginTop:7}}>{selectedProduct ? `${selectedProduct.exchange} · ${selectedProduct.tradingsymbol}` : "Connect Zerodha to access Indian market data"} · Auto refresh 30s</div>
        </div>
        <div style={{display:"flex",gap:9,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{padding:"9px 12px",border:`1px solid ${connected ? "#166534" : border}`,borderRadius:10,background:card,fontSize:12}}><span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:connected?green:red,marginRight:7}}/>{checkingConnection ? "Checking Zerodha..." : connected ? profile?.user_name || profile?.user_id || "Zerodha Connected" : "Zerodha not connected"}</div>
          {!connected && !checkingConnection && <button onClick={doLogin} disabled={loginInProgress} style={{...buttonStyle(isNight,true),opacity:loginInProgress?.65:1,cursor:loginInProgress?"wait":"pointer"}}>{loginInProgress ? "Waiting for Zerodha..." : "Connect Zerodha"}</button>}
          <button onClick={()=>loadProfile(true)} disabled={checkingConnection} style={{...buttonStyle(isNight),opacity:checkingConnection?.6:1}}>↻ Check</button>
          <button onClick={onLogout} style={buttonStyle(isNight)}>Logout</button>
        </div>
      </div>

      {error && connected && <div style={{marginBottom:14,padding:"11px 14px",borderRadius:11,border:"1px solid #ef4444",color:red,background:isNight?"#2a0c0c":"#fff1f2",fontSize:13}}>{error}</div>}

      {!connected && !checkingConnection && <div style={{...section,padding:26,marginBottom:18,background:isNight?"linear-gradient(135deg,#0a101b,#0d1726)":"linear-gradient(135deg,#ffffff,#f7fbff)",border:`1px solid ${isNight?"#26364d":"#dbe7f5"}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:17,alignItems:"flex-start",maxWidth:760}}>
            <div style={{width:54,height:54,borderRadius:16,display:"grid",placeItems:"center",background:isNight?"#17243a":"#eaf2ff",color:blue,fontSize:27,fontWeight:900}}>₹</div>
            <div><div style={{fontSize:20,fontWeight:850}}>Connect your Zerodha account</div><div style={{fontSize:13,color:muted,lineHeight:1.6,marginTop:6}}>Your website login is separate from Zerodha. Connect Zerodha only when you want to load Indian market instruments and charts.</div><div style={{display:"flex",gap:16,flexWrap:"wrap",marginTop:11,fontSize:11,color:muted}}><span>✓ Secure Zerodha login</span><span>✓ Automatic connection check</span><span>✓ Market data unlocks after connection</span></div></div>
          </div>
          <button onClick={doLogin} disabled={loginInProgress} style={{...buttonStyle(isNight,true),padding:"12px 18px",fontSize:13,opacity:loginInProgress?.65:1}}>{loginInProgress ? "Waiting for Zerodha..." : "Connect Zerodha →"}</button>
        </div>
        {loginInProgress && <div style={{marginTop:17,padding:"10px 12px",borderRadius:10,background:card2,border:`1px solid ${border}`,fontSize:12,color:muted}}>Complete the Zerodha login in the opened window. This dashboard will automatically detect the connection.</div>}
      </div>}

      {error && !connected && !loginInProgress && <div style={{marginBottom:14,padding:"11px 14px",borderRadius:11,border:`1px solid ${border}`,color:muted,background:card2,fontSize:12}}>Zerodha is currently not connected. Use <b style={{color:text}}>Connect Zerodha</b> above to authenticate.</div>}

      <div className="indian-controls-grid" style={{...section,padding:14,marginBottom:16,display:"grid",gridTemplateColumns:"140px 150px minmax(260px,1fr) 150px",gap:10,opacity:connected?1:.48,pointerEvents:connected?"auto":"none"}}>
        <label style={labelStyle()}>Exchange<select value={exchange} onChange={e=>{setExchange(e.target.value);setSelectedProduct(null);}} style={inputStyle(card2,text,border)}><option>NSE</option><option>BSE</option><option>NFO</option><option>BFO</option><option>MCX</option><option>CDS</option></select></label>
        <label style={labelStyle()}>Category<select value={category} onChange={e=>setCategory(e.target.value)} style={inputStyle(card2,text,border)}><option>ALL</option><option>INDEX</option><option>EQUITY</option><option>FUTURES</option><option>OPTIONS</option><option>COMMODITY</option></select></label>
        <div style={{minWidth:0}}><div style={{fontSize:12,fontWeight:700,marginBottom:6}}>Instrument</div><Select value={selectedOption} options={options} isLoading={loadingProducts} isSearchable onChange={o=>setSelectedProduct(o?.product||null)} placeholder="Search NIFTY, BANKNIFTY, RELIANCE, options..." styles={selectStyles}/></div>
        <label style={labelStyle()}>Interval<select value={interval} onChange={e=>setIntervalValue(e.target.value)} style={inputStyle(card2,text,border)}><option value="minute">1 minute</option><option value="3minute">3 minutes</option><option value="5minute">5 minutes</option><option value="10minute">10 minutes</option><option value="15minute">15 minutes</option><option value="30minute">30 minutes</option><option value="60minute">60 minutes</option><option value="day">Daily</option></select></label>
      </div>

      <div className="indian-metrics-grid" style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(140px,1fr))",gap:12,marginBottom:16}}>
        {metric("Last Price",last?last.toLocaleString("en-IN",{maximumFractionDigits:4}):"—",change?`${change>=0?"+":""}${change.toFixed(2)}% from previous candle`:"No data",change>=0?green:red)}
        {metric("EMA 9",ema9?ema9.toLocaleString("en-IN",{maximumFractionDigits:2}):"—",ema9>=ema20?"Above EMA 20":"Below EMA 20",ema9>=ema20?green:red)}
        {metric("EMA 20",ema20?ema20.toLocaleString("en-IN",{maximumFractionDigits:2}):"—",`${chart.length} candles loaded`,text)}
        {metric("RSI",rsi? rsi.toFixed(1):"—",rsi>=70?"Overbought":rsi<=30?"Oversold":"Neutral",rsi>=70||rsi<=30?"#f59e0b":text)}
        {metric("ATR",atr?atr.toFixed(2):"—",volume?`Volume ${volume.toLocaleString("en-IN")}`:"No volume",text)}
      </div>

      <div className="indian-chart-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 300px",gap:16,alignItems:"stretch"}}>
        <div style={{...section,padding:18,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginBottom:12}}>
            <div><h2 style={{margin:0,fontSize:19}}>{selectedProduct?.tradingsymbol || "Select a product"}</h2><div style={{fontSize:11,color:muted,marginTop:4}}>{selectedProduct?.name || "Indian market price action"} · {interval} {lastUpdated ? `· Updated ${lastUpdated.toLocaleTimeString()}` : ""}</div></div>
            <button onClick={()=>loadChart()} style={buttonStyle(isNight)}>{loadingChart?"Loading...":"↻ Refresh"}</button>
          </div>
          {chart.length ? (
            <div style={{width:"100%",overflow:"hidden",background:card2,borderRadius:12,border:`1px solid ${border}`}}>
              <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{display:"block",width:"100%",height:"min(48vw,430px)",minHeight:300}}>
                {gridPrices.map((p,i)=><g key={i}><line x1={pad.l} x2={chartW-pad.r} y1={yFor(p)} y2={yFor(p)} stroke={border} strokeDasharray="4 6"/><text x={chartW-5} y={yFor(p)+4} textAnchor="end" fontSize="11" fill={muted}>{p.toLocaleString("en-IN",{maximumFractionDigits:2})}</text></g>)}
                {visible.map((c,i)=>{ const x=xFor(i+offset), up=c.close>=c.open, bodyY=Math.min(yFor(c.open),yFor(c.close)), bodyH=Math.max(2,Math.abs(yFor(c.close)-yFor(c.open))); return <g key={i}><line x1={x} x2={x} y1={yFor(c.high)} y2={yFor(c.low)} stroke={up?green:red} strokeWidth="1.5"/><rect x={x-candleWidth/2} y={bodyY} width={candleWidth} height={bodyH} rx="1" fill={up?green:red}/></g>; })}
                {last>0 && <><line x1={pad.l} x2={chartW-pad.r} y1={yFor(last)} y2={yFor(last)} stroke={blue} strokeDasharray="5 5"/><rect x={chartW-pad.r-88} y={yFor(last)-10} width="83" height="20" rx="5" fill={blue}/><text x={chartW-pad.r-46} y={yFor(last)+4} textAnchor="middle" fontSize="11" fill="#fff">{last.toLocaleString("en-IN",{maximumFractionDigits:2})}</text></>}
              </svg>
              <div style={{padding:"8px 12px 12px",fontSize:11,color:muted}}>Green candles = bullish · Red candles = bearish · Showing latest {visible.length} candles</div>
            </div>
          ) : <div style={{height:430,display:"grid",placeItems:"center",color:muted,background:card2,borderRadius:12,border:`1px solid ${border}`}}>{loadingChart?"Loading Indian market data...":"No chart data available"}</div>}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{...section,padding:18,border:`1px solid ${actionColor}55`}}>
            <div style={{fontSize:11,color:muted,fontWeight:800,letterSpacing:1}}>AI MARKET DECISION</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginTop:12}}><div style={{width:58,height:58,borderRadius:16,display:"grid",placeItems:"center",background:`${actionColor}18`,color:actionColor,fontSize:15,fontWeight:900}}>{action}</div><div><div style={{fontSize:24,fontWeight:900}}>{confidence}%</div><div style={{fontSize:11,color:muted}}>signal confidence</div></div></div>
            <div style={{marginTop:14,fontSize:13,lineHeight:1.6,color:muted}}>{action === "BUY" ? "Trend conditions are positive: EMA 9 is above EMA 20 and momentum is positive." : action === "SELL" ? "Trend conditions are negative: EMA 9 is below EMA 20 and momentum is negative." : "Signals are mixed. Price action does not currently meet the directional conditions."}</div>
          </div>
          <div style={{...section,padding:18}}>
            <div style={{fontSize:11,color:muted,fontWeight:800,letterSpacing:1,marginBottom:12}}>AI DECISION FACTORS</div>
            {[['Trend',ema9>=ema20?'Bullish':'Bearish',ema9>=ema20?green:red],['RSI',rsi>=70?'Overbought':rsi<=30?'Oversold':'Neutral',rsi>=70||rsi<=30?'#f59e0b':text],['Momentum',`${momentum>=0?'+':''}${momentum.toFixed(2)}%`,momentum>=0?green:red],['Volume',avgVolume&&volume>avgVolume?'Above average':'Normal',volume>avgVolume?green:text]].map(([k,v,c])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${border}`,fontSize:13}}><span style={{color:muted}}>{k}</span><strong style={{color:c}}>{v}</strong></div>)}
          </div>
          <div style={{...section,padding:18}}>
            <div style={{fontSize:11,color:muted,fontWeight:800,letterSpacing:1}}>POTENTIAL MOVE</div>
            <div style={{fontSize:22,fontWeight:900,marginTop:9}}>{atr?`${(atr*2).toFixed(2)} pts`:"—"}</div>
            <div style={{fontSize:11,color:muted,marginTop:4}}>2 × ATR reference range</div>
            <div className="indian-support-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:13}}><div style={{padding:10,borderRadius:10,background:card2}}><div style={{fontSize:10,color:muted}}>Support</div><strong>{low?low.toLocaleString("en-IN",{maximumFractionDigits:2}):"—"}</strong></div><div style={{padding:10,borderRadius:10,background:card2}}><div style={{fontSize:10,color:muted}}>Resistance</div><strong>{high?high.toLocaleString("en-IN",{maximumFractionDigits:2}):"—"}</strong></div></div>
          </div>
        </div>
      </div>

      <div style={{...section,padding:16,marginTop:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div><div style={{fontSize:11,color:muted,fontWeight:800,letterSpacing:1}}>MARKET SNAPSHOT</div><div style={{fontSize:16,fontWeight:800,marginTop:4}}>Indian instrument details</div></div><div style={{fontSize:11,color:muted}}>{loadingProducts?"Loading products...":`${products.length} instruments available`}</div></div>
        <div className="indian-snapshot-grid" style={{display:"grid",gridTemplateColumns:"repeat(6,minmax(110px,1fr))",gap:10}}>{[["Exchange",selectedProduct?.exchange||exchange],["Symbol",selectedProduct?.tradingsymbol||"—"],["Type",selectedProduct?.instrument_type||"—"],["Expiry",selectedProduct?.expiry||"—"],["Strike",selectedProduct?.strike ? Number(selectedProduct.strike).toLocaleString("en-IN") : "—"],["OI",chart.at(-1)?.oi ? Number(chart.at(-1).oi).toLocaleString("en-IN") : "—"]].map(([k,v])=><div key={k} style={{padding:12,borderRadius:11,background:card2,border:`1px solid ${border}`}}><div style={{fontSize:10,color:muted,textTransform:"uppercase"}}>{k}</div><div style={{fontSize:13,fontWeight:800,marginTop:6,wordBreak:"break-word"}}>{v}</div></div>)}</div>
      </div>
    </div>
  );
}

function buttonStyle(isNight, primary = false) {
  return { border: `1px solid ${isNight ? "#334155" : "#cbd5e1"}`, background: primary ? "#2563eb" : (isNight ? "#111827" : "#fff"), color: primary ? "#fff" : (isNight ? "#e8eef7" : "#0f172a"), padding: "9px 13px", borderRadius: 9, cursor: "pointer", fontWeight: 600 };
}
function inputStyle(background, color, border) { return { width: "100%", boxSizing: "border-box", marginTop: 6, padding: "10px 11px", borderRadius: 9, border: `1px solid ${border}`, background, color, outline: "none" }; }
function labelStyle() { return { display: "block", fontSize: 12, fontWeight: 700 }; }
function Stat({ title, value }) { return <div style={{ background: "inherit", border: "1px solid #e2e8f0", borderRadius: 12, padding: 13 }}><div style={{ fontSize: 11, opacity: .6, marginBottom: 6 }}>{title}</div><div style={{ fontSize: 18, fontWeight: 800 }}>{value}</div></div>; }

function MarketSidebar({ selectedMarket, setSelectedMarket, theme, width, setWidth, collapsed, setCollapsed }) {
  const resizing = React.useRef(false);

  React.useEffect(() => {
    const onMove = (e) => {
      if (!resizing.current || collapsed) return;
      const next = Math.min(420, Math.max(220, e.clientX));
      setWidth(next);
    };

    const onUp = () => {
      if (resizing.current) {
        resizing.current = false;
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [collapsed, setWidth]);

  return (
    <>
      {collapsed && (
        <button
          type="button"
          className="mobile-sidebar-open"
          onClick={() => setCollapsed(false)}
          aria-label="Open market sidebar"
          title="Open market sidebar"
        >
          <PanelLeftOpen size={20} />
          <span>Markets</span>
        </button>
      )}

      <aside
        className={`market-sidebar ${collapsed ? "collapsed" : ""}`}
        style={{ width: collapsed ? 72 : width }}
      >
      <div className="market-sidebar-header">
        {!collapsed && (
          <div>
            <div className="market-sidebar-title">MARKETS</div>
            <div className="market-sidebar-subtitle">Analysis Algorithms</div>
          </div>
        )}
        <button
          className="market-sidebar-toggle"
          onClick={() => setCollapsed((v) => !v)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      <div className="market-sidebar-items">
        {MARKET_ALGOS.map((algo) => (
          <button
            key={algo.id}
            className={`market-sidebar-item ${selectedMarket === algo.id ? "active" : ""}`}
            onClick={() => setSelectedMarket(algo.id)}
            title={collapsed ? algo.label : undefined}
          >
            <span className="market-sidebar-icon">{algo.icon}</span>
            {!collapsed && <span>{algo.label}</span>}
          </button>
        ))}
      </div>

      {!collapsed && (
        <div className="market-sidebar-footer">
          <span className="market-online-dot" />
          <span>Analysis system online</span>
        </div>
      )}

      {!collapsed && (
        <div
          className="market-sidebar-resizer"
          onMouseDown={() => {
            resizing.current = true;
            document.body.style.userSelect = "none";
            document.body.style.cursor = "col-resize";
          }}
          title="Drag to resize"
        >
          <GripVertical size={16} />
        </div>
      )}
      </aside>
    </>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [authenticated, setAuthenticated] =
    useState(
      sessionStorage.getItem("cryptoAuthenticated") === "true"
    );

  const [theme, setTheme] = useState(
    localStorage.getItem("cryptoTheme") || "day"
  );

  const [selectedMarket, setSelectedMarket] = useState(
    localStorage.getItem("selectedMarketAlgo") || "crypto"
  );
  const [sidebarWidth, setSidebarWidth] = useState(
    Number(localStorage.getItem("marketSidebarWidth")) || 280
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    localStorage.getItem("marketSidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("cryptoTheme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.backgroundColor = theme === "night" ? "#02040a" : "#f6f8fb";
    document.body.style.color = theme === "night" ? "#e8eef7" : "#0f172a";
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("selectedMarketAlgo", selectedMarket);
  }, [selectedMarket]);

  useEffect(() => {
    localStorage.setItem("marketSidebarWidth", String(sidebarWidth));
  }, [sidebarWidth]);

  useEffect(() => {
    localStorage.setItem("marketSidebarCollapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const handleLogout = () => {
    sessionStorage.removeItem("cryptoAuthenticated");
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
    <>
      <MarketSidebarStyles />
      <MarketSidebar
        selectedMarket={selectedMarket}
        setSelectedMarket={setSelectedMarket}
        theme={theme}
        width={sidebarWidth}
        setWidth={setSidebarWidth}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main
        className="market-content"
        style={{
          marginLeft: sidebarCollapsed ? 72 : sidebarWidth,
          transition: "margin-left 0.18s ease",
        }}
      >
        {selectedMarket === "crypto" ? (
          <Dashboard
            onLogout={handleLogout}
            theme={theme}
            setTheme={setTheme}
          />
        ) : (
          <IndianAnalysisDashboard
            onLogout={handleLogout}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </main>
    </>
  );
}
