import { Minus, Square, X } from "lucide-react";

export default function TitleBar() {
  return (
    <div className="drag fixed top-0 left-0 right-0 z-50 h-11 bg-[#1f1f1f] border-b border-[#333] flex items-center justify-between px-3">
      <div className="text-sm font-medium text-slate-300">
        Monitoraggio Segatrici
      </div>

      <div className="no-drag flex items-center">
        <button
          onClick={() => window.electronAPI.minimize()}
          className="w-12 h-11 flex items-center justify-center text-slate-400 hover:bg-[#2f2f2f] hover:text-white transition"
        >
          <Minus size={16} />
        </button>

        <button
          onClick={() => window.electronAPI.maximize()}
          className="w-12 h-11 flex items-center justify-center text-slate-400 hover:bg-[#2f2f2f] hover:text-white transition"
        >
          <Square size={14} />
        </button>

        <button
          onClick={() => window.electronAPI.close()}
          className="w-12 h-11 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
