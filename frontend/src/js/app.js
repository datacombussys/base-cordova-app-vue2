// Import Vue
import Vue from 'vue';

//Import Custom Fonts
import "../fonts/fonts.less";

// Import Framework7
import Framework7 from './framework7-custom.js';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import '../css/framework7-custom.less';

//Import Template7
import Template7 from 'template7';
Vue.use(Template7);

//Import Buefy
import buefy from 'buefy';
import 'buefy/dist/buefy.css';
Vue.use(buefy);

//FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 
library.add(fas);
library.add(fab);
library.add(far);
 
Vue.component('fa-icon', FontAwesomeIcon)
 
Vue.config.productionTip = false

// Import Icons and App Custom Styles
require('@/css/icons.css');
require('@/css/mdicons');
// require('../css/bulma.scss');
import '../css/app.less';

// Import App Component
import App from '../components/app.vue';

//Import Vuex and Store
import store from "./store/store";
require("@/js/store/subscribers");

//Import and Use Axios
var axios = require('@/js/axios');

//Image Cropper by croppie
import VueCroppie from 'vue-croppie';
import '../../node_modules/croppie/croppie.css';
Vue.use(VueCroppie);

// Init Vue-Moment
Vue.use(require('vue-moment'));
Vue.use(require('moment'));
Vue.use(require('moment-timezone'));

//Install Vue Jason to CSV
import JsonCSV from 'vue-json-csv';
Vue.component('download-Csv', JsonCSV);

//Import VueCSVImporter
import { VueCsvImport } from 'vue-csv-import';
Vue.component('csv-import', VueCsvImport);

//Import Vue-Numeral for Number Formatting
import vueNumeralFilterInstaller from 'vue-numeral-filter';
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });

//Vue-Konva
import VueKonva from 'vue-konva'
Vue.use(VueKonva)

//Vue-Keyboard
import VueTouchKeyboard from "vue-touch-keyboard";
import "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style
Vue.use(VueTouchKeyboard);
Vue.component('vue-keyboard', VueTouchKeyboard);

//Vue2 Interact
import { Vue2InteractDraggable } from 'vue2-interact';
Vue.component('Vue2InteractDraggable', Vue2InteractDraggable);

//vue-ctk-date-time-picker
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('vue-date-time-picker', VueCtkDateTimePicker);


// Socket.io / Vue-Socket.io
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
const socket = io('http://localhost:9022');
Vue.use(VueSocketIOExt, socket, { store });

//Vue Draggable for Kanban
import draggable from 'vuedraggable';
Vue.component('draggable', draggable);

//Vue-Filters
require("@/js/filters");

//Vuebar Scrollbar
import Vuebar from 'vuebar';
Vue.use(Vuebar);

//Vue JS Modal
import VModal from 'vue-js-modal';
Vue.use(VModal);

//Encryption by CryptoJS
import VueCryptojs from 'vue-cryptojs';
Vue.use(VueCryptojs);


// Init App
new Vue({
  el: '#app',
    store,
    axios,
    buefy,
    render: (h) => h(App),

  // Register App Component
  components: {
    app: App,
  },

});