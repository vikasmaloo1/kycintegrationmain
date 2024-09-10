'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KYCRequests extends Model {
    static associate(models) {
      // define association here
    }
  }
  KYCRequests.init({
    userId: DataTypes.INTEGER,
    documentType: DataTypes.STRING,
    documentData: DataTypes.JSON,
    requestTimestamp: DataTypes.DATE,
    requestStatus: DataTypes.STRING,
    responseData: DataTypes.JSON,
    responseTimestamp: DataTypes.DATE,
    apiStatus: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    domainId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KYCRequests',
  });
  return KYCRequests;
};