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

module.exports = {
  sequelize,
  cltbgroup,
  cltbcust,
};
