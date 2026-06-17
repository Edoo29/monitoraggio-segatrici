import { useEffect, useState } from "react";

export default function useProductionData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const config = await window.api.getConfig();

      const res = await fetch(`http://localhost:3000/cdl/${config.cdl}/data`);

      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    load();
  }, []);

  return { data, loading };
}
