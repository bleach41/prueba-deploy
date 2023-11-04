import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'


const app = createApp(App)
const pinia = createPinia()



pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
