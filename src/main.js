import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWindowMinimize, faPlus, faMinus, faFilter, faCheck, faArrowLeft, faArrowRight, faMultiply, faArrowUp, faHand } from '@fortawesome/free-solid-svg-icons'

library.add(faWindowMinimize, faPlus, faMinus, faFilter, faCheck, faArrowLeft, faArrowRight, faMultiply, faArrowUp, faHand)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)    
.mount('#app')
