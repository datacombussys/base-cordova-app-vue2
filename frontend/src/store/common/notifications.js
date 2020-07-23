;
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


export const Notifications = {
	namespace: true,
	state: {
		notificationList: [],
		isLoadPanelVisible: false

	},
	mutations: {
		PUSH_NOTIFICATION_TO_LIST(state, payload) {
			state.notificationList.push(payload[0]);
		},
		SET_NOTIFICATION_TO_LIST(state, payload) {
			state.notificationList = payload;
		},
		UPDATE_NOTIFICATION(state, payload) {
			console.log('UPDATE_NOTIFICATION payload', payload);
			var indexID = state.notificationList.findIndex(elem => elem.id === payload.id);
			state.notificationList.slice(indexID, 1);
			state.notificationList.push(payload);
			console.log('notificationList', state.notificationList);
		},
		DELETE_NOTIFICATION(state, payload) {
			var indexID = state.notificationList.findIndex(elem => elem.id === payload.id);
			state.notificationList.slice(indexID, 1);
			console.log('notificationList', state.notificationList);
		}
 

	},
	actions: { 
		addNotification({ commit, dispatch, rootState }, form) {
			console.log('addNotification form:', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/notifications/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Notification";
						commit('PUSH_NOTIFICATION_TO_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					error.response.type = "Add Notification";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

		getNotifications({ commit, dispatch, rootState }, payload) {
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
				axios.get("/django/notifications/" + url).then(response => {
					if (response.status === 200) {
						response.type = "Retrieve Notifications";
						commit('SET_NOTIFICATION_TO_LIST', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					error.response.type = "Retrieve Notifications";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//Updating Models
		PATCHNotification({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCHNotification", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHAttendanceSettings error", error);
					return reject(error);
				}
				axios.patch("/django/notifications/" + form.id + "/", form).then(response => {
					console.log("PATCHNotification", response);
					if (response.status === 200) {
						response.type = "Update Notifications";
						dispatch('updateNotification', response);
						commit('UPDATE_NOTIFICATION', response.data);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Update Notifications";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		DELETENotification({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("DELETENotification", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("DELETEBusinessHours error", error);
					return reject(error);
				}
				axios.delete("/django/notifications/" + form.id).then(response => {
					console.log("DELETENotification", response);
					if (response.status === 204) {
						response.type = "Delete Notification";
						dispatch('updateNotification', response);
						commit('DELETE_NOTIFICATION',form.id);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete Notification";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

  


	},
	getters: {
		GET_NOTIFICATIONS_LIST(state) {
			// console.group('GET_NOTIFICATIONS_LIST executed');
			return state.notificationList;
		},
		GET_ARCHIVED_NOTIFICATIONS_LIST(state) {
			// console.group('GET_NOTIFICATIONS_LIST executed');
			return state.notificationList.filter(elem => elem.is_archived === true);
		},
		GET_NEW_NOTIFICATIONS_LIST(state) {
			// console.group('GET_NOTIFICATIONS_LIST executed');
			return state.notificationList.filter(elem => elem.is_archived != true && elem.read === false);
		},
		GET_NEW_NOTIFICATIONS_LIST_LENGTH(state) {
			// console.group('GET_NOTIFICATIONS_LIST executed');
			return state.notificationList.filter(elem => elem.is_archived != true && elem.read === false).length;
		},
		GET_ARCHIVED_NOTIFICATIONS_LIST(state) {
			// console.group('GET_NOTIFICATIONS_LIST executed');
			return state.notificationList.filter(elem => elem.is_archived === true);
		},
		GET_ARCHIVED_NOTIFICATIONS_LIST_LENGTH(state) {
			// console.group('GET_NOTIFICATIONS_LIST executed');
			return state.notificationList.filter(elem => elem.is_archived === true).length;
		},
		GET_NOTIFICATIONS_LIST_LENGTH(state) {
			// console.group('GET_NOTIFICATIONS_LIST_LENGTH executed');
			return state.notificationList.length;
		}
  

	}
}