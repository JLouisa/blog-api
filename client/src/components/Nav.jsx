import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <img src={logo} />
        <h1>The Odin Blog</h1>
        <div className="menuLinks">
          <Link to="/home">
            <span>Home</span>
          </Link>
          <Link to="/login">
            <span>Log in</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
