import axios from "axios";
class BlogDataService {

    async getAllBlog() {

        return await axios.get("http://localhost:3001/blog");
    }
    async getBlogById(blogID) {

        return await axios.get(
            `http://localhost:3001/blog/blog-detail/${blogID}`
        );
    }

}
export default new BlogDataService();