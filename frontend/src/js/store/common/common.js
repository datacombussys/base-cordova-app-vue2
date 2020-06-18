import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Common = {
	namespace: true,
	state: {
		shippingAddressList: [],
		generalBusinessSettingsProfile: {}

	},
	mutations: {
		PUSH_NEW_SHIPPING_ADDRESS(state, payload) {
			state.shippingAddressList.push(payload);
		},
		SET_NEW_SHIPPING_ADDRESS(state, payload) {
			state.shippingAddressList = payload;
		},
		SET_GENERAL_BUSINESS_SETTINGS(state, payload) {
			if(payload.length === 0 || payload == null) {
				return
			} else {
				state.generalBusinessSettingsProfile = payload[0];
			}			
		}

	},
	actions: {
		addShippingAddress({ commit, dispatch, rootState }, form) {
			console.log('addShippingAddress form:', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/shipping/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Shipping Address";
						commit('PUSH_NEW_SHIPPING_ADDRESS', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.response.type = "Add Shipping Address";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//GET Methods
		getNewShippingList({ commit, dispatch, rootState }, payload) {
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				var url = "";
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/shipping/" + url, rootState.Auth.axiosHeader).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Shipping Address";
						commit('SET_NEW_SHIPPING_ADDRESS', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.response.type = "Retrieve Shipping Address";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		GETGeneralSettings({ commit, dispatch, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/general-settings/" + url).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve General Settings";
						commit('SET_GENERAL_BUSINESS_SETTINGS', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.response.type = "Retrieve General Settings";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

	},
	getters: {
		HAS_BUSINESS_SETTINGS(state) {
			if(Object.keys(state.generalBusinessSettingsProfile).length === 0 || state.generalBusinessSettingsProfile == null) {
				return false
			}
			return true
		},
	}
}