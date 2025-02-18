module.exports = (sequelize, DataTypes) => {
  const cltbgroup = sequelize.define(
    "cltbgroup",
    {
      cltbcust_cspickupzone: {
        type: DataTypes.STRING(39),
        allowNull: true,
        primaryKey: true,
      },
      groupdesc: {
        type: DataTypes.STRING(192),
        allowNull: true,
      },
    },
    {
      tableName: "cltbgroup",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return cltbgroup;
};
