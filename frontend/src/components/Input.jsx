export default function Input({ label, placeholder, value, onChange }) {
  return (
    <div className="flex gap-4">
      <label className="p-2">{label}</label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 focus:outline-none border-b border-[#2a2a2a] focus:border-white"
      />
    </div>
  );
}
