import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Box from "../ui/Box";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#14b8a6",
];

export default function GraficoMateriali({ data = [] }) {
  if (!data.length) {
    return (
      <Box dark>
        <p className="text-slate-400">Nessun dato disponibile</p>
      </Box>
    );
  }

  const groupedMap = data.reduce((acc, row) => {
    const material = row.MATERIAL || "Sconosciuto";
    const qty = Number(row.QUANTITY) || 0;

    if (!acc[material]) {
      acc[material] = 0;
    }

    acc[material] += qty;

    return acc;
  }, {});

  const grouped = Object.entries(groupedMap).map(([name, value]) => ({
    name,
    value,
  }));

  if (grouped.length === 0) {
    return (
      <Box dark>
        <p className="text-slate-400">Nessun materiale valido da mostrare</p>
      </Box>
    );
  }

  return (
    <Box dark>
      <h3 className="font-semibold mb-4 text-slate-200">
        Distribuzione materiali
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={grouped}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {grouped.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
