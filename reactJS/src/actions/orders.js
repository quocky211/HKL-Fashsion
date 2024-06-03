import axiosInstance from '../services/axiosConfig';

export const vnpayPayment = async (total, order_id) => {
  const res = await axiosInstance.post('/order/vnpay_url', { total,  order_id });
  return res.data;
};

export const vnPayReturn = async () => {
  const res = await axiosInstance.get(`/order/vnpay_return${window.location.search}`);
  return res.data;
};

export const momoPayment = async (total, order_id) => {
  const res = await axiosInstance.post('/order/momo_payment_url', { total, order_id } );
  return res.data;
};

export const momoRedirect = async () => {
  const res = await axiosInstance.get(`/order/momo_return${window.location.search}`);
  return res.data;
};

export const getDiscount = async () => {
  const res = await axiosInstance.get("/order/discount");
  return res.data;
};
