import Box from "../ui/Box";
import Kpi from "../ui/Kpi";
import { calcKpi } from "../../utils/calcKpi";
import GraficoMateriali from "../grafici/GraficoMateriali";
import GraficoTempo from "../grafici/GraficoTempo";

export default function Dashboard({ data }) {
  const kpi = calcKpi(data);

  const listaKpi = [
    {
      title: "Tagli totali",
      value: kpi.totalCut,
      type: "saturazione",
    },
    {
      title: "Materiali",
      value: kpi.materials,
      type: "utilizzo",
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
          <Kpi title={item.title} value={item.value} type={item.type} />
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
