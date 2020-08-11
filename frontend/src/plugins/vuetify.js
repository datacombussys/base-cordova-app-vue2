import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    default: 'light',
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#019DA9',
        secondary: '#424242',
        accent: '#FE6800 ',
        error: '#FE0000',
        info: '#008CFB',
        success: '#039209',
        warning: '#E0A800'
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
