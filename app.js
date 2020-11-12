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

app.use("/api/user", user);
app.use("/api/unauth", unauth);

app.use(require("./middleware/validate-session"));
app.use("/api/auth", auth);

app.listen(process.env.PORT, function () {
  console.log(`Carissues is listening on port ${process.env.PORT}`);
});
