const axios = require('axios');
const config = require('../config/ApiConfig');

const apiService = {
    async initiateKYCRequest(requestData) {
        const headers = {
            'Content-Type': config.zoopAPI.contentType,
            'api-key': config.zoopAPI.apiKey,
            'app-id': config.zoopAPI.appId
        };

        console.log('Request data:', requestData);

        try {
            const response = await axios.post(config.zoopAPI.url, requestData, { headers });

            return response.data;
            
        } catch (error) {
            console.error('Error during API request:', error);
            throw new Error('KYC API Request Failed');
        }
    }
};

module.exports = apiService;
