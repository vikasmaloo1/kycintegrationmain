const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const JourneyTable = sequelize.define('journeyTables', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kycServiceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sequence: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    kycAPI: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

  return JourneyTable;
};
