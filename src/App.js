import "./index.css";
import logo from "./images/logo.png";
import money from "./images/moneys.png";
import { NavBar, NavHeading, Logo, TextInput } from "./NavBar";
import { AppButton } from "./AppButton";
import { PreLoginPage } from "./PreLoginPage";
import { Movements } from "./Movements";
import { TransferBox } from "./TransferBox";
import { Summary } from "./Summary";
import { Balance } from "./Balance";
import { useState } from "react";
import Timer from "./Timer";
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: "Dave sharma",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const userName = function () {
  accounts.forEach((ele) => {
    ele.username = ele.owner
      .toLowerCase()
      .trim()
      .split(" ")
      .map((ele) => ele[0])
      .join("");
  });
};

const balances = function () {
  accounts.forEach((ele) => {
    ele.balance = ele.movements.reduce((acc, ele) => (acc += ele), 0);
  });
};
balances();

userName();

export default function App() {
  const [username, setUserName] = useState("");
  const [pin, setPin] = useState("");
  const [curObj, setCurObj] = useState("");
  const [showMain, setShowMain] = useState(false);
  const [sort, setSort] = useState("default");
  const [recieverUserName, setRecUserName] = useState("");
  const [recieverAmount, setRecAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  function onHandleLoan(e) {
    setLoanAmount(+e.target.value);
  }

  function onHandleRecieverName(e) {
    setRecUserName(e.target.value);
  }
  function onHandleRecieverAmount(e) {
    setRecAmount(+e.target.value);
  }
  function handleSort(e) {
    setSort(e.target.value);
  }
  function onsetUserName(e) {
    setUserName(e.target.value);
  }
  function onSetPin(e) {
    setPin(+e.target.value);
  }

  function onHandleSubmit(e) {
    e.preventDefault();
    if (!username || !pin) return;
    const currAccount = accounts.find((ele) => ele.username === username);

    if (currAccount?.pin === pin) {
      setCurObj(currAccount);
      setShowMain((s) => !s);
    }

    setUserName("");
    setPin("");
  }
  function onHandleTransfer(e) {
    e.preventDefault();
    if (!recieverUserName || !recieverAmount) return;
    const recieverAcc = accounts.find(
      (ele) => ele.username === recieverUserName
    );
    console.log(recieverAcc);
    if (
      recieverAmount > 0 &&
      recieverAcc &&
      curObj.balance >= recieverAmount &&
      recieverAcc?.username !== curObj.username
    ) {
      recieverAcc.movements.push(recieverAmount);
      curObj.movements.push(-recieverAmount);
    }
    setRecUserName("");
    setRecAmount("");
  }

  function onRequestLoan(e) {
    e.preventDefault();
    if (!loanAmount) return;
    if (
      loanAmount > 0 &&
      curObj.movements.some((mov) => mov >= loanAmount * 0.1)
    ) {
      curObj.movements.push(loanAmount);
    }
    setLoanAmount("");
  }

  return (
    <div className="App">
      <button className="test-data">Test Data</button>
      <div className="data">
        <div>
          <p>username:ds,pin:1111</p>
          <p>username:jd,pin:2222</p>
          <p>username:ss,pin:4444</p>
          <p>username:stw,pin:3333</p>
        </div>
      </div>
      <NavBar className={"navbar"}>
        <NavHeading>
          {showMain
            ? `Welcome back ${curObj.owner.split(" ")[0]}`
            : "Login to get Started!"}
        </NavHeading>
        <Logo srcs={logo} />
        {showMain ? (
          ""
        ) : (
          <div>
            <TextInput
              defaultText={"user"}
              length={10}
              onHandler={onsetUserName}
              credentials={username}
            />
            <TextInput
              defaultText={"pin"}
              length={4}
              type="password"
              onHandler={onSetPin}
              credentials={pin}
            />
            <AppButton brdr="none" size={28} onSubmitHandler={onHandleSubmit}>
              →
            </AppButton>
          </div>
        )}
      </NavBar>
      {showMain ? (
        <Main>
          <Balance curObj={curObj} />
          <Movements curObj={curObj} sort={sort} />
          <TransferBox
            heading={"Transfer money"}
            bgColor={" linear-gradient(315deg, #378b29 0%, #74d680 74%)"}
            onHandler={onHandleTransfer}
          >
            <div>
              <TextInput
                credentials={recieverUserName}
                onHandler={onHandleRecieverName}
              ></TextInput>
              <span>Transfer to</span>
            </div>
            <div>
              <TextInput
                type={"number"}
                credentials={recieverAmount}
                onHandler={onHandleRecieverAmount}
              ></TextInput>
              <span>Amount</span>
            </div>
          </TransferBox>
          <TransferBox
            heading={"Request loan"}
            bgColor={
              "linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))"
            }
            onHandler={onRequestLoan}
          >
            <div>
              <TextInput
                type={"number"}
                onHandler={onHandleLoan}
                credentials={loanAmount}
              ></TextInput>
              <span>Amount</span>
            </div>
          </TransferBox>
          <div className="main-btn">
            <AppButton
              bgColor="#CA4362"
              color="whitesmoke"
              onSubmitHandler={() => setShowMain(false)}
            >
              <span>Logout</span>❌
            </AppButton>
          </div>
          <Timer setShowMain={setShowMain} />
          <Summary curObj={curObj} handleSort={handleSort} sort={sort} />
        </Main>
      ) : (
        <PreLoginPage
          heading={"Simply The Best"}
          subheading={"Gateway to Financial Confidence"}
          srcs={money}
        />
      )}
      <div class="copyright">
        ©
        <a href="https://github.com/Dave-2121" target="_blank" rel="noreferrer">
          DEV SHARMA
        </a>
      </div>
    </div>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}
