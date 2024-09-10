const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const KYCRequests = sequelize.define('kycRequests', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    documentType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    documentData: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    requestTimestamp: {
      type: Sequelize.DATE,
    },
    requestStatus: {
      type: Sequelize.STRING,
    },
    responseData: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    responseTimestamp: {
      type: Sequelize.DATE,
    },
    apiStatus: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    projectId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    domainId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    user: {
      type: Sequelize.JSON,
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

  return KYCRequests;
};
