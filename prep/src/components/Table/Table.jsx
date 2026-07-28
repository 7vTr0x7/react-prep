import React, { useEffect, useMemo, useState } from "react";
import "./style.css";

const Search = ({ text, setText }) => {
  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="Search ..."
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

const Sort = ({ isAsc, setIsAsc }) => {
  return (
    <div>
      <select value={isAsc} onChange={(e) => setIsAsc(e.target.value)}>
        <option value="">Select</option>
        <option value="asc">ASC</option>
        <option value="dsc">DSC</option>
      </select>
    </div>
  );
};
const Gender = ({ gender, setGender }) => {
  return (
    <div>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

const Table = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [isAsc, setIsAsc] = useState("");
  const [gender, setGender] = useState("");

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

  const headers = useMemo(
    () => (users.length > 0 ? Object.keys(users[0]) : []),
    [users],
  );

  const filteredUsers = useMemo(
    () =>
      users
        .filter(
          (user) =>
            user.firstName.toLowerCase().includes(text.toLowerCase()) ||
            user.lastName.toLowerCase().includes(text.toLowerCase()),
        )
        .filter((user) =>
          gender ? user.gender.toLowerCase() === gender.toLowerCase() : user,
        )
        .sort(
          (a, b) =>
            (isAsc === "asc" && a.age - b.age) ||
            (isAsc === "dsc" && b.age - a.age),
        ),
    [text, users, isAsc, gender],
  );

  return (
    <div>
      <div>
        <Search text={text} setText={setText} />
        <Sort isAsc={isAsc} setIsAsc={setIsAsc} />
        <Gender gender={gender} setGender={setGender} />
      </div>
      <table>
        <thead>
          <tr>
            {headers?.length > 0 &&
              headers.map((head, index) => <th key={index}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                {headers.map((head) => (
                  <td key={head}>
                    {typeof user[head] === "object"
                      ? JSON.stringify(user[head])
                      : user[head]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>No user found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
