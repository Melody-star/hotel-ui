import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from './router/index'

const app = createApp(App)

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

app.use(createPinia())
app.use(VueAxios, axios)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
