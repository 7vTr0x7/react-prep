import React, { useEffect, useMemo, useState } from "react";

const debounce = (fn, d) => {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, d);
  };
};

const AutoComplete = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const result = await res.json();
        if (result.products) {
          setData(result.products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const debounced = useMemo(
    () => debounce((t) => setDebouncedText(t), 300),
    [],
  );
  const textChange = (e) => {
    let value = e.target.value;
    setText(value);
    debounced(value);
  };

  const filteredText = useMemo(
    () =>
      data.filter((d) =>
        d.title.toLowerCase().includes(debouncedText.toLowerCase()),
      ),
    [debouncedText],
  );

  console.log(filteredText);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "100px",
        boxSizing: "border-box",
      }}>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          width: "50%",
          height: "auto",
        }}>
        <div>
          <input
            type="text"
            placeholder="Search . . ."
            value={text}
            onChange={(e) => textChange(e)}
          />
        </div>
        {text && filteredText && (
          <div style={{ overflowY: "auto" }}>
            {filteredText.map((t) => (
              <p key={t.id}>{t.title}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
