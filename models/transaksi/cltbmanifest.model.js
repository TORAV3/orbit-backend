module.exports = (sequelize, DataTypes) => {
  const cltbmanifest = sequelize.define(
    "cltbmanifest",
    {
      mnfid: {
        type: DataTypes.CHAR(15),
        allowNull: false,
        primaryKey: true,
        defaultValue: ''
      },
      mnfdate: DataTypes.DATE,
      mnftlcorg: DataTypes.CHAR(3),
      mnftlcdst: DataTypes.CHAR(3),
      mnfprinted: DataTypes.DATE,
      mnfmoda: DataTypes.CHAR(15),
      mnfvendordelivery: DataTypes.CHAR(64),
      mnfplatno: DataTypes.CHAR(15),
      mnftypearmada: DataTypes.CHAR(13),
      mnfpic: DataTypes.CHAR(32),
      mnfphone: DataTypes.CHAR(32),
      mnfgpsid: DataTypes.CHAR(64),
      mnfstatus: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      mnfremark: DataTypes.CHAR(128),
      createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "cltbmanifest",
      paranoid: true,
      timestamps: true,
      createdAt: "createdat",
      updatedAt: "updatedat",
      deletedAt: "deletedat",
    }
  );

  cltbmanifest.associate = (models) => {
    cltbmanifest.hasMany(models.cltbdmanifest, {
      foreignKey: "cltbmanifest_mnfid",
    });
    cltbmanifest.belongsTo(models.cltbtlc, { foreignKey: "mnftlcorg" });
    cltbmanifest.belongsTo(models.cltbtlc, { foreignKey: "mnftlcdst" });
  };

  return cltbmanifest;
};
