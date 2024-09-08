const kycService = require('../../services/KycService');
const fs = require('fs');
const path = require('path');
const card_front_image_path = path.join(__dirname, '../../images/pan_card.jpg');

const kycController = {
    async initiateKYC(req, res) {
        const { card_type, consent, consent_text} = req.body.data;
        const {task_id} = req.body;


        // Convert images to base64
        const convertImageToBase64 = (path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data.toString('base64'));
                });
            });
        };

        try {
            const card_front_image = await convertImageToBase64(card_front_image_path);
            // const card_back_image = await convertImageToBase64(card_back_image_path);

            const requestData = {
                "mode": "sync",
                "data": {
                    card_front_image,
                    card_type,
                    consent,
                    consent_text
                },
                task_id
            };

            const response = await kycService.initiateKYCRequest(requestData);

            console.log('respoonsese',response);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = kycController;
