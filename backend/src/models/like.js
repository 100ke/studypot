const study = require("./study");

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      studyId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "likes" }
  );
  Like.associate = function (models) {
    Like.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Like.belongsTo(models.Study, {
      foreignKey: "studyId",
      as: "study",
    });
  };
  return Like;
};
