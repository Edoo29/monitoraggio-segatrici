import { useMemo, useState } from "react";

import { calcKpi } from "../../utils/kpi";
import { getPicchi } from "../../utils/picchi";

import GraficoLinea from "../grafici/GraficoLinea";
import GraficoBarre from "../grafici/GraficoBarre";
import Picchi from "./Picchi";
import Allarmi from "./Allarmi";
import GruppoKpi from "./GruppoKpi";
import Box from "../ui/Box";
import Lame from "../Lame";

export default function Dashboard({ macchina }) {
  /* --------------------------
    FILTRO GG/MM
  -------------------------- */
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  // converte "DD/MM" → numero confrontabile
  const parseDM = (str) => {
    const [d, m] = str.split("/").map(Number);
    return m * 100 + d; // es: 19/05 = 519
  };

  const settimaneFiltrate = useMemo(() => {
    const s = macchina.settimane || [];

    if (!dateRange.start && !dateRange.end) return s;

    const startVal = dateRange.start ? parseDM(dateRange.start) : null;
    const endVal = dateRange.end ? parseDM(dateRange.end) : null;

    return s.filter((item) => {
      const rawStart = item.settimana.split(" - ")[0]; // DD/MM
      const val = parseDM(rawStart);

      const startOk = startVal === null || val >= startVal;
      const endOk = endVal === null || val <= endVal;

      return startOk && endOk;
    });
  }, [macchina.settimane, dateRange]);

  const macchinaFiltrata = useMemo(() => {
    return {
      ...macchina,
      settimane: settimaneFiltrate,
    };
  }, [macchina, settimaneFiltrate]);

  /* --------------------------
    KPI + STATUS
  -------------------------- */
  const stats = calcKpi(macchinaFiltrata);

  const allarmi = macchina.allarmi || [];
  const picchi = getPicchi(macchinaFiltrata.settimane);

  return (
    <div className="flex flex-col gap-6">
      {/* KPI */}
      <GruppoKpi stats={stats} allarmi={allarmi} />

      <Box titolo="Analisi">
        <div className="flex flex-wrap items-end gap-3 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Da</label>
            <input
              type="text"
              placeholder="19/05"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  start: e.target.value,
                }))
              }
              className="px-3 py-2 bg-[#1e1e1e] border border-[#333] rounded-lg text-slate-200 w-28"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">A</label>
            <input
              type="text"
              placeholder="30/06"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  end: e.target.value,
                }))
              }
              className="px-3 py-2 bg-[#1e1e1e] border border-[#333] rounded-lg text-slate-200 w-28"
            />
          </div>

          <button
            onClick={() => setDateRange({ start: "", end: "" })}
            className="px-4 py-2 cursor-pointer rounded-lg border border-[#3a3a3a] text-slate-300 hover:bg-[#3a3a3a] transition"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GraficoLinea macchina={macchinaFiltrata} />
          <GraficoBarre macchina={macchinaFiltrata} />
        </div>
      </Box>

      <Lame macchina={macchinaFiltrata} />

      {/* PICCHI + ALLARMI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PICCHI */}
        <Picchi picchi={picchi} />

        {/* ALLARMI */}
        <Allarmi allarmi={allarmi} />
      </div>
    </div>
  );
}
