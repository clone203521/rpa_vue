import ElementPlus from 'element-plus'
import axios from 'axios' // 引入axios
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入 router 模块

const app = createApp(App)

// 创建并配置axios实例
const axiosInstance = axios.create({
    baseURL: 'http://fbmessage.v7.idcfengye.com/', // 在这里设置您的全局路径
    timeout: 10000, // 设置请求超时时间
    // 其他axios配置，如headers等，根据您的需求添加
});

// 创建第二个实例
const axiosInstance2 = axios.create({
    baseURL: 'http://127.0.0.1:12144/',
    timeout: 10000, // 设置请求超时时间
});

// 提供axios实例
app.provide('$http', axiosInstance)
app.provide('$local', axiosInstance2)

// 使用Element Plus
app.use(ElementPlus, {size: 'small', zIndex: 3000})
//使用router路由
app.use(router)

// 挂载Vue应用程序
app.mount('#app')