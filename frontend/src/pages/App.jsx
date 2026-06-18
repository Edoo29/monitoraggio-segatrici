import Dashboard from "../components/dashboard/Dashboard";
import Header from "../components/ui/Header";
import useProductionData from "../hooks/useProductionData";
import "../App.css";

export default function App() {
  const { data, loading } = useProductionData();

  if (loading) {
    return <div className="p-6 text-white">Caricamento dati...</div>;
  }

  return (
    <div className="p-6 pt-14 flex flex-col gap-6">
      <Header />
      <Dashboard data={data} />
    </div>
  );
}
