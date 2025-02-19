const Sequelize = require("sequelize");
const config = require("../configs/database");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const cltbgroup = require("./master/cltbgroup.model")(sequelize, Sequelize);
const cltbcust = require("./master/cltbcust.model")(sequelize, Sequelize);
const cldtsrv = require("./master/cldtsrv.model")(sequelize, Sequelize);
const cltbtypeofpayment = require("./master/cltbtypeofpayment.model")(
  sequelize,
  Sequelize
);
const cltbtypeofpackage = require("./master/cltbtypeofpackage.model")(
  sequelize,
  Sequelize
);
const cltbtlc = require("./master/cltbtlc.model")(sequelize, Sequelize);

module.exports = {
  sequelize,
  cltbgroup,
  cltbcust,
  cldtsrv,
  cltbtypeofpayment,
  cltbtypeofpackage,
  cltbtlc,
};
