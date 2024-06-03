import axios from "axios";
class CatagoryDataService {
    getAll() {

        return axios.get("http://localhost:3001/category");
    }
    getAllDetail(typeId) {
        return axios.get(
            `http://localhost:3001/category/${typeId}/category-detail`
        );
    }
    getCataDetailById(detailId) {
        return axios.get(`http://localhost:3001/category-detail/${detailId}`);
    }
    getAllCataDetail() {
        return axios.get("http://localhost:3001/product/category-detail");
    }
}
export default new CatagoryDataService();