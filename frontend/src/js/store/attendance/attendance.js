
import axios from "axios";
import { f7 } from 'framework7-vue';

import Days from './business-hours/days';
import Holidays from './business-hours/holidays';


export const Attendance = {
	namespace: true,
	name: "attendance",
	state: {
		payrollCycleList: [],
		attendanceTypeList: ['Normal', 'Normal Overtime', 'Weekend', 'Weekend Overtime', 'Holiday Overtime'],
		shiftList: [],
		attendanceSettingsObj: {},
		operatingHoursList: [],
		holidaysList: [],
		holidayProfileOriginal: {},
		holidayProfile: {},
		dayHours: {},
		dayHoursOriginal: {},
		// hoursOfOperation: {},
		hoursOfOperation: {
			switchOpen: 'Open',
			switchClosed: 'Closed',
			placeholderOpens: 'Opens',
			placeholderCloses: 'Closes',
			addHours: 'Add hours',
			open: {
				invalidInput: 'Please enter an opening time in the 12 hour format (ie. 08:00 AM). You may also enter "24 hours".',
				greaterThanNext: 'Please enter an opening time that is before the closing time.',
				lessThanPrevious: 'Please enter an opening time that is after the previous closing time.',
				midnightNotLast: "Midnight can only be selected for the day's last closing time."
			},
			close: {
				invalidInput: 'Please enter a closing time in the 12 hour format (ie. 05:00 PM). You may also enter "24 hours" or "Midnight".',
				greaterThanNext: 'Please enter a closing time that is after the opening time.',
				lessThanPrevious: 'Please enter a closing time that is before the next opening time.',
				midnightNotLast: "Midnight can only be selected for the day's last closing time."
			},
			t24hours: '24 hours',
			midnight: 'Midnight',
			days: {
				monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
			}
		},


	},
	mutations: {
		PUSH_PAYROLL_CYCLE_LIST(state, payload) {
			state.payrollCycleList.push(payload);
		},
		PUSH_SHIFT_LIST(state, payload) {
			state.shiftList.push(payload);
		},
		SET_SHIFT_LIST(state, payload) {
			state.shiftList = payload;
		},
		SET_HOURS_OPERATION_PROFILE(state, payload) {
			state.operatingHoursList = payload;
			// console.log('payload', payload);
			//Set StoreHours Holiday Object
			var day = JSON.parse(JSON.stringify(Days));
			if(payload != null || payload.length != 0) {
				for(let key in payload) {
					// console.log('payload[key]', payload[key]);
					var dayList = [];

					var obj = {
						open: payload[key].open || '',
						close: payload[key].close || '',
						id: payload[key].id,
						isOpen: payload[key].isOpen,
					}
					console.log('obj', obj);
					dayList.push(obj);
					var dayName = payload[key].day_of_week;
					day[dayName] = dayList;
				}
				// console.log('day', day);
				// console.log('dayList', dayList);
				state.dayHours = JSON.parse(JSON.stringify(day));
				// console.log('state.dayHours', state.dayHours);
				state.dayHoursOriginal = JSON.parse(JSON.stringify(day));
				// console.log('state.dayHoursOriginal', state.dayHoursOriginal);
			}

		},
		SET_ATTENDANCE_SETTINGS_PROFILE(state, payload) {
			if(payload.length === 0 || payload == null) {
				return
			} else {
				state.attendanceSettingsObj = payload[0];
			}
		},
		PUSH_HOLIDAY_LIST(state, payload) {
			state.holidaysList.push(payload);
		},
		SET_HOLIDAY_LIST(state, payload) {	
			console.log('SET_HOLIDAY_LIST');
			state.holidaysList = payload;
			console.log('SET_HOLIDAY_LIST payload', payload);
			//Set Settings for Store Hours
			var hoursOperation =
			{
				switchOpen: 'Open',
				switchClosed: 'Closed',
				placeholderOpens: 'Opens',
				placeholderCloses: 'Closes',
				addHours: 'Add hours',
				open: {
					invalidInput: 'Please enter an opening time in the 12 hour format (ie. 08:00 AM). You may also enter "24 hours".',
					greaterThanNext: 'Please enter an opening time that is before the closing time.',
					lessThanPrevious: 'Please enter an opening time that is after the previous closing time.',
					midnightNotLast: "Midnight can only be selected for the day's last closing time."
				},
				close: {
					invalidInput: 'Please enter a closing time in the 12 hour format (ie. 05:00 PM). You may also enter "24 hours" or "Midnight".',
					greaterThanNext: 'Please enter a closing time that is after the opening time.',
					lessThanPrevious: 'Please enter a closing time that is before the next opening time.',
					midnightNotLast: "Midnight can only be selected for the day's last closing time."
				},
				t24hours: '24 hours',
				midnight: 'Midnight',
				days: {
					monday: 'Monday',
					tuesday: 'Tuesday',
					wednesday: 'Wednesday',
					thursday: 'Thursday',
					friday: 'Friday',
					saturday: 'Saturday',
					sunday: 'Sunday',
				}
			}

			//Set StoreHours Holiday Object
			var holiday = {};
			for(let key in payload) {
				console.log('payload[key]', payload[key]);
				var holidayList = [];

				const obj = {
					open: payload[key].open_time || '',
					close: payload[key].close_time || '',
					id: payload[key].id,
					isOpen: payload[key].is_open,
				}
				console.log('obj', obj);

				holidayList.push(obj);
				const holidayName = payload[key].name;
				console.log('holidayName', holidayName);
				const camelName = holidayName.split(" ").join("");
				console.log('camelName', camelName);

				//Complete holidayProfile Dataset
				holiday[camelName] = holidayList;
				console.log('holiday', holiday);

				//complete the holiday Localization Settings
				hoursOperation.days[camelName] = holidayName;

				// Object.defineProperty(hoursOperation.days, camelName, {
				// 	value: holidayName,
				// 	writable: false
				// });
			}
			console.log('hoursOperation', hoursOperation);
			console.log('holidayList', holidayList);
			console.log('holiday', holiday);
			state.holidayProfile = holiday;
			state.holidayProfileOriginal = JSON.parse(JSON.stringify(holiday));
			console.log('state.holidayProfile', state.holidayProfile);
			console.log('state.holidayProfileOriginal', state.holidayProfileOriginal);

			state.hoursOfOperation = JSON.parse(JSON.stringify(hoursOperation));
			console.log('state.hoursOfOperation', state.hoursOfOperation);
		}
	},
	actions: {
		POSTAttendanceSettings({ commit, dispatch, rootState }, form) {
			console.log('POSTAttendanceSettings form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/attendance-settings/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Attendance Settings";
						commit('SET_ATTENDANCE_SETTINGS_PROFILE', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Add Attendance Settings";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		addPayrollCycle({ commit, dispatch, rootState }, form) {
			console.log('addPayrollCycle form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/pay-cycles/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Payroll Cycle";
						commit('PUSH_PAYROLL_CYCLE_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Add Payroll Cycle";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		addPayrollCycleRecurrence({ commit, dispatch, rootState }, form) {
			console.log('addPayrollCycleRecurrence form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/pay-cycle-recurrence/", form).then(response => {
					if (response.status === 201) {
						console.log('response', response);
						response.type = "Add Payroll Cycle Recurrence";
						commit('PUSH_PAYROLL_CYCLE_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Add Payroll Cycle Recurrence";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		addShift({ commit, dispatch, rootState }, form) {
			console.log('addShift form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/shifts/", form).then(response => {
					if (response.status === 201) {
						console.log('response', response);
						response.type = "Add Shift";
						commit('PUSH_SHIFT_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Add Shift";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		POSTBusinessHours({ commit, dispatch, rootState }, form) {
			console.log('POSTBusinessHours form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/operating-hours/", form).then(response => {
					if (response.status === 201) {
						console.log('response', response);
						response.type = "Add Operating Hours";
						dispatch('GETBusinessHours');
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.type = "Add Operating Hours";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		addHoliday({ commit, dispatch, rootState }, form) {
			console.log('addHoliday form', form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/holidays/", form).then(response => {
					if (response.status === 201) {
						response.type = "Add Holiday";
						dispatch('getHolidays');
						// commit('PUSH_HOLIDAY_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					console.log('error', error);
					console.log('error', error.response);
					if(error) {
						error.response.type = "Add Holiday";
						dispatch('updateNotification', error);
						if(error.response.status === 500) {
							if(error.response.data.slice(0,200).includes("value violates unique constraint")) {
								f7.dialog.alert("Name is already taken").open();
							}
						}
					}
					return resolve(error);
				});
			}).catch(error => {
				console.log('error', error);
				return error;
			});
		},
		//GET Methods
		GETAttendanceSettings({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("GETAttendanceSettings error", error);
					return reject(error);
				}
				console.log("GETAttendanceSettings", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/attendance-settings/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_ATTENDANCE_SETTINGS_PROFILE', response.data);
						response.type = "Retrieve Company Shifts";
						// dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Company Shifts";
					dispatch('updateNotification', error);

				});
			});
		},
		getCompanyShifts({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("getCompanyShifts error", error);
					return reject(error);
				}
				console.log("getCompanyShifts", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				console.log("getCompanyShifts");
				axios.get("/django/shifts/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_SHIFT_LIST', response.data);
						response.type = "Retrieve Company Shifts";
						// dispatch('updateNotification', response);
					}
				}).catch(error => {
					error.type = "Retrieve Company Shifts";
					dispatch('updateNotification', error);

				});
			});
		},
		async GETBusinessHours({ dispatch, commit, rootState }, payload) {
			//When making a GET request from another Action, I need to pass it through the Universal Mixin First
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("GETBusinessHours error", error);
					return reject(error);
				}
				console.log("GETBusinessHours", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/operating-hours/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_HOURS_OPERATION_PROFILE', response.data);
						response.type = "Retrieve Hours of Operation";
						// dispatch('updateNotification', response);
						return resolve(response.data[0])
					}
				}).catch(error => {
					error.type = "Retrieve Hours of Operation";
					dispatch('updateNotification', error);

				});
			});
		},
		getHolidays({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("getHolidays error", error);
					return reject(error);
				}
				console.log("getHolidays", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/holidays/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_HOLIDAY_LIST', response.data);
						response.type = "Retrieve Holidays";
						// dispatch('updateNotification', response);
						return resolve(response.data[0])
					}
				}).catch(error => {
					error.type = "Retrieve Holidays";
					dispatch('updateNotification', error);

				});
			});
		},
		//Updating Models
		PATCHAttendanceSettings({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCH Attendance Settings", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHAttendanceSettings error", error);
					return reject(error);
				}
				axios.patch("/django/attendance-settings/" + form.id + "/", form).then(response => {
					console.log("PATCH Attendance Settings", response);
					if (response.status === 200) {
						response.type = "Update Attendance Settings";
						dispatch('updateNotification', response);
						dispatch('GETAttendanceSettings');

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
		PATCHBusinessHours({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCH Hours Of Operation", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHBusinessHours error", error);
					return reject(error);
				}
				axios.patch("/django/operating-hours/" + form.id + "/", form).then(response => {
					console.log("PATCH Hours of Operation", response);
					if (response.status === 200) {
						response.type = "Update Hours of Operation";
						dispatch('updateNotification', response);
						dispatch('GETBusinessHours');

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Update Hours of Operation";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		PATCHHolidays({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCH Hours Of Operation", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHHolidays error", error);
					return reject(error);
				}
				axios.patch("/django/holidays/" + form.id + "/", form).then(response => {
					console.log("PATCH Holidays", response);
					if (response.status === 200) {
						response.type = "Update Holidays";
						dispatch('updateNotification', response);
						getHolidays

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Update Holidays";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//Delete Methods
		DELETEBusinessHours({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("DELETE Hours Of Operation", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("DELETEBusinessHours error", error);
					return reject(error);
				}
				axios.delete("/django/operating-hours/" + form.id).then(response => {
					console.log("DELETE Hours of Operation", response);
					if (response.status === 204) {
						response.type = "Delete of Operation";
						dispatch('updateNotification', response);
						dispatch('GETBusinessHours');

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete of Operation";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		// testAction({ dispatch, commit, rootState }, payload) {
		// 	console.log("testAction input", payload);
		// 	const axiosObject = {
		// 		childDomain: "operating-hours",
		// 		url: "?datacom__1=1",
		// 		setCommit: 'SET_HOURS_OPERATION_LIST',
		// 		responseType: "Retrieve Hours of Operation"
		// 	};
		// 	GET(axiosObject)
		// 	.then(res => {
		// 		console.log("Attendance response from GET import", res);
		// 		return res;
		// 	});
		// }

	},
	getters: {
		HAS_OPERATING_HOURS(state) {
			if(Object.keys(state.dayHours).length != 0) {
				return true
			}
			return false
		},
		HAS_HOLIDAYS(state) {
			if(Object.keys(state.holidayProfile).length != 0) {
				return true
			}
			return false
		},
		HAS_ATTENDANCE_SETTINGS(state) {
			if(Object.keys(state.attendanceSettingsObj).length != 0) {
				return true
			}
			return false
		},
		getHolidayList(state) {
			return state.holidaysList;
		},
		GETTER_BUSINESS_DAYS(state) {
			return JSON.parse(JSON.stringify(state.hoursDays));
		}
		
	}
};
