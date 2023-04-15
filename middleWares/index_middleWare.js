const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRoutes = require("../routes/index_routes");
require("../config/index_config");

module.exports = app => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  indexRoutes(app);
};
