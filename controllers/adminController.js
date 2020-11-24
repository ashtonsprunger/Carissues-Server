let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Issue = sequelize.import("../models/issue");

//! Update issue by id
router.put("/:id", (request, response) => {
  let id = request.params.id;

  Issue.update(
    {
      // title: request.body.title,
      // issue: request.body.issue,
      // make: request.body.make,
      // model: request.body.model,
      // year: request.body.year,
      title: "how ya doin",
    },
    { where: { id: id } }
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

  Issue.destroy({
    where: { id: id },
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

//! Update a fix by id
router.put("/fixes/:id", (request, response) => {
  let id = request.params.id;
  let newFix = request.body.fix;

  Fix.update(
    {
      fix: newFix,
    },
    { where: { id: id } }
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
    where: { id: request.params.id },
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
