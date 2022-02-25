import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import router from './router'
import App from './App.vue'
const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.mount('#app');

// 注册全局组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})