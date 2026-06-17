import Box from "./ui/Box";

export default function Button({ text, onClick, disabled, children }) {
  return (
    <div
      onClick={() => {
        if (!disabled && onClick) onClick();
      }}
    >
      <Box
        className={`text-center  rounded transition-all duration-150 active:scale-95  ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {text}
      </Box>
    </div>
  );
}
