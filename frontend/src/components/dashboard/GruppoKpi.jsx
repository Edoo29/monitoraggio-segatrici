import Box from "../ui/Box";
import Kpi from "../ui/Kpi";

export default function GruppoKpi({ stats, allarmi }) {
  const dati = [
    {
      title: "Saturazione media",
      value: `${stats.media.toFixed(1)}%`,
      valueForLevel: stats.media,
      type: "saturazione",
    },
    {
      title: "Utilizzo",
      value: `${stats.utilizzoPercentuale.toFixed(1)}%`,
      valueForLevel: stats.utilizzoPercentuale,
      type: "utilizzo",
    },
    {
      title: "Allarmi",
      value: allarmi.length,
      valueForLevel: allarmi.length,
      type: "allarmi",
    },
    {
      title: "Rischio manutenzione",
      value: `${stats.indiceRischioManutenzione.toFixed(1)}%`,
      valueForLevel: stats.indiceRischioManutenzione,
      type: "saturazione",
    },
    {
      title: "Usura media lame",
      value: `${stats.usuraMediaLame.toFixed(1)}%`,
      valueForLevel: stats.usuraMediaLame,
      type: "utilizzo",
    },
    {
      title: "Lame critiche",
      value: stats.lameCritiche.length,
      valueForLevel: stats.lameCritiche.length,
      type: "allarmi",
    },
  ];

  return (
    <Box>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dati.map((kpi, index) => (
          <Kpi
            key={index}
            title={kpi.title}
            value={kpi.value}
            valueForLevel={kpi.valueForLevel}
            type={kpi.type}
          />
        ))}
      </div>
    </Box>
  );
}
