require('dotenv').config(); // Load .env file

module.exports = {
    port: process.env.PORT || 3000,
    swaggerUrl: process.env.SWAGGER_URL || 'localhost:3000',
    domain: process.env.DOMAIN || 'http://localhost:3000',
    
    database: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'database',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        timezone: process.env.TIME_ZONE || '+00:00',
        DEBUG: process.env.DEBUG || "true",
    },
    
    jwt: {
        secret: process.env.JWT_SECRET || 'default_jwt_secret',
        saltLength: parseInt(process.env.SALT_LENGTH, 10) || 10,
    },
    
    aws: {
        bucketName: process.env.AWS_BUCKET_NAME,
        accessKey: process.env.AWS_BUCKET_ACCESS_KEY,
        secretKey: process.env.AWS_BUCKET_ACCESS_SECRET,
        region: process.env.AWS_BUCKET_REGION,
    },
    
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        companyName: process.env.TWILIO_COMPANY_NAME,
        appName: process.env.TWILIO_APP_NAME,
        timeInMin: process.env.TWILIO_TIME_IN_MIN || 10,
    },
    
    services: {
        userManagementServiceUrl: process.env.USER_MANAGEMENT_SERVICE_URL || 'http://localhost:8080',
    },
    
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
};
