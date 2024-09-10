const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/default'); // Load the configuration file

// Initialize Sequelize with configuration
const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    port: config.database.port,
    timezone: config.database.timezone,
    logging: config.database.logging ? console.log : false,
    dialectOptions: {
      connectTimeout: 60000, // Optional
    },
    retry: {
      max: 3, // Retry failed connections
    },
  }
);

const db = {};

// Load all models from the models directory
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// If there are associations (relations) between models, add them here
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
