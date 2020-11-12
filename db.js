const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "Carissues",
  "fwhdlxgbwstzpm",
  "01fbed73cd0868345c362d5a3d404faecb283eae001411b596ba3f9f254e672f",
  {
    host: "ec2-54-158-222-248.compute-1.amazonaws.com",
    dialect: "postgres",
  }
);

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
