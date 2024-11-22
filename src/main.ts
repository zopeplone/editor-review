import 'tdesign-vue-next/es/style/index.css'
import '@/assets/css/base.css'
import '@/assets/css/tiptap.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
