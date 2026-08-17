import React, { useMemo, useState } from "react";

const NormalGun = React.memo(({ normalGun, setNormalGun }) => {
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
});
const DebouncedGun = React.memo(({ debouncedGun, debouncedFunc }) => {
  console.log("Debounced");
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <button onClick={debouncedFunc}>Debounced</button>
      <span>{debouncedGun}</span>
    </div>
  );
});
const ThrottledGun = React.memo(({ throttledGun, setThrottledGun }) => {
  console.log("throttle");

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
});

const debounce = (fn, d) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, d);
  };
};

const Guns = () => {
  const [normalGun, setNormalGun] = useState(0);
  const [debouncedGun, setDebouncedGun] = useState(0);
  const [throttledGun, setThrottledGun] = useState(0);

  const onDebounce = () => {
    setDebouncedGun((prev) => prev + 1);
  };

  const debouncedFunc = useMemo(
    () => debounce(onDebounce, 300),
    [debouncedGun],
  );

  return (
    <div
      style={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
      <NormalGun normalGun={normalGun} setNormalGun={setNormalGun} />
      <DebouncedGun debouncedGun={debouncedGun} debouncedFunc={debouncedFunc} />
      <ThrottledGun
        throttledGun={throttledGun}
        setThrottledGun={setThrottledGun}
      />
    </div>
  );
};

export default Guns;
