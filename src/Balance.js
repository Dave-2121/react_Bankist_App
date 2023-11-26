export function Balance({ curObj }) {
  const date = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="Balance">
      <div>
        <h3>Current Balance</h3>
        <span>As of {date}</span>
      </div>
      <p>
        $<span>{curObj.movements.reduce((acc, ele) => (acc += ele), 0)}</span>{" "}
        USD
      </p>
    </div>
  );
}
