import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

import App from './App.vue'
import router from './router'
import '@/styles/base.scss'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
const app = createApp(App)

app.use(createPinia())
.use(router)
.use(Quasar, {
    plugins: {},
})
.mount('#app')