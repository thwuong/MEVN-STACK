import {createWebHistory, createRouter} from 'vue-router';
import FormLogin from '@/views/FormLogin.vue'
import FormRegister from '@/views/FormRegister.vue'
import DashBoard from '@/views/Dashboard.vue'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound.vue'
const routes = [
    {
        path : '/login',
        name : "FormLogin",
        component : FormLogin
    },
    {
        path : '/',
        redirect: '/login',
    },
    {
        path : '/register',
        name : "FormRegister",
        component : FormRegister
    },
    {
        path : '/dashboard',
        name : "DashBoard",
        component : DashBoard,
        meta : true
    },
    {
        path : '/about',
        name : "About",
        component : About,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router;