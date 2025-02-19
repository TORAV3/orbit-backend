module.exports = (sequelize, DataTypes) => {
  const cltbtypeofpayment = sequelize.define(
    "cltbtypeofpayment",
    {
      pyid: {
        type: DataTypes.STRING(2),
        allowNull: false,
        primaryKey: true,
      },
      pydesc: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
    },
    {
      tableName: "cltbtypeofpayment",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return cltbtypeofpayment;
};
