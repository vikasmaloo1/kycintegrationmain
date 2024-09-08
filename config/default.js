require("dotenv").config();

const config = {
  ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || "https%3A%2F%2Fdeluge.zoho.com%2Fdelugeauth%2Fcallback",
  ZOHO_BOOKING_URL: process.env.ZOHO_BOOKING_URL || "https://www.zohoapis.in/bookings/v1/json",
  ZOHO_AUTH_URL: process.env.ZOHO_AUTH_URL || "https://accounts.zoho.in/oauth/v2/token",
};
module.exports = config;
