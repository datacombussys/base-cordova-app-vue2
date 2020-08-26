import Vue from 'vue'
import App from './App.vue'
import store from './store'
window.$ = window.jQuery = require('jquery');

// Import App Custom Styles
import vuetify from './plugins/vuetify';
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

//DevExorcess Themes and CSS
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.css';
import './assets/themes/devexpress/generated/theme.base.css';
import 'devextreme/dist/js/dx.all.js'
import 'devextreme/integration/jquery';

//Vue Material Framework - Use as component basis
// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)

//Datacom App Info Init
import appInfo from "@/js/app-info";

//Axios
require("@/js/axios")

//Import Vue-router
import router from './routes'
require("@/js/subscribers");

// MaterialDesignIcons.com
// <i class="mdi mdi-cart mdi-40"></i>
// <span class="mdi mdi-cart-minus mdi-48px" ></span>
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
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// <i class="material-icons" style="font-size:45px;">check_circle</i>
// <span class="material-icons mdi-30"> check_circle </span>

//Using MaterialIcons and dx-icons
{/* <i class="dx-icon-email" style="font-size: 50px;"></i>
<i class="dx-icon mdi mdi-fireplace" style="font-size: 50px;"></i> */}
//Custom
{/* <i class="dx-icon-email dx-icon-custom-style"></i> */}

//Vue-toggle https://www.npmjs.com/package/vue-js-toggle-button
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

//Import Vue-Numeral for Number Formatting
import vueNumeralFilterInstaller from 'vue-numeral-filter';
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });

//Custom Filters
require("@/js/filters");

//Lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, { lodash: lodash })

// Socket.io / Vue-Socket.io
// import VueSocketIOExt from 'vue-socket.io-extended';
// import io from 'socket.io-client';
// const socket = io('http://localhost:9022');
// Vue.use(VueSocketIOExt, socket, { store });

//Vue Cropper
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
Vue.component("vue-cropper", VueCropper);

//Vue Field Mask
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)
//Usage
// '#': {pattern: /\d/},
// 'X': {pattern: /[0-9a-zA-Z]/},
// 'S': {pattern: /[a-zA-Z]/},
// 'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
// 'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
// '!': {escape: true}


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
