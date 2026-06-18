import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Box from "../ui/Box";

const COLORS = ["#3b82f6", "#ef4444"];

export default function GraficoTempo({ data = [] }) {
  const totalCycle = data.reduce((s, r) => s + (Number(r.T_CYCLE) || 0), 0);

  const totalCut = data.reduce((s, r) => s + (Number(r.T_CUT) || 0), 0);

  const chartData = [
    { name: "Ciclo", value: totalCycle },
    { name: "Taglio", value: totalCut },
  ];

  return (
    <Box dark>
      <h3 className="font-semibold mb-4 text-slate-200">
        Tempo macchina (ciclo vs taglio)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
