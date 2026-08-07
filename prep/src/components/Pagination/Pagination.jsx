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

const PaginationComp = ({ page, prev, next, setPage, totalPages }) => {
  const [input, setInput] = useState("1");

  const onChange = (e) => {
    const value = e.target.value;

    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    if (value === "") {
      setInput("");
      return;
    }

    const num = Number(value);

    if (num <= totalPages) {
      setInput(value);

      setPage(num);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          justifyContent: "center",
        }}>
        <button onClick={() => prev()}>Prev</button>
        <input
          type="text"
          value={input}
          min={1}
          max={totalPages}
          onChange={(e) => onChange(e)}
          style={{ border: "1px solid black", padding: "10px", width: "40px" }}
        />
        <button onClick={() => next()}>Next</button>
      </div>
    </div>
  );
};

const PAGE_LIMIT = 5;

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / PAGE_LIMIT);
  const start = (page - 1) * PAGE_LIMIT;
  const end = start + PAGE_LIMIT;

  const next = () => {
    if (totalPages > page) {
      setPage((p) => p + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
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
          <PaginationComp
            page={page}
            prev={prev}
            next={next}
            totalPages={totalPages}
            setPage={setPage}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
            }}>
            {products.slice(start, end).map((prod) => (
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
