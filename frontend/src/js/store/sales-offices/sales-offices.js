import axios from "axios";
import { f7 } from 'framework7-vue';


export const SalesOffices = {
	namespace: true,
	name: "sales-offices",
	state: {
		salesOfficeList: [],
		salesOfficeProfile: {},
	},
	mutations: {
		PUSH_SALESOFFICE_LIST(state, payload) {
			state.salesOfficeList.push(payload);
		},
		SET_SALESOFFICE_LIST(state, payload) {
			state.salesOfficeList = payload;
		}
	},
	actions: {
		createSalesOffice({ commit, dispatch, rootState }, form) {
			console.log('addSalesOffice form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/sales-offices/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Sales Office";
						commit('PUSH_SALESOFFICE_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.response.type = "Add Sales Office";
					error.response.status = 400;
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//GET Methods
		getSalesOfficeList({ commit, dispatch, rootState }, payload) {
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
				axios.get("/django/sales-offices/" + url, rootState.Auth.axiosHeader).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Sales Office List";
						commit('SET_SALESOFFICE_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.response.type = "Retrieve Sales Office List";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
	},
	getters: {

	}
};
