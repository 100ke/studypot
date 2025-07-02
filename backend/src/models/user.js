module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.TEXT, allowNull: false },
    },
    { tableName: "users" }
  );
  User.associate = function (models) {
    User.hasMany(models.Study, {
      foreignKey: "hostId",
      as: "openedStudies",
    });
    User.belongsToMany(models.Study, {
      through: models.JoinRequest,
      foreignKey: "userId",
      otherKey: "studyId",
      as: "appliedStudies",
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId",
    });
    User.hasMany(models.Like, {
      foreignKey: "userId",
    });
  };
  return User;
};
