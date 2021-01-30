const { request, response } = require("express");
let express = require("express");
const { userInfo } = require("os");
let router = express.Router();
let sequelize = require("../db");
let Issue = sequelize.import("../models/issue");
let Fix = sequelize.import("../models/fix");
let User = sequelize.import("../models/user");
let Entry = sequelize.import("../models/entry");

router.post("/:name/:count", (request, response) => {
  Entry.create({
    name: request.params.name,
    count: request.params.count,
  }).then(
    function success(data) {
      response.json(data);
    },
    function fail(error) {
      response.send(500, error.message);
    }
  );
});

router.get("/speed/name/count", (request, response) => {
  Entry.findAll().then(
    function findAllSuccess(data) {
      response.json(data);
    },
    function findAllError(error) {
      response.send(500, error.message);
    }
  );
});

//! Gets all issues and their fixes
router.get("/", (request, response) => {
  Issue.findAll({
    include: [
      { model: User, attributes: ["name"] },
      { model: Fix, include: [{ model: User, attributes: ["name"] }] },
    ],
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
    include: [
      { model: User, attributes: ["name"] },
      { model: Fix, include: [{ model: User, attributes: ["name"] }] },
    ],
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
    include: [
      { model: User, attributes: ["name"] },
      { model: Fix, include: [{ model: User, attributes: ["name"] }] },
    ],
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
