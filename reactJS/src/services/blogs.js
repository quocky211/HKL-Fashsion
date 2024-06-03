import axiosInstance from './axiosConfig';

class BlogDataService {

    async getAllBlog() {
        return await axiosInstance.get("/blog");
    }
    
    async getBlogById(blogID) {
        return await axiosInstance.get( `/blog/blog-detail/${blogID}`);
    }

}
export default new BlogDataService();