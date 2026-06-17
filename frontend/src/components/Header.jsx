import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Box from "./ui/Box";

export default function Header() {
  const [machine, setMachine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const config = await window.api.getConfig();

      if (!config) return;

      setMachine({
        id: config.cdl,
      });
    }

    load();
  }, []);

  function handleChangeMachine() {
    navigate("/"); // torna a Setup
  }

  if (!machine) return null;

  return (
    <Box className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* LEFT: TITLE */}
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Segatrici</h1>

          {/* MACHINE INFO */}
          <div className="mt-3 flex flex-col gap-1">
            <span className="text-slate-500">CDL: {machine.id}</span>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-3">
          {/* SWITCH MACHINE */}
          <button
            onClick={handleChangeMachine}
            className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-slate-300 hover:bg-[#2a2a2a] transition cursor-pointer"
          >
            Cambia macchina
          </button>
        </div>
      </div>
    </Box>
  );
}
