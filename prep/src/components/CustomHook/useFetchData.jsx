import React, { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, loading, error];
};

export default useFetchData;
