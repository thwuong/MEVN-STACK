import PostService from "../../services/modules/PostService";

const state = {
    posts : []
}
const getters = {
    
}
const mutations = {
    getPost(state,post){
        state.posts = post
    }
}
const actions = {
    async getAllPost({commit}){
        try {
            const respone = await PostService.getAllPost()
            if(respone.data.success)
                commit('getPost',respone.data.posts);
            return respone.data;
        } catch (error) {
            return error.respone.data.message || error
        }
    }
}
export default {
    namespaced : true,
    state,
    getters,
    mutations,
    actions
}