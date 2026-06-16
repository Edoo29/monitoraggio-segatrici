export function getPicchi(settimane, threshold = 5) {
  if (!settimane || settimane.length < 2) return [];

  const picchi = [];

  for (let i = 1; i < settimane.length; i++) {
    const prev = settimane[i - 1].saturazionePercentuale;
    const curr = settimane[i].saturazionePercentuale;

    const delta = curr - prev;

    if (Math.abs(delta) >= threshold) {
      picchi.push({
        settimana: settimane[i].settimana,
        delta,
        tipo: delta > 0 ? "up" : "down",
        valore: curr,
      });
    }
  }

  return picchi;
}
