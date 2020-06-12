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
		domain: '',
	},
	mutations: {
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
			location.reload();

			axios.defaults.headers.common['Authorization'] = "";
		},
		CHECK_LOGGED_IN(state) {
			const user = JSON.parse(localStorage.getItem('user'));
			if (user) {
				state.isAuthenticated = true;
				console.log("state.isAuthenticated", state.isAuthenticated);
			} else {
				state.isAuthenticated = null;
			}
		},
		SET_DOMAIN(state, payload) {
			console.log('SET_DOMAIN payload', payload);
			state.domain = payload;
			console.log('state.domain', state.domain);
		},
		SET_PLATFORM_INFO(state, payload) {
			console.log('SET_PLATFORM_INFO payload', payload);
			return new Promise(async (resolve, reject) => {
				console.log('SET_PLATFORM_INFO payload.employeeProfile', payload.Users.employeeProfile);
        if(payload.Users.employeeProfile.datacom != null) {
					let platform = {id: payload.Users.employeeProfile.datacom.id, platform: "datacom", url: "?datacom__id=" + payload.Users.employeeProfile.datacom.id, domain: state.domain};
					state.platformInfo = platform;
					state.authLevel = 1;
					state.userCompanyParent = payload.Users.employeeProfile.datacom.dba_name;
					state.userCompanyName = payload.Users.employeeProfile.datacom.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.Users.employeeProfile.partner != null) {
					let platform = {id: payload.Users.employeeProfile.partner.id, platform: "partner", url: "?partner__id=" + payload.Users.employeeProfile.partner.id, domain: state.domain};
					state.platformInfo = platform;
					state.authLevel = 2;
					state.userCompanyParent = payload.Users.employeeProfile.partner.datacom.dba_name;
					state.userCompanyName = payload.Users.employeeProfile.partner.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.Users.employeeProfile.company != null) {
					let platform = {id: payload.Users.employeeProfile.company.id, platform: "company", url: "?company__id=" + payload.Users.employeeProfile.company.id, domain: state.domain};
					state.platformInfo = platform;
					state.authLevel = 3;
					state.userCompanyParent = payload.Users.employeeProfile.company.partner.dba_name;
					state.userCompanyName = payload.Users.employeeProfile.company.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        }
        else if(payload.Users.employeeProfile.vendor != null) {
					let platform = {id: payload.Users.employeeProfile.vendor.id, platform: "vendor", url: "?vendor__id=" + payload.Users.employeeProfile.vendor.id, domain: state.domain};
					state.platformInfo = platform;
					state.authLevel = 4;
					state.userCompanyParent = payload.Users.employeeProfile.vendor.company.dba_name;
					state.userCompanyName = payload.Users.employeeProfile.vendor.dba_name;
					console.log('SET_PLATFORM_INFO state.platformInfo', state.platformInfo);
					return resolve();
        } else {
          return reject("No Match Found")
        }
      }).catch(error => {
        return error;
      });
		}
		
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
			const user = JSON.parse(localStorage.getItem("user"));
			console.log("preFetchProfile user", user);
			dispatch('loadAllData');
			if(user) {
				f7.dialog.progress("Please wait while we load your data").open();
				let EEUSerID = await dispatch('getEmployeeProfileByUserID', user.id);
				console.log("EEUSerID", EEUSerID);
				commit("SET_LOGIN_PROFILE", EEUSerID.data);
				dispatch('loadAllData');
				dispatch('loadCompanySpecificData');
				dispatch('loadUserSpecificData');
				commit('CHECK_LOGGED_IN');
			}
			return
		},
		//Create a Customer Signin Method
		//Employee Signin Method
		signIn({ dispatch, commit, state }, credentials) {
			console.log("credentials", credentials);
			axios.post("/django/login/", credentials)
				.then(async response => {
					console.log("response", response);
					if(response.status === 200) {
						// f7.dialog.alert("Login was Successful").open();
						f7.dialog.progress("Please wait while we load your data").open();
						console.log("Login response.data", response.data);
						commit("SET_LOGIN_DETAILS", response.data);						

						let EEUSerID = await dispatch('getEmployeeProfileByUserID', response.data.id);
						console.log("EEUSerID", EEUSerID);
						commit("SET_LOGIN_PROFILE", EEUSerID.data);

						dispatch('loadAllData');
						dispatch('loadCompanySpecificData');
						dispatch('loadUserSpecificData');
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
						commit("SET_LOGIN_DETAILS", response.data);
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
						f7.preloader.hide();
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
						f7.preloader.hide();

						return resolve(response);

					}).catch(error => {
						f7.preloader.hide();
						error.type = "Manager Approval";
						dispatch("updateNotification", error);

						return resolve(error);
					});
				}).catch(error => {
					f7.preloader.hide();
	
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
			signOut({ commit, dispatch }) {
				axios.options("/django/logout/")
				.then(response => {
					console.log("signOut response", response);
					commit('LOGOUT_USER');
					// Clear User and Employee data in Users module
					commit('CLEAR_USER_DATA');
					//Set Notification
					response.type = "Logout User";
					dispatch('updateNotification', response);
					
				});
			},
			async loadCompanySpecificData({ commit, dispatch, state, rootState }) {
				//Get a list of company specific details: departments, employees, postions, hours, etc.
				console.log('loadCompanyData rootState', rootState);
				await commit('SET_PLATFORM_INFO', rootState);
				console.log('loadCompanyData state.platformInfo', state.platformInfo);
				dispatch("getEmployeeList", state.platformInfo);
				dispatch("getEmployeePositions", state.platformInfo);
				dispatch("getCompanyDepartments", state.platformInfo);
				dispatch("GETBusinessHours", state.platformInfo);
				dispatch("getAttendanceSettings", state.platformInfo);
				dispatch("getHolidays", state.platformInfo);

			},
			async loadUserSpecificData({ commit, dispatch, state, rootState }) {
				//Get a list of company specific details: departments, employees, postions, hours, etc.
				console.log('loadUserata rootState', rootState);
				await commit('SET_PLATFORM_INFO', rootState);
				console.log('loadUserData state.platformInfo', state.platformInfo);
				dispatch("getEmployeeList", state.platformInfo);
				dispatch("getCreditCardList", state.platformInfo);
				dispatch("getACHAccountList", state.platformInfo);
				dispatch("getNewShippingList", state.platformInfo);
				f7.dialog.close();


			},
			async loadAllData({ commit, dispatch, state, rootState }) {
				//Get a list of all Hierarchy data: Datacom, Partner, Merchant, Vendors
				console.log('loadAllData rootState', rootState);
				await commit('SET_PLATFORM_INFO', rootState);
				console.log('loadAllData state.platformInfo', state.platformInfo);
				dispatch("getDatacomList");
				if(state.platformInfo.datacom != null) {
					dispatch("getPartnerList");
					dispatch("getCompanyList");
					dispatch("getVendorList");
				}
				else if (state.platformInfo.partner != null) {
					dispatch("getCompanyList", state.platformInfo);
					dispatch("getVendorList", state.platformInfo);
				}
				else if (state.platformInfo.company != null) {
					dispatch("getVendorList", state.platformInfo);
				}
				else if (state.platformInfo.vendor != null) {
					return
				}
			}
	},
	getters: {
		isLoggdIn(state) {
			return !!state.user;
		}
	}
};
