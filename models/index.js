const Sequelize = require('sequelize');
const config = require('../config/default'); // Load the configuration file

// Initialize Sequelize with configuration from config file
const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    timezone: config.database.timezone,
    freezeTableName: false,
    benchmark: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
    logging: process.env.DATABASE_DEBUG === 'true' ? console.log : false, // Optional debug logging
  }
);

// Test the connection
if (process.env.DATABASE_DEBUG === 'true') {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
      throw error;
    });
}

module.exports = sequelize;
