import React, { useState } from "react";
import { checkboxData } from "./data";

const CheckBoxes = React.memo(({ checkboxes, checked, setChecked }) => {
  const handleChecked = (isChecked, node) => {
    setChecked((prev) => {
      let newState = { ...prev, [node.id]: isChecked };

      const updateChild = (node) => {
        if (node.children) {
          node.children.forEach((child) => {
            newState[child.id] = isChecked;
            if (child.children) {
              updateChild(child);
            }
          });
        }
      };

      updateChild(node);

      return newState;
    });
  };

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
              onChange={(e) => handleChecked(e.target.checked, c)}
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
