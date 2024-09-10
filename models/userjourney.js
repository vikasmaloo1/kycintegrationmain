'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userJourney extends Model {
    static associate(models) {
      // define association here
    }
  }
  userJourney.init({
    userId: DataTypes.INTEGER,
    isFinished: DataTypes.BOOLEAN,
    lastJourneyId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userJourney',
  });
  return userJourney;
};