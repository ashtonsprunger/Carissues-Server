module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
    },
  });

  // User.associate = (models) => {
  //   User.hasMany(models.Issue);
  //   User.hasMany(models.Fix);
  // };

  return User;
};

// module.exports = function (sequelize, DataTypes) {
//   return sequelize.define("user", {
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     admin: DataTypes.BOOLEAN,
//   });
// };
