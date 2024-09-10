const kycAPI = require('./kycapi');
const kycService = require('./kycservice');
const journeyTable = require('./journeytable');
const userJourney = require('./userjourney');
const kycRequests = require('./kycrequests');

const { seqInstance } = require("./index");
const Sequelize = require("sequelize");

class connection {
    Sequelize = Sequelize;
    seqInstance = seqInstance;
    static Admins;
    static connect = (con) => {
        this.kycAPI = kycAPI(con);
        this.kycService = kycService(con);
        this.journeyTable = journeyTable(con);
        this.userJourney = userJourney(con);
        this.kycRequest = kycRequests(con); 
    };
  }
  
  module.exports = {
    connect: connection.connect,
    connection,
  };