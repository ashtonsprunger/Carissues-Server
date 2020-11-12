let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/user.js");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

router.post("/register", (request, response) => {
  User.create({
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10),
    admin: false,
  }).then(
    function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      response.json({
        user: {
          name: user.name,
          admin: user.admin,
          email: user.email,
        },
        message: "Successfully registered",
        token: token,
      });
    },
    function createError(error) {
      response.send(500, error.message);
    }
  );
});

router.post("/login", (request, response) => {
  User.findOne({ where: { email: request.body.email } }).then(
    function (user) {
      if (user) {
        bcrypt.compare(request.body.password, user.password, function (
          error,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            response.json({
              user: {
                name: user.name,
                admin: user.admin,
                email: user.email,
              },
              message: "Successfully logged in",
              token: token,
            });
          } else {
            response.status(502).send({ error: "Incorrect password" });
          }
        });
      } else {
        response.status(500).send({ error: "Incorrect email" });
      }
    },
    function (error) {
      response.status(501).send({ error: "Incorrect email" });
    }
  );
});

router.get("/", (request, response) => {
  response.send("hello there");
});

module.exports = router;
