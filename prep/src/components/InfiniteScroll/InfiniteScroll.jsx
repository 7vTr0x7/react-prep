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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${
          (page - 1) * LIMIT
        }`,
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      if (data.products) {
        setData((prev) => [...prev, ...data.products]);
      }
      if (data.products.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const scroll = throttle(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    }, 100);

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [loading, hasMore]);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {data.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              height: "300px",
              width: "250px",
            }}>
            <p>{p.title}</p>
          </div>
        ))}
      </div>

      {loading && (
        <p
          style={{
            textAlign: "center",
            padding: "20px",
          }}>
          Loading...
        </p>
      )}

      {!hasMore && (
        <p
          style={{
            textAlign: "center",
            padding: "20px",
          }}>
          No more products
        </p>
      )}
    </div>
  );
};

export default InfiniteScroll;
