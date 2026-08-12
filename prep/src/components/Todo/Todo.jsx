import React, { use, useState } from "react";

const states = ["Pending", "Complete", "In Progress"];

const Todo = () => {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "on",
      status: "p",
    },
  ]);

  const addTodo = (e) => {
    if (e.key === "Enter") {
      setTodo((prev) => [
        ...prev,
        {
          id: new Date().getTime(),
          title: e.target.value,
          status: "Pending",
        },
      ]);
    }
  };

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((p) => p.id !== id));
  };

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
            onKeyDown={addTodo}
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div
          style={{
            padding: "30px 0px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          {todo?.length > 0 ? (
            todo.map((t) => (
              <div
                key={t.id}
                style={{
                  border: "1px solid black",
                  padding: "20px",
                  width: "100%",
                  height: "auto",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <div>{t.title}</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                  <select>
                    {states.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <span style={{ cursor: "pointer" }}>edit</span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteTodo(t.id)}>
                    delete
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p style={{ padding: "0", margin: "0" }}>Please add todo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
