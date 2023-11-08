import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div>
        <form action="/login" method="POST">
          <div>
            <label htmlFor="username">Username: </label>
            <br />
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <br />
            <input type="text" name="password" id="password" />
          </div>
          <div>
            <input type="submit" className="btn" value="login" />
            <Link to="/home">
              <button className="btn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
