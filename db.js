const Sequelize = require("sequelize");

const sequelize = new Sequelize("Carissues", "postgres", "ashtonefa", {
  host: "localhost",
  dialect: "postgres",
});

let User = sequelize.import("./models/user");
let Issue = sequelize.import("./models/issue");
let Fix = sequelize.import("./models/fix");

Issue.belongsTo(User);
User.hasMany(Issue);

Issue.hasMany(Fix, {
  onDelete: "cascade",
});
Fix.belongsTo(User);
Fix.belongsTo(Issue);

module.exports = sequelize;
