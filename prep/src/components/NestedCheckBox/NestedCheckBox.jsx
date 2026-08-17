import React, { useState } from "react";
import { checkboxData } from "./data";

const CheckBoxes = React.memo(({ checkboxes, checked, setChecked }) => {
  console.log("n", checked);
  return (
    <div>
      {checkboxes.map((c) => (
        <div key={c.id}>
          <label htmlFor={c.id}>
            <input
              type="checkbox"
              name={c.id}
              id={c.id}
              checked={checked[c.id] || false}
              onChange={() =>
                setChecked((prev) => ({ ...prev, [c.id]: !prev[c.id] }))
              }
            />
            {c.name}
          </label>
          <div style={{ padding: "0px 20px" }}>
            {c.children && (
              <CheckBoxes
                checkboxes={c.children}
                checked={checked}
                setChecked={setChecked}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

const NestedCheckBox = () => {
  const [checkboxes, setCheckboxes] = useState(checkboxData);
  const [checked, setChecked] = useState({});
  return (
    <div>
      <CheckBoxes
        checkboxes={checkboxes}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default NestedCheckBox;
