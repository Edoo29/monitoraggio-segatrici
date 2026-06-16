export function getTrend(data = []) {
  if (data.length < 2) return "stable";

  const first = data[0].saturazionePercentuale;
  const last = data[data.length - 1].saturazionePercentuale;

  const diff = last - first;

  if (diff > 2) return "up";
  if (diff < -2) return "down";
  return "stable";
}
