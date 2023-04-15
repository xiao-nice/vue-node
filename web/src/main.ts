import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/permission'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
