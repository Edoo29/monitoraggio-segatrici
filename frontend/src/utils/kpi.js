export function calcKpi(macchina) {
  const settimane = macchina.settimane || [];
  const lame = macchina.lame || [];

  // -------------------------
  // KPI SETTIMANE
  // -------------------------
  if (!settimane.length) {
    return {
      media: 0,
      max: 0,
      min: 0,
      utilizzoPercentuale: 0,
      disponibilitaPercentuale: 0,
      saturazioneDelta: 0,
      utilizzoDelta: 0,
      disponibilitaDelta: 0,

      // KPI LAME
      usuraMediaLame: 0,
      lamaPiuUsurata: null,
      lamaMenoUsurata: null,
      lameCritiche: [],
      indiceRischioManutenzione: 0,
    };
  }

  const valori = settimane.map((s) => s.saturazionePercentuale);

  const media = valori.reduce((a, b) => a + b, 0) / valori.length;
  const max = Math.max(...valori);
  const min = Math.min(...valori);

  const utilizzoTotale = settimane.reduce((acc, s) => acc + s.utilizzo, 0);
  const disponibileTotale = settimane.reduce(
    (acc, s) => acc + s.disponibile,
    0,
  );

  const utilizzoPercentuale =
    disponibileTotale > 0 ? (utilizzoTotale / disponibileTotale) * 100 : 0;

  const disponibilitaPercentuale =
    disponibileTotale > 0
      ? ((disponibileTotale - utilizzoTotale) / disponibileTotale) * 100
      : 0;

  const last = settimane[settimane.length - 1];
  const prev = settimane[settimane.length - 2];

  const saturazioneDelta =
    settimane.length >= 2
      ? last.saturazionePercentuale - prev.saturazionePercentuale
      : 0;

  const utilizzoDelta =
    settimane.length >= 2
      ? (last.utilizzo / last.disponibile - prev.utilizzo / prev.disponibile) *
        100
      : 0;

  const disponibilitaDelta =
    settimane.length >= 2
      ? ((last.disponibile - last.utilizzo) / last.disponibile) * 100 -
        ((prev.disponibile - prev.utilizzo) / prev.disponibile) * 100
      : 0;

  // -------------------------
  // KPI LAME
  // -------------------------
  const lameConUsura = lame.map((l) => {
    const usura = l.tagliMassimi ? l.tagliEffettuati / l.tagliMassimi : 0;

    return {
      ...l,
      usura,
      usuraPercentuale: usura * 100,
    };
  });

  const usuraMediaLame =
    lameConUsura.length > 0
      ? (lameConUsura.reduce((acc, l) => acc + l.usura, 0) /
          lameConUsura.length) *
        100
      : 0;

  const lamaPiuUsurata = lameConUsura.reduce(
    (max, l) => (l.usura > (max?.usura || 0) ? l : max),
    null,
  );

  const lamaMenoUsurata = lameConUsura.reduce(
    (min, l) => (l.usura < (min?.usura ?? 1) ? l : min),
    null,
  );

  const lameCritiche = lameConUsura.filter((l) => l.usura >= 0.9);

  const indiceRischioManutenzione =
    (usuraMediaLame + (lameCritiche.length / (lame.length || 1)) * 100) / 2;

  return {
    media,
    max,
    min,
    utilizzoPercentuale,
    disponibilitaPercentuale,
    saturazioneDelta,
    utilizzoDelta,
    disponibilitaDelta,

    usuraMediaLame,
    lamaPiuUsurata,
    lamaMenoUsurata,
    lameCritiche,
    indiceRischioManutenzione,
  };
}
