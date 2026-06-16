import Box from "../ui/Box";
import Kpi from "../ui/Kpi";

export default function GruppoKpi({ stats, allarmi }) {
  return (
    <Box>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Kpi
          title="Saturazione media"
          value={`${stats.media.toFixed(1)}%`}
          valueForLevel={stats.media}
          type="saturazione"
        />

        <Kpi
          title="Utilizzo"
          value={`${stats.utilizzoPercentuale.toFixed(1)}%`}
          valueForLevel={stats.utilizzoPercentuale}
          type="utilizzo"
        />

        <Kpi
          title="Allarmi"
          value={allarmi.length}
          valueForLevel={allarmi.length}
          type="allarmi"
        />

        <Kpi
          title="Rischio manutenzione"
          value={`${stats.indiceRischioManutenzione.toFixed(1)}%`}
          valueForLevel={stats.indiceRischioManutenzione}
          type="saturazione"
        />

        <Kpi
          title="Usura media lame"
          value={`${stats.usuraMediaLame.toFixed(1)}%`}
          valueForLevel={stats.usuraMediaLame}
          type="utilizzo"
        />

        <Kpi
          title="Lame critiche"
          value={stats.lameCritiche.length}
          valueForLevel={stats.lameCritiche.length}
          type="allarmi"
        />
      </div>
    </Box>
  );
}
