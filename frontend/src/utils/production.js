export function calcKpis(data) {
  const totalQty = data.reduce((s, r) => s + (r.QUANTITY || 0), 0);

  const avgCycle =
    data.reduce((s, r) => s + (r.T_CYCLE || 0), 0) / (data.length || 1);

  const avgCut =
    data.reduce((s, r) => s + (r.T_CUT || 0), 0) / (data.length || 1);

  const materials = new Set(data.map((r) => r.MATERIAL)).size;

  return {
    totalQty,
    avgCycle,
    avgCut,
    materials,
    jobs: data.length,
  };
}
