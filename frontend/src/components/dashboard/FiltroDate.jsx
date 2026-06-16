export default function FiltroDate({ dateRange, setDateRange }) {
  return (
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
  );
}
