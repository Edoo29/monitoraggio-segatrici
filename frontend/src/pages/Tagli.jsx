import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatalog } from "../api/datalog";

export default function Tagli() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await getDatalog(50725); // poi lo rendiamo dinamico
      setData(res);
    }

    load();
  }, []);

  return (
    <div className="p-6 text-white mt-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Lista Tagli</h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-slate-300 hover:bg-[#2a2a2a] transition cursor-pointer"
        >
          ← Torna Dashboard
        </button>
      </div>

      {/* TABLE WRAPPER */}
      <div className="rounded-lg overflow-hidden border border-slate-800 shadow-lg">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead className="bg-slate-900 text-slate-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Job</th>
              <th className="text-left px-4 py-3">Materiale</th>
              <th className="text-left px-4 py-3">Quantità</th>
              <th className="text-left px-4 py-3">Tempo taglio</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-slate-800">
            {data.map((r, i) => (
              <tr key={i} className="hover:bg-slate-900/50 transition">
                <td className="px-4 py-3 font-medium text-slate-200">
                  {r.JOB}
                </td>

                <td className="px-4 py-3 text-slate-300">{r.MATERIAL}</td>

                <td className="px-4 py-3 text-slate-300">{r.QUANTITY}</td>

                <td className="px-4 py-3 text-slate-300">
                  <span className="px-2 py-1 rounded bg-green-500/10 text-green-400">
                    {r.T_CUT}s
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
