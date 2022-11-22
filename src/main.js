import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import {  } from '@fortawesome/free-regular-svg-icons'            // still installed, not currently used
import { faWindowMinimize, faWindowMaximize, faMultiply } from '@fortawesome/free-solid-svg-icons'

library.add(faWindowMinimize, faWindowMaximize, faMultiply)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)    
.mount('#app')
