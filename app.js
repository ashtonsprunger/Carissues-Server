require("dotenv").config();
const { response } = require("express");
let express = require("express");
let app = express();
let user = require("./controllers/userController");

app.use("/api/user", user);

app.use("/", function (req, res) {
  res.send("hi");
});

app.listen(process.env.PORT, function () {
  console.log(`Carissues is listening on port ${process.env.PORT}`);
});
