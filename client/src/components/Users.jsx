import { useState, useEffect } from "react";
import localHost from "./localHost";
import formattedDate from "./formattedDate";

function Users() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  let succesMsg = "";

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

  useEffect(() => {
    getUsers();
  }, []);

  const banUser = async (id) => {
    try {
      const token = localStorage.getItem("projectX");
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${localHost}/v1/api/user/${id}`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        succesMsg = data.message;
        getUsers();
      } else {
        const errorData = response.json();
        setErrors(errorData.errors);
      }
    } catch (err) {
      console.log("Error getting user information");
    }
  };

  const promoteUser = async (id) => {
    try {
      const token = localStorage.getItem("projectX");
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${localHost}/v1/api/user/${id}/admin`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        succesMsg = data.message;
        getUsers();
      } else {
        const errorData = response.json();
        setErrors(errorData.errors);
      }
    } catch (err) {
      console.log("Error getting user information");
    }
  };

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
      {succesMsg}
      {users.map((user) => {
        return (
          <div key={user._id} className="userSection">
            <p>{user.username}</p>
            <p>{formattedDate(user.createdDate)}</p>
            <div className="adminBtn">
              <span>Admin: {user.isAdmin ? "Yes" : "No"} - </span>
              <button
                className="btn"
                onClick={() => {
                  console.log("Promote", user._id);
                  promoteUser(user._id);
                }}
              >
                Promote
              </button>
            </div>
            <div className="banBtn">
              <span>Banned: {user.isSuspended ? "Yes" : "No"} - </span>
              <button
                className="btn"
                onClick={() => {
                  console.log("Ban", user._id);
                  banUser(user._id);
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