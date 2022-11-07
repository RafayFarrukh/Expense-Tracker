"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
// const config=require()
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

// const config = require("../config/config.json")[env];
const db = {};

// let sequelize;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log("SQL connected hai");
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  // console.log("SQL  connected");
}
sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./User")(sequelize, DataTypes);
db.Record = require("./Record")(sequelize, DataTypes);
console.log(db.User);
db.User.hasMany(db.Record, {
  as: "recordDetail",
});
db.Record.belongsTo(db.User, {
  foreignKey: "UserId",
  as: "userDetail",
});

module.exports = db;
