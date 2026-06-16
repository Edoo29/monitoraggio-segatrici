import { useMemo } from "react";

export function useMacchinaFiltrata(macchina, range) {
  return useMemo(() => {
    const settimane = macchina?.settimane || [];

    if (range === "all") {
      return macchina;
    }

    const n = parseInt(range, 10);
    const filtrate = settimane.slice(-n);

    return {
      ...macchina,
      settimane: filtrate,
    };
  }, [macchina, range]);
}
