import Box from "./ui/Box";

export default function JobCard({ row }) {
  return (
    <Box dark>
      <div className="flex justify-between">
        <span className="font-bold">{row.JOB}</span>
        <span className="text-slate-400">{row.MATERIAL}</span>
      </div>

      <div className="text-sm text-slate-300 mt-2">
        {row.WIDTH} × {row.HEIGHT} × {row.LENGHT}
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span>QTA</span>
        <span className="font-bold">{row.QUANTITY}</span>
      </div>

      <div className="text-xs text-slate-400 mt-2">
        ciclo: {row.T_CYCLE}s · taglio: {row.T_CUT}s
      </div>
    </Box>
  );
}
