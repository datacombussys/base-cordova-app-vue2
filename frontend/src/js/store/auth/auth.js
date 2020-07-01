import axios from "axios";
import { f7 } from 'framework7-vue';


export const Auth = {
	namespace: true,
	name: "auth",
	state: {
		isAuthenticated: false,
		userLoginProfile: {},
		authLevel: 1,
		userCompanyParent: null,
		userCompanyName: null,
		user: null,
		preLoginPagePath: null,
		platformInfo: {},
		webdomain: '',
	},
	mutations: {
		SET_INDEXEDDB_USER(state, payload) {
			console.log("SET_INDEXEDDB_USER", payload);
			state.user = payload;
			state.isAuthenticated = true;
			axios.defaults.headers.common['Authorization'] = "Token " + payload.token;
		},
		SET_LOGIN_PROFILE(state, payload) {
				console.log("SET_LOGIN_PROFILE", payload);
				state.userLoginProfile = payload;
		},
		SET_LOGIN_DETAILS(state, payload) {
			console.log("SET_LOGIN_DETAILS Payload", payload);
			localStorage.setItem("user", JSON.stringify(payload));
			localStorage.setItem("expiration", 604800);
			state.isAuthenticated = true;
			state.user = payload;

			axios.defaults.headers.common['Authorization'] = "Token " + payload.token;
		},
		LOGOUT_USER(state, payload) {
			state.isAuthenticated = false;
			state.userLoginProfile = {};
			state.user = null;
			console.log("REMOVE_TOKEN Payload");
			localStorage.removeItem("expiration");
			localStorage.removeItem("user");
			// location.reload();

			axios.defaults.headers.common['Authorization'] = "";
		},

		SET_DOMAIN(state, payload) {
			console.log('SET_DOMAIN payload', payload);
			state.webdomain = payload;
			console.log('state.domain', state.webdomain);
		},
		SET_PLATFORM_INFO(state, payload) {
			console.log('SET_PLATFORM_INFO payload', payload);
			return new Promise(async (resolve, reject) => {
				console.log('SET_PLATFORM_INFO payload.employeeProfile', payload);
        if(payload.datacom != null) {
					let platform = {id: payload.datacom, platform: "datacom", url: "?datacom__id=" + payload.datacom};
					state.platformInfo = platform;
					state.authLevel = 1;
					state.userCompanyName = payload.datacom.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.partner != null) {
					let platform = {id: payload.partner, platform: "partner", url: "?partner__id=" + payload.partner};
					state.platformInfo = platform;
					state.authLevel = 2;
					state.userCompanyParent = payload.partner.datacom.dba_name;
					state.userCompanyName = payload.partner.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.company != null) {
					let platform = {id: payload.company, platform: "company", url: "?company__id=" + payload.company};
					state.platformInfo = platform;
					state.authLevel = 3;
					state.userCompanyParent = payload.company.partner.dba_name || payload.company.datacom.dba_name;
					state.userCompanyName = payload.company.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.vendor != null) {
					let platform = {id: payload.vendor, platform: "vendor", url: "?vendor__id=" + payload.vendor};
					state.platformInfo = platform;
					state.authLevel = 4;
					state.userCompanyParent = payload.vendor.company.dba_name || payload.vendor.partner.dba_name || payload.vendor.datacom.dba_name;
					state.userCompanyName = payload.vendor.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        } else {
          return reject("No Match Found")
        }
      }).catch(error => {
        return error;
      });
		},
		
		
	},
	actions: {
		async setDomain({ dispatch, commit, state }) {				
			console.log("setDomain action");
			var subdomain = location.host.split('.mydataboxx')[0];
			var domain = subdomain.split('.')[0];
			console.log("subdomain", subdomain);
			console.log("domain", domain);
			await commit("SET_DOMAIN", domain);

		},
		async preFetchProfile({ dispatch, commit, state }) {
			console.log("preFetchProfile request");
			f7.dialog.progress("Please wait while we load your data").open();
			const user = await dispatch('getIndexedDb');
			console.log('preFetchProfile from IndexedDb user', user);
			await dispatch('loadAllData');
			if(user) {
				let EEUSerID = await dispatch('getEmployeeProfileByUserID', user.id);
				console.log("EEUSerID", EEUSerID);
				commit("SET_LOGIN_PROFILE", EEUSerID[0].user_obj);
				await dispatch('loadCompanySpecificData');
				await dispatch('loadUserSpecificData');
				f7.dialog.close();
			}
			else {
				f7.dialog.close();
			}
			return
		},
		//Create a Customer Signin Method
		//Employee Signin Method
		async signIn({ dispatch, commit, state }, credentials) {
			console.log("credentials", credentials);
			axios.post("/django/login/", credentials)
				.then(async response => {
					console.log("response", response);
					if(response.status === 200) {
						// f7.dialog.alert("Login was Successful").open();
						f7.dialog.progress("Please wait while we load your data").open();
						console.log("Login response.data", response.data);
						// commit("SET_LOGIN_DETAILS", response.data);	
						response.data['signin'] = true;					
						dispatch('setIndexedDb', response.data);
						let EEUSerID = await dispatch('getEmployeeProfileByUserID', response.data.id);
						console.log("EEUSerID", EEUSerID);
						commit("SET_LOGIN_PROFILE", EEUSerID.data);

						await dispatch('loadAllData');
						await dispatch('loadCompanySpecificData');
						await dispatch('loadUserSpecificData');
						f7.dialog.close();
						//Set Notification
						response.type = "User Logged In";
						dispatch('updateNotification', response);
						if(state.preLoginPagePath === null) {
							f7.views.main.router.navigate('/');
						} else {
							f7.views.main.router.navigate('/secured/', {reloadCurrent : true});
						}
						
					} 
				}).then(res => {
					commit('SET_EMPLOYEE_LIST');
				}).catch(error => {
						console.log("Error Logging In", error);
						// f7.dialog.alert("Login was unuccessful. Please try again.").open();
						f7.dialog.create({
							title: "Login was unuccessful",
							text: "Please try again",
							buttons: [
								{
									text: "OK",
									bold: true,
									close: true,
									color: "red"
								},
							],
							closeByBackdropClick: true,
						}).open();
					error.type = "Login Unsuccessful";
					dispatch("updateNotification", error);
				});
			},
			//Alternate Method Login
			signInAlt({ dispatch, commit, state }, credentials) {
				console.log("signInAlt credentials", credentials);
				axios.post("/django/alt-login/", credentials)
					.then(response => {
						console.log("posted login request", response.data);
						commit("SET_LOGIN_PROFILE", response[0].user);
						// commit("SET_LOGIN_DETAILS", response.data);
						console.log("Login response.data", response.data);
						dispatch('getEmployeeProfileByUserID', response.data.user_id);
						//Set Notification
						response.type = "User Logged In";
						dispatch('updateNotification', response);
						f7.views.main.router.navigate('/retailpos/');
						// if(state.preLoginPagePath === null) {
						// 	f7.views.main.router.navigate('/');
						// } else {
						// 	f7.views.main.router.navigate('/secured/', {reloadCurrent : true});
						// }
						
					}).then(res => {
						commit('SET_EMPLOYEE_LIST');
					}).catch(error => {
						error.type = "Login Unsuccessful";
						dispatch("updateNotification", error);
					});
			},
			//Manager Barcode Auth Approval
			managerAuthorizationBarcode({ dispatch, commit, state }, credentials) {
				return new Promise((resolve, reject) => {
					axios.post("/django/manager-auth/", credentials)
					.then(response => {
						console.log("posted login request", response);
						//Set Notification
						response.type = "Manager Approval";
						dispatch('updateNotification', response);

						return resolve(response);

					}).catch(error => {
						error.type = "Manager Approval";
						dispatch("updateNotification", error);

						return resolve(error);
					});
				}).catch(error => {
	
					return error;
				});
				
				},
			//Reset Password
			passwordReset({ dispatch, commit, state }, credentials) {
				console.log("credentials", credentials);
				axios.put("django/pw-reset/", credentials).then(response => {
					console.log("Django password Reset response", response.data);
					// dispatch('signIn', credentials);
					response.type = "Password Reset";
					dispatch('updateNotification', response);
					f7.views.main.router.navigate('/login/');
					// if(state.preLoginPagePath === null) {
					// 	f7.views.main.router.navigate('/');
					// } else {
					// 	f7.views.main.router.navigate('/secured/', {reloadCurrent : true});
					// }
				})
				.catch(error => {
					error.type = "Password Reset";
					dispatch("updateNotification", error);
				});
			},
			//************************************************  Set IndexedDB Storage   *********************************************************/
			setIndexedDb({state, commit}, payload) {
				console.log("setIndexedDb payload", payload);
				//Global Variabes
				const dbName = "UserDB";
				const dbVersion = 2;
				const indexDB = indexedDB.open(dbName, dbVersion);
				const tableName = "UsersData";
	
				//onUpgradeNeeded
				indexDB.onupgradeneeded = (e) => {
					console.log("Upgrade was called");
					console.log("this", this);
					f7.dialog.alert("Database Upgrade was called.").open();
		
					const db = e.target.result;
					console.log("Success db", db);
		
					//Can Only create on Upgrade
					var objectStore = db.createObjectStore(tableName, {
						keyPath: "id"
					});
					objectStore.createIndex("id", "id", { unique: true });
	
					objectStore.transaction.oncomplete = (event) => {
						console.log("objectStore.transaction.oncomplete, event", event);
					}
				};
	
				//On Success
				indexDB.onsuccess = (e) => {
					console.log("Success was called setIndexedDb");
					// f7.dialog.alert("Success was called.").open();
					const db = e.target.result;
		
					//Add info to DB User
					console.log("payload", payload);
					var token = null;
					var id = null;
					var email = null;
					var employee = null;
	
					if(payload.signin) {
						id = payload.id;
						email = payload.email;
						employee = payload.employee;
						token = payload.token;
					} else {
						token = payload.user.token;
						id = payload.user.id;
						email = payload.user.email;
						employee = payload.id;
					}
					const user = {
						token: token,
						id: id,
						email: email,
						employee: employee,
					};
					console.log("user", user);
					const tx = db.transaction(tableName, "readwrite");
					console.log("tx", tx);
					//Transaction Success
					tx.oncomplete = (event) => {
						console.log("TX All done!", event);
						commit('SET_INDEXEDDB_USER', user);
					};
					//Transaciton Error
					tx.onerror = (event)  =>{
						// Don't forget to handle errors!
						console.log("TX had an error", event);
					};

					//Actually Store the User Object Here
					var newUserRequest = tx.objectStore(tableName);
					console.log("newUserRequest",newUserRequest);
					var request = newUserRequest.put(user);
					request.onsuccess = evt => {
						console.log('evt', evt);
						console.log('evt.target.result', evt.target.result);
					}
		
				};
				//On Error
				indexDB.onerror = (e) => {
					f7.dialog.alert("Error was called.").open();
					console.log("Error was called");
					console.log(`Error: ${e.target.error} was found`);
				};
			},
			//************************************************  Get IndexedDb   *********************************************************/
			async getIndexedDb({state, commit}) {
				return new Promise((resolve, reject) => {
					//Global Variabes
					const dbName = "UserDB";
					const indexDB = indexedDB.open(dbName);
					const tableName = "UsersData";				
		
					//On Success
					indexDB.onsuccess = async (e) => {
						console.log("Success was called getIndexedDb");
						// f7.dialog.alert("Success was called.").open();
						const db = e.target.result;
						console.log("db.version", db.version);
						if(db.version === 1) {
							return resolve();
						}
						if(db.version === 2) {
							try {
								// store = db.transaction("UsersData", "readonly").objectStore(tableName);
								//View UsersData Function when onSuccess is true
								const tx = db.transaction("UsersData", "readonly");
								const userObj = tx.objectStore(tableName);
								console.log("userObj", userObj);
								const request = userObj.openCursor();
								console.log("request", request);
								request.onsuccess = (e) => {
									const cursor = e.target.result;
									console.log("cursor", cursor);
									if (cursor) {
										// console.log("There was a DB, cursor:", cursor);
										// console.log("cursor Key" + cursor.key + "cursor.value" + cursor.value);
										commit('SET_INDEXEDDB_USER', cursor.value);
										// cursor.continue();
										return resolve(cursor.value);
									}
								};
							} catch(e) {
								console.log('catch e',e);
								console.log('catch e',e.result);
								// indexedDB.deleteDatabase(dbName);
	
								return reject();
							}
						}

					};
				}).catch(error => {
					console.log('promise error', error);
					return error;
				});
				
			},
			//************************************************  Remove IndexedDb   *********************************************************/
			removeIndexedDb(state, payload) {
				//Global Variabes
				const dbName = "UserDB";
				const dbVersion = 1;
				const indexDB = indexedDB.open(dbName, dbVersion);
				const tableName = "UsersData";
	
				//On Success
				indexDB.onsuccess = (e) => {
					console.log("Success was called removeIndexedDb");
					f7.dialog.alert("Success was called for removeIndexedDb.").open();
					const db = e.target.result;
		
					var id = payload.id;
					
					const request = db.transaction("UsersData", "readwrite")
						.objectStore(tableName)
						.delete(id);
	
					console.log("request",request);
				
					request.onsuccess = evt => {
						console.log('request Onsuccess Delete user evt', evt);
						console.log('evt.target.result', evt.target.result);
					}
				};
			},
			//************************************************  SignOut   *********************************************************/
			signOut({ commit, dispatch, state }) {
				console.log('state.user', state.user);
				// const userProfile = JSON.parse(JSON.stringify(state.user));
				// console.log('userProfile', userProfile);
				console.log('Signing Out');
				axios.options("/django/logout/")
				.then(response => {
					console.log("signOut response", response);
					dispatch('removeIndexedDb', {id: state.user.id});
					commit('LOGOUT_USER');
					// Clear User and Employee data in Users module
					commit('CLEAR_USER_DATA');
					//Set Notification
					response.type = "Logout User";
					dispatch('updateNotification', response);
					
				});
			},
			//************************************************  Load Data   *********************************************************/
			//Load All data first and set Platform Info for the rest of the methods to use

			loadAllData({ commit, dispatch, state, rootState }) {
				//Get a list of all Hierarchy data: Datacom, Partner, Merchant, Vendors
				return new Promise( async (resolve, reject) => {
					console.log('loadAllData rootState', rootState);
					
					console.log('loadAllData state.platformInfo', state.platformInfo);
					dispatch("getDatacomList");
					if(state.platformInfo.datacom != null) {
						dispatch("getPartnerList");
						dispatch("getCompanyList");
						dispatch("getVendorList");
						return resolve();
					}
					else if (state.platformInfo.partner != null) {
						dispatch("getCompanyList", state.platformInfo);
						dispatch("getVendorList", state.platformInfo);
						return resolve();
					}
					else if (state.platformInfo.company != null) {
						dispatch("getVendorList", state.platformInfo);
						return resolve();
					}
					else if (state.platformInfo.vendor != null) {
						return resolve();
					}
					return resolve();

				}).catch(error => {
					console.log('Promise error', error);
					return error;
				});
			},

			loadCompanySpecificData({ commit, dispatch, state, rootState }) {
				//Get a list of company specific details: departments, employees, postions, hours, etc.
				return new Promise((resolve, reject) => {
					// console.log('loadCompanyData rootState', rootState);
					dispatch("getEmployeeList", state.platformInfo);
					// dispatch("getEmployeePositions", state.platformInfo);
					// dispatch("getCompanyDepartments", state.platformInfo);
					// dispatch("getHolidays", state.platformInfo);
					// dispatch("GETBusinessHours", state.platformInfo);
					// dispatch("GETAttendanceSettings", state.platformInfo);
					// dispatch("getCompanyShifts", state.platformInfo);
					dispatch("GETSalesTaxes", state.platformInfo);
					dispatch("GETGeneralSettings", state.platformInfo);
					// dispatch("getSalesOfficeList", state.platformInfo);
					// dispatch("getWarehouseList", state.platformInfo);
					dispatch("GETInventoryList", state.platformInfo);
					dispatch("GETInventoryCategories", state.platformInfo);
					dispatch("GETCustomerList", state.platformInfo);
					//Not Completed Yet
					// dispatch("getInventoryLabels", state.platformInfo);

					return resolve();

				}).catch(error => {
					console.log('Promise error', error);
					return error;
				});
				
				
				
			},
			loadUserSpecificData({ commit, dispatch, state, rootState }) {
				//Get a list of company specific details: departments, employees, postions, hours, etc.
				return new Promise((resolve, reject) => {
					console.log('loadUserata rootState', rootState);
					// dispatch("getCreditCardList", state.platformInfo);
					// dispatch("getACHAccountList", state.platformInfo);
					// dispatch("getNewShippingList", state.platformInfo);
					// dispatch("getNotifications", state.platformInfo);

					return resolve();

				}).catch(error => {
					console.log('Promise error', error);
					return error;
				});				
			},
			
	},
	getters: {
		isLoggdIn(state) {
			return !!state.user;
		}
	}
};
