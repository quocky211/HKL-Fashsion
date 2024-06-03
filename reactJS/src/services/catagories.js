import axiosInstance from './axiosConfig';
class CatagoryDataService {
    
    getAll() {
        return axiosInstance.get("/category");
    }

    getAllDetail(typeId) {
        return axiosInstance.get(`/category/${typeId}/category-detail`);
    }

    getCataDetailById(detailId) {
        return axiosInstance.get(`/category-detail/${detailId}`);
    }

    getAllCataDetail() {
        return axiosInstance.get("/product/category-detail");
    }
}
export default new CatagoryDataService();