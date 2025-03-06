import '@/assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { createPinia } from 'pinia'
const pinia = createPinia()

import router from '@/router'
app.use(pinia).use(router).mount('#app')