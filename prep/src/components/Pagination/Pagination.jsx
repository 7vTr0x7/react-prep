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

const Pagination = () => {
  const [products, setProducts] = useState([]);

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
          {products.map((prod) => (
            <ProductCard key={prod.id} prod={prod} />
          ))}
        </div>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};

export default Pagination;
