import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import { router } from '@/utils/route'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
app.use(naive)
app.use(router)
app.mount('#app')
