module.exports = (sequelize, DataTypes) => {
  const cldtracehtrans = sequelize.define(
    "cldtracehtrans",
    {
      trnnohawb: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        defaultValue: "",
      },
      trndate: DataTypes.DATE,
      trntypeofpayment: {
        type: DataTypes.CHAR(2),
        references: {
          model: "cltbtypeofpayment",
          key: "pyid",
        },
      },
      trnorg: {
        type: DataTypes.CHAR(3),
        references: {
          model: "cltbtlc",
          key: "tltlccode",
        },
      },
      trndest: {
        type: DataTypes.CHAR(3),
        references: {
          model: "cltbtlc",
          key: "tltlccode",
        },
      },
      trnsubdest: DataTypes.STRING(13),
      cltbcust_csacc: {
        type: DataTypes.STRING(16),
        references: {
          model: "cltbcust",
          key: "csacc",
        },
      },
      trnname: DataTypes.STRING(64),
      trnalm1: DataTypes.STRING(64),
      trnalm2: DataTypes.STRING(64),
      trnalm3: DataTypes.STRING(64),
      trncity: DataTypes.STRING(64),
      trnpost: DataTypes.STRING(6),
      trnphone: DataTypes.STRING(16),
      trnfax: DataTypes.STRING(16),
      trncontact: DataTypes.STRING(64),
      trntypeofpackage: {
        type: DataTypes.CHAR(3),
        references: {
          model: "cltbtypeofpackage",
          key: "pkid",
        },
      },
      trntypeofservice: {
        type: DataTypes.CHAR(3),
        references: {
          model: "cldtsrv",
          key: "svsrv",
        },
      },
      trnconsacc: DataTypes.STRING(16),
      trnconsname: DataTypes.STRING(64),
      trnconsalm1: DataTypes.STRING(64),
      trnconsalm2: DataTypes.STRING(64),
      trnconsalm3: DataTypes.STRING(64),
      trnconscity: DataTypes.STRING(64),
      trnconspost: DataTypes.STRING(6),
      trnconsphone: DataTypes.STRING(64),
      trnconsfax: DataTypes.STRING(16),
      trnconscontact: DataTypes.STRING(64),
      trndim_h: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trndim_w: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trndim_l: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnweight: {
        type: DataTypes.DECIMAL(16, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnkoli: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: 1 },
      trncharge1stkg: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnchargekg: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnchargeinsurance: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnchargepacking: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnchargeothers: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trndisc: {
        type: DataTypes.DECIMAL(4, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trndiscamount: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trntotalcharge: {
        type: DataTypes.DECIMAL(18, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trninsuranceid: DataTypes.STRING(12),
      trnpickupbynik: DataTypes.STRING(13),
      trnpickupbyname: DataTypes.STRING(25),
      trnpickupdate: DataTypes.DATE,
      trnpickuptime: DataTypes.TIME,
      trnspecialinstruction: DataTypes.TEXT,
      trndelivereddate: DataTypes.DATE,
      trndeliveredtime: DataTypes.TIME,
      trndeliveredbyname: DataTypes.STRING(64),
      trndeliveredbynik: DataTypes.STRING(64),
      trnreceiver: DataTypes.STRING(64),
      trnreceivernotes: DataTypes.STRING(35),
      cltbmanifest_mnfid: DataTypes.STRING(15),
      cltbinvoice_invid: DataTypes.STRING(15),
      trnsmuno: DataTypes.STRING(12),
      trncustref: DataTypes.STRING(25),
      trnchargeswt: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnundel: DataTypes.CHAR(3),
      trnvalue: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      trnunit: {
        type: DataTypes.ENUM("kgs", "cly", "cbm"),
        defaultValue: "kgs",
        allowNull: false,
      },
      trncbm: {
        type: DataTypes.DECIMAL(8, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "cldtracehtrans",
      paranoid: true,
      timestamps: true,
      createdAt: "createdat",
      updatedAt: "updatedat",
      deletedAt: "deletedat",
    }
  );

  cldtracehtrans.associate = (models) => {
    cldtracehtrans.belongsTo(models.cltbtypeofpayment, {
      foreignKey: "trntypeofpayment",
    });
    cldtracehtrans.belongsTo(models.cltbcust, { foreignKey: "cltbcust_csacc" });
    cldtracehtrans.belongsTo(models.cltbtlc, { foreignKey: "trnorg" });
    cldtracehtrans.belongsTo(models.cltbtlc, { foreignKey: "trndest" });
    cldtracehtrans.belongsTo(models.cldtsrv, {
      foreignKey: "trntypeofservice",
    });
    cldtracehtrans.belongsTo(models.cltbtypeofpackage, {
      foreignKey: "trntypeofpackage",
    });
  };

  return cldtracehtrans;
};
