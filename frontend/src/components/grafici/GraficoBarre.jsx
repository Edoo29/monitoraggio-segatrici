import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import TooltipCustom from "../ui/TooltipCustom";
import Box from "../ui/Box";

export default function GraficoBarre({ macchina }) {
  const data = macchina.settimane;

  return (
    <Box dark>
      <h3 className="font-semibold mb-2 text-slate-200">
        Capacità disponibile vs utilizzo effettivo
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="settimana" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />

          <Tooltip content={<TooltipCustom />} />

          {/* Capacità disponibile */}
          <Bar dataKey="disponibile">
            {data.map((_, index) => (
              <Cell key={index} fill="#64748b" />
            ))}
          </Bar>

          {/* Utilizzo effettivo */}
          <Bar dataKey="utilizzo">
            {data.map((_, index) => (
              <Cell key={index} fill="#3b82f6" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <Legenda />
    </Box>
  );
}

function Legenda() {
  return (
    <div className="flex gap-6 mt-3 text-xs text-slate-400 flex-wrap">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-slate-500" />
        Capacità disponibile
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-blue-500" />
        Utilizzo effettivo
      </div>
    </div>
  );
}
