import React, { useEffect, useRef, useState } from "react";

const LIMIT = 10;

const InfiniteScrollTwo = () => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(null);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${
            (page - 1) * LIMIT
          }`,
        );

        const result = res.json();
        if (result?.products) {
          setData((prev) => [...prev, ...result.products]);
        }
        if (result.products.length < LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {});
  }, [loading, hasMore]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}>
        {data.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              height: "300px",
              width: "250px",
            }}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>

      {/* Sentinel */}
      <div
        ref={loaderRef}
        style={{
          padding: "30px",
          textAlign: "center",
        }}>
        {loading && <p>Loading...</p>}

        {!loading && !hasMore && <p>No more products</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollTwo;
