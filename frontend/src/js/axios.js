// Import Vue
import Vue from "vue";
import axios from "../../node_modules/axios/lib/axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// import store from 'vuex';
// console.log('store.Store', store.Store);


// export function GET(axiosObject) {
//   axios.get("/django/" + axiosObject.childDomain + "/" + axiosObject.url).then(response => {
//     if (response.status === 200) {
//       // commit(axiosObject.setCommit, response.data);
//       response.type = axiosObject.responseType;
//       store.Store.dispatch('updateNotification', response);
//       return "Axios Call was Successful"
//     }
//   }).catch(error => {
//     error.type = axiosObject.responseType;
//     console.log('error', error);
//     // dispatch('updateNotification', error);
//   });
// }
  

