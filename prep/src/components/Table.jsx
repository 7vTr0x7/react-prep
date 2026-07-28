import React, { useEffect, useState } from "react";
import "./style.css";

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

  const headers = users.length > 0 ? Object.keys(users[0]) : [];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers?.length > 0 &&
              headers.map((head, index) => <th key={index}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                {headers.map((head) => (
                  <td key={head}>
                    {typeof user[head] === "object"
                      ? JSON.stringify(user[head])
                      : user[head]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
