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
				axios.get("/django/sales-offices/" + url).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Sales Office List";
						commit('SET_SALESOFFICE_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.response.type = "Retrieve Sales Office List";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//Updating Models
		PATCHSalesOffice({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCHSalesOffice", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHSalesOffice error", error);
					return reject(error);
				}
				axios.patch("/django/sales-offices/" + form.id + "/", form).then(response => {
					console.log("PATCHSalesOffice", response);
					if (response.status === 200) {
						response.type = "Update Sales Office";
						dispatch('updateNotification', response);
						commit('UPDATE_NOTIFICATION', response.data);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Update Sales Office";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
	},
	getters: {
		GET_SALES_OFFICE_LIST(state) {
			return state.salesOfficeList
		},
		GET_SALES_OFFICE_LIST_LENGTH(state) {
			return state.salesOfficeList.length
		},
		GET_SALES_OFFICE_EMPLOYEE_IDS(state) {
			return state.salesOfficeList.employees;
		}
	}
};
