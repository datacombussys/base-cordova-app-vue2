import axios from "axios";
import { f7 } from 'framework7-vue';


export const Warehouses = {
	namespace: true,
	name: "warehouses",
	state: {
		warehouseList: [],
		warehouseProfile: {},
	},
	mutations: {
		PUSH_WAREHOUSE_LIST(state, payload) {
			state.warehouseList.push(payload);
		},
		SET_WAREHOUSE_LIST(state, payload) {
			state.warehouseList = payload;
		}
	},
	actions: {
		addWarehouse({ commit, dispatch, rootState }, form) {
			console.log('addWarehouse form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/warehouses/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Warehouse";
						commit('PUSH_WAREHOUSE_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					error.response.type = "Add Warehouse";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//GET Methods
		getWarehouseList({ commit, dispatch, rootState }, payload) {
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
				axios.get("/django/warehouses/" + url).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Warehouse List";
						commit('SET_WAREHOUSE_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					error.response.type = "Retrieve Warehouse List";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

	},
	getters: {
		GET_WAREHOUSE_LIST(state) {
			return state.warehouseList;
		},
		GET_WAREHOUSE_LIST_LENGTH(state) {
			return state.warehouseList.length;
		}
	}
};
