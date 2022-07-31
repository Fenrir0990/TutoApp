import {createWebHistory,createRouter} from 'vue-router';
import Form from './views/Form.vue';
import Home from './views/Home.vue';


const routes = [
    { path: '/', component: Home }, 
    { path: '/form', component: Form },
    
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router