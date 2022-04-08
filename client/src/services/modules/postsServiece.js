import createHttp from '@/services';
import authHeader from '@/services/authHeader.js';
class PostServices {
    constructor(){
        this.http = createHttp('/api/posts');
    }
    async createPost(data){
        return (await this.http.post('/',{headers : authHeader()},data)).data;
    }
}

export default new PostServices();