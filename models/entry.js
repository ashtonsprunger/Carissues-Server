module.exports = function (sequelize, DataTypes) {
  const Entry = sequelize.define("entry", {
    name: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.INTEGER,
    },
  });

  return Entry;
};
