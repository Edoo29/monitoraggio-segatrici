import { useMemo, useState } from "react";

const parseDM = (str) => {
  const [d, m] = str.split("/").map(Number);
  return m * 100 + d;
};

export default function useMacchinaFiltrata(macchina) {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const settimaneFiltrate = useMemo(() => {
    const s = macchina.settimane || [];

    if (!dateRange.start && !dateRange.end) return s;

    const startVal = dateRange.start ? parseDM(dateRange.start) : null;
    const endVal = dateRange.end ? parseDM(dateRange.end) : null;

    return s.filter((item) => {
      const rawStart = item.settimana.split(" - ")[0];
      const val = parseDM(rawStart);

      const startOk = startVal === null || val >= startVal;
      const endOk = endVal === null || val <= endVal;

      return startOk && endOk;
    });
  }, [macchina.settimane, dateRange]);

  const macchinaFiltrata = useMemo(() => {
    return {
      ...macchina,
      settimane: settimaneFiltrate,
    };
  }, [macchina, settimaneFiltrate]);

  return {
    dateRange,
    setDateRange,
    settimaneFiltrate,
    macchinaFiltrata,
  };
}
