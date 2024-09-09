const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/default');
const db = require('./models'); // Load the models and the Sequelize connection

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '50mb' })); // In case you need a large payload
app.use(bodyParser.urlencoded({ extended: true }));

// Test DB connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync models with the database
// db.sequelize.sync({ force: false }) // Set to true to drop tables on every sync
//   .then(() => {
//     console.log('Database synchronized.');
//   })
//   .catch((err) => {
//     console.error('Error during DB sync:', err);
//   });

// Routes
const kycRoutes = require('./src/routes/kycRoutes');
app.use('/api', kycRoutes);


// Start server
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
