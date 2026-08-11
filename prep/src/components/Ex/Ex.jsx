import { useState } from "react";

const Ex = () => {
  const [data, setData] = useState({
    left: [
      {
        id: 1,
        isSelected: false,
        title: "js",
      },
      {
        id: 2,
        isSelected: false,
        title: "Rjs",
      },
      {
        id: 3,
        isSelected: false,
        title: "Ejs",
      },
    ],
    right: [
      {
        id: 7,
        isSelected: false,
        title: "Njs",
      },
      {
        id: 4,
        isSelected: false,
        title: "Mjs",
      },
      {
        id: 5,
        isSelected: false,
        title: "Yjs",
      },
    ],
  });

  const onLeftChange = (e, id) => {
    setData((prev) => ({
      ...prev,
      left: prev.left.map((l) =>
        id === l.id ? { ...l, isSelected: e.target.checked } : l,
      ),
    }));
  };
  const onRightChange = (e, id) => {
    setData((prev) => ({
      ...prev,
      right: prev.right.map((l) =>
        id === l.id ? { ...l, isSelected: e.target.checked } : l,
      ),
    }));
  };

  const moveToRight = () => {
    let rem = data.left.filter((l) => l.isSelected);
    let not = data.left.filter((l) => !l.isSelected);
    setData((prev) => ({
      ...prev,
      right: [...prev.right, ...rem],
      left: not,
    }));
  };
  const moveToLeft = () => {
    let rem = data.right.filter((l) => l.isSelected);
    let not = data.right.filter((l) => !l.isSelected);
    setData((prev) => ({
      ...prev,
      left: [...prev.left, ...rem],
      right: not,
    }));
  };

  const moveAllToLeft = () => {
    setData((prev) => ({
      ...prev,
      right: [],
      left: [...prev.left, ...prev.right],
    }));
  };
  const moveAllToRight = () => {
    setData((prev) => ({
      ...prev,
      left: [],
      right: [...prev.right, ...prev.left],
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        boxSizing: "border-box",
      }}>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div>
          {data.left.map((l) => (
            <div key={l.id}>
              <label htmlFor={l.id}>
                <input
                  type="checkbox"
                  id={l.id}
                  name={l.title}
                  onChange={(e) => onLeftChange(e, l.id)}
                  checked={l.isSelected}
                />
                {l.title}
              </label>
            </div>
          ))}
        </div>
        <div
          style={{
            widows: "20px",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            padding: "0px 5px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <button onClick={() => moveToRight()}>{">"}</button>
          <button onClick={() => moveAllToRight()}>{">>"}</button>
          <button onClick={() => moveToLeft()}>{"<"}</button>
          <button onClick={() => moveAllToLeft()}>{"<<"}</button>
        </div>
        <div>
          {data.right.map((l) => (
            <div key={l.id}>
              <label htmlFor={l.id}>
                <input
                  type="checkbox"
                  id={l.id}
                  name={l.title}
                  onChange={(e) => onRightChange(e, l.id)}
                  checked={l.isSelected}
                />
                {l.title}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ex;
