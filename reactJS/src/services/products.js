import axios from "axios";
class ProductDataService {
  async getAllProductByTypeId(typeID) {
    return await axios.get(`http://localhost:3001/product/category/${typeID}`);
  }
  async getProductsByTypeDetailId(typeDetailID) {
    return await axios.get(
      `http://localhost:3001/product/category-detail/${typeDetailID}`
    );
  }
  async getAllProducts(price = 0, category = "", page = 1) {
    return await axios.get(
      `http://localhost:3001/product?price=${price}&page=${page}&${category}`
    );
  }
  async getProductById(productID) {
    return await axios.get(`http://localhost:3001/product/${productID}`);
  }

  async getProductDetail(productID) {
    return await axios.get(
      `http://localhost:3001/product/${productID}/product-detail`
    );
  }
  async deleteProductDetail(productDetailID) {
    return await axios.delete(
      `http://localhost:3001/admin/product-detail/delete/${productDetailID}`
    );
  }
  async getProductDiscount() {
    return await axios.get("http://localhost:3001/product/discount");
  }
  async getProductsFromSearch(search) {
    return await axios.get(`http://localhost:3001/search?name=${search}`);
  }
  async getProductNew() {
    return await axios.get("http://localhost:3001/product/new");
  }
  async getProductTopSelling() {
    return await axios.get("http://localhost:3001/product/top-selling");
  }
  async adminGetProducts() {
    return await axios.get("http://localhost:3001/admin/product");
  }
  async createProducts(data) {
    return await axios.post("http://localhost:3001/admin/product/store", data);
  }
  async editProduct(productId, data) {
    return await axios.put(
      `http://localhost:3001/admin/product/edit/${productId}`,
      data
    );
  }
  async deleteProduct(productId) {
    return await axios.delete(
      `http://localhost:3001/admin/product/delete/${productId}`
    );
  }
  async createDetailProduct(data) {
    return await axios.post(
      "http://localhost:3001/admin/product-detail/store",
      data
    );
  }
  async getCommentsByProductId(productId) {
    return await axios.get(
      `http://localhost:3001/product/${productId}/comment`
    );
  }
  async getCommentCountAndAvgRating(productId) {
    return await axios.get(
      `http://localhost:3001/product/${productId}/count-and-starrating-comment`
    );
  }
  async getAllFavoriteProduct(email) {
    return await axios.get(`http://localhost:3001/${email}/favorite-product`);
  }

  async getFavoriteProductById(email, productId) {
    return await axios.get(
      `http://localhost:3001/${email}/favorite-product/${productId}`
    );
  }

  async addFavoriteProduct(data) {
    return await axios.post("http://localhost:3001/favorite-product/add", data);
  }

  async deleteFavoriteProduct(data) {
    return await axios.post(
      "http://localhost:3001/favorite-product/delete",
      data
    );
  }
}
export default new ProductDataService();
