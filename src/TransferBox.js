import { AppButton } from "./AppButton";

export function TransferBox({
  children,
  heading = "heading",
  bgColor = "",
  onHandler,
}) {
  return (
    <div className="transfer-box" style={{ background: bgColor }}>
      <h2>{heading}</h2>
      <div className="transfer-box-inside">
        {children}
        <AppButton bgColor="whitesmoke" onSubmitHandler={onHandler}>
          →
        </AppButton>
      </div>
    </div>
  );
}
