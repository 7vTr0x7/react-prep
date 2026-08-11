import React, { useEffect, useState } from "react";

const LIMIT = 10;

const throttle = (fn, d) => {
  let past = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - past < d) return;
    past = now;
    fn(...args);
  };
};

const InfiniteScroll = () => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${(page - 1) * LIMIT}`,
        );

        if (!res.ok) {
          throw new Error("Failed");
        }

        const data = await res.json();
        if (data.products) {
          console.log(data);
          setData(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default InfiniteScroll;
