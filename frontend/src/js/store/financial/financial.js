import { f7 } from "framework7-vue";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Financial = {
	namespace: true,
	state: {
		salesTaxProfile: {}
	},
	mutations: {
		SET_SALES_TAX_PROFILE(state, payload) {
			if(payload.length === 0 || payload == null) {
				return
			} else {
				state.salesTaxProfile = payload[0];
			}
		}
	},
	actions: {
		POSTSalesTax({ commit, dispatch, rootState }, form) {
			console.log('POSTSalesTax form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/sales-tax/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Sales Tax";
						commit('SET_SALES_TAX_PROFILE', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Add Sales Tax";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//GET Methods
		GETSalesTaxes({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("GETSalesTaxes error", error);
					return reject(error);
				}
				console.log("GETSalesTaxes", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/sales-tax/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_SALES_TAX_PROFILE', response.data);
						response.type = "Retrieve Sales Tax";
						// dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Sales Tax";
					dispatch('updateNotification', error);

				});
			});
		},
	},
	getters: {
		HAS_SALES_TAX_PROFILE(state) {
			if(Object.keys(state.salesTaxProfile).length === 0 || state.salesTaxProfile == null) {
				return false
			}
			return true
		},
	}
};
