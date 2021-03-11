import Vue from "vue";
import axios from "axios"
import { errorCodes } from "@/js/elavon/error-codes"


export const ConvergeSDK = {
	namespace: true,
	name: "convergeSDKStore",
	state: {
		//CONVERGE SDK PINPAD ONLY
		environmentInfo: null,
		IPP320Installed: false,
		activeDevice: {},
		openGatewayResponse: {},
		paymentGatewayId: "",
		//Init PinPad
		startCardReaderSearch: {},
		cardReaderSearchResults: {},
		cardReaderInfo: {},
		deviceStatusOnReader: {},
		deviceStatusResults: {},
		startCardReaderReset: {},
		getCardReaderResetStatus: {},
		startCardReaderReboot: {},
		pingCardReaderReboot: {},
		setDeviceConfiguration: {},
		getDeviceConfiguration: {},

		startCardReadOnCardReader: {},
		getCardReadOnCardReader: {},
		
		//SDK Sale
		
		startPaymentSale: {},
		completedPaymentSale: {},
		ccErrorCodes: errorCodes		
	},
	mutations: {
		//Initialize System pinpad
		SET_SDK_ENVIRONMENT(state, payload) {
			state.environmentInfo = payload
		},
		OPEN_GATEWAY_RESPONSE(state, payload) {
			console.log("OPEN_GATEWAY_RESPONSE payload", payload)
			state.openGatewayResponse = {...payload}
			state.paymentGatewayId = payload.data.paymentGatewayCommand.openPaymentGatewayData.paymentGatewayId
		},
		//On Demand Methods
		SET_CARD_READER_SEARCH(state, payload) {
			state.startCardReaderSearch = {...payload}
		},
		SET_CARD_READER_SEARCH_RESULTS(state, payload) {
			console.log("SET_CARD_READER_SEARCH_RESULTS, payload", payload)
			state.cardReaderSearchResults = {...payload}
			console.log("state.cardReaderSearchResults", state.cardReaderSearchResults)
			if(payload.data.cardReadersSearch.completed) {
				// 3) Set device to Active and use this device for all calls moving forward
				state.activeDevice = {...payload.data.cardReadersSearch.cardReaders[0]}
				state.IPP320Installed = true
			}
		},
		SET_CARD_READER_INFO(state, payload) {
			console.log("SET_CARD_READER_INFO, payload", payload)
			state.cardReaderInfo = {...payload}
		},
		START_DEVICE_STATUS(state, payload) {
			console.log("START_DEVICE_STATUS payload", payload)
			state.deviceStatusOnReader = {...payload}
		},
		PING_DEVICE_STATUS(state, payload) {
			console.log("PING_DEVICE_STATUS payload", payload)
			state.deviceStatusResults = {...payload}
		},
		SET_CARD_READER_RESET(state, payload) {
			console.log("SET_CARD_READER_RESET payload", payload)
			state.startCardReaderReset = {...payload}
			console.log("state.startCardReaderReset", state.startCardReaderReset)
		},
		PING_CARD_READER_RESET(state, payload) {
			state.getCardReaderResetStatus = {...payload}
		},
		SET_CARD_READER_REBOOT(state, payload) {
			state.startCardReaderReboot = {...payload}
		},
		PING_CARD_READER_REBOOT(state, payload) {
			state.pingCardReaderReboot = {...payload}
		},
		SET_DEVICE_CONFIGURATION(state, payload) {
			state.setDeviceConfiguration = {...payload}
		},
		GET_DEVICE_CONFIGURATION(state, payload) {
			state.getDeviceConfiguration = {...payload}
		},
		SET_CARD_READER_ON_CARD_READER(state, payload) {
			state.startCardReadOnCardReader = {...payload}
		},
		PING_CARD_READER_ON_CARD_READER(state, payload) {
			state.getCardReadOnCardReader = {...payload}
		},

		//SDK Wizard Transactions
		SET_PAYMENT_SALE(state, payload) {
			state.startPaymentSale = {...payload}
		},
		PING_PAYMENT_SALE(state, payload) {
			state.completedPaymentSale = {...payload}
		},

	},
	actions: {
		//************************************* INITIALIZE SDK *************************************//

		//Init System
		GETSDKEnvironment({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('GETSDKEnvironment response', response);
					response.type = "Get SDK Environment Details"
					commit('SET_SDK_ENVIRONMENT', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("GETSDKEnvironment axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		
		OPENGateway({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('OPENGateway response', response);
					response.type = "Open Gateway"
					commit('OPEN_GATEWAY_RESPONSE', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("OPENGateway axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},

		//************************************* SDK ON-DEMAND TRANSACTIONS *************************************//

		//On-Demand Reader System Search
    STARTReaderSearch({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('startReaderSearch response', response);
					response.type = "Start Pinpad Search"
					commit('SET_CARD_READER_SEARCH', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTReaderSearch axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		GETReaderSearchResults({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('GETReaderSearchResults response', response);
					response.type = "Return Pinpad Search Results"
					commit('SET_CARD_READER_SEARCH_RESULTS', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("GETReaderSearchResults axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		//On-Demand Get Reader Information
		GETReaderInfo({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('GETReaderInfo response', response);
					response.type = "Return Card Reader Info"
					commit('SET_CARD_READER_INFO', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("GETReaderInfo axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		//On-Demand Get Device Status
		STARTDeviceStatus({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('STARTDeviceStatus response', response);
					response.type = "Start Card Reader Reset"
					commit('START_DEVICE_STATUS', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTDeviceStatus axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		PINGDeviceStatus({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('PINGDeviceStatus response', response);
					response.type = "Ping Card Reader Reset"
					commit('PING_DEVICE_STATUS', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("PINGDeviceStatus axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		//On-Demand Reset PinPad
		STARTCardReaderReset({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('STARTCardReaderReset response', response);
					response.type = "Start Card Reader Reset"
					commit('SET_CARD_READER_RESET', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTCardReaderReset axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		PINGCardReaderReset({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('PINGCardReaderReset response', response);
					response.type = "Ping Card Reader Reset"
					commit('PING_CARD_READER_RESET', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("PINGCardReaderReset axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		//On-Demand Pinpad 24 hr Reboot
		STARTCardReaderReboot({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('STARTCardReaderReboot response', response);
					response.type = "Start Card Reader Reboot"
					commit('SET_CARD_READER_REBOOT', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTCardReaderReboot axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		PINGCardReaderReboot({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('PINGCardReaderReboot response', response);
					response.type = "Ping Card Reader Reboot"
					commit('PING_CARD_READER_REBOOT', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("PINGCardReaderReboot axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		//On-Demand Set Configuration of Devices
		STARTSetDeviceConfiguration({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('STARTSetDeviceConfiguration response', response);
					response.type = "Start Device Configuration"
					commit('SET_DEVICE_CONFIGURATION', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTSetDeviceConfiguration axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		//Get Device Configuration
		GETDeviceConfiguration({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('GETDeviceConfiguration response', response);
					response.type = "Get Device Configuration"
					commit('GET_DEVICE_CONFIGURATION', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("GETDeviceConfiguration axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		//On-Demand Capture Card Data
		STARTCardReadOnCardReader({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('STARTCardReadOnCardReader response', response);
					response.type = "Start Card Reader Reset"
					commit('SET_CARD_READER_ON_CARD_READER', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTCardReadOnCardReader axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		PINGCardReadOnCardReader({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('PINGCardReadOnCardReader response', response);
					response.type = "Ping Card Reader Reset"
					commit('PING_CARD_READER_ON_CARD_READER', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("PINGCardReadOnCardReader axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},


		//************************************* SDK WIZARD TRANSACTIONS *************************************//

		STARTPaymentSale({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('STARTPaymentSale response', response);
					response.type = "Start Payment Sale"
					commit('SET_PAYMENT_SALE', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTPaymentSale axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},
		PINGPaymentSale({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				axios.post("https://localhost:9790/rest/command", payload).then(response => {
					console.log('STARTPaymentSale response', response);
					response.type = "Ping for sale response"
					commit('PING_PAYMENT_SALE', response.data);

					return resolve(response)
				}).catch(error => {
					console.log("STARTPaymentSale axios error", error)
					return error;
				});
			}).catch(error => {
				return error;
			})
		},


	},
	getters: {
		RETURN_PAYMENT_GATEWAY_ID(state) {
			return state.paymentGatewayId
		},
		RETURN_startCardReaderSearch_ID(state) {
			if(Object.keys(state.startCardReaderSearch).length != 0) {
				return state.startCardReaderSearch.data.cardReadersSearch.commandId
			} else {
				return null
			}
		},
		RETURN_startDeviceStatusInfo_ID(state) {
			// console.group("RETURN_startDeviceStatusInfo_ID state.deviceStatusOnReader", state.deviceStatusOnReader)
			if(Object.keys(state.deviceStatusOnReader).length != 0) {
				return state.deviceStatusOnReader.data.cardReaderCommand.id
			} else {
				return null
			}
		},
		CARD_READER_RESET_ID(state) {
			// console.group("GETTER CARD_READER_RESET_ID state.startCardReaderReset", state.startCardReaderReset)
			if(Object.keys(state.startCardReaderReset).length != 0) {
				return state.startCardReaderReset.data.cardReaderCommand.id
			} else {
				return null
			}
		},
		RETURN_startCardReadData_ID(state) {
			if(Object.keys(state.startCardReadOnCardReader).length != 0) {
				return state.startCardReadOnCardReader.data.cardReaderCommand.id
			} else {
				return null
			}
		},
		GET_StartCardReaderID(state) {
			console.log("RETURN_REBOOT_ID", state.startCardReaderReboot.data.cardReaderCommand.id)
			state.startCardReaderReboot.data.cardReaderCommand.id
		},
		RETURN_startPaymentTransaction_chanId(state) {
			if(Object.keys(state.startPaymentSale).length != 0) {
				return state.startPaymentSale.data.paymentGatewayCommand.chanId
			} else {
				return null
			}
		}

	}
};
