import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Emails = {
	namespace: true,
	state: {

	},
	mutations: {

	},
	actions: {
    passwordResetEmail({ dispatch, commit }, payload) {
			console.log("Users email addres for password reset", payload);
      axios.post('/node/email/', payload)
				.then(response => {
					console.log("passwordResetEmail to Node - response:", response);
          response.type = "Password Reset Email";
					// dispatch('updateNotification', response);
				}).catch(error => {
					error.response.type = "Password Reset Email";
					dispatch('updateNotification', error.response);
				});
    }


  },
	getters: {

	}

}

