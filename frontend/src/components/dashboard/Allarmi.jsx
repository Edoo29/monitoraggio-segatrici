import Box from "../ui/Box";

export default function Allarmi({ allarmi }) {
  return (
    <>
      {allarmi.length > 0 ? (
        <Box titolo="Allarmi attivi">
          <div className="flex flex-col gap-2">
            {allarmi.map((a, index) => (
              <Box dark key={index} className="text-sm">
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1 w-2 h-2 rounded-full ${
                      a.tipo === "critical" ? "bg-red-500" : "bg-orange-500"
                    }`}
                  />
                  <p className="text-slate-200 font-medium">{a.messaggio}</p>
                </div>

                <p className="text-xs text-slate-500 ml-4 mt-1">
                  {a.settimana}
                </p>
              </Box>
            ))}
          </div>
        </Box>
      ) : (
        <Box titolo="Allarmi" descrizione={"Nessun allarme rilevato"}></Box>
      )}
    </>
  );
}
