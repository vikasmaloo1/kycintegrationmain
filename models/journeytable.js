'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journeyTable extends Model {
    static associate(models) {
      // define association here
    }
  }
  journeyTable.init({
    kycServiceId: DataTypes.INTEGER,
    sequence: DataTypes.INTEGER,
    kycAPI: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'journeyTable',
  });
  return journeyTable;
};