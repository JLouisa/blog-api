function SignUp() {
  return (
    <>
      <form action="/user" method="POST">
        <div>
          <label htmlFor="username">Username: </label>
          <br />
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <br />
          <input type="password" name="password" />
        </div>
      </form>
    </>
  );
}

export default SignUp;
