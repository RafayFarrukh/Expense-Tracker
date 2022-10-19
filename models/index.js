'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize,DataTypes} = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require( '../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // console.log("SQL connected");

} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log("SQL connected");
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }); 

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.User=require('./User')(sequelize,DataTypes)
// db.Record=require('./Record')(sequelize,DataTypes)

// db.User.hasMany(
//   db.Record,
//   {
//     foreignKey:'UserId',
//     as :'record'
// });
// db.Record.belongsTo(
//   db.User,
//   {
//     foreignKey:'UserId',
//     as :'userinfo'
// }
  
//   )
module.exports = db;
