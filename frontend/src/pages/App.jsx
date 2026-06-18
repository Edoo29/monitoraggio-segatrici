import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Header from "../components/ui/Header";
import useLiveData from "../hooks/useLiveData";
import { getDatalog } from "../api/datalog";
import "../App.css";

export default function App() {
  const [cdl, setCdl] = useState(null);

  useEffect(() => {
    async function load() {
      const config = await window.api.getConfig();
      setCdl(config.cdl);
    }

    load();
  }, []);

  const data = useLiveData(
    () => (cdl ? getDatalog(cdl) : Promise.resolve([])),
    3000,
  );

  if (!cdl) {
    return <div className="p-6 text-white">Caricamento CDL...</div>;
  }

  return (
    <div className="p-6 pt-14 flex flex-col gap-6">
      <Header />

      <Dashboard data={data} />
    </div>
  );
}
