import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

import Box from "./ui/Box";

export default function Lame({ macchina }) {
  const lame = macchina?.lame || [];

  if (!lame.length) {
    return (
      <Box
        titolo="Lame installate"
        descrizione={"Nessuna lama registrata"}
      ></Box>
    );
  }

  return (
    <Box titolo="Lame installate">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lame.map((lama) => {
          const percentuale = Math.round(
            (lama.tagliEffettuati / lama.tagliMassimi) * 100,
          );

          const colore =
            percentuale >= 90
              ? "#ef4444"
              : percentuale >= 70
                ? "#f59e0b"
                : "#22c55e";

          const data = [{ value: percentuale, fill: colore }];

          return (
            <Box dark key={lama.id}>
              {/* TITOLO */}
              <h3 className="font-semibold text-center mb-2">{lama.modello}</h3>

              {/* GRAFICO */}
              <div className="w-40 h-40 mx-auto relative">
                <ResponsiveContainer>
                  <RadialBarChart
                    innerRadius="75%"
                    outerRadius="100%"
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: colore }}
                  >
                    {percentuale}%
                  </span>
                  <span className="text-xs text-slate-400">usura</span>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tagli</span>
                  <span>{lama.tagliEffettuati.toLocaleString("it-IT")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Massimo</span>
                  <span>{lama.tagliMassimi.toLocaleString("it-IT")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Stato</span>
                  <span
                    className={
                      percentuale >= 90
                        ? "text-red-400 font-semibold"
                        : percentuale >= 70
                          ? "text-amber-400 font-semibold"
                          : "text-green-400 font-semibold"
                    }
                  >
                    {lama.stato || "attiva"}
                  </span>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-[#2a2a2a] rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${percentuale}%`,
                    backgroundColor: colore,
                  }}
                />
              </div>
            </Box>
          );
        })}
      </div>
    </Box>
  );
}
