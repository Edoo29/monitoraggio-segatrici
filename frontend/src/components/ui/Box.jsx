const style = {
  default: {
    border: "1px solid #2a2a2a",
    backgroundColor: "#1e1e1e",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  dark: {
    border: "1px solid #2a2a2a",
    backgroundColor: "#151515",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  },
};

export default function Box({
  titolo,
  descrizione,
  children,
  className = "",
  dark,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden ${className}`}
      style={dark ? style.dark : style.default}
    >
      {(titolo || descrizione) && (
        <div className="px-6 py-5 border-b border-[#2a2a2a]">
          {titolo && (
            <h3 className="text-white font-semibold text-lg">{titolo}</h3>
          )}

          {descrizione && (
            <p className="text-gray-400 text-sm mt-1 leading-snug">
              {descrizione}
            </p>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col gap-5">{children}</div>
    </div>
  );
}
