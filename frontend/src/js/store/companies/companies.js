import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Companies = {
	namespace: true,
	state: {
		companyList: [],
		departmentList: [],
		positionList: [],

		//Specific Datacom Company Data
    companyEmployeesList: [],
	},
	mutations: {
		PUSH_NEW_COMPANY(state, payload) {
			state.companyList.push(payload);
		},
		SET_COMPANY_LIST(state, payload) {			
			state.companyList = payload;
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
		SET_COMPANY_EMPLOYEES(state, payload) {
      state.companyEmployeesList = payload;
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
		//Create Methods
    createCompany({ dispatch, commit }, form) {
			return new Promise((resolve, reject) => {
				console.log("createCompany form in Store", form);
				axios.post("/django/companies/", form).then(response => {
					console.log("Django Company response data", response);
					if (response.status === 201) {
						response.type = "Create Company";
						commit('PUSH_NEW_COMPANY', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data)
					}
				}).catch(error => {
					error.response.type = "Create Company";
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

		//GET and LIST Methods
		getCompanyList({commit, dispatch, rootState}, payload) {
			return new Promise((resolve, reject) => {
				if(!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				} 
				console.log("getCompanyList", payload);
				var url = "";
				if(payload != undefined) {
					url = payload.url;
				}
				axios.get('/django/companies/' + url).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Company List";
						commit('SET_COMPANY_LIST', response.data);
						// dispatch('updateNotification', response);

						return resolve(response.data)
					}
				}).catch(error => {
					if (error.response) {
						error.response.type = "Retrieve Company List";
						dispatch('updateNotification', error.response);

						return resolve(error);
					}
				});
			}).catch(error => {
				return error;
			});
			
		},
		//Get Methods
		//Filter Employees by Company
		getCompanyEmployees({ dispatch, commit }, companyID) {
			return new Promise((resolve, reject) => {
				console.log("Filtering Employees by Company", companyID);
				axios.get("/django/employees/?company__id="+ companyID).then(response => {
					console.log("response data", response);
					if (response.status === 200) {
						commit('SET_COMPANY_EMPLOYEES', response.data);
						response.type = "Retrieve Company Employees";
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {

					error.response.type = "Retrieve Company Employees";
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

		//Update Methods Need to finish
		updateCompany({ dispatch, commit }, payload) {
			console.log("updateCompanyItem payload", payload);
			if(!rootState.Auth.isAuthenticated) {
				let error = {};
				error.type = "Login Required";
				error.status = 2000;
				dispatch('updateNotification', error);
				console.log("updateCompany Login Required error", error);
				return reject(error);
			} 
			console.log("getCompanyList", payload);
			var url = "";
			if(payload != undefined) {
				url = payload.url;
			}
			axios.patch("/django/companies/" + url, payload).then(response => {
				console.log("Django Update Company Item", response);
				if (response.status === 202) {
					dispatch('getCompanyList');
					response.type = "Update Company";
					dispatch('updateNotification', response);
				}
			}).catch(error => {
				if (error.response) {
					error.type = "Update Company";
					dispatch('updateNotification', error.response);
				}
			})
		},
		//Delete Methods Need to finish
		deleteCompany({ dispatch, commit }, payload) {
			return new Promise((resolve, reject) => {
				console.log("Make company Inactive Payload", payload);
				axios.patch("/django/companies/"+ payload.id + "/", payload).then(response => {
					console.log("Delete Django Company", response);
					if (response.status === 204) {
						dispatch('getCompanyList');
						response.type = "Delete Company";
						dispatch('updateNotification', response);

						return resolve(response.data)
					}
				}).catch(error => {
					error.type = "Delete Company";
					dispatch('updateNotification', error.response);

					return resolve(error);

				});
			}).catch(error => {
				return error;
			});
		},
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
		GET_COMPANY_LIST(state) {
			console.log("companyList from getter", state.companyList);
			return state.companyList;
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

