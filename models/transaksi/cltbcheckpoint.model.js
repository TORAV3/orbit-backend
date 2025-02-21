module.exports = (sequelize, DataTypes) => {
  const cltbcheckpoint = sequelize.define(
    "cltbcheckpoint",
    {
      checkid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // Auto-increment the ID
      },
      checkhawb: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      checkdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checktime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      checkstatus: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      checkremarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "cltbcheckpoint",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return cltbcheckpoint;
};
