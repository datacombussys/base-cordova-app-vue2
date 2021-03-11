
export const RetailPOS = {
  namespace: true,
  name: "retailPOS",
  state: {
		dicountsList: [
      "5", "10", "15", "20", "25", "30", 
      "35", "40", "45", "50", "55", "60", 
      "65", "70", "80", "85", "90", "95", "100"
		],
		processDeclinedFrequency: [
			"Daily", "Weekly", "Monthly"
		],
		tillList: [],
		openTillObject: {},
  },
  mutations: {
		SET_TILL_LIST(state, payload) {
			state.tillList = payload;
		},
		PUSH_NEW_TILL(state, payload) {
			console.log('payload', payload)
			state.tillList.push(payload);
			console.log('state.tillList', state.tillList)
		},
		REMOVE_TILL(state, payload) {
			state.tillList.slice(payload, 1)
		},
		SAVE_TILL(state, payload) {
			state.tillList.splice(payload.id, 1, payload.data)
		}
  },
  actions: {
		//Create Methods
		POSTOpenTill({ commit, dispatch, rootState }, form) {
			console.log('POSTOpenTill form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch("updateNotification", error.response);
					return reject(error);
				}
				axios.post("/django/open-till/", form).then(response => {
					if (response.status === 201) {
						response.type = "Open Till";
						commit('PUSH_NEW_OPEN_TILL', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Open Till";
					dispatch("updateNotification", error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//		//GET Methods
		GETTillHistory({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch("updateNotification", error.response);
					console.log("GETTillHistory error", error);
					return reject(error);
				}
				console.log("GETTillHistory", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/open-till/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_TILL_HISTORY_LIST', response.data);
						response.type = "Retrieve Till History";
						// dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Till History";
					dispatch("updateNotification", error.response);

					return resolve(error);
				});
			});
		},
		//Update Mathods
		PATCHCloseTill({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCH to Close Till", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch("updateNotification", error.response);
					console.log("PATCHCloseTill error", error);
					return reject(error);
				}
				axios.patch("/django/open-till/" + form.id + "/", form).then(response => {
					console.log("PATCH Hours of Operation", response);
					if (response.status === 200) {
						response.type = "Close Till";
						dispatch('updateNotification', response);
						dispatch('GETTillHistory');

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Close Till";
					dispatch("updateNotification", error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
 
  

  },
  getters: {
		GET_TILL_LIST_LENGTH(state) {
			return state.tillList.length
		},
		GET_OPEN_TILL_OBJECT(state) {
			return state.openTillObject
		},
		RETURN_TILL_LIST(state) {
			return state.tillList
		}
  }
};
