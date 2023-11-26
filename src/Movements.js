export function Movements({ curObj, sort }) {
  const sortObj = {
    default: (a, b) => null,
    sort: (a, b) => a - b,
  };
  return (
    <div className="movements">
      {curObj.movements.toSorted(sortObj[sort]).map((ele) => (
        <MovementsItem mov={ele} key={crypto.randomUUID()} />
      ))}
    </div>
  );
}
function MovementsItem({ mov }) {
  const type = mov >= 0 ? "green" : "red";
  return (
    <div className="movements-item">
      <div className={`wd ${type}`}>
        {/* <span>X</span> */}
        {type === "green" ? "Deposit" : "Withdrawal"}
      </div>
      <div>
        $<span>{mov}</span>
      </div>
    </div>
  );
}
