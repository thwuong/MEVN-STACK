import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery';

createApp(App).use(router).use(store).use(VueSweetalert2).mount('#app')
