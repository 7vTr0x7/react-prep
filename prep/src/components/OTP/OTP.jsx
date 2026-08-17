import React, { useEffect, useRef, useState } from "react";

const OPT_DIGIT_COUNT = 5;

const OTP = () => {
  const [digits, setDigits] = useState(new Array(OPT_DIGIT_COUNT).fill(""));
  const dRef = useRef([]);

  const handleOnChange = (v, i) => {
    if (isNaN(v)) return;
    let value = v.trim();
    const newArr = [...digits];
    newArr[i] = value.slice(-1);
    setDigits(newArr);
    value && dRef.current[i + 1]?.focus();
  };

  const back = (e, i) => {
    if (e.key === "Backspace") {
      dRef.current[i - 1]?.focus();
    }
  };

  useEffect(() => {
    dRef.current[0]?.focus();
  }, []);

  return (
    <div>
      <h1>Validate OTP</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}>
        {digits.map((d, i) => (
          <input
            ref={(input) => {
              dRef.current[i] = input;
            }}
            type="text"
            value={d}
            key={i}
            style={{
              height: "30px",
              width: "30px",
              textAlign: "center",
              text: "20px",
              fontWeight: "bold",
            }}
            onChange={(e) => handleOnChange(e.target.value, i)}
            onKeyDown={(e) => back(e, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default OTP;
