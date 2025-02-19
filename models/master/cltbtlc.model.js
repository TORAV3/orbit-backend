module.exports = (sequelize, DataTypes) => {
  const cltbtlc = sequelize.define(
    "cltbtlc",
    {
      tltlccode: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      tlname: {
        type: DataTypes.STRING(35),
        allowNull: true,
      },
      tlvia: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      tlint: {
        type: DataTypes.ENUM("True", "False"),
        allowNull: false,
      },
      tlmain: {
        type: DataTypes.ENUM("True", "False"),
        allowNull: false,
      },
    },
    {
      tableName: "cltbtlc",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return cltbtlc;
};
