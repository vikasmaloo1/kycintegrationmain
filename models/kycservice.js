const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const KycService = sequelize.define('kycServices', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
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

  return KycService;
};