import { useState, useEffect } from "react";
import localHost from "./localHost";

function Users() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("projectX");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`${localHost}/v1/api/users`, requestOptions);
        if (response.ok) {
          const data = await response.json();
          console.log("data");
          console.log(data);
          setUsers(data.data);
        } else {
          const errorData = response.json();
          setErrors(errorData.errors);
        }
      } catch (err) {
        console.log("Error getting user information");
      }
    };
    getUsers();
  }, []);

  return (
    <section>
      {errors
        ? errors.map((error, index) => {
            return (
              <p key={error.msg || index} className="errors">
                {error.msg}
              </p>
            );
          })
        : null}
      {users.map((user) => {
        return (
          <div key={user._id} className="userSection">
            <p key={user._id}>{user.username}</p>
            <div className="userBtn">
              <button
                className="btn"
                onClick={() => {
                  console.log("Promote", user._id);
                }}
              >
                Promote
              </button>
              <button
                className="btn"
                onClick={() => {
                  console.log("Ban", user._id);
                }}
              >
                Ban
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Users;
