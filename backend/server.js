require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const Router = require("./Routes/bookmark_route");

app.use(cors());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(Router)

app.listen(3001, (err) => {
  if (err) {
    console.log("Something went wrong !", err);
  } else {
    require("./db_config");
    console.log("Server running on port number:", 3001);
  }
});
