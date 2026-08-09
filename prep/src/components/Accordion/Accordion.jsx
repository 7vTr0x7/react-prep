import React, { useState } from "react";

const DATA = [
  {
    id: "1",
    text: "non",
    description: "non",
  },
  {
    id: "2",
    text: "non",
    description: "non",
  },
  {
    id: "3",
    text: "non",
    description: "non",
  },
  {
    id: "4",
    text: "non",
    description: "non",
  },
];

const Accordion = () => {
  const [selected, setSelected] = useState({});

  const onClick = (id) => {
    setSelected((prev) => {
      if (prev[id]) {
        return { ...prev, [id]: false };
      } else {
        return { ...prev, [id]: true };
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "30%",
          border: "1px solid black",
          padding: "10px",
          margin: "100px 0px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}>
        {DATA.map((d) => (
          <div
            key={d.id}
            style={{
              border: "1px solid black",
              padding: "10px",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
              }}>
              <p>{d.text}</p>
              <p style={{ cursor: "pointer" }} onClick={() => onClick(d.id)}>
                {selected[d.id] ? "-" : "+"}
              </p>
            </div>
            <div>{selected[d.id] && <p>{d.description}</p>}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
