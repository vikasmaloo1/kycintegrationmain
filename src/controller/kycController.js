const kycService = require('../../services/KycService');
const s3Service = require('../../services/s3Service');

const { Readable } = require('stream');

// Convert buffer to base64
const convertFileToBase64 = (buffer) => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(buffer);
        bufferStream.push(null);
        
        let base64String = '';
        bufferStream.on('data', (chunk) => {
            base64String += chunk.toString('base64');
        });
        bufferStream.on('end', () => {
            resolve(base64String);
        });
        bufferStream.on('error', (err) => {
            reject(err);
        });
    });
};

const kycController = {
    async initiateKYC(req, res) {
        try {
            // Access form data from req.body
            const { card_type, consent, consent_text , task_id} = req.body;
            // const { task_id } = req.body;

            // Access uploaded files from req.files
            const cardFrontImage = req.files['card_front_image'] ? req.files['card_front_image'][0].buffer : null;
            const cardBackImage = req.files['card_back_image'] ? req.files['card_back_image'][0].buffer : null;

            // Prepare base64 strings for images
            let cardFrontBase64 = null;
            let cardBackBase64 = null;

            if (cardFrontImage) {
                // Upload card front image to AWS S3 and get its URL
                const cardFrontS3 = await s3Service.uploadFileToS3(cardFrontImage, 'card_front_image');
                const cardFrontBuffer = await s3Service.downloadFileFromS3(cardFrontS3.Location);
                cardFrontBase64 = await convertFileToBase64(cardFrontBuffer);
            }

            if (cardBackImage) {
                // Upload card back image to AWS S3 and get its URL
                const cardBackS3 = await s3Service.uploadFileToS3(cardBackImage, 'card_back_image');
                const cardBackBuffer = await s3Service.downloadFileFromS3(cardBackS3.Location);
                cardBackBase64 = await convertFileToBase64(cardBackBuffer);
            }

            // Prepare request data for KYC service
            const requestData = {
                "mode": "sync",
                "data": {
                    card_front_image: cardFrontBase64,
                    card_back_image: cardBackBase64,
                    card_type,
                    consent,
                    consent_text
                },
                task_id
            };

            // Send request to KYC service
            const response = await kycService.initiateKYCRequest(requestData);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = kycController;
