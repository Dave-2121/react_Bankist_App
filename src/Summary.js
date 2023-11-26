export function Summary({ curObj, handleSort, sort }) {
  const incomes = curObj.movements
    .filter((ele) => ele > 0)
    .reduce((acc, ele) => (acc += ele), 0);
  const out = curObj.movements
    .filter((ele) => ele < 0)
    .reduce((acc, ele) => (acc += ele), 0);
  const interest = curObj.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * curObj.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">$ {incomes} USD</p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">
        $ {Math.abs(out)} USD
      </p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">${interest}</p>
      <select value={sort} onChange={(e) => handleSort(e)}>
        <option value={"default"}>Default</option>
        <option value={"sort"}>Sort by Amount</option>
      </select>
    </div>
  );
}
