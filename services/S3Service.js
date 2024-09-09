const AWS = require('aws-sdk');
const util = require('util');
const stream = require('stream');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

// Function to upload file to S3
const uploadFileToS3 = async (fileBuffer, fileName) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName, // You may want to include a unique identifier here
        Body: fileBuffer,
        // ContentType: 'application/octet-stream' // Set this accordingly
    };
    
    return s3.upload(params).promise();
};

// Function to download file from S3
const downloadFileFromS3 = async (fileUrl) => {
    const fileKey = fileUrl.split('/').pop();
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey
    };

    const data = await s3.getObject(params).promise();
    return data.Body;
};

module.exports = { uploadFileToS3, downloadFileFromS3 };
