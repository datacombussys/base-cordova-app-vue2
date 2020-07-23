import axios from 'axios';

export default {
	//CREATE Item
	POSTItem(dispatch, rootState, endpoint, payload, type) {
		return new Promise((resolve, reject) => {
			console.log('POSTItem payload', payload);
			// if (!rootState.Auth.isAuthenticated) {
			// 	let error = {};
			// 	error.type = "Login Required";
			// 	error.status = 2000;
			// 	dispatch('updateNotification', error);
			// 	return reject(error);
			// }
			axios.post("/django/" + endpoint, payload).then(response => {
				if (response.status === 201) {
					console.log("API Call from POSTItem");
					response.type = type;
					dispatch('updateNotification', response);

					return resolve(response);
				}
			}).catch(error => {
				
				if(error.response) {
					error.response.type = type;
					console.error("error.response", error.response);
					dispatch('updateNotification', error.response);
					return reject(error.response);
				}
				return reject({error: "There was an error"});

				
			});
		}).catch(error => {
			error.promise = "promise error"
			console.error(error);
			return error;
		});
	},
	//Get LIST of all items on a platform level
	GETList(dispatch, rootState, endpoint, payload, type) {
		return new Promise((resolve, reject) => {
			console.log('GETList payload', payload);
			var platform = rootState.Auth.platformInfo;
			// if(!rootState.Auth.isAuthenticated) {
			// 	let error = {};
			// 	error.type = "Login Required";
			// 	error.status = 2000;
			// 	dispatch('updateNotification', error);
			// 	return reject(error);
			// } 
			var url = platform.url;
			if(payload != undefined) {
				url = payload.url;
			}
			if(endpoint === 'datacom-list/') {
				url="";
			}
			axios.get("/django/"+ endpoint + url).then(response => {
				if (response.status === 200) {
					response.type = type;
					console.log("API Call from GETList");
					dispatch('updateNotification', response);

					return resolve(response);
				}
			}).catch(error => {
				if (error.response) {
					error.type = type;
					dispatch('updateNotification', error.response);
					return reject(error);
				}
			});
		}).catch(error => {
			return error;
		});
	},
	// GET list of items that pertain to a specific platform entity
	GETSelectedList(dispatch, rootState, endpoint, payload, type) {
		return new Promise((resolve, reject) => {
			console.log('GETSelectedList payload', payload);
			if(!rootState.Auth.isAuthenticated) {
				let error = {};
				error.type = "Login Required";
				error.status = 2000;
				dispatch('updateNotification', error);
				return reject(error);
			} 
			axios.get("/django/"+ endpoint + payload.filterURL + payload.id).then(response => {
				if (response.status === 200) {
					response.type = type;
					console.log("API Call from GETSelectedList");
					dispatch('updateNotification', response);

					return resolve(response);
				}
			}).catch(error => {
				if (error.response) {
					error.type = type;
					dispatch('updateNotification', error.response);
					return reject(error);
				}
			});
		}).catch(error => {
			return error;
		});
	},
	//Get Own Profile
	GETOwnProfile(dispatch, rootState, endpoint, payload, type) {
		return new Promise((resolve, reject) => {
			console.log('GETOwnProfile payload', payload);
			if(!rootState.Auth.isAuthenticated) {
				let error = {};
				error.type = "Login Required";
				error.status = 2000;
				// dispatch('updateNotification', error);
				return reject(error);
			} 
			axios.get("/django/"+ endpoint + payload.id).then(response => {
				if (response.status === 200) {
					response.type = type;
					console.log("API Call from GETOwnProfile");
					dispatch('updateNotification', response);

					return resolve(response);
				}
			}).catch(error => {
				if (error.response) {
					error.type = type;
					dispatch('updateNotification', error.response);
					return reject(error);
				}
			});
		}).catch(error => {
			return error;
		});
	},
	//GET Selected Profile
	GETSelectedProfile(dispatch, rootState, endpoint, payload, type) {
		return new Promise((resolve, reject) => {
			console.log('GETSelectedProfile payload', payload);
			if(!rootState.Auth.isAuthenticated) {
				let error = {};
				error.type = "Login Required";
				error.status = 2000;
				// dispatch('updateNotification', error);
				return reject(error);
			} 
			axios.get("/django/"+ endpoint + payload.id).then(response => {
				if (response.status === 200) {
					response.type = type;
					console.log("API Call from GETSelectedProfile");
					dispatch('updateNotification', response);

					return resolve(response);
				}
			}).catch(error => {
				if (error.response) {
					error.type = type;
					dispatch('updateNotification', error.response);
					return reject(error);
				}
			});
		}).catch(error => {
			return error;
		});
	},
		//PATCH Methods
		PATCHItem(dispatch, rootState, endpoint, payload, type) {
			return new Promise((resolve, reject) => {
				console.log("PATCH" + type, payload);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHItem error", error);
					return reject(error);
				}
				axios.patch("/django/" + endpoint + payload.id + "/", payload).then(response => {
					console.log("PATCH" + type, response);
					if (response.status === 200) {
						console.log("API Call from PATCHItem");
						response.type = "Update" + type;

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Update Attendance Settings";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//PATCH DELETE payload.is_active = false
		PATCHDeleteItem(dispatch, rootState, endpoint, payload, type) {
      return new Promise((resolve, reject) => {
				console.log("PATCHDeleteItem", payload);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHItem error", error);
					return reject(error);
				}
        axios.patch("/django/" + endpoint + payload.id + "/", payload).then(response => {
          console.log("Delete" + type, response);
          if (response.status === 200) {
						console.log("API Call from PATCHDeleteItem");
            response.type = type;
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          error.type = type;
          dispatch('updateNotification', error.response);

          return resolve(error);

        });
      }).catch(error => {
        return error;
      });
    },
		//Delete Methods
		DELETEItem(dispatch, rootState, endpoint, payload, type) {
			return new Promise((resolve, reject) => {
				console.log("DELETE" + type, payload);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("DELETEItem error", error);
					return reject(error);
				}
				axios.delete("/django/operating-hours/" + payload.id).then(response => {
					console.log("DELETE" + type, response);
					if (response.status === 204) {
						console.log("API Call from DELETEItem");
						response.type = "Delete" + type;
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete" + type;
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

}
