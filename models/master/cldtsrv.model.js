module.exports = (sequelize, DataTypes) => {
  const cldtsrv = sequelize.define(
    "cldtsrv",
    {
      svsrv: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      svname: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      svdiscount: {
        type: DataTypes.ENUM("True", "False"),
        allowNull: false,
      },
      svvoldiv: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      svminkg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "cldtsrv",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return cldtsrv;
};
