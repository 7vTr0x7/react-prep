import { useEffect, useState } from "react";

const Progress = ({ value }) => {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
    </div>
  );
};

const ProgressBar = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value >= 100) return;

    let timer = setTimeout(() => {
      setValue((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div>
      <Progress value={value} />
    </div>
  );
};

export default ProgressBar;
