require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");
app.use(express.json());
app.use(require("./middleware/headers"));
sequelize.sync();

let user = require("./controllers/userController");
let unauth = require("./controllers/unauthController");
let auth = require("./controllers/authController");
let admin = require("./controllers/adminController");

sequelize.authenticate().then(
  function () {
    console.log("Connected to Carissues postgres database");
  },
  function (err) {
    console.log(err);
  }
);

// app.use("/", function (req, res) {
//   res.send("hi");
// });

// process.on("uncaughtException", function (error) {
//   console.log(error);
// });

//! Unauthenticated routes
app.use("/api/user", user);
app.use("/api/unauth", unauth);

//! Must be a user
app.use(require("./middleware/validate-session"));
app.use("/api/auth", auth);

//! Must be an admin
app.use(require("./middleware/admin-only"));
app.use("/api/admin", admin);

app.listen(process.env.PORT, function () {
  console.log(`Carissues is listening on port ${process.env.PORT}`);
});
