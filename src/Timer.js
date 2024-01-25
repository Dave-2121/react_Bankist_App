import { useEffect, useState } from "react";
const TIMER_TIME = 300;

function Timer({ setShowMain }) {
  const [timer, setTimer] = useState(TIMER_TIME);
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer - minutes * 60).padStart(2, "0");
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((t) => t - 1);
      if (timer === 0) setShowMain(false);
    }, 1000);

    return () => clearInterval(timerId);
  }, [setTimer, timer, setShowMain]);
  return (
    <div className="timer">
      logout in {minutes}:{seconds}
    </div>
  );
}

export default Timer;
