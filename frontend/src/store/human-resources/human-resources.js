
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


export const Notifications = {
	namespace: true,
	state: {
		benefitsList: [],
		employeeDocsList: [],
		companyDocsList: [],
		mileageReimbursementList: []

	},
	mutations: {
		PUSH_BENEFIT_LIST(state, payload) {
			state.benefitList.push(payload);
		}
 

	},
	actions: { 
		addBenefit({ commit, dispatch, rootState }, form) {
			console.log('addBenefit form:', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/benefits/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Benefit";
						commit('PUSH_BENEFIT_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					error.response.type = "Add Benefit";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

		getBenefits({ commit, dispatch, rootState }, payload) {
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
				axios.get("/django/benefits/" + url).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Benefits";
						commit('SET_NOTIFICATION_TO_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					error.response.type = "Retrieve Benefits";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//Updating Models
		PATCHBenefits({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCHBenefits", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHBenefits error", error);
					return reject(error);
				}
				axios.patch("/django/benefits/" + form.id + "/", form).then(response => {
					console.log("PATCHBenefits", response);
					if (response.status === 200) {
						response.type = "Update Benefits";
						dispatch('updateNotification', response);
						commit('UPDATE_NOTIFICATION', response.data);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Update Benefits";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//Delete Methods
		DELETEBenefits({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("DELETEBenefits", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("DELETEBenefits error", error);
					return reject(error);
				}
				axios.delete("/django/benefits/" + form.id).then(response => {
					console.log("DELETEBenefits", response);
					if (response.status === 204) {
						response.type = "Delete Benefits";
						dispatch('updateNotification', response);
						commit('DELETE_NOTIFICATION',form.id);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete Benefits";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

  


	},
	getters: {
		GET_BENEFITS_LIST()	{
			return state.benefitsList;
		}
  

	}
}