let express = require("express");
let router = express.Router();
let sequelize = require("../db");
// let User = sequelize.import("../models/user");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

router.post("/register", (request, response) => {
  User.create({
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10),
  }).then(
    function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      response.json({
        user: user,
        message: "registered",
        token: token,
      });
    },
    function createError(error) {
      response.send(500, error.message);
    }
  );
});

router.get("/", (request, response) => {
  response.send("hello there");
});

module.exports = router;
