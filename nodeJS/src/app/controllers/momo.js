const axios = require('axios');
const crypto = require('crypto');
const catchAsync = require('../../util/catchAsync');
const Order = require('../models/order/order');

const createPayment = async (data) => {
  let config = require('../../util/momo.js');
  let accessKey = config.accessKey;
  let secretKey = config.secretKey;
  let partnerCode = config.partnerCode;
  let redirectUrl = config.redirectUrl;
  let ipnUrl = redirectUrl;
  let url = config.url;

  let requestId = partnerCode + new Date().getTime();
  let orderId = requestId;
  // let selectedSeat = data.selectedSeats;
  // let orderSeat = selectedSeat.map((s) => `${s.row}-${s.col}`).join(',');
  let orderInfo = data.order_id;
  let amount = data.total;
  let extraData = '';

  let requestType = 'captureWallet';

  let rawSignature =
    'accessKey=' +
    accessKey +
    '&amount=' +
    amount +
    '&extraData=' +
    extraData +
    '&ipnUrl=' +
    ipnUrl +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&partnerCode=' +
    partnerCode +
    '&redirectUrl=' +
    redirectUrl +
    '&requestId=' +
    requestId +
    '&requestType=' +
    requestType;

  let signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = {
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'en',
  };
  try {
    const response = await axios.post(url, requestBody);
    return response.data;
  } catch (e) {
    throw e;
  }
};

const createPaymentUrl = catchAsync(async (req, res, next) => {
  const paymentData = await createPayment(req.body);
  console.log(paymentData);
  res.json(paymentData);
});

const verifyPayment = async ({
  partnerCode,
  orderId,
  requestId,
  amount,
  orderInfo,
  orderType,
  transId,
  resultCode,
  message,
  payType,
  responseTime,
  extraData,
  signature,
}) => {
  let config = require('../../util/momo');
  let accessKey = config.accessKey;
  let secretKey = config.secretKey;
  const signatureRaw = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
  const signatureValue = await crypto
    .createHmac('sha256', secretKey)
    .update(signatureRaw)
    .digest('hex');
  if (signatureValue !== signature) {
    return { resultCode: '99', error: 'The transaction was not completed.' };
  }
  if (resultCode.toString() !== '0') {
    return {
      resultCode: '99',
      error: 'Process payment failed.',
    };
  }
  Order.updateOne({ _id: orderInfo }, {status: "Đã thanh toán"})
  .exec()
  .then((result)=> {

  })
  .catch((e) => {
    
  })
  return {
    type: 'momo',
    orderId,
    requestId,
    amount,
    orderInfo,
    orderType,
    transId,
    resultCode,
    message,
    payType,
    responseTime,
    extraData,
  };
};

const verifyPaymentUrl = catchAsync(async (req, res, next) => {
  const dataCheck = await verifyPayment(req.query);
  res.json(dataCheck);
});
module.exports = {
  createPayment,
  createPaymentUrl,
  verifyPayment,
  verifyPaymentUrl,
};