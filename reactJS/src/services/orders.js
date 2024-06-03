import axiosInstance from './axiosConfig';

class OrderDataService {
  async createOrders(data) {
    const res = await axiosInstance.post("/order/create", data);
    return res;
  }

  async createOrderDetail(data) {
    return await axiosInstance.post("/order/order-detail", data);
  }

  async getOrderDetail(orderId) {
    return await axiosInstance.get(`/order/${orderId}/order-detail`);
  }

  async getAllOrders() {
    return await axiosInstance.get('/admin/order/show/');
  }

  async deleteOrder(orderId) {
    return await axiosInstance.delete(`/admin/order/${orderId}/delete`);
  }

  async editOrder(orderId, data) {
    return await axiosInstance.put(`/admin/order/${orderId}/change-status`, data);
  }
  
  async getRevenue(year) {
    return await axiosInstance.get(`/admin/revenue?year=${year}`);
  }
}
export default new OrderDataService();
