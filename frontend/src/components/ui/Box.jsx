const style = {
  default: {
    border: "solid 2px #3a3a3a",
    shadowBox:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    backgroundColor: "#2a2a2a",
  },

  dark: {
    border: "solid 1px #333",
    backgroundColor: "#1e1e1e",
  },
};

export default function Box({
  titolo,
  descrizione,
  children,
  className,
  dark,
}) {
  return (
    <div
      className={`rounded-xl p-5 ${className}`}
      style={dark ? style.dark : style.default}
    >
      {(titolo || descrizione) && (
        <div className="mb-4">
          {titolo && <h3 className="text-slate-200 font-medium">{titolo}</h3>}

          {descrizione && (
            <p className="text-slate-500 text-sm mt-1 leading-snug">
              {descrizione}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}
