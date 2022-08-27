import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import { router } from '@/utils/route'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

app.use(naive)
app.use(router)
app.mount('#app')
