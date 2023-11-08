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
        </form>
      </div>
    </>
  );
}

export default Login;
