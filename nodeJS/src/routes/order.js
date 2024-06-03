const express = require('express');
const orderController = require('../app/controllers/orderController.js');
const router = express.Router();
const momo = require('../app/controllers/momo.js');
const vnpay = require('../app/controllers/vnpay.js');

router.post('/create', orderController.StoreOrder);
router.get('/:id/order-detail', orderController.ShowOderDetailByOrder);
router.get('/order-detail/:id', orderController.GetOrderDetail);
router.post('/order-detail', orderController.StoreOrderDetail);

router.post('/momo_payment_url', momo.createPaymentUrl);
router.get('/momo_return', momo.verifyPaymentUrl);
router.post('/vnpay_url', vnpay.createPaymentUrl);
router.get('/vnpay_return', vnpay.vnpStatusReturn);

router.get('/discount', orderController.ShowDiscount);
module.exports = router;
