const express = require('express');
const router = express.Router();
const { sendPurchaseConfirmationEmail } = require('../app/controllers/sendEmailController');

router.post('/', async (req, res) => {
    try {
        // Extract order details from the request body
        const { Order } = req.body;
        console.log('----order', Order);

        // Send the purchase confirmation email
        const result = await sendPurchaseConfirmationEmail(Order);

        // Respond with success message
        res.status(200).send(result);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

module.exports = router;