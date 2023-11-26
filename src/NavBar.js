export function NavBar({ children, className = "" }) {
  return <form className={className}>{children}</form>;
}
export function Logo({ srcs }) {
  return <img src={srcs} alt="logo"></img>;
}
export function NavHeading({ children }) {
  return <h1>{children}</h1>;
}
export function TextInput({
  defaultText,
  length = 5,
  type = "text",
  onHandler,
  credentials,
}) {
  return (
    <input
      value={credentials}
      type={type}
      placeholder={defaultText}
      maxLength={length}
      onChange={(e) => onHandler(e)}
    ></input>
  );
}
