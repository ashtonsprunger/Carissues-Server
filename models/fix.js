module.exports = function (sequelize, DataTypes) {
  return sequelize.define("fix", {
    fix: {
      type: DataTypes.STRING,
    },
  });
};
