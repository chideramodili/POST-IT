const express = require("express");
const app = express();
const indexMiddleWare = require("./middleWares/index_middleWare");
indexMiddleWare(app);
exports.app = app;

// listenigng server

app.listen(3000);
