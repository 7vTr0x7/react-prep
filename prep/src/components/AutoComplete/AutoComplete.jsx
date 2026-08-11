import React, { useEffect, useState } from "react";

const AutoComplete = () => {
  const [data, setData] = useState([]);

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

  return <div></div>;
};

export default AutoComplete;
