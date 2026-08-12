import React, { use, useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "auto",
      }}>
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          width: "50%",
          height: "auto",
          boxSizing: "border-box",
          borderRadius: "10px",
        }}>
        <div>
          <input
            type="text"
            placeholder="Add todo"
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
