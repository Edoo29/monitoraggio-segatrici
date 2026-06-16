import Box from "../ui/Box";

export default function Picchi({ picchi }) {
  return (
    <Box titolo="Picchi rilevati">
      {picchi.length === 0 ? (
        <p className="text-slate-400 text-sm">Nessun picco rilevato</p>
      ) : (
        <div className="flex flex-col gap-2">
          {picchi.map((p, i) => (
            <Box dark key={i}>
              <div className="flex justify-between">
                <span className="text-slate-200 text-sm">{p.settimana}</span>
                <span
                  className={
                    p.tipo === "up" ? "text-green-400" : "text-red-400"
                  }
                >
                  {p.delta > 0 ? "+" : ""}
                  {p.delta.toFixed(1)}%
                </span>
              </div>
            </Box>
          ))}
        </div>
      )}
    </Box>
  );
}
