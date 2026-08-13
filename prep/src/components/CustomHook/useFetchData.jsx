import React, { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Failed fetch");
        }

        const result = await res.json();
        if (result?.products) {
          setData(result.products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return [data];
};

export default useFetchData;
