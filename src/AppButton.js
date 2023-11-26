export function AppButton({
  children,
  color = "black",
  bgColor = "transparent",
  brdr = "",
  size = 20,
  onSubmitHandler,
}) {
  return (
    <button
      style={{
        color: color,
        backgroundColor: bgColor,
        border: brdr,
        fontSize: `${size}px`,
        cursor: "pointer",
      }}
      onClick={onSubmitHandler}
    >
      {children}
    </button>
  );
}
