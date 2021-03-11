import {router} from "@/routes"
import axios from "axios"

export const Auth = {
	namespace: true,
	name: "auth",
	state: {
		isAuthenticated: false,
		user: null,
		userProfile: {},
		authLevel: 1,
		userCompanyParent: null,
		userCompany: null,
		preLoginPagePath: null,
		platformInfo: {},
		webdomain: '',
	},
	mutations: {
		SET_LOGIN_PROFILE(state, payload) {
			console.log("SET_LOGIN_PROFILE payload", payload)
			if(payload) {
				state.userProfile = payload.user_obj
			}
		},
		SET_LOGIN_DETAILS(state, payload) {
			state.user = payload;
			state.isAuthenticated = true;
			console.log("SET_LOGIN_DETAILS Payload", payload);
			localStorage.setItem("user", JSON.stringify(payload));
			localStorage.setItem("expiration", 604800);

			axios.defaults.headers.common['Authorization'] = "Token " + payload.token;
		},
		FIND_LOGIN_PROFILE(state) {
			var user = JSON.parse(localStorage.getItem("user"))
			if(user != null) {
				state.user = user
				state.isAuthenticated = true
			} else {
				return
			}
			
		},
		LOGOUT_USER(state, payload) {
			state.isAuthenticated = false;
			state.userProfile = {};
			state.user = null;
			console.log("REMOVE_TOKEN Payload");
			localStorage.removeItem("expiration");
			localStorage.removeItem("user");
			// location.reload();

			axios.defaults.headers.common['Authorization'] = "";
		},

		SET_DOMAIN(state, payload) {
			console.log('SET_DOMAIN payload', payload);
			var subdomain = window.location.host
			var domain = subdomain.split(".mydataboxx.com")[0]
			var splitDomain = domain.split(".")[0]
			state.webdomain = splitDomain;
			
			console.log('state.domain', state.webdomain);
		},
		SET_PLATFORM_INFO(state, payload) {
			console.log('SET_PLATFORM_INFO payload', payload);
			return new Promise(async (resolve, reject) => {
				console.log('SET_PLATFORM_INFO payload.employeeProfile', payload);
        if(payload.datacom != null) {
					let platform = {id: payload.datacom, platform: "datacom", filterURL: "?datacom__id=" + payload.datacom};
					state.platformInfo = platform;
					state.authLevel = 1;
					state.userCompany = payload.datacom_obj;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.partner != null) {
					let platform = {id: payload.partner, platform: "partner", filterURL: "?partner__id=" + payload.partner};
					state.platformInfo = platform;
					state.authLevel = 2;
					state.userCompanyParent = payload.partner.datacom_obj;
					state.userCompany = payload.partner_obj;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.company != null) {
					let platform = {id: payload.company, platform: "company", filterURL: "?company__id=" + payload.company};
					state.platformInfo = platform;
					state.authLevel = 3;
					state.userCompanyParent = payload.company.partner_obj || payload.company.datacom_obj;
					state.userCompany = payload.company_obj;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.vendor != null) {
					let platform = {id: payload.vendor, platform: "vendor", filterURL: "?vendor__id=" + payload.vendor};
					state.platformInfo = platform;
					state.authLevel = 4;
					state.userCompanyParent = payload.vendor.company_obj || payload.vendor.partner_obj || payload.vendor.datacom_obj;
					state.userCompany = payload.vendor_obj;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        } else {
          return reject("No Match Found")
        }
      }).catch(error => {
        return error;
      });
		},
		SET_WEBSQL_USER(state, payload) {
			console.log("SET_WEBSQL_USER", payload);
			state.user = payload;
			state.isAuthenticated = true;
			axios.defaults.headers.common['Authorization'] = "Token " + payload.token;
		},
		SET_INDEXEDDB_USER(state, payload) {
			console.log("SET_INDEXEDDB_USER", payload);
			state.user = payload;
			state.isAuthenticated = true;
			axios.defaults.headers.common['Authorization'] = "Token " + payload.token;
		},
		
		
	},
	actions: {
		async preFetchProfile({ dispatch, commit, rootState }) {
			console.log("preFetchProfile request");
			rootState.Notifications.isLoadPanelVisible = true
			const user = await dispatch('findUserInStorage');
			console.log("user", user);
			// const user = await dispatch('getIndexedDb'); // No Longer using this
			console.log('preFetchProfile user', user);
			if(user) {
				let EEUserObj = await dispatch('GETEmployeeProfileById', user);
				if(EEUserObj) {
					console.log("EEUserObj", EEUserObj);
					commit("SET_LOGIN_PROFILE", EEUserObj);
					commit("SET_DOMAIN", EEUserObj)
					await dispatch('loadAllData');
					await dispatch('loadCompanySpecificData');
					await dispatch('loadUserSpecificData');
				}
				rootState.Notifications.isLoadPanelVisible = false
			} else {
				await dispatch('loadAllData');
				rootState.Notifications.isLoadPanelVisible = false
			}
			return
		},
		findUserInStorage({ dispatch, commit, state }) {
			return new Promise( async (resolve, reject) => {
				commit("FIND_LOGIN_PROFILE");
				return resolve(state.user)
			})
		},
		test({ state, rootState }) {
			console.log("router", router)
			console.log("this", this)
			console.log("state", state)
			console.log("rootState", rootState)
			router.push("/home")
		},
		//Create a Customer Signin Method
		//Employee Signin Method
		async signIn({ dispatch, commit, state, rootState }, credentials) {
			console.log("credentials", credentials);
	
			axios.post("/django/login/", credentials).then(async response => {
				console.log("response", response);
				if(response.status === 200) {
					rootState.Notifications.isLoadPanelVisible = true
					console.log("Login response.data", response.data);

					commit("SET_LOGIN_DETAILS", response.data);	
					response.data['signin'] = true;
					// let webDBUser = await dispatch('setWebDb', response.data); // No Longer using this
					// let indexedUser = await dispatch('setIndexedDb', response.data); // No Longer using this
					// console.log("indexedUser", indexedUser); // No Longer using this
					let EEUSERObj = await dispatch('GETEmployeeProfileById', {id: response.data.id});
					console.log("EEUSERObj", EEUSERObj);
					commit("SET_LOGIN_PROFILE", EEUSERObj);
					commit("SET_DOMAIN", EEUSERObj)

					await dispatch('loadAllData');
					await dispatch('loadCompanySpecificData');
					await dispatch('loadUserSpecificData');
					rootState.Notifications.isLoadPanelVisible = false
					//Set Notification
					response.type = "User Logged In";
					dispatch('updateNotification', response);
					console.group("router", router)
					console.group("this", this)
					// console.group("this.$route", this.$route)
					router.push("/secured").catch(error => {
						console.error('Logging in Navigation error', error)
					})
					// if(state.preLoginPagePath === null) {
					// 	// window.location.href = "http://" + state.webdomain + ".localhost.mydataboxx.com:9000/home"
					// 	router.push("/home")
					// } else {
					// 	// window.location.href = "http://" + state.webdomain + ".localhost.mydataboxx.com:9000/secured"
					// 	router.push("/secured", {reloadCurrent : true})
					// }
					
				} 
			}).then(res => {
				rootState.Notifications.isLoadPanelVisible = false
				commit('SET_EMPLOYEE_LIST');
			}).catch(error => {
				rootState.Notifications.isLoadPanelVisible = false
				console.log("Error Logging In", error);
				console.log("Error Logging In", error.response);
				console.log("Error Logging In", error.message);
				error.type = "Login Unsuccessful";
				dispatch("updateNotification", error.response);
			});
		},

		//Alternate Method Login
		signInAlt({ dispatch, commit, state }, credentials) {
			console.log("signInAlt credentials", credentials);
			axios.post("/django/alt-login/", credentials)
				.then(response => {
					console.log("posted login request", response.data);
					commit("SET_LOGIN_PROFILE", response[0].user);
					commit("SET_LOGIN_DETAILS", response.data);
					console.log("Login response.data", response.data);
					dispatch('GETEmployeeProfileById', response.data.user_id);
					//Set Notification
					response.type = "User Logged In";
					dispatch('updateNotification', response);
					router.push('/retailpos');
					// if(state.preLoginPagePath === null) {
					// 	router.push("/home")
					// } else {
					// 	router.push('/secured/', {reloadCurrent : true});
					// }
					
				}).then(res => {
					commit('SET_EMPLOYEE_LIST');
				}).catch(error => {
					error.type = "Login Unsuccessful";
					dispatch("updateNotification", error.response);
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
						dispatch("updateNotification", error.response);

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
					router.push('/login-form');
					// if(state.preLoginPagePath === null) {
					// 	router.push("/home")
					// } else {
					// 	router.push('/secured/', {reloadCurrent : true});
					// }
				})
				.catch(error => {
					error.type = "Password Reset";
					dispatch("updateNotification", error.response);
				});
			},

			//************************************************  SignOut   *********************************************************/

			signOut({ commit, dispatch, state }) {
				console.log('state.user', state.user);
				// const userProfile = JSON.parse(JSON.stringify(state.user));
				// console.log('userProfile', userProfile);
				console.log('Signing Out');
				axios.options("/django/logout/")
				.then(response => {
					// window.location.reload()
					router.push({name: "home", reloadCurrent : true})
					console.log("signOut response", response);
					// dispatch('removeIndexedDb', {id: state.user.id});
					commit('LOGOUT_USER');
					// Clear User and Employee data in Users module
					commit('CLEAR_USER_DATA');
					//Set Notification
					response.type = "Logout User";
					dispatch('updateNotification', response);
					
				});
			},
			//************************************************  Set WebSQL   *********************************************************/
			setWebDb(userData) {
				return new Promise((resolve, reject) => {
					console.log("setWebDb userData", userData);
					var db = openDatabase('databoxx', '1.0', 'Databoxx SQL', 2 * 1024 * 1024); 

					let setUser = db.transaction((tx) => { 
						console.log("setUser executed", userData)  
						tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id unique, log)'); 
						tx.executeSql('INSERT INTO USERS (id,email,employee,signin,token) VALUES (?, ?, ?, ?, ?'), [userData.id, userData.email, userData.employee, userData.signin, userData.token]; 
					});


					db.transaction((tx) => { 
						console.log("findUser executed", userData)  
            tx.executeSql('SELECT * FROM USERS', [], (tx, results) => { 
               var len = results.rows.length, i; 
							 console.log("There are " + len + "rows")
							 if(len === 0) {
								setUser()
							 }
      
               for (i = 0; i < len; i++) { 
								console.log("User Data is: " + results.rows.item(i))
								commit("SET_WEBSQL_USER",results.rows.item(i))
               } 
            }, null); 
         	});

				})
			},
			//************************************************  Set IndexedDB Storage   *********************************************************/
			setIndexedDb({state, commit}, payload) {
				return new Promise((resolve, reject) => {
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
							console.log("BBBBBB");

							return resolve(event);

						};
						//Transaction Error
						tx.onerror = (event)  =>{
							// Don't forget to handle errors!
							console.log("TX had an error", event);
						};

						console.log("AAAAAA");
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
						console.log("Error was called");
						console.log(`Error: ${e.target.error} was found`);
					};
				});
				
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
			//************************************************  Load Data   *********************************************************/
			//Load All data first and set Platform Info for the rest of the methods to use

			loadAllData({ commit, dispatch, state, rootState }) {
				//Get a list of all Hierarchy data: Datacom, Partner, Merchant, Vendors
				return new Promise( async (resolve, reject) => {
					console.log('loadAllData rootState', rootState);
					
					console.log('loadAllData state.platformInfo', state.platformInfo);
					dispatch("GETDatacomList");
					if(state.platformInfo.platform === 'datacom') {
						dispatch('GETDatacomOwnProfile', state.platformInfo);
						dispatch("GETPartnerList");
						dispatch("GETCompanyList");
						dispatch("GETVendorList");
						return resolve();
					}
					else if (state.platformInfo.platform === 'partner') {
						dispatch('GETPartnerOwnProfile', state.platformInfo);
						dispatch("GETCompanyList", state.platformInfo);
						dispatch("GETVendorList", state.platformInfo);
						return resolve();
					}
					else if (state.platformInfo.platform === 'company') {
						dispatch('GETCompanyOwnProfile', state.platformInfo);
						dispatch("GETVendorList", state.platformInfo);
						return resolve();
					}
					else if (state.platformInfo.platform === 'vendor') {
						dispatch('GETVendorOwnProfile', state.platformInfo);
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
				return new Promise(async(resolve, reject) => {
					console.log('loadCompanyData rootState', rootState);
					await dispatch("GETInvCategoriesByFilter", state.platformInfo);
					await dispatch("GETInventoryList", state.platformInfo);
					await dispatch("GETEmployeeList", state.platformInfo);
					await dispatch("GETSalesOfficeList", state.platformInfo);
					await dispatch("GETAPIKeyById", state.platformInfo);
					// await dispatch("GETWarehouseList", state.platformInfo);
					// await dispatch("GETCustomerList", state.platformInfo);
					// await dispatch("GETPositionList", state.platformInfo);
					// await dispatch("GETDepartmentList", state.platformInfo);
					// await dispatch("GETHolidays", state.platformInfo);
					// await dispatch("GETBusinessHours", state.platformInfo);
					// await dispatch("GETAttendanceSettings", state.platformInfo);
					// await dispatch("GETCompanyShifts", state.platformInfo);
					// await dispatch("GETSalesTaxList", state.platformInfo);
					// await dispatch("GETGeneralSettings", state.platformInfo);
					

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
					dispatch("GETCreditCardList", state.platformInfo);
					dispatch("GETACHAccountList", state.platformInfo);
					dispatch("GETShippingList", state.platformInfo);
					dispatch("getNotifications", state.platformInfo);

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
