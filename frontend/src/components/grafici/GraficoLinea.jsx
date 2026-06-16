import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getTrend } from "../../utils/trend";
import TooltipCustom from "../ui/TooltipCustom";
import Box from "../ui/Box";

export default function GraficoLinea({ macchina }) {
  const trend = getTrend(macchina.settimane);

  const color =
    trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#3b82f6";

  return (
    <Box dark>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Utilizzo settimanale</h3>

        <span
          className={`text-sm font-semibold ${
            trend === "up"
              ? "text-green-400"
              : trend === "down"
                ? "text-red-400"
                : "text-blue-400"
          }`}
        >
          {trend === "up" && "↑ In crescita"}
          {trend === "down" && "↓ In calo"}
          {trend === "stable" && "→ Stabile"}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={macchina.settimane}>
          <XAxis dataKey="settimana" stroke="#9ca3af" />
          <YAxis domain={[0, 100]} stroke="#9ca3af" />

          <Tooltip content={<TooltipCustom />} />

          <Line
            type="monotone"
            dataKey="saturazionePercentuale"
            stroke={color}
            strokeWidth={3}
            dot={{ fill: color, r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <Legenda />
    </Box>
  );
}

function Legenda() {
  return (
    <div className="flex items-center gap-6 mt-3 text-xs text-slate-400 flex-wrap">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-green-500" />
        Trend in crescita
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-red-500" />
        Trend in calo
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-blue-500" />
        Trend stabile
      </div>
    </div>
  );
}
