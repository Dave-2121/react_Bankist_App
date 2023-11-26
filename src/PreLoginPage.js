export function PreLoginPage({
  heading = "heading",
  subheading = "subheading",
  srcs = "",
}) {
  return (
    <header>
      <div className="overlay">
        <h1>{heading}</h1>
        <h3>{subheading}</h3>
        <img src={srcs} alt="money"></img>
      </div>
    </header>
  );
}
