const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.static(__dirname + "/dist/angular-movies-explorer"));
app.get("*", (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(__dirname, "/dist/angular-movies-explorer", "index.html")
    );
});
const port = process.env.PORT || 3000;
console.log(`Started at port: ${port}`);
app.listen(port);
