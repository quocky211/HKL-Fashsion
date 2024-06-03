import axiosInstance from './axiosConfig';

class ProductDataService {
  async getAllProductByTypeId(typeID) {
    return await axiosInstance.get(`/product/category/${typeID}`);
  }

  async getProductsByTypeDetailId(typeDetailID) {
    return await axiosInstance.get(`/product/category-detail/${typeDetailID}`);
  }

  async getAllProducts(price = 0, category = "", page = 1) {
    return await axiosInstance.get(`/product?price=${price}&page=${page}&${category}`);
  }

  async getProductById(productID) {
    return await axiosInstance.get(`/product/${productID}`);
  }

  async getProductDetail(productID) {
    return await axiosInstance.get(`/product/${productID}/product-detail`);
  }

  async deleteProductDetail(productDetailID) {
    return await axiosInstance.delete(`/admin/product-detail/delete/${productDetailID}`);
  }

  async getProductDiscount() {
    return await axiosInstance.get("/product/discount");
  }

  async getProductsFromSearch(search) {
    return await axiosInstance.get(`/search?name=${search}`);
  }

  async getProductNew() {
    return await axiosInstance.get("/product/new");
  }

  async getProductTopSelling() {
    return await axiosInstance.get("/product/top-selling");
  }

  async adminGetProducts() {
    return await axiosInstance.get("/admin/product");
  }

  async createProducts(data) {
    return await axiosInstance.post("/admin/product/store", data);
  }

  async editProduct(productId, data) {
    return await axiosInstance.put(`/admin/product/edit/${productId}`, data);
  }

  async deleteProduct(productId) {
    return await axiosInstance.delete(`/admin/product/delete/${productId}`);
  }

  async createDetailProduct(data) {
    return await axiosInstance.post("/admin/product-detail/store", data);
  }

  async getCommentsByProductId(productId) {
    return await axiosInstance.get(`/product/${productId}/comment`);
  }

  async getCommentCountAndAvgRating(productId) {
    return await axiosInstance.get(`/product/${productId}/count-and-starrating-comment`);
  }
  
  async getAllFavoriteProduct(email) {
    return await axiosInstance.get(`/${email}/favorite-product`);
  }

  async getFavoriteProductById(email, productId) {
    return await axiosInstance.get(`/${email}/favorite-product/${productId}`);
  }

  async addFavoriteProduct(data) {
    return await axiosInstance.post("/favorite-product/add", data);
  }

  async deleteFavoriteProduct(data) {
    return await axiosInstance.post("/favorite-product/delete", data);
  }
}
export default new ProductDataService();
