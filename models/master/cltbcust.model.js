module.exports = (sequelize, DataTypes) => {
  const cltbcust = sequelize.define(
    "cltbcust",
    {
      csacc: {
        type: DataTypes.STRING(16),
        allowNull: false,
        primaryKey: true,
      },
      csdate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      csduedate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      csreview: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      csname: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csaddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      csalm1: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csalm2: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csalm3: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      cscity: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      cspost: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      csphone: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      csfax: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      cstelex: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      csemail: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      cslob: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csdescmaker: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csdmtitle: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      cscontact: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      cstitle: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      csinvalm1: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csinvalm2: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csinvalm3: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csinvcity: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csinvpost: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      csinvcontact: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csinvcontitle: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      csinvap: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csinvtitle: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      csinvremark: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      csinvphone: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      csinvext: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      csinvfax: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      csinvtelex: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      csinvemail: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      csdisc: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
      csnpwp: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      cstop: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      csorigin: {
        type: DataTypes.CHAR(3),
        allowNull: true,
      },
      cssales: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      csuser: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      cstarget: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
      },
      cspickupzone: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      cssicode: {
        type: DataTypes.CHAR(3),
        allowNull: false,
      },
      csaccref: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      cssprate: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      csremark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      csenable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "cltbcust",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  cltbcust.associate = (models) => {
    cltbcust.hasMany(models.cldtracehtrans, {
      foreignKey: "cltbcust_csacc",
    });
  };

  return cltbcust;
};
