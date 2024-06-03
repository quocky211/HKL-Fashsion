import axiosInstance from './axiosConfig';

class UserDataService {
    async getAllUser() {
        return await axiosInstance.get("/admin/user/show")
    }

    async getUserById(userId) {
        return await axiosInstance.get(`/user/${userId}`)
    }

    async createUser(data) {
        return await axiosInstance.post("/user/register",data)
    }

    async editUser(userId, data) {
        return await axiosInstance.put(`/admin/user/edit/${userId}`, data)
    }

    async deleteUser(userId) {
        return await axiosInstance.delete(`/admin/user/delete/${userId}`)
    }

    async createComment(productId, userId, data){
        return await axiosInstance.post(`/user/${userId}/product/${productId}/comment`, data)
    }

    async deleteComment(userId, commentId){
        return await axiosInstance.delete(`/user/${userId}/comment/${commentId}/delete`)
    }
    
    async getOrdersByUser(userId){
        return await axiosInstance.get(`/user/${userId}/order`)
    }
}

export default new UserDataService();
