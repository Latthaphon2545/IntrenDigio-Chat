const exprees = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./router/auth");
const db = require("./models/dbhelper");

const app = exprees();

db.connection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
