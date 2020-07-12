import Vue from 'vue'
import App from './App.vue'
import store from './store'

//Axios
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

//Material Icons - Working
// MaterialDesignIcons.com
//<span class="mdi mdi-cart-minus mdi-48px" ></span>
//<md-icon class="md-size-5x">menu</md-icon>
import '@mdi/font/css/materialdesignicons.min.css';

//FontAwesome Icons
//<fa-icon :icon="['far', 'address-book']" size="6x"></fa-icon>
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
 
library.add(fas);
library.add(fab);
library.add(far);

Vue.component('fa-icon', FontAwesomeIcon)
Vue.component('fa-layer', FontAwesomeLayers)
Vue.component('fa-layer-text', FontAwesomeLayersText)
Vue.config.productionTip = false;


// Google's Material Design Icons for VueMaterial Theme 
//http://google.github.io/material-design-icons
//Imported on the index.html page
// can be used as follows:
// <i class="material-icons" style="font-size:45px;">check_circle</i>
// <span class="material-icons md-48 orange600"> check_circle </span>

//Import Google Fonts to Use in project
import "./assets/styles/fonts/fonts.css"

//Vue Material Framework
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

//Import Vue-router
import router from './routes'

//My Custom CSS
import "@/assets/styles/css/main.css";

// Import App Custom Styles
import './assets/styles/sass/main.scss'


Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
