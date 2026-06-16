import GruppoKpi from "./GruppoKpi";
import Box from "../ui/Box";
import Lame from "../Lame";
import Picchi from "./Picchi";
import Allarmi from "./Allarmi";

import GraficoLinea from "../grafici/GraficoLinea";
import GraficoBarre from "../grafici/GraficoBarre";

import FiltroDate from "./FiltroDate";
import useMacchinaFiltrata from "../../hooks/useMacchinaFiltrata";

import { calcKpi } from "../../utils/kpi";
import { getPicchi } from "../../utils/picchi";

export default function Dashboard({ macchina }) {
  const { dateRange, setDateRange, macchinaFiltrata, settimaneFiltrate } =
    useMacchinaFiltrata(macchina);

  const stats = calcKpi(macchinaFiltrata);
  const allarmi = macchina.allarmi || [];
  const picchi = getPicchi(settimaneFiltrate);

  return (
    <div className="flex flex-col gap-6">
      <GruppoKpi stats={stats} allarmi={allarmi} />

      <Box titolo="Analisi">
        <FiltroDate dateRange={dateRange} setDateRange={setDateRange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GraficoLinea macchina={macchinaFiltrata} />
          <GraficoBarre macchina={macchinaFiltrata} />
        </div>
      </Box>

      <Lame macchina={macchinaFiltrata} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Picchi picchi={picchi} />
        <Allarmi allarmi={allarmi} />
      </div>
    </div>
  );
}
