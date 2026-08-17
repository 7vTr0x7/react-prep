import React, { useState } from "react";

const OPT_DIGIT_COUNT = 5;

const OTP = () => {
  const [digits, setDigits] = useState(new Array(OPT_DIGIT_COUNT).fill(""));

  const handleOnChange = (v, i) => {
    if (isNaN(v)) return;
    const newArr = [...digits];
    newArr[i] = v.slice(-1);
    setDigits(newArr);
  };

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
            type="text"
            value={digits[i]}
            key={i}
            style={{
              height: "30px",
              width: "30px",
              textAlign: "center",
              text: "20px",
              fontWeight: "bold",
            }}
            onChange={(e) => handleOnChange(e.target.value, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default OTP;
