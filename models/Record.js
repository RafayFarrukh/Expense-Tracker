'use strict';

module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.DATEONLY,
 
    amount: DataTypes.INTEGER,
     currentBalance: DataTypes.INTEGER
  }, {});
  // Record.associate = function (models) {
  //   Record.belongsTo(models.User)
  // };
  return Record;
};