const express = require("express");
const app = express();
app.use(express.static(__dirname + "/dist/angular-movies-explorer"));
app.listen(process.env.PORT || 3000);