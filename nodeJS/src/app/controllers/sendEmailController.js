// emailService.js

const nodemailer = require('nodemailer');

const user = '1.hklfashion@gmail.com';
const pass = 'iijusrgnpffkzmin';

// Set up the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass,
    },
});

const sendPurchaseConfirmationEmail = (Order) => {
    return new Promise((resolve, reject) => {
        // Define the email content with order details
        const mailOptions = {
            from: user,
            to: Order.gmail,
            subject: 'Cảm ơn bạn đã thanh toán đơn hàng tại HKL Fashion!',
            html: `
                <p>HKl Fashion chân thành cảm ơn bạn đã tin tưởng và ủng hộ!</p>
                <p>Chi tiết đơn hàng:</p>
                <ul>
                    <li>Tên người nhận: ${Order.name}</li>
                    <li>Địa chỉ: ${Order.address}</li>
                    <li>Số điện thoại: ${Order.phone}</li>
                    <li>Phương thức thanh toán: ${Order.pay_method}</li>
                    <li>Tổng tiền: ${Order.total}đ</li>
                    <!-- Add other order details as needed -->
                </ul>
            `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                reject('Failed to send email.');
            } else {
                console.log('Email sent: ' + info.response);
                resolve('Email sent successfully!');
            }
        });
    });
};

module.exports = { sendPurchaseConfirmationEmail };
