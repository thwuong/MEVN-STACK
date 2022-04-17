import PostService from "../../services/modules/PostService";
import router from "../../router/index"
const state = {
    posts : [],
    post : {}
}
const getters = {

}
const mutations = {
    GET_POSTS(state,posts){
        state.posts = posts
    },
    ADD_POST(state,post){
        state.posts.push(post);
    },
    GET_POST_BY_ID(state, id){
        state.post = state.posts.filter(post => post._id === id);
    },
}
const actions = {
    async editPost({commit}, crenditials){
        const _id = crenditials.id;
        const newData = {
            title : crenditials.title,
            description : crenditials.description,
            src : crenditials.src,
            url : crenditials.url,
            status : crenditials.status
        }
        try {
            const response = await PostService.updatePost(newData,_id.toString());
            if(response.data.success)
                // router.go();
            return response.data
        } catch (error) {
            return error.response.data.message || error;
        }
    },
    async deletePost({commit}, crenditials){
        try {
            const response = await PostService.deletePost(crenditials);
            if(response.data.success)
            return response.data
        } catch (error) {
            return error.response.data.message || error;
        }
    },
    async addPost({commit},crenditials){
        try {
            const response = await PostService.createNewPost(crenditials);
            if(response.data.success)
                commit('ADD_POST',response.data);
                router.go();
            return response.data;
        } catch (error) {
            return error.response.data.message || error
        }
    },
    async getAllPost({commit}){
        try {
            const response = await PostService.getAllPost()
            if(response.data.success)
                commit('GET_POSTS',response.data.posts);
            return response.data;
        } catch (error) {
            return error.response.data.message || error
        }
    },
    getPostById({commit},id){
       commit('GET_POST_BY_ID',id);
    }
    
}
export default {
    namespaced : true,
    state,
    getters,
    mutations,
    actions
}