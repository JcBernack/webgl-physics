const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();
app.use(helmet());
app.use(express.static("./src"));

const port = process.env.PORT || 80;
const server = app.listen(port, function () {
  console.log("Server listening on", server.address());
});
