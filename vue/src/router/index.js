import {createWebHistory,createRouter} from 'vue-router';

import FormA from "./views/Form.vue";
import Home from "./views/Home.vue";
import Restore from "./views/Restore.vue";
import Test from "./views/Test.vue";

const routes = [
    { path: "/", component: Home }, 
    { path: "/form", component: FormA },
    { path:"/restore", component: Restore},
    { path:"/test", component: Test}

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router