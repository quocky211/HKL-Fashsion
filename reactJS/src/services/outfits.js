import axiosInstance from './axiosConfig';

class OutfitDataService {

    async getAllOutfit(page = 1) {
        return await axiosInstance.get(`/product/outfit?page=${page}`);
    }

    async getOutfitById(Id) {
        return await axiosInstance.get(`/product/outfit/${Id}`);
    }
    
    async getOutfitDetails(outfitId){
        return await axiosInstance.get(`/product/outfit/${outfitId}/outfit-detail`);
    }

}
export default new OutfitDataService();