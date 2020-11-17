let express = require("express");
let router = express.Router();
let sequelize = require("../db");
// let Issue = sequelize.import("../models/issue");

router.get("/", (request, response) => {
  response.json({
    "did it work": "yes",
    "am i happy": "yes",
    "am i sad": "no",
  });
});

module.exports = router;
