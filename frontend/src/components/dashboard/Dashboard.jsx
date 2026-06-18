import Box from "../ui/Box";
import Kpi from "../ui/Kpi";
import { calcKpi } from "../../utils/calcKpi";
import GraficoMateriali from "../grafici/GraficoMateriali";
import GraficoTempo from "../grafici/GraficoTempo";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard({ data }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const kpi = calcKpi(data);

  const classNameKpiCliccabile = "cursor-pointer hover:scale-90 transition-all";

  const listaKpi = [
    {
      title: "Tagli totali",
      value: kpi.totalCut,
      type: "saturazione",
      onClick: () => navigate("/tagli"),
      className: classNameKpiCliccabile,
    },
    {
      title: "Materiali",
      value: kpi.materials,
      type: "utilizzo",
      onClick: () => navigate("/materiali"),
      className: classNameKpiCliccabile,
    },
    {
      title: "Ciclo medio",
      value: `${kpi.avgCycle.toFixed(1)}s`,
      type: "tempo",
    },
    {
      title: "Tempo totale",
      value: `${kpi.totalCycleHours.toFixed(1)}h`,
      type: "tempo",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {listaKpi.map((item, idx) => (
          <Kpi
            className={item.className}
            onClick={item.onClick}
            title={item.title}
            value={item.value}
            type={item.type}
          />
        ))}
      </div>

      <Box titolo="Analisi produzione">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GraficoMateriali data={data} />
          <GraficoTempo data={data} />
        </div>
      </Box>
    </div>
  );
}
