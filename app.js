const express = require('express');
const kycRoutes = require('./src/routes/kycRoutes');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api', kycRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
