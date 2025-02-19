module.exports = (sequelize, DataTypes) => {
  const cltbtypeofpackage = sequelize.define(
    "cltbtypeofpackage",
    {
      pkid: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      pkdesc: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
    },
    {
      tableName: "cltbtypeofpackage",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return cltbtypeofpackage;
};
