const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const { connectToDatabase } = require("./config/mongDB");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const compression = require("compression");
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");

// Route import
const indexRouter = require("./routes/indexRoute");
const apiRouter = require("./routes/apiRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();
// Compress all routes
app.use(compression());

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
});
// Apply rate limiter to all requests
app.use(limiter);

// init MongoDB Database
connectToDatabase();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/v1/api", apiRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
