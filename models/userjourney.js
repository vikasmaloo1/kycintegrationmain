const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const UserJourney = sequelize.define('userJourneys', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    isFinished: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    lastJourneyId: {
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

  return UserJourney;
};
