module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: { type: DataTypes.TEXT, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      studyId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "comments" }
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "writer",
    });
    Comment.belongsTo(models.Study, {
      foreignKey: "studyId",
      as: "study",
    });
  };
  return Comment;
};
