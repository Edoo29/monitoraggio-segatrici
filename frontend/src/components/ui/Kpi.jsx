import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import Box from "./Box";

/* -------------------------
   SOGLIE GLOBALI
------------------------- */
const getLevel = (value, thresholds = { green: 60, orange: 80 }) => {
  if (value <= thresholds.green) return "green";
  if (value <= thresholds.orange) return "orange";
  return "red";
};

const levelStyle = {
  green: {
    text: "text-green-400",
    icon: "text-green-400",
  },
  orange: {
    text: "text-orange-400",
    icon: "text-orange-400",
  },
  red: {
    text: "text-red-400",
    icon: "text-red-400",
  },
};

/* -------------------------
   CONFIG KPI
------------------------- */
const config = {
  saturazione: {
    icon: Activity,
    thresholds: { green: 50, orange: 75 },
    isPositiveGood: true,
  },
  utilizzo: {
    icon: TrendingUp,
    thresholds: { green: 60, orange: 90 },
    isPositiveGood: true,
  },
  allarmi: {
    icon: AlertTriangle,
    thresholds: { green: 0, orange: 2 },
    isPositiveGood: false,
  },
};

export default function Kpi({
  title,
  value,
  valueForLevel,
  type,
  delta,
  subtitle,
}) {
  const style = config[type] || {};
  const Icon = style.icon;

  const level = getLevel(valueForLevel ?? 0, style.thresholds);
  const colors = levelStyle[level];

  const isPositive = delta >= 0;
  const isGood = style.isPositiveGood ? isPositive : !isPositive;

  const deltaColor = isGood ? "text-green-400" : "text-red-400";

  return (
    <Box dark>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <p className={`text-3xl font-bold mt-1 ${colors.text}`}>{value}</p>

          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>

        {Icon && <Icon size={22} className={`${colors.icon} opacity-80`} />}
      </div>

      {typeof delta === "number" && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          {isPositive ? (
            <TrendingUp size={14} className={deltaColor} />
          ) : (
            <TrendingDown size={14} className={deltaColor} />
          )}

          <span className={`${deltaColor} font-medium`}>
            {delta > 0 ? "+" : ""}
            {delta.toFixed(1)}
          </span>

          <span className="text-slate-500">
            rispetto alla settimana precedente
          </span>
        </div>
      )}
    </Box>
  );
}
