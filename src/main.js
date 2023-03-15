import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify'
import mitt from 'mitt'
import VueTheMask from 'vue-the-mask'
import { loadFonts } from './plugins/webfontloader'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCountdown from '@chenfengyuan/vue-countdown'

loadFonts()

const app = createApp(App)
const pinia = createPinia()
const emitter = mitt()

app.component(VueCountdown.name, VueCountdown)
// создание шины событий согласно документации Vue 3, как по мне, блевотина дикая)
app.config.globalProperties.emitter = emitter;
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VueTheMask)
app.mount('#app')


import './assets/css/style.scss'