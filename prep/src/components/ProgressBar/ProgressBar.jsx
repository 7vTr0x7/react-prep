import { useEffect, useRef, useState } from "react";

const Progress = ({ value, start, pause, reset, isRunning }) => {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}>
      <div
        style={{
          border: "1px solid black",
          width: "50%",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
        <div
          style={{
            width: `${percent}%`,
            backgroundColor: "yellow",
            padding: "10px",
            textAlign: "center",
          }}>
          <span>{percent}%</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button disabled={isRunning} onClick={() => start()}>
          Start
        </button>
        <button disabled={!isRunning} onClick={() => pause()}>
          Pause
        </button>
        <button disabled={value === 0} onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

const ProgressBar = () => {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  let timer = useRef(null);

  const start = () => {
    if (!isRunning) {
      if (value >= 100) return;

      setIsRunning(true);
      timer.current = setInterval(() => {
        setValue((prev) => prev + 1);
      }, 100);
    }
  };

  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timer.current);
    }
  };

  const reset = () => {
    if (value > 0) {
      clearInterval(timer.current);
      setValue(0);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <Progress
        value={value}
        start={start}
        pause={pause}
        reset={reset}
        isRunning={isRunning}
      />
    </div>
  );
};

export default ProgressBar;
