import { useEffect, useMemo, useState } from "react";
import datiMacchine from "./dati/mock.json";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import TitleBar from "./components/TitleBar";
import "./App.css";

export default function App() {
  const macchine = datiMacchine.macchine;
  const [selectedId, setSelectedId] = useState(macchine[0].id);

  const macchina = useMemo(() => {
    return macchine.find((m) => m.id === selectedId);
  }, [selectedId, macchine]);

  return (
    <>
      <div className="p-6 flex flex-col gap-6 pt-14 h-full overflow-auto">
        <Header
          macchine={macchine}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />

        <Dashboard macchina={macchina} />
      </div>
    </>
  );
}
