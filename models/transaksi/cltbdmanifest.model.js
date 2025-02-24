module.exports = (sequelize, DataTypes) => {
  const cltbdmanifest = sequelize.define(
    "cltbdmanifest",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cltbmanifest_mnfid: {
        type: DataTypes.CHAR(15),
        allowNull: false,
        references: {
          model: "cltbmanifest",
          key: "mnfid",
        },
      },
      cldtracehtrans_trnnohawb: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        references: {
          model: "cldtracehtrans",
          key: "trnnohawb",
        },
      },
      createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "cltbdmanifest",
      paranoid: true,
      timestamps: true,
      createdAt: "createdat",
      updatedAt: "updatedat",
      deletedAt: "deletedat",
    }
  );

  cltbdmanifest.associate = (models) => {
    cltbdmanifest.belongsTo(models.cldtracehtrans, {
      foreignKey: "cldtracehtrans_trnnohawb",
    });
    cltbdmanifest.belongsTo(models.cltbmanifest, {
      foreignKey: "cltbmanifest_mnfid",
    });
  };

  return cltbdmanifest;
};
