const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const expressValidator = require("express-validator");

module.exports = class AppMiddleware {
  static init(app) {
    app.set("views", path.join(`${__dirname}/..`, "views"));
    // app.set("view engine", "jade");
    app.set("view engine", "ejs");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(`${__dirname}/..`, "public")));
    app.use(express.static(path.join(`${__dirname}/..`, "views")));
    app.use(expressValidator());

    return app;
  }
};
