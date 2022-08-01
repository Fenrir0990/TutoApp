import {createWebHistory,createRouter} from 'vue-router';
import FormA from "./views/Form.vue";
import Home from "./views/Home.vue";
import FormE from "./views/FormE.vue"


const routes = [
    { path: '/', component: Home }, 
    { path: '/form', component: FormA },
    { path: '/edit', component: FormE }
    
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router