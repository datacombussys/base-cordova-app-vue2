import apiRoutes from '@/js/api-routes';

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
		holidayList: [],
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
			console.log('ShiftList payload', payload);
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
			state.holidayList.push(payload);
		},
		SET_HOLIDAY_LIST(state, payload) {	
			console.log('SET_HOLIDAY_LIST');
			state.holidayList = payload;
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
		//Create Methods
    async POSTAttendanceSettings({commit, dispatch, rootState}, payload) {
			let endpoint = 'attendance-settings/';
      let type = 'Create New Attendance Setting';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTAttendanceSettings response', response);
			commit('SET_ATTENDANCE_SETTINGS_PROFILE', response);
		},
		async POSTPayrollCycle({commit, dispatch, rootState}, payload) {
			let endpoint = 'pay-cycles/';
      let type = 'Create Payroll Cycle';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTPayrollCycle response', response);
			commit('PUSH_PAYROLL_CYCLE_LIST', response);
		},
		async POSTPayCycleRecurrence({commit, dispatch, rootState}, payload) {
			let endpoint = 'pay-cycle-recurrence/';
      let type = 'Create New Payroll Cycle Recurrence Rule';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTPayCycleRecurrence response', response);
			commit('PUSH_PAYROLL_CYCLE_LIST', response);
		},
		async POSTShift({commit, dispatch, rootState}, payload) {
			let endpoint = 'shifts/';
      let type = 'Create New Shift';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTShift response', response);
			commit('PUSH_SHIFT_LIST', response);
		},
		async POSTBusinessHours({commit, dispatch, rootState}, payload) {
			let endpoint = 'operating-hours/';
      let type = 'Create Business Hours';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTBusinessHours response', response);
			dispatch('GETBusinessHours');
		},
		async POSTHoliday({commit, dispatch, rootState}, payload) {
			let endpoint = 'holidays/';
      let type = 'Create Company Holiday';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTHoliday response', response);
			dispatch('GETHolidays');
		},
		
		

    //GET List Methods
    async GETAttendanceSettings({commit, dispatch, rootState}, payload) {
			let endpoint = 'attendance-settings/';
      let type = 'Get Attendance Settings';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETAttendanceSettings response', response);
			commit('SET_ATTENDANCE_SETTINGS_PROFILE', response.data);
		},
		async GETCompanyShifts({commit, dispatch, rootState}, payload) {
			let endpoint = 'shifts/';
      let type = 'Get Company Shifts';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETCompanyShifts response', response);
			commit('SET_SHIFT_LIST', response.data);
		},
		async GETBusinessHours({commit, dispatch, rootState}, payload) {
			let endpoint = 'operating-hours/';
      let type = 'Get Business Hours';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETBusinessHours response', response);
			commit('SET_HOURS_OPERATION_PROFILE', response.data);
		},
		async GETHolidays({commit, dispatch, rootState}, payload) {
			let endpoint = 'holidays/';
      let type = 'Get Company Holidays';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETHolidays response', response);
			commit('SET_HOLIDAY_LIST', response.data);
		},
    //GET Selected Profile by Id
			//Not implemented yet
			
		//GET Selected Profile by Filter
			//Not implemented yet
   
    //PATCH Profile
    async PATCHAttendanceSettings({commit, dispatch, rootState}, payload) {
			let endpoint = 'attendance-settings/';
      let type = 'Update Attendance Settings';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHAttendanceSettings response', response);
			dispatch('GETAttendanceSettings');
		},
		async PATCHBusinessHours({commit, dispatch, rootState}, payload) {
			let endpoint = 'operating-hours/';
      let type = 'Update Business Hours';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHBusinessHours response', response);
			dispatch('GETBusinessHours');
		},
		async PATCHHolidays({commit, dispatch, rootState}, payload) {
			let endpoint = 'holidays/';
      let type = 'Update Company Holidays';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHHolidays response', response);
			dispatch('GETHolidays');
		},
		async PATCHAttendanceSettings({commit, dispatch, rootState}, payload) {
			let endpoint = 'attendance-settings/';
      let type = 'Update Attendance Settings';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHAttendanceSettings response', response);
			dispatch('GETAttendanceSettings');
		},
		
    //PATCHDelete Profile Methods
    async PATCHDeleteBusinessHours({commit, dispatch, rootState}, payload) {
			let endpoint = 'operating-hours/';
      let type = 'Delete Business Hours';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHBusinessHours response', response);
			dispatch('GETBusinessHours');
		},
		async PATCHDeleteShift({commit, dispatch, rootState}, payload) {
			let endpoint = 'shifts/';
      let type = 'Delete Company Shift';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHShift response', response);
			console.log('GETCompanyShifts');
    },

	},
	getters: {
		HAS_OPERATING_HOURS(state) {
			if(Object.keys(state.dayHours).length === 0 || state.dayHours == null) {
				return false
			}
			return true
		},
		HAS_HOLIDAYS(state) {
			if(Object.keys(state.holidayProfile).length === 0 || state.holidayProfile == null) {
				return false
			}
			return true
		},
		HAS_ATTENDANCE_SETTINGS(state) {
			if(Object.keys(state.attendanceSettingsObj).length === 0 || state.attendanceSettingsObj == null) {
				return false
			}
			return true
		},
		GET_HOLIDAY_LIST(state) {
			return state.holidayList;
		},
		GET_HOLIDAY_LIST_LENGTH(state) {
			return state.holidayList.length;
		},
		GETTER_BUSINESS_DAYS(state) {
			return JSON.parse(JSON.stringify(state.hoursDays));
		},
		GET_SHIFT_LIST(state) {
			return state.shiftList;
		},
		GET_SHIFT_LENGTH(state) {
			return state.shiftList.length;
		}
		
	}
};
