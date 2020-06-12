import axios from "axios";
import { f7 } from "framework7-vue";

export const VTHPP = {
	namespace: true,
	name: "vthpp",
	state: {
		creditCardList: [],
		achAccountList: [],
		ccErrorCodes: [
			{
				code: "AA",
				message: "APPROVAL",
				definition: "Approved"
			},
			{
				code: "AA",
				message: "APPROBAT",
				definition: "Approved (French)"
			},
			{
				code: "AP",
				message: "PARTIAL APPROVAL",
				definition: "Approved for a Partial Amount"
			},
			{
				code: "N7",
				message: "DECLINE CVV2",
				definition: "Do not honor due to CVV2 mismatch\\failure"
			},
			{
				code: "NC",
				message: "PICK UP CARD",
				definition: "Pick up card"
			},
			{
				code: "ND",
				message: "AMOUNT ERROR",
				definition: "Tran Amount Error"
			},
			{
				code: "ND",
				message: "AMT OVER SVC LMT",
				definition: "Amount is more than established service limit"
			},
			{
				code: "ND",
				message: "APPL TYPE ERROR",
				definition: "Call support for help with this error"
			},
			{
				code: "ND",
				message: "CANNOT CONVERT",
				definition: "Check is ok, but cannot convert. Do Not Honor"
			},
			{
				code: "ND",
				message: "DECLINED",
				definition: "Do Not Honor"
			},
			{
				code: "ND",
				message: "DECLINED T4",
				definition: "Do Not Honor. Failed negative check, unpaid items"
			},
			{
				code: "ND",
				message: "DECLINED-HELP 9999",
				definition: "System Error"
			},
			{
				code: "ND",
				message: "DUP CHECK NBR",
				definition: "Duplicate Check Number"
			},
			{
				code: "ND",
				message: "EXPIRED CARD",
				definition: "Expired Card"
			},
			{
				code: "ND",
				message: "INCORRECT PIN",
				definition: "Invalid PIN"
			},
			{
				code: "ND",
				message: "INVALID CARD",
				definition: "Invalid Card"
			},
			{
				code: "ND",
				message: "INVALID CAVV",
				definition: "Invalid Cardholder Authentication Verification Value"
			},
			{
				code: "ND",
				message: "INVALID TERM ID",
				definition: "Invalid Terminal ID"
			},
			{
				code: "ND",
				message: "INVLD R/T NBR",
				definition: "Invalid Routing/Transit Number"
			},
			{
				code: "ND",
				message: "INVLD TERM ID 1",
				definition: "Invalid Merchant Number"
			},
			{
				code: "ND",
				message: "INVLD TERM ID 2",
				definition: "Invalid SE Number"
			},
			{
				code: "ND",
				message: "INVLD VOID DATA",
				definition: "Invalid Data Submitted for Void Transaction"
			},
			{
				code: "ND",
				message: "MAX MONTHLY VOL",
				definition: "This transaction would go over the maximum monthly volume"
			},
			{
				code: "ND",
				message: "MICR ERROR",
				definition: "MICR Read Error"
			},
			{
				code: "ND",
				message: "MUST SETTLE MMDD",
				definition: "Must settle, open batch is over 7 days old"
			},
			{
				code: "ND",
				message: "NETWORK ERROR",
				definition: "General System Error"
			},
			{
				code: "ND",
				message: "PLEASE RETRY",
				definition: "Please Retry/Reenter Transaction"
			},
			{
				code: "ND",
				message: "RECORD NOT FOUND",
				definition: "Record not on the network"
			},
			{
				code: "ND",
				message: "REQ. EXCEEDS BAL.",
				definition: "Req. exceeds balance"
			},
			{
				code: "ND",
				message: "SEQ ERR PLS CALL",
				definition: "Call support for help with this error"
			},
			{
				code: "ND",
				message: "SERV NOT ALLOWED",
				definition: "Invalid request"
			},
			{
				code: "ND",
				message: "TOO MANY CHECKS",
				definition: "Too many checks (Over Limit)"
			},
			{
				code: "NR",
				message: "CALL AUTH. CENTER",
				definition: "Refer to Issuer"
			},
			{
				code: "N/A",
				message: "SUCCESS",
				definition: "For successfully added, updated, deleted recurring or installment transactions"
			},
			{
				code: "N/A",
				message: "ERROR",
				definition: "Recurring or installment transactions could not update."
			}
		]
	},
	mutations: {
		PUSH_NEW_CREDIT_CARD(state, payload) {
			state.creditCardList.push(payload);
		},
		SET_CREDIT_CARD_LIST(state, payload) {
			state.creditCardList = payload;
		},
		PUSH_NEW_ACH_ACCOUNT(state, payload) {
			state.achAccountList.push(payload);
		},
		SET_ACH_ACCOUNT_LIST(state, payload) {
			state.achAccountList = payload;
		}
	},
	actions: {
		addCreditCard({ commit, dispatch, rootState }, form) {
			console.log("addCreditCard form", form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch("updateNotification", error);
					return reject(error);
				}
				axios
					.post("/django/creditcard/", form)
					.then((response) => {
						if (response.status === 201) {
							response.type = "Add Credit Card";
							commit("PUSH_NEW_CREDIT_CARD", response.data);
							dispatch("updateNotification", response);
							return resolve(response.data);
						}
					})
					.catch((error) => {
						f7.preloader.hide();
						error.response.type = "Add Credit Card";
						dispatch("updateNotification", error.response);

						return resolve(error);
					});
			}).catch((error) => {
				return error;
			});
		},
		addACHAccount({ commit, dispatch, rootState }, form) {
			console.log("addACHAccount form", form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch("updateNotification", error);
					return reject(error);
				}
				axios
					.post("/django/bankacct/", form)
					.then((response) => {
						if (response.status === 201) {
							response.type = "Add Bank Account";
							commit("PUSH_NEW_ACH_ACCOUNT", response.data);
							dispatch("updateNotification", response);
							return resolve(response.data);
						}
					})
					.catch((error) => {
						f7.preloader.hide();
						error.response.type = "Add Bank Account";
						dispatch("updateNotification", error.response);

						return resolve(error);
					});
			}).catch((error) => {
				return error;
			});
		},
		getCreditCardList({ commit, dispatch, rootState }, payload) {
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch("updateNotification", error);
					return reject(error);
				}
				var url = "";
				if (payload != undefined) {
					url = payload.url;
				}
				axios
					.get("/django/creditcard/" + url, rootState.Auth.axiosHeader)
					.then((response) => {
						if (response.status === 200) {
							response.type = "Retrieve Credit Card List";
							commit("SET_CREDIT_CARD_LIST", response.data);
							dispatch("updateNotification", response);
							return resolve(response.data);
						}
					})
					.catch((error) => {
						f7.preloader.hide();
						error.response.type = "Retrieve Credit Card List";
						dispatch("updateNotification", error.response);

						return resolve(error);
					});
			}).catch((error) => {
				return error;
			});
		},
		getACHAccountList({ commit, dispatch, rootState }, payload) {
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch("updateNotification", error);
					return reject(error);
				}
				var url = "";
				if (payload != undefined) {
					url = payload.url;
				}
				axios
					.get("/django/bankacct/" + url, rootState.Auth.axiosHeader)
					.then((response) => {
						if (response.status === 200) {
							response.type = "Retrieve Bank Account List";
							commit("SET_ACH_ACCOUNT_LIST", response.data);
							dispatch("updateNotification", response);
							return resolve(response.data);
						}
					})
					.catch((error) => {
						f7.preloader.hide();
						error.response.type = "Retrieve Bank Account List";
						dispatch("updateNotification", error.response);

						return resolve(error);
					});
			}).catch((error) => {
				return error;
			});
		},
		updateCreditCard({ dispatch, commit }, form) {
			return new Promise((resolve, reject) => {
				axios
					.post("/django/inventory/", form)
					.then((response) => {
						if (response.status === 201) {
							response.type = "Create Inventory";
							commit("PUSH_NEW_INVENTORY", response.data);
							dispatch("updateNotification", response);
							return resolve(response.data);
						}
					})
					.catch((error) => {
						f7.preloader.hide();
						error.response.type = "Create Inventory";
						dispatch("updateNotification", error.response);

						return resolve(error);
					});
			}).catch((error) => {
				return error;
			});
		},
		deleteCreditCard({ dispatch, commit }, form) {
			return new Promise((resolve, reject) => {
				axios
					.post("/django/inventory/", form)
					.then((response) => {
						if (response.status === 201) {
							response.type = "Create Inventory";
							commit("PUSH_NEW_INVENTORY", response.data);
							dispatch("updateNotification", response);
							return resolve(response.data);
						}
					})
					.catch((error) => {
						f7.preloader.hide();
						error.response.type = "Create Inventory";
						dispatch("updateNotification", error.response);

						return resolve(error);
					});
			}).catch((error) => {
				return error;
			});
		}
	},
	getters: {}
};
