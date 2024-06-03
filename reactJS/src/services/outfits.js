import axios from "axios";
class OutfitDataService {

    async getAllOutfit(page = 1) {
        return await axios.get(`http://localhost:3001/product/outfit?page=${page}`)
    }
    async getOutfitById(Id) {

        return await axios.get(`http://localhost:3001/product/outfit/${Id}`)
    }
    async getOutfitDetails(outfitId){
        return await axios.get(`http://localhost:3001/product/outfit/${outfitId}/outfit-detail`)
    }

}
export default new OutfitDataService();