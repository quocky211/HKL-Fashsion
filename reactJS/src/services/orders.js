import axios from "axios";
class OrderDataService {
  async createOrders(data) {
    const res = await axios.post(
      "http://localhost:3001/order/create",
      data
    );
    return res;
  }
  async createOrderDetail(data) {
    return await axios.post(
      "http://localhost:3001/order/order-detail",
      data
    );
  }
  async getOrderDetail(orderId) {
    return await axios.get(
      `http://localhost:3001/order/${orderId}/order-detail`
    );
  }
  async getAllOrders() {
    return await axios.get(
      'http://localhost:3001/admin/order/show/'
    );
  }
  async deleteOrder(orderId) {
    return await axios.delete(
      `http://localhost:3001/admin/order/${orderId}/delete`
    );
  }
  async editOrder(orderId, data) {
    return await axios.put(
      `http://localhost:3001/admin/order/${orderId}/change-status`, data
    );
  }
  async getRevenue(year) {
    return await axios.get(
      `http://thawing-hollows-39647.herokuapp.com/admin/revenue?year=${year}`
    );
  }
}
export default new OrderDataService();
