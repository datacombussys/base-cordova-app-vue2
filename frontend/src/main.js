import Vue from 'vue'
import App from './App.vue'
import store from './store'

// Import App Custom Styles
import vuetify from './plugins/vuetify';

//DevExorcess Themes and CSS
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.css';
import './assets/themes/devexpress/generated/theme.base.css';


//Vue Material Framework - Use as component basis
// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)

//Datacom App Info Init
import appInfo from "./app-info";

//Axios
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

//Import Vue-router
import router from './routes'

window.$ = window.jQuery = require('jquery');

//Material Icons - Working
// MaterialDesignIcons.com
//<span class="mdi mdi-cart-minus mdi-48px" ></span>
//<md-icon class="md-size-5x">menu</md-icon>
//<span class="material-icons">thumb_up</span>
import '@mdi/font/css/materialdesignicons.min.css';

//FontAwesome Icons
//<fa-icon :icon="['far', 'address-book']" size="6x"></fa-icon>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

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

//Using MaterialIcons and dx-icons
{/* <i class="dx-icon-email" style="font-size: 50px;"></i>
<i class="dx-icon mdi mdi-fireplace" style="font-size: 50px;"></i> */}
//Custom
{/* <i class="dx-icon-email dx-icon-custom-style"></i> */}

//Vue-toggle https://www.npmjs.com/package/vue-js-toggle-button
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)


import "@/assets/icons/icons.css"

//Import Google Fonts to Use in project
import "./assets/fonts/fonts.css"

//Import Tailwind CSS
import '../public/styles.css'

//My Custom CSS
import "@/assets/css/main.css";
import './assets/sass/main.scss'
import './assets/sass/dx-styles.scss'

Vue.config.productionTip = false
Vue.prototype.$appInfo = appInfo;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
