module.exports = (sequelize, DataTypes) => {
  const JoinRequest = sequelize.define(
    "JoinRequest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      appliedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      studyId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "join_requests", timestamps: false }
  );
  JoinRequest.associate = function (models) {
    JoinRequest.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    JoinRequest.belongsTo(models.Study, {
      foreignKey: "studyId",
      as: "study",
    });
  };
  return JoinRequest;
};
