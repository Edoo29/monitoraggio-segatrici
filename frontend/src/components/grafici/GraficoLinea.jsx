import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Box from "../ui/Box";
import TooltipCustom from "../ui/TooltipCustom";

export default function GraficoLinea({ data }) {
  return (
    <Box dark>
      <h3 className="font-semibold mb-2 text-slate-200">Produzione per Job</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="job" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip content={<TooltipCustom />} />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
