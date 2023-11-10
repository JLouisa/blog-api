const jwt = require("jsonwebtoken");

module.exports = {
  // Verify token
  isAuth: function (req, res, next) {
    // Get auth header Value
    const bearerHeader = req.headers["authorization"];
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
  isAdmin: function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_JWT_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        if (decoded.user.isAdmin === true && decoded.user.isSuspended === false) {
          console.log("Verified");
          req.body.id = decoded.user._id;
          next();
        } else {
          return res.sendStatus(401);
        }
      }
    });
  },
  isMember: function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET_JWT_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        if (decoded.user.isSuspended === false) {
          console.log("Verified member");
          req.body.id = decoded.user.id;
          next();
        } else {
          return res.sendStatus(401);
        }
      }
    });
  },
};
