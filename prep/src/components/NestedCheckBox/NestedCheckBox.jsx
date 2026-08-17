import React, { useState } from "react";
import { checkboxData } from "./data";

const CheckBoxes = React.memo(({ checkboxes }) => {
  console.log("n");
  return (
    <div>
      {checkboxes.map((c) => (
        <div key={c.id}>
          <label htmlFor={c.id}>
            <input type="checkbox" name={c.id} id={c.id} />
            {c.name}
          </label>
          <div style={{ padding: "0px 20px" }}>
            {c.children && <CheckBoxes checkboxes={c.children} />}
          </div>
        </div>
      ))}
    </div>
  );
});

const NestedCheckBox = () => {
  const [checkboxes, setCheckboxes] = useState(checkboxData);
  return (
    <div>
      <CheckBoxes checkboxes={checkboxes} />
    </div>
  );
};

export default NestedCheckBox;
