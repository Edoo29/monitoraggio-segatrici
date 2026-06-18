export function calcKpi(data) {
  const totalCycle = data.reduce(
    (sum, row) => sum + (Number(row.T_CYCLE) || 0),
    0,
  );

  const totalCut = data.length;

  const totalCycleHours = totalCycle / 3600;
  const totalCutHours = totalCut / 3600;

  const avgCycle = totalCycle / (data.length || 1);

  const avgCut = totalCut / (data.length || 1);

  const materials = new Set(data.map((r) => r.MATERIAL)).size;

  const jobs = new Set(data.map((r) => r.JOB)).size;

  return {
    totalCycle,
    totalCut,
    totalCycleHours,
    totalCutHours,
    avgCycle,
    avgCut,
    materials,
    jobs,
  };
}
