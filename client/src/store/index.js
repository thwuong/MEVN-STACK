import { createStore } from 'vuex'

import AuthStore from '@/store/modules/auth.js'


export default createStore({
    modules:{
        AUTH : AuthStore
    }
});