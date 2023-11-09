import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import localHost from "./localHost";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ link = "/home", setIsLogin, redirect }) {
  const [theErrors, setTheErrors] = useState([]);
  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = { username, password };

    try {
      const response = await fetch(`${localHost}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Handle the response as needed
      if (response.ok) {
        const data = await response.json();
        // Successful login, redirect
        console.log("login succesfull");
        localStorage.setItem("projectX", data.projectX);
        setIsLogin(true);
        if (redirect) {
          navigateTo("/home"); // Redirect to the home after login
        }
      } else {
        setTheErrors(response);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle the error, display a message, or redirect if necessary
    }
  };

  return (
    <>
      {theErrors.length > 0
        ? theErrors.map((error) => {
            return <p key={theErrors.indexOf(error)}>{error.msg}</p>;
          })
        : ""}
      <div>
        <form action={`${localHost}/login`} method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <br />
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <br />
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <input type="submit" className="btn" value="login" />
            <Link to={link}>
              <button className="btn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

Login.propTypes = {
  link: PropTypes.string,
  setIsLogin: PropTypes.func,
  redirect: PropTypes.bool,
};

export default Login;
