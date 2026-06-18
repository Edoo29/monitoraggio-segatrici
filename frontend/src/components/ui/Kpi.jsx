import {
  ListOrdered,
  ScrollText,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import Box from "./Box";

const config = {
  saturazione: {
    icon: ListOrdered,
  },
  utilizzo: {
    icon: ScrollText,
  },
  tempo: {
    icon: Clock,
  },
};

export default function Kpi({
  title,
  value,
  delta,
  subtitle,
  type,
  onClick,
  className,
}) {
  const Icon = config[type]?.icon;

  const isPositive = typeof delta === "number" && delta >= 0;

  return (
    <Box dark onClick={onClick} className={className}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <p className="text-3xl font-bold mt-1 text-white">{value}</p>

          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>

        {Icon && <Icon size={22} className="text-slate-400 opacity-80" />}
      </div>

      {typeof delta === "number" && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          {isPositive ? (
            <TrendingUp size={14} className="text-green-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}

          <span className={isPositive ? "text-green-400" : "text-red-400"}>
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
