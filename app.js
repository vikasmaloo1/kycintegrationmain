const express = require("express");
const config = require("config");
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./models/index");
const { connect } = require("./models/allmodels");
// const imports = require("./src/routes/index");

connect(connection);
let app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
const routes = require('./src/routes/index');
const kycRoutes = routes(app);
app.use('/api', kycRoutes);


// Start server
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
