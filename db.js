const Sequelize = require("sequelize");

const sequelize = new Sequelize("Carissues", "postgres", "ashtonefa", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
