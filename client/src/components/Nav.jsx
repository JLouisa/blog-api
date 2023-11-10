import logo from "../assets/logo.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Nav({ isLogin, setIsLogin }) {
  // const history = useHistory();
  const logoutHandler = () => {
    // Clear the JWT from localStorage
    localStorage.removeItem("projectX");
    setIsLogin(false);
  };

  return (
    <>
      <nav>
        <img src={logo} alt="Logo" />
        <h1>The Odin Blog</h1>
        <div className="menuLinks">
          <Link to="/home">
            <span>Home</span>
          </Link>
          {isLogin === false ? (
            <>
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/users">
                <span>Users</span>
              </Link>
              <Link to="/createBlog">
                <span>Create Blog</span>
              </Link>
              <span onClick={logoutHandler}>
                <a href="">Logout</a>
              </span>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

Nav.propTypes = {
  isLogin: PropTypes.bool,
  setIsLogin: PropTypes.func,
};

export default Nav;
