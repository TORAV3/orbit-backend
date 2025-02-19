module.exports = (sequelize, DataTypes) => {
  const cltbduser = sequelize.define(
    "cltbduser",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cltbuser_usrid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "cltbuser",
          key: "usrid",
        },
      },
      tawb: { type: DataTypes.CHAR(1), allowNull: true, defaultValue: "0" },
      createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "cltbduser",
      paranoid: true,
      timestamps: true,
      createdAt: "createdat",
      updatedAt: "updatedat",
      deletedAt: "deletedat",
    }
  );

  cltbduser.associate = (models) => {
    cltbduser.belongsTo(models.cltbuser, {
      foreignKey: "cltbuser_usrid",
    });
  };

  return cltbduser;
};
