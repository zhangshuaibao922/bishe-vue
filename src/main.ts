import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue'
import router from './router'
import hevueImgPreview from 'hevue-img-preview'
import * as echarts from 'echarts';

const app = createApp(App);
app.use(ElementPlus);
app.use(hevueImgPreview);
app.use(createPinia());
app.use(router);
app.config.globalProperties.$echarts = echarts;

app.mount('#app');
