module.exports = {
  // Verify token
  isAuth: function (req, res, next) {
    // Get auth header Value
    const bearerHeader = req.headers["authorization"];
    console.log("here");
    console.log(bearerHeader);
    // Format of token
    // Authorization: Bearer <access_token>

    //Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      //Forbidden
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return next();
    } else {
      return res.sendStatus(403);
    }
  },
  isVerified: function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_JWT_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        console.log(decoded.foo); // bar
      }
    });
  },
};
