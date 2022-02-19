import { createApp } from 'vue'
import { store} from './store'
import router from './router'
import App from './App.vue'

import 'normalize.css'
import './style/main.scss'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')