import { useEffect, useRef, useState } from "react";

const formatTime = (time) => {
  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const Watch = ({ timer, start, isRunning, pause, reset }) => {
  const time = formatTime(timer);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}>
        <h2>{time}</h2>
        <div>
          <button disabled={isRunning} onClick={() => start()}>
            Start
          </button>
          <button disabled={!isRunning} onClick={() => pause()}>
            Pause
          </button>
          <button disabled={time === 0} onClick={() => reset()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const StopWatch = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  let interval = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      interval.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 100);
    }
  };

  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(interval.current);
    }
  };

  const reset = () => {
    if (timer > 0) {
      setIsRunning(false);
      clearInterval(interval.current);
      setTimer(0);
    }
  };

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  return (
    <div>
      <Watch
        timer={timer}
        start={start}
        isRunning={isRunning}
        pause={pause}
        reset={reset}
      />
    </div>
  );
};

export default StopWatch;
