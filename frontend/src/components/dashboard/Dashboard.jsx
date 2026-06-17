import Box from "../ui/Box";
import GraficoLinea from "../grafici/GraficoLinea";
import GraficoBarre from "../grafici/GraficoBarre";
import Kpi from "../ui/Kpi";
import JobCard from "../JobCard";
import { calcKpis } from "../../utils/production";

export default function Dashboard({ data }) {
  const kpi = calcKpis(data);

  const chartLine = data.map((r) => ({
    label: r.JOB,
    value: r.QUANTITY,
  }));

  const chartBar = data.map((r) => ({
    job: r.JOB,
    cycle: r.T_CYCLE,
    cut: r.T_CUT,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Kpi title="Pezzi totali" value={kpi.totalQty} type="utilizzo" />
        <Kpi title="Job" value={kpi.jobs} type="saturazione" />
        <Kpi title="Materiali" value={kpi.materials} type="utilizzo" />
        <Kpi title="Ciclo medio" value={`${kpi.avgCycle.toFixed(1)}s`} />
      </div>

      <Box titolo="Analisi produzione">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GraficoLinea data={chartLine} />
          <GraficoBarre data={chartBar} />
        </div>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((r, i) => (
          <JobCard key={i} row={r} />
        ))}
      </div>
    </div>
  );
}
