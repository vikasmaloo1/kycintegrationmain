'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kycAPI extends Model {
    static associate(models) {
      // define association here
    }
  }
  kycAPI.init({
    name: DataTypes.STRING,
    thirdPartyApi: DataTypes.STRING,
    apiURL: DataTypes.STRING,
    docRequireInRequest: DataTypes.BOOLEAN,
    responseExample: DataTypes.JSON,
    defaultSequence: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kycAPI',
  });
  return kycAPI;
};