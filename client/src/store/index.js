import { createStore } from 'vuex'

import AuthStore from '@/store/modules/auth.js'
import PostStore from '@/store/modules/posts.js'

export default createStore({
    modules:{
        AUTH : AuthStore,
        POST : PostStore
    }
});