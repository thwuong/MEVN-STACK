import createHttp from '@/services'
import authHeader from '@/services/authHeader';
class PostService {
    constructor(){
        this.http = createHttp('/api/posts');
    }

    async getAllPost(){
        return (await this.http.get("/",{headers : authHeader()}));
    }
    async createPost(data){
        return await(this.http.post('/',{headers:authHeader()}),data)
    }
    async deletePost(id){
        return await(this.http.delete(`/${id}`,{headers:authHeader()}))
    }
    async updatePost(data,id){
        return await(this.http.post(`/${id}`,{headers:authHeader()}),data)
    }
    
}

export default new PostService();