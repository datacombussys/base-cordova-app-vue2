import { f7 } from "framework7-vue";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Errors = {
	namespace: true,
	state: {

		updateNotification: new Array(),
		loginErrorData: new Array(),
		invErrorData: new Array(),
		datacomErrorData: new Array(),
		newPartnerData: new Array(),
		companyErrorData: new Array(),
		userErrorData: new Array(),
		employeeErrorData: new Array(),
		customerErrorData: new Array(),
		warehouseErrorData: new Array(),
		salesOfficeErrorData: new Array(),
		vendorErrorData: new Array(),
		leadsErrorData: new Array(),
		loginErrorHandle: false,
		invErrorHandle: false,
		datacomErrorHandle: false,
		partnerErrorHandle: false,
		companyErrorHandle: false,
		userErrorHandle: false,
		employeeErrorHandle: false,
		customerErrorHandle: false,
		warehouseErrorHandle: false,
		salesOfficeErrorHandle: false,
		vendorErrorHandle: false,
		leadsErrorHandle: false,
		
	},
	mutations: {
		//Main Subscriber for Toast's and Notifications
		UPDATE_NOTIFICATIONS(state, payload) {
			state.updateNotification = payload;
			console.log("updateNotifications Message Payload in store.js:", payload);
		},
		//Login Errors
		SET_LOGIN_ERRORS(state, payload) {
			state.loginErrorHandle = true;
			state.loginErrorData = Object.entries(payload);
			console.log("state.loginErrorData", state.loginErrorData);
		},
		SET_FORGOT_PW_ERRORS(state, payload) {
			console.log("payload", payload);
			var pushPayload = ["username", [payload]];
			state.loginErrorHandle = true;
			state.loginErrorData.push(pushPayload);
			console.log("state.loginErrorData", state.loginErrorData);
		},
		//Error Handing for Inventory
		SET_INV_ERRORS(state, payload) {
			state.invErrorHandle = true;
			state.invErrorData = Object.entries(payload);
		},
		//Error Handing for Datacom
		SET_DATACOM_ERRORS(state, payload) {
			state.datacomErrorHandle = true;
			state.datacomErrorData = Object.entries(payload);
		},
		//Error Handing for Partners
		// SET_PARTNER_ERRORS(state, payload) {
		// 	// Vue.set
			
		// 	console.log('SET_PARTNER_ERRORS', payload);
		// 	// state.partnerErrorHandle = true;
		// 	console.log('state.partnerErrorHandle', state.partnerErrorHandle);
		// 	// state.partnerErrorData = Object.entries(payload);
		// 	// let entries = Object.entries(payload);
		// 	let entry = [1,2,3,4,5];
		// 	console.log('entry', entry);
		// 	// Vue.set(state.partnerErrorData, 0, entry);
		// 	// state.partnerErrorData.splice(0,1,entries)
		// 	console.log('state.partnerErrorData', state.partnerErrorData);
		// },
		set_partner_Error(state, payload) {
			state.partnerErrorHandle = true;
			let entries = Object.entries(payload);
			state.newPartnerData = entries ;
		},
		//Error Handing for Companies
		SET_COMPANY_ERRORS(state, payload) {
			state.companyErrorHandle = true;
			state.companyErrorData = Object.entries(payload);
		},
		//Error Handing for Vendors
		SET_VENDOR_ERRORS(state, payload) {
			state.vendorErrorHandle = true;
			state.vendorErrorData = Object.entries(payload);
		},
		//Error Handing for Leads
		SET_LEAD_ERRORS(state, payload) {
			state.leadErrorHandle = true;
			state.leadErrorData = Object.entries(payload);
		},
		//Error Handing for SalesOffice
		SET_SALESOFFICE_ERRORS(state, payload) {
			state.salesOfficeErrorHandle = true;
			state.salesOfficeErrorData = Object.entries(payload);
		},
		//Error Handing for Warehouse
		SET_WAREHOUSE_ERRORS(state, payload) {
			state.warehouseErrorHandle = true;
			state.warehouseErrorData = Object.entries(payload);
		},
		//Error Handing for User and Employees
		SET_USER_ERRORS(state, payload) {
			state.userErrorHandle = true;
			state.userErrorData = Object.entries(payload);
		},
		SET_CUSTOMER_ERRORS(state, payload) {
			state.customerErrorHandle = true;
			state.customerErrorData = Object.entries(payload);
		},
		SET_EMPLOYEE_ERRORS(state, payload) {
			state.userErrorHandle = true;
			state.employeeErrorData = Object.entries(payload);
		},

		//Reset All Errors
		RESET_ERRORS(state, payload) {
			state.updateNotification = null;
			state.loginErrorData = new Array();
			state.invErrorData = new Array();
			state.datacomErrorData = new Array();
			state.partnerErrorData = new Array();
			state.companyErrorData = new Array();
			state.salesOfficeErrorData = new Array();
			state.warehouseErrorData = new Array();
			state.leadErrorData = new Array();
			state.userErrorData = new Array();
			state.employeeErrorData = new Array();
			state.customerErrorData = new Array();
			state.vendorErrorData = new Array();
			state.loginErrorHandle = false;
			state.invErrorHandle = false;
			state.datacomErrorHandle = false;
			state.partnerErrorHandle = false;
			state.companyErrorHandle = false;
			state.salesOfficeErrorHandle = false;
			state.warehouseErrorHandle = false;
			state.leadErrorHandle = false;
			state.userErrorHandle = false;
			state.employeeErrorHandle = false;
			state.customerErrorHandle = false;
			state.vendorErrorHandle = false;
			
		}
	},
	actions: {
		updateNotification({ dispatch, commit }, payload) {
			if (payload.status === 200) {
				console.log("The updateNotification action had a status of 200 OK:", payload);
				commit("UPDATE_NOTIFICATIONS", `Successful operation from ${payload.type}`);
			}
			if (payload.status === 201) {
				console.log("The updateNotification action had a status of 201 Created:", payload);
				commit("UPDATE_NOTIFICATIONS", `The ${payload.type} was successfully created.`);
			}
			if (payload.status === 202) {
				console.log("The updateNotification action had a status of 201 Updated:", payload);
				commit("UPDATE_NOTIFICATIONS", `The ${payload.type} was successfully Updated.`);
			}
			if (payload.status === 400) {
				console.log("The updateNotification action had a status of 400 Bad Request:", payload);
				commit(
					"UPDATE_NOTIFICATIONS",
					`The submission to ${payload.type} did not meet the server requirements. ${payload.data.non_field_errors}`
				);
				//Datacom Errors
				if (payload.type === "Create New Datacom") {
					commit("SET_DATACOM_ERRORS", payload.data);
				}
				//Partner Errors
				if (payload.type === "Create New Partner") {
					commit("set_partner_Error", payload.data);
				}
				//Company Errors
				if (payload.type === "Create New Company") {
					commit("SET_COMPANY_ERRORS", payload.data);
				}
				//Vendor Errors
				if (payload.type === "Create New Vendor") {
					commit("SET_VENDOR_ERRORS", payload.data);
				}
				//Lead Errors
				if (payload.type === "Create New Lead") {
					commit("SET_LEAD_ERRORS", payload.data);
				}
				//SalesOffice Errors
				if (payload.type === "Create New Sales Office") {
					commit("SET_SALESOFFICE_ERRORS", payload.data);
				}
				//Warehouse Errors
				if (payload.type === "Create New Warehouse") {
					commit("SET_WAREHOUSE_ERRORS", payload.data);
				}
				
				//User Errors
				if (payload.type === "Create New User") {
					commit("SET_USER_ERRORS", payload.data);
				}
				//Employee Errors
				if (payload.type === "Create New Employee") {
					commit("SET_EMPLOYEE_ERRORS", payload.data);
				}

				//Customer Errors - Need to finish
				if (payload.type === "Create New ustomer") {
					commit("SET_CUSTOMER_ERRORS", payload.data);
				}

				//Login Errors
				if (payload.type === "Login Unsuccessful") {
					commit("SET_LOGIN_ERRORS", payload.data);
				}
				//Inventory Errors - Need to finish
				if (payload.type === "Create Inventory") {
					commit("SET_INV_ERRORS", payload.data);
				}
			}
			if (payload.status === 401) {
				console.log("The updateNotification action had a status of 401 unauthorized:", payload);
				commit(
					"UPDATE_NOTIFICATIONS",
					`You are unauthorized to perform this action. ${payload.type} Please contact your administrator`
				);
			}

			//Login Errors
			//Inventory Errors
			//Company Errors
			//User Errors
			//Employee Errors
			if (payload.status === 403) {
				console.log("The updateNotification action had a status of 403 forbidden:", payload);
				commit(
					"UPDATE_NOTIFICATIONS",
					`The request to ${payload.type} is a forbidden. Please contact your administrator.`
				);
			}
			//Login Errors
			//Inventory Errors
			//Company Errors
			//User Errors
			//Employee Errors
			if (payload.status === 404) {
				console.log("The updateNotification action had a status of 404 Not Found:", payload);
				commit("UPDATE_NOTIFICATIONS", `The request to ${payload.type} was not found. Please try differently.`);
			}
			if (payload.status === 500) {
				console.log(
					"The updateNotification action had a status of 500 Internal Server Error: payload.message",
					payload.message
				);
				commit(
					"UPDATE_NOTIFICATIONS",
					"There was an internal server error. Please try again later or contact support."
				);
			}
			//Login Errors
			//Inventory Errors
			//Company Errors
			//User Errors
			//Employee Errors

			if (payload.status === 502) {
				console.log("The updateNotification action had a status of 500 Bad Gateway Request:", payload);
				commit(
					"UPDATE_NOTIFICATIONS",
					`The server address to: ${payload.type} is not working. Please contact support.`
				);
			}
			if (payload.status === 503) {
				console.log("The updateNotification action had a status of 500 Service Unavailable:", payload);
				commit(
					"UPDATE_NOTIFICATIONS",
					`The service: ${payload.type} is offline or unavailable. Please try again later.`
				);
			}
			if (payload.status === 504) {
				console.log("The updateNotification action had a status of 500 Gateway Timeout:", payload);
				commit(
					"UPDATE_NOTIFICATIONS",
					`The server gateway to:  ${payload.type} is not responding. Please try again later.`
				);
			}
			if (payload.status === 2000) {
				console.log("Custom error Handled. User Not logged in trying to execute a Vuex action:", payload);
				commit("UPDATE_NOTIFICATIONS", `You must be logged in:  ${payload.type}.`);
			}
		}
	},
	getters: {
		GET_DATACOM_ERRORS_LIST(state) {
			return state.datacomErrorData;
		},
		GET_DATACOM_ERRORS_LIST_LENGTH(state) {
			return state.datacomErrorData.length;
		},
		GET_DATACOM_ERROR_HANDLE(state) {
			return state.datacomErrorHandle;
		},
		// GET_PARTNER_ERRORS_LIST(state) {
		// 	return state.partnerErrorData;
		// },
		partnerData(state) {
			return state.newPartnerData;
		},
		GET_PARTNER_ERRORS_LIST_LENGTH(state) {
			return state.partnerErrorData.length;
		},
		GET_PARTNER_ERROR(state) {
			return state.partnerErrorHandle;
		},
		GET_COMPANY_ERRORS_LIST(state) {
			return state.companyErrorData;
		},
		GET_COMPANY_ERROR_HANDLE(state) {
			return state.companyErrorHandle;
		},
		GET_COMPANY_ERRORS_LIST_LENGTH(state) {
			return state.companyErrorData.length;
		},
		GET_VENDOR_ERRORS_LIST(state) {
			return state.vendorErrorData;
		},
		GET_VENDOR_ERRORS_LIST_LENGTH(state) {
			return state.vendorErrorData.length;
		},
		GET_VENDOR_ERROR_HANDLE(state) {
			return state.vendorErrorHandle;
		},
		GET_LEAD_ERRORS_LIST(state) {
			return state.leadErrorData;
		},
		GET_LEAD_ERRORS_LIST_LENGTH(state) {
			return state.leadErrorData.length;
		},
		GET_LEAD_ERROR_HANDLE(state) {
			return state.leadErrorHandle;
		},
		GET_SALESOFFICE_ERRORS_LIST(state) {
			return state.salesOfficeErrorData;
		},
		GET_SALESOFFICE_ERRORS_LIST_LENGTH(state) {
			return state.salesOfficeErrorData.length;
		},
		GET_SALESOFFICE_ERROR_HANDLE(state) {
			return state.salesOfficeErrorHandle;
		},
		GET_WAREHOUSE_ERRORS_LIST(state) {
			return state.warehouseErrorData;
		},
		GET_WAREHOUSE_ERRORS_LIST_LENGTH(state) {
			return state.warehouseErrorData.length;
		},
		GET_WAREHOUSE_ERROR_HANDLE(state) {
			return state.warehouseErrorHandle;
		},
		GET_CUSTOMER_ERRORS_LIST(state) {
			return state.customerErrorData;
		},
		GET_CUSTOMER_ERRORS_LIST_LENGTH(state) {
			return state.customerErrorData.length;
		},
		GET_CUSTOMER_ERROR_HANDLE(state) {
			return state.customerErrorHandle;
		},
		GET_USER_ERRORS_LIST(state) {
			return state.userErrorData;
		},
		GET_USER_ERRORS_LIST_LENGTH(state) {
			return state.userErrorData.length;
		},
		GET_USER_ERROR_HANDLE(state) {
			return state.userErrorHandle;
		},
		GET_EMPLOYEE_ERRORS_LIST(state) {
			return state.employeeErrorData;
		},
		GET_EMPLOYEE_ERRORS_LIST_LENGTH(state) {
			return state.employeeErrorData.length;
		},
		GET_EMPLOYEE_ERROR_HANDLE(state) {
			return state.employeeErrorHandle;
		},
		
	}
};
