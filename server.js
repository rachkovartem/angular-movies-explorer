const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.static(__dirname + "/dist/angular-movies-explorer"));
const port = process.env.PORT || 3000;
console.log(`Started at port: ${port}`);
app.listen(port);
