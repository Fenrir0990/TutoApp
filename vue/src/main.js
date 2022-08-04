import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { plugin, defaultConfig } from '@formkit/vue'

import App from './App.vue';
import router from "./router/index.js"

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
/* import '@formkit/themes/genesis' */
import "./index.css"








createApp(App).use(router).use(VueAxios, axios).use(plugin, defaultConfig).mount('#app');
