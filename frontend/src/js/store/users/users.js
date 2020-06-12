import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Users = {
	namespace: true,
	state: {
		//User and Employee Personal Data
		employeeProfile: {},
		//All Users based on Logged in User
		employeeList: [],
		// employeeBarcodeList: [],
		companyFilteredEmployeeList: [],
		//Company Specific Employees based on Selected Business
		companySpecificEmployeeList: [],
	},
	mutations: {
		SET_EMPLOYEE_PROFILE(state, payload) {
			state.employeeProfile = {};
			if(payload.length === 0 || payload == null) {
				return
			} else {
				state.employeeProfile = payload[0];
				console.log("state.employeeProfile", state.employeeProfile);
			}
		},
		async SET_EMPLOYEE_LIST(state, payload) {
			console.log("SET_EMPLOYEE_LIST payload", payload);
			state.employeeList = payload;
		},
		PUSH_NEW_EE_LIST(state, payload) {
			state.employeeList.push(payload);
		},
		SET_FILTERED_EMPLOYEES_COMPANY(state, payload) {
			state.companyFilteredEmployeeList = payload;
		},	
		CLEAR_USER_DATA(state, payload) {
			state.employeeProfile = {};
		},
		COMMIT_TEST(state, payload) {
			console.log('employeeProfile', state.employeeProfile);
			// console.log('COMMIT_TEST Payload', payload);
		}
		
	},
	actions: {
		//Return a Promise
		createUser({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				// if(!rootState.Auth.isAuthenticated) {
				// 	let error = {};
				// 	error.type = "Login Required";
				// 	error.status = 2000;
				// 	dispatch('updateNotification', error);
				// 	return reject(error);
				// }
				delete form.barcode;
				console.log("Users Store Action Add user", form);
				axios.post("/django/users/", form).then((response) => {
					console.log("response data", response);
					if (response.status === 200 || response.status === 201) {
						response.type = "Create User";
						dispatch('updateNotification', response);
						return resolve(response);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Create User";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				f7.preloader.hide();

				return error;
			});
							
		},
		createEmployee({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("createEmployee form", form);
				console.log('rootState.Auth.isAuthenticated', rootState.Auth.isAuthenticated);
				// if(!rootState.Auth.isAuthenticated) {
				// 	let error = {};
				// 	error.type = "Login Required";
				// 	error.status = 2000;
				// 	dispatch('updateNotification', error);
				// 	return reject(error);
				// }
				axios.post("/django/employees/", form).then(response => {
					console.log("response data", response);
					if (response.status === 200 ||response.status === 201) {
						response.type = "Create Employee";
						commit('PUSH_NEW_EE_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
						f7.preloader.hide();
						error.type = "Create Employee";
						dispatch('updateNotification', error);
						//Employee was not created, so we need to delete the User instance that was created.
						dispatch("deleteUser", form.user_id);

						return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//Current as of 4-23-20 Update all others accordingly
		async getEmployeeList({commit, dispatch, rootState}, payload) {
			return new Promise(async (resolve, reject) => {
				console.log('getEmployeeList payload', payload);
				console.log('rootState.Auth.isAuthenticated', rootState.Auth.isAuthenticated);
				if(!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				} 
				var url = "";
				if(payload != undefined) {
					url = payload.url;
				}
				axios.get('/django/employees/' + url).then(response => {
					if (response.status === 200) {
						console.log("getEmployeeList", response);
						commit('SET_EMPLOYEE_LIST', response.data);
						response.type = "Retrieve Employee List";
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					console.log('getEmployeeList error', error);
					error.type = "Retrieve Employee List";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
	
		//Filter Employee Profile based on User ID
		getEmployeeProfileByUserID({ dispatch, commit }, userID) {
			return new Promise(async (resolve, reject) => {
				const url = '/django/employees/?user__id=' + userID;
				axios.get(url).then(response => {
					console.log("getEmployeeProfileByUserID response", response);
					if (response.status === 200) {
						commit('SET_EMPLOYEE_PROFILE', response.data);
						response.type = "Retrieve Employee Profile by UserID";
						// dispatch('updateNotification', response);
						return resolve(response.data)
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Retrieve Employee Profile";
					dispatch('updateNotification', error);

					return resolve(error);
			});
		}).catch(error => {
			return error;
		});
			
		},
		//Update Users
		PATCHUser({ dispatch, commit }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCH User in Store", form);
				axios.patch("/django/employees/" + form.id + "/", form).then(response => {
					console.log("Patch User Response Data", response);
					if (response.status === 200) {
						response.type = "Update User Profile";
						dispatch('updateNotification', response);
						this.$store.dispatch('getEmployeeList');

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Update User Profile";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		PATCHEmployee({ dispatch, commit }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCH Employee Info", form);
				axios.patch("/django/employees/" + form.id + "/", form).then(response => {
					console.log("PUT Employee Response Data", response);
					if (response.status === 200) {
						dispatch('getEmployeeList');
						response.type = "Update Employee Profile";
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Update Employee Profile";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			
			}).catch(error => {
				return error;
			});
		},
		//Delete Users
		deleteUser({ dispatch, commit }, userID) {
			console.log("Employee Creation Failed, deleting UserID:", userID);
			axios.delete("/django/users/"+ userID + "/").then(response => {
				response.type = "Delete User Profile";
				dispatch("updateNotification", response);
				dispatch('getEmployeeList');
			}).catch(error => {
				f7.preloader.hide();
				error.type = "Delete User Profile";
				dispatch('updateNotification', error);
			});
			},


	},
	getters: {
		getUsers(state) {
			console.log(state.userList, "UserList from getter");
			return state.userList;
		},
		getEmployeeProfile(state) {
			return state.employeeProfile;
		}
	}
}

