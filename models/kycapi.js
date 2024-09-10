const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const KycAPI = sequelize.define('kycAPIs', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    thirdPartyApi: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    apiURL: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    docRequireInRequest: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    responseExample: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    defaultSequence: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'active',
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    }
  });

  return KycAPI;
};
