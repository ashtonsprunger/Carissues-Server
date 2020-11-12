module.exports = function (sequelize, DataTypes) {
  const Issue = sequelize.define("issue", {
    count: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    issue: {
      type: DataTypes.STRING,
    },
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  });

  // Issue.associate = (models) => {
  //   Issue.belongsTo(
  //     models.User /*, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   }*/
  //   );
  // };

  return Issue;
};
