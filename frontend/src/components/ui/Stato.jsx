import Box from "./Box";

export default function Stato({ stato, oreAccensione }) {
  const normalized = (stato || "").toLowerCase();

  const isOnline = normalized === "online";
  const isOffline = normalized === "offline";

  const config = isOnline
    ? {
        text: "Online",
        textColor: "text-green-400",
        dot: "bg-green-500",
        glow: "shadow-[0_0_12px_rgba(34,197,94,0.8)]",
        bg: "bg-green-500/10",
      }
    : {
        text: "Offline",
        textColor: "text-red-400",
        dot: "bg-red-500",
        glow: "shadow-[0_0_12px_rgba(239,68,68,0.8)]",
        bg: "bg-red-500/10",
      };

  // Conversione ore in formato leggibile
  const formatUptime = (hours) => {
    if (!hours && hours !== 0) return null;

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (days > 0) {
      return `${days}g ${remainingHours}h`;
    }

    return `${remainingHours}h`;
  };

  const uptimeFormatted = formatUptime(oreAccensione);

  return (
    <Box titolo="Stato">
      <div className={`p-4 rounded-lg flex flex-col gap-3 ${config.bg}`}>
        {/* STATUS */}
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${config.dot} ${config.glow}`}
          />

          <span className={`font-semibold ${config.textColor}`}>
            {config.text}
          </span>
        </div>

        {/* UPTIME */}
        {isOnline && uptimeFormatted && (
          <div className="text-sm text-slate-300">
            Accesa da:{" "}
            <span className="text-white font-semibold">{uptimeFormatted}</span>
          </div>
        )}

        {/* OFFLINE */}
        {isOffline && (
          <div className="text-sm text-slate-400">Macchina non operativa</div>
        )}
      </div>
    </Box>
  );
}
