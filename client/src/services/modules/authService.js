import createHttp from '@/services'
import authHeader from '@/services/authHeader';
class AuthService {
    constructor(){
        this.http = createHttp('/api/auth');
    }

    async getUser(){
        return (await this.http.get("/",{headers : authHeader()}));
    }
    async login(data){
        return (await this.http.post("/login",data));
    }
    async register(data){
        return (await this.http.post("/register",data));
    }
}

export default new AuthService();
