import React, { useCallback, useMemo, useState } from "react";

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
const ThrottledGun = React.memo(({ throttledGun, throttleFun }) => {
  console.log("throttle");

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <button onClick={throttleFun}>Throttled</button>
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

const throttle = (fn, d) => {
  let past = 0;

  return function (...args) {
    let now = new Date().getTime();
    if (now - past < d) return;
    past = now;
    fn(...args);
  };
};

const Guns = () => {
  const [normalGun, setNormalGun] = useState(0);
  const [debouncedGun, setDebouncedGun] = useState(0);
  const [throttledGun, setThrottledGun] = useState(0);

  const onDebounce = useCallback(() => {
    setDebouncedGun((prev) => prev + 1);
  }, []);
  const onThrottle = useCallback(() => {
    setThrottledGun((prev) => prev + 1);
  }, []);

  const debouncedFunc = useMemo(() => debounce(onDebounce, 300), [onDebounce]);
  const throttleFun = useMemo(() => throttle(onThrottle, 2000), [onThrottle]);

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
      <ThrottledGun throttledGun={throttledGun} throttleFun={throttleFun} />
    </div>
  );
};

export default Guns;
