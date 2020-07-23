;
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios"

export const Common = {
	namespace: true,
	state: {
		departmentList: [],
		positionList: [],
		shippingAddressList: [],
		generalBusinessSettingsProfile: {},
		


	},
	mutations: {
		PUSH_NEW_SHIPPING_ADDRESS(state, payload) {
			state.shippingAddressList.push(payload[0]);
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
		},
		SET_DEPARTMENT_LIST(state, payload) {
			state.departmentList = payload;
		},
		SET_POSITION_LIST(state, payload) {
			state.positionList = payload;
		},
		PUSH_POSITION_LIST(state, payload) {
			state.positionList.push(payload);
		},
		PUSH_DEPT_LIST(state, payload) {
			console.log('payload', payload);
			state.departmentList.push(payload);
		},
		REMOVE_DEPT_LIST(state, payload) {
			// console.log('REMOVE_DEPT_LIST payload', payload);
			var indexObj = state.departmentList.findIndex(elem => elem.id === payload);
			console.log('REMOVE_DEPT_LIST indexObj', indexObj);
			Vue.delete(state.departmentList, indexObj);
			console.log('REMOVE_DEPT_LIST state.departmentList', state.departmentList);
		},
		REMOVE_POSITION_LIST(state, payload) {
			var indexObj = state.positionList.findIndex(elem => elem.id === payload);
			console.log('REMOVE_POSITION_LIST indexObj', indexObj);
			Vue.delete(state.positionList, indexObj);
			console.log('REMOVE_POSITION_LIST state.positionList', state.positionList);
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
					error.response.type = "Add Shipping Address";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//Need to finish
		addDepartment({ dispatch, commit }, payload) {
			console.log("Creating Departments");
			axios.post("/django/departments/", payload).then(response => {
				if (response.status === 201) {
					console.log("addDepartment response", response);
					response.type = "Create Company Departments";
					dispatch('updateNotification', response);
					commit('PUSH_DEPT_LIST', response.data);
					// commit('PUSH_DEPARTMENT_LIST', reponse.data);
				}
			}).catch(error => {
				if (error.response) {
					error.response.type = "Create Company Departments";
					dispatch('updateNotification', error.response);
				}
			})
		},
		//Need to finish
		addPosition({ dispatch, commit }, form) {
			console.log("adding employee position");
			axios.post("/django/positions/", form).then(response => {
				if (response.status === 201) {
					commit('PUSH_POSITION_LIST', response.data);
					response.type = "Create Employee Positions";
					dispatch('updateNotification', response);
				}
			}).catch(error => {
				error.response.type = "Add Employee Position";
				dispatch('updateNotification', error.response);
			});
		},


		//GET Methods
		getNewShippingList({ commit, dispatch, rootState }, payload) {
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
				axios.get("/django/shipping/" + url).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Shipping Address";
						commit('SET_NEW_SHIPPING_ADDRESS', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
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
					error.response.type = "Retrieve General Settings";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		getEmployeePositions({commit, dispatch, rootState}, payload) {
			return new Promise((resolve, reject) => {
				if(!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("getEmployeePositions error", error);
					return reject(error);
				} 
				console.log("getEmployeePositions", payload);
				var url = "";
				if(payload != undefined) {
					url = payload.url;
				}
				axios.get('/django/positions/' + url).then(response => {
					// console.log(response.data, "Getting list of Employee Positions");
					if (response.status === 200) {
						commit('SET_POSITION_LIST', response.data);
						response.type = "Get Employee Positions";
						// dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {

					error.response.type = "Retrieve Employee Positions";
					dispatch('updateNotification', error.response);
					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
			
		},
		getCompanyDepartments({ dispatch, commit, rootState }, payload) {
			return new Promise((resolve, reject) => {
				if(!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("getCompanyDepartments error", error);
					return reject(error);
				} 
				console.log("getCompanyDepartments", payload);
				var url = "";
				if(payload != undefined) {
					url = payload.url;
				}
				console.log("getCompanyDepartments");
				axios.get("/django/departments/"+ url).then(response => {
					if (response.status === 200) {
						commit('SET_DEPARTMENT_LIST', response.data);
						response.type = "Retrieve Company Departments";
						// dispatch('updateNotification', response);
					}
				}).catch(error => {
					if (error.response) {
						dispatch('updateNotification', error.response);
					}
				});
			});
		},
		//DELETE
		deleteDepartment({ dispatch, commit }, id) {
			return new Promise((resolve, reject) => {
				console.log("Delete Department", id);
				axios.delete("/django/departments/"+ id + "/", id).then(response => {
					console.log("Delete Django Department", response);
					if (response.status === 204) {
						response.type = "Delete Department";
						dispatch('updateNotification', response);
						commit('REMOVE_DEPT_LIST', id);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete Department";
					error.status = 401;
					dispatch('updateNotification', error);

					return resolve(error);

				});
			}).catch(error => {
				return error;
			});
		},
		deletePosition({ dispatch, commit }, id) {
			return new Promise((resolve, reject) => {
				console.log("Delete Position", id);
				axios.delete("/django/positions/"+ id + "/", id).then(response => {
					console.log("Delete Django Position", response);
					if (response.status === 204) {
						response.type = "Delete Position";
						dispatch('updateNotification', response);
						commit('REMOVE_POSITION_LIST', id);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete Position";
					error.status = 401;
					dispatch('updateNotification', error);

					return resolve(error);

				});
			}).catch(error => {
				return error;
			});
		}
	},
	getters: {
		HAS_BUSINESS_SETTINGS(state) {
			if(Object.keys(state.generalBusinessSettingsProfile).length === 0 || state.generalBusinessSettingsProfile == null) {
				return false
			}
			return true
		},
		GET_DEPARTMENTS_LIST(state) {
			console.log("departmentList from getter", state.departmentList);
			return state.departmentList;
		},
		GET_POSITIONS_LIST(state) {
			console.log("positionList from getter", state.positionList);
			return state.positionList;
		},

	
	}
}