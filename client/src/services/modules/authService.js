import createHttp from '@/services'

class AuthService {
    constructor(){
        this.http = createHttp('/api/auth');
    }

    async login(data){
        return (await this.http.post("/login",data)).data;
    }
    async register(data){
        return (await this.http.post("/register",data)).data;
    }
}

export default new AuthService();
