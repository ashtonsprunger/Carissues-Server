let express = require("express");
const { userInfo } = require("os");
let router = express.Router();
let sequelize = require("../db");
let Issue = sequelize.import("../models/issue");
let Fix = sequelize.import("../models/fix");
let User = sequelize.import("../models/user");

//! Gets all issues and their fixes
router.get("/", (request, response) => {
  Issue.findAll({
    include: [{ model: User }, { model: Fix, include: "user" }],
  }).then(
    function findAllSuccess(data) {
      response.json(data);
    },
    function findAllError(error) {
      response.send(500, error.message);
    }
  );
});

//! Gets issues by make and model and their fixes
router.get("/:make/:model", (request, response) => {
  Issue.findAll({
    where: { make: request.params.make, model: request.params.model },
    include: "fixes",
  }).then(
    function findSuccess(data) {
      response.json(data);
    },
    function findError(error) {
      response.send(500, error.message);
    }
  );
});

//! Get issues by make and their fixes
router.get("/:make", (request, response) => {
  Issue.findAll({
    where: { make: request.params.make },
    include: "fixes",
  }).then(
    function findSuccess(data) {
      response.json(data);
    },
    function findError(error) {
      response.send(500, error.message);
    }
  );
});

module.exports = router;
