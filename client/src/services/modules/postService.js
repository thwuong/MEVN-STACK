import createHttp from '@/services'
import authHeader from '@/services/authHeader';

class PostService {
    constructor(){
        this.http = createHttp('/api/posts');
    }

    async getAllPost(){
        return (await this.http.get("/",{headers : authHeader()}));
    }
    async createNewPost(newData){
        return (await this.http.post("/",newData,{headers : authHeader()}));
    }
    async deletePost(id){
        return (await this.http.delete(`/${id}`,{headers:authHeader()}))
    }
    async updatePost(newData,id){
        return (await this.http.put(`/${id}`,newData,{headers:authHeader()}))
    }
    
}

export default new PostService();