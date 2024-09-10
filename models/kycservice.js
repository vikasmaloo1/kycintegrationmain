'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kycService extends Model {
    static associate(models) {
      // define association here
    }
  }
  kycService.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kycService',
  });
  return kycService;
};