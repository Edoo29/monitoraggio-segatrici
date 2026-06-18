import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Box from "../components/ui/Box";
import { getDatalog } from "../api/datalog";

export default function Materiali() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await getDatalog(50725); // poi lo rendiamo dinamico
      setData(res);
    }

    load();
  }, []);

  // 🔥 aggregazione materiali
  const materialMap = data.reduce((acc, row) => {
    const key = row.MATERIAL || "UNKNOWN";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(materialMap).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
    "#14b8a6",
  ];

  return (
    <div className="p-6 text-white mt-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Materiali</h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-slate-300 hover:bg-[#2a2a2a] transition cursor-pointer"
        >
          ← Torna Dashboard
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <Box dark>
          <h2 className="text-lg font-semibold mb-4 text-slate-200">
            Distribuzione Materiali
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* LISTA */}
        <Box dark>
          <h2 className="text-lg font-semibold mb-4 text-slate-200">
            Dettaglio Materiali
          </h2>

          <div className="space-y-3">
            {chartData.map((m, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-slate-800/30 p-3 rounded"
              >
                <span className="text-slate-300">{m.name}</span>

                <span className="text-blue-400 font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
}
