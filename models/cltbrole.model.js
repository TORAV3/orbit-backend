module.exports = (sequelize, DataTypes) => {
  const cltbrole = sequelize.define(
    "cltbrole",
    {
      roleid: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      rolename: { type: DataTypes.STRING(30), allowNull: false },
      createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "cltbrole",
      paranoid: true,
      timestamps: true,
      createdAt: "createdat",
      updatedAt: "updatedat",
      deletedAt: "deletedat",
    }
  );

  cltbrole.associate = (models) => {
    cltbrole.hasMany(models.cltbuser, { foreignKey: "cltbrole_roleid" });
  };

  return cltbrole;
};
