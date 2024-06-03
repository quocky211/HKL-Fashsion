import axios from 'axios';

export const vnpayPayment = async (total, order_id) => {
  const res = await axios.post('http://localhost:3001/order/vnpay_url', { total,  order_id });
  return res.data;
};

export const vnPayReturn = async () => {
  const res = await axios.get(`http://localhost:3001/order/vnpay_return${window.location.search}`);
  return res.data;
};

export const momoPayment = async (total, order_id) => {
  const res = await axios.post('http://localhost:3001/order/momo_payment_url', { total, order_id } );
  return res.data;
};

export const momoRedirect = async () => {
  const res = await axios.get(`http://localhost:3001/order/momo_return${window.location.search}`);
  return res.data;
};

export const getDiscount = async () => {
  const res = await axios.get("http://localhost:3001/order/discount");
  return res.data;
};
