import React, { useEffect, useState } from "react";

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let res = await fetch("https://dummyjson.com/users");

        if (!res.ok) {
          throw new Error("user Fetch failed");
        }

        const data = await res.json();
        if (data && data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log("Error occured while fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <table></table>
    </div>
  );
};

export default Table;
