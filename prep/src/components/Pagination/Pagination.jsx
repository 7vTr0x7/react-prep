import React, { useEffect, useState } from "react";

const ProductCard = ({ prod }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        height: "400px",
        width: "300px",
      }}>
      <div>
        <p>{prod.title}</p>
      </div>
    </div>
  );
};

const PaginationComp = ({ page, prev, next }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          value={page}
          style={{ border: "1px solid black", padding: "10px" }}
        />
      </div>
    </div>
  );
};

const PAGE_LIMIT = 5;

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState("1");

  const next = () => {
    if (Math.floor(products?.length) / PAGE_LIMIT > page) {
      setPage((p) => p + 1);
    }
  };

  const prev = () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");

        if (!res.ok) {
          console.log("failed to fetch");
          return;
        }
        const data = await res.json();
        if (data?.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {products.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            justifyContent: "center",
          }}>
          <PaginationComp page={page} prev={prev} next={next} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              justifyContent: "center",
            }}>
            {products.map((prod) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </div>
        </div>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};

export default Pagination;
