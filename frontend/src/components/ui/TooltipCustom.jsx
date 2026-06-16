export default function TooltipCustom({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-3 shadow-lg">
      <p className="text-white font-semibold mb-2">{label}</p>

      {payload.map((entry, index) => (
        <p key={index} className="text-[#4f8cff] text-sm font-medium">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}
