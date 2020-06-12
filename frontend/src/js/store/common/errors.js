import { f7 } from "framework7-vue";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Errors = {
	namespace: true,
	state: {
		//Main Notificaiton
		updateNotification: null,
		//Login Errors
		loginErrorHandle: false,
		loginErrorData: [],
		//Inventory Errors
		invErrorHandle: false,
		invErrorData: [],
		//Datacom Errors
		datacomErrorHandle: false,
		datacomErrorData: [],
		//Partner Errors
		partnerErrorHandle: false,
		partnerErrorData: [],
		//Company Errors
		companyErrorHandle: false,
		companyErrorData: [],
		//Users Errors
		userErrorHandle: false,
		userErrorData: [],
		//Employee Errors
		employeeErrorHandle: false,
		employeeErrorData: [],
		//Customer Errors
		customerErrorHandle: false,
		customerErrorData: [],
		//Warehouse Errors
		warehouseErrorHandle: false,
		warehouseErrorData: [],
		//SalesOffice Errors
		salesOfficeErrorHandle: false,
		salesOfficeErrorData: [],
		//Vendor Errors
		vendorErrorHandle: false,
		vendorErrorData: []
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
		//Error Handing for Companies
		SET_COMPANY_ERRORS(state, payload) {
			state.companyErrorHandle = true;
			state.companyErrorData = Object.entries(payload);
		},
		//Error Handing for User and Employees
		SET_USER_ERRORS(state, payload) {
			state.userErrorHandle = true;
			state.userErrorData = Object.entries(payload);
		},
		SET_CUSTOMER_USER_ERRORS(state, payload) {
			state.customerErrorHandle = true;
			state.customerErrorData = Object.entries(payload);
		},
		SET_EE_ERRORS(state, payload) {
			state.userErrorHandle = true;
			state.employeeErrorData = Object.entries(payload);
		},

		//Reset All Errors
		RESET_ERRORS(state, payload) {
			state.updateNotification = null;
			state.loginErrorHandle = false;
			state.loginErrorData = [];
			state.invErrorHandle = false;
			state.invErrorData = [];
			state.datacomErrorHandle = false;
			state.datacomErrorData = [];
			state.partnerErrorHandle = false;
			state.partnerErrorData = [];
			state.companyErrorHandle = false;
			state.companyErrorData = [];
			state.userErrorHandle = false;
			state.userErrorData = [];
			state.employeeErrorHandle = false;
			state.employeeErrorData = [];
			state.customerErrorHandle = false;
			state.customerErrorData = [];
			state.vendorErrorHandle = false;
			state.vendorErrorData = [];
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
				//Login Errors
				if (payload.type === "Login Unsuccessful") {
					commit("SET_LOGIN_ERRORS", payload.data);
				}
				//Inventory Errors
				if (payload.type === "Create Inventory") {
					commit("SET_INV_ERRORS", payload.data);
				}
				//Company Errors
				if (payload.type === "Create Company") {
					commit("SET_COMPANY_ERRORS", payload.data);
				}
				//User Errors
				if (payload.type === "Create User") {
					commit("SET_USER_ERRORS", payload.data);
				}
				if (payload.type === "Create Customer") {
					commit("SET_CUSTOMER_USER_ERRORS", payload.data);
				}
				//Employee Errors
				if (payload.type === "Create Employee") {
					commit("SET_EE_ERRORS", payload.data);
				}
				if (payload.type === "Retrieve Employee Profile") {
					commit("SET_EE_ERRORS", payload.data);
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
	getters: {}
};
