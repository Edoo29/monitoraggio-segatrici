import { useState, useRef, useEffect } from "react";
import Box from "./ui/Box";

export default function Header({ macchine, selectedId, setSelectedId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = macchine.find((m) => m.id === selectedId);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Segatrici</h1>

          {selected && (
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="font-medium text-slate-200">
                {selected.nome}
              </span>

              <span
                className={`h-2 w-2 rounded-full ${
                  selected.stato === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              />

              <span
                className={
                  selected.stato === "online"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {selected.stato === "online" ? "Online" : "Offline"}
              </span>

              {selected.stato === "online" && selected.oreAccensione && (
                <span className="text-slate-400">
                  • Accesa da{" "}
                  <span className="text-slate-200 font-semibold">
                    {selected.oreAccensione} ore
                  </span>
                </span>
              )}
            </div>
          )}
        </div>

        <div ref={ref} className="relative w-full lg:w-72">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between rounded-xl border border-[#3a3a3a] bg-[#242424] px-4 py-3 text-slate-200 cursor-pointer"
          >
            <span>{selected?.nome || "Seleziona macchina"}</span>

            <span
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </div>

          {open && (
            <div className="absolute mt-2 w-full overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#242424] shadow-xl">
              {macchine.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedId(m.id);
                    setOpen(false);
                  }}
                  className="mx-2 my-1 cursor-pointer rounded-lg p-3 text-slate-200 hover:bg-[#343434]"
                >
                  {m.nome}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
}
