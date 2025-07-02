module.exports = (sequelize, DataTypes) => {
  const Study = sequelize.define(
    "Study",
    {
      title: { type: DataTypes.TEXT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      location: { type: DataTypes.TEXT, allowNull: true },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      hostId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "studies" }
  );
  Study.associate = function (models) {
    Study.belongsTo(models.User, {
      foreignKey: "hostId",
      as: "host",
    });
    Study.belongsToMany(models.User, {
      through: models.JoinRequest,
      foreignKey: "studyId",
      otherKey: "userId",
      as: "applicants",
    });
    Study.hasMany(models.Comment, {
      foreignKey: "studyId",
      as: "comments",
    });
    Study.hasMany(models.Like, {
      foreignKey: "studyId",
      as: "likes",
    });
  };
  return Study;
};
