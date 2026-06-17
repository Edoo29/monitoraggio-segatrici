import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import Box from "../ui/Box";
import TooltipCustom from "../ui/TooltipCustom";

export default function GraficoBarre({ data }) {
  return (
    <Box dark>
      <h3 className="font-semibold mb-2 text-slate-200">
        Tempo ciclo vs tempo taglio
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="job" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip content={<TooltipCustom />} />

          {/* CICLO */}
          <Bar dataKey="cycle">
            {data.map((_, index) => (
              <Cell key={index} fill="#3b82f6" />
            ))}
          </Bar>

          {/* TAGLIO */}
          <Bar dataKey="cut">
            {data.map((_, index) => (
              <Cell key={index} fill="#22c55e" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* LEGGENDA */}
      <div className="flex gap-6 mt-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-sm" />
          Tempo ciclo
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-sm" />
          Tempo taglio
        </div>
      </div>
    </Box>
  );
}
