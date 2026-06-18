import { useEffect, useRef, useState } from "react";

export default function useLiveData(fetchFn, interval = 5000) {
  const [data, setData] = useState([]);
  const lastHash = useRef(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetchFn();

        if (!Array.isArray(res)) return;

        const clean = res.map((r) => ({
          ...r,
          T_CYCLE: Number(r.T_CYCLE) || 0,
          T_CUT: Number(r.T_CUT) || 0,
          QUANTITY: Number(r.QUANTITY) || 0,
        }));

        const hash = JSON.stringify(clean.slice(0, 20));

        if (hash !== lastHash.current) {
          lastHash.current = hash;
          if (mounted) setData(clean);
        }
      } catch (e) {
        console.error(e);
      }
    };

    load();
    const id = setInterval(load, interval);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [fetchFn, interval]);

  return data;
}
