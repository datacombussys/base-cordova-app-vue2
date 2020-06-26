import { f7 } from "framework7-vue";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Invoices = {
	namespace: true,
	state: {
		invoiceList: [],
		receiptList: []
	},
	mutations: {
		PUSH_INVOICE_LIST(state, payload) {
			state.invoiceList.push(payload);
		}
	},
	actions: {
		POSTInvoice({ commit, dispatch, rootState }, form) {
			console.log('POSTInvoice form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/invoices/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Invoice";
						commit('PUSH_INVOICE_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Add Invoice";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		POSTReceipt({ commit, dispatch, rootState }, form) {
			console.log('POSTReceipt form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/receipts/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Receipt";
						commit('PUSH_INVOICE_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Add Receipt";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		GETInvoices({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				console.log("GETInvoices", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/attendance-settings/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_INVOICES_LIST', response.data);
						response.type = "Retrieve Invoices";
						// dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Invoices";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			});
		},
		GETReceipts({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				console.log("GETReceipts", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/attendance-settings/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_RECEIPTS_LIST', response.data);
						response.type = "Retrieve Receipts";
						// dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Receipts";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			});
		},
	},
	getters: {
		GET_INVOICE_LIST(state) {
			return state.invoiceList;
		},
		GET_INVOICE_LIST_LENGTH(state) {
			return state.invoiceList.length;
		},
		GET_RECEIPT_LIST(state) {
			return state.receiptList;
		},
		GET_RECEIPT_LIST_LENGTH(state) {
			return state.receiptList.length;
		},
	}
};
