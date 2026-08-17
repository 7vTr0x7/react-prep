import { useState } from "react";

const NormalGun = ({ normalGun, setNormalGun }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <button onClick={() => setNormalGun((prev) => prev + 1)}>Normal</button>
      <span>{normalGun}</span>
    </div>
  );
};
const DebouncedGun = ({ debouncedGun, setDebouncedGun }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <button>Debounced</button>
      <span>{debouncedGun}</span>
    </div>
  );
};
const ThrottledGun = ({ throttledGun, setThrottledGun }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <button>Throttled</button>
      <span>{throttledGun}</span>
    </div>
  );
};

const Guns = () => {
  const [normalGun, setNormalGun] = useState(0);
  const [debouncedGun, setDebouncedGun] = useState(0);
  const [throttledGun, setThrottledGun] = useState(0);

  return (
    <div
      style={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
      <NormalGun normalGun={normalGun} setNormalGun={setNormalGun} />
      <DebouncedGun
        debouncedGun={debouncedGun}
        setDebouncedGun={setDebouncedGun}
      />
    </div>
  );
};

export default Guns;
