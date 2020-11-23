let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let LikeFix = sequelize.import("../models/likeFix");

router.post("/fix", (request, response) => {
  LikeFix.create({
    userId: request.body.userId,
    fixId: request.body.fixId,
  }).then(
    function success(data) {
      response.json(data);
    },
    function error(error) {
      response.send(500, error.message);
    }
  );
});

module.exports = router;
