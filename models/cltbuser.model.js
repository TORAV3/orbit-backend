module.exports = (sequelize, DataTypes) => {
  const cltbuser = sequelize.define(
    "cltbuser",
    {
      usrid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      usrname: { type: DataTypes.STRING(80), allowNull: false },
      cltbrole_roleid: {
        type: DataTypes.STRING(10),
        references: {
          model: "cltbrole",
          key: "roleid",
        },
      },
      createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "cltbuser",
      paranoid: true,
      timestamps: true,
      createdAt: "createdat",
      updatedAt: "updatedat",
      deletedAt: "deletedat",
    }
  );

  cltbuser.associate = (models) => {
    cltbuser.belongsTo(models.cltbrole, {
      foreignKey: "cltbrole_roleid",
    });
    cltbuser.hasOne(models.cltbduser, { foreignKey: "cltbuser_usrid" });
  };

  return cltbuser;
};
