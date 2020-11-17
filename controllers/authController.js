let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Issue = sequelize.import("../models/issue");
let Fix = sequelize.import("../models/fix");
let User = sequelize.import("../models/user");

//! Gets all issues for current user
router.get("/", (request, response) => {
  Issue.findAll({
    where: { userId: request.user.id },
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

//! Post an issue
router.post("/:make/:model", (request, response) => {
  let body = request.body;

  Issue.create({
    count: 1,
    title: body.title,
    issue: body.issue,
    make: request.params.make,
    model: request.params.model,
    year: body.year,
    userId: request.user.id,
  }).then(
    function createSuccess(data) {
      response.json(data);
    },
    function createError(error) {
      response.send(500, error.message);
    }
  );
});

//! Update issue by id
router.put("/:id", (request, response) => {
  let id = request.params.id;
  let userId = request.user.id;

  Issue.update(
    {
      title: request.body.title,
      issue: request.body.issue,
      make: request.body.make,
      model: request.body.model,
      year: request.body.year,
    },
    { where: { id: id, userId: userId } }
  ).then(
    function updateSuccess(log) {
      response.json(request.body);
    },
    function updateError(error) {
      response.send(500, error.message);
    }
  );
});

//! Delete issue by id
router.delete("/:id", (request, response) => {
  let id = request.params.id;
  let userId = request.user.id;

  Issue.destroy({
    where: { id: id, userId: userId },
  }).then(
    function deleteSuccess(data) {
      if (data) {
        response.send("Successfully deleted");
      } else {
        response.send("Wrong id");
      }
    },
    function deleteError(error) {
      response.send(500, error.message);
    }
  );
});

//! Post a fix for a given issue id
router.post("/:id", (request, response) => {
  let issue_id = request.params.id;

  Fix.create({
    fix: request.body.fix,
    userId: request.user.id,
    issueId: issue_id,
  }).then(
    function createSuccess(data) {
      response.json(data);
    },
    function createError(error) {
      response.send(500, error.message);
    }
  );
});

//! Update a fix by id
router.put("/fixes/:id", (request, response) => {
  let id = request.params.id;
  let userId = request.user.id;
  let newFix = request.body.fix;

  Fix.update(
    {
      fix: newFix,
    },
    { where: { id: id, userId: userId } }
  ).then(
    function updateSuccess(data) {
      response.json(request.body);
    },
    function updateError(error) {
      response.send(500, error.message);
    }
  );
});

//! Delete a fix by id
router.delete("/fixes/:id", (request, response) => {
  Fix.destroy({
    where: { id: request.params.id, userId: request.user.id },
  }).then(
    function deleteSuccess() {
      response.send("Successfully deleted");
    },
    function deleteError() {
      response.send(500, error.message);
    }
  );
});

module.exports = router;
