
import apiRoutes from '@/js/api-routes';
import { errorCodes } from "@/js/elavon/error-codes"

export const Converge = {
	namespace: true,
	name: "convergeStore",
	state: {
		ccErrorCodes: errorCodes,
		//CONVERGE API ONLY
		merchantData: {
			is_demo: true,
			ssl_test_mode: true,
		},
		terminalSetupResponse: [],
		//Credit Card
		saleResponse: [],
		returnResponse: [],
		voidResponse: [],
		authOnlyResponse: [],
		authOnlyIncrimentResponse: [],
		authCompleteResponse: [],
		authDeleteResponse: [],
		//Debit Card
		binLookupResponse: null,
		//Tip
		updateTipResponse: [],
		//Card Manager
		updateTokenResponse: [],
		createTokenResponse: [],
		queryTokenResponse: [],
		deleteTokenResponse: [],
		//End Of Day
		emailTxnResponse: [],
		queryTxnResponse: [],
		totalResponse: [],
		settleResponse: [],


	},
	mutations: {
		PUSH_SALE_RESPONSE(state, payload) {
			state.saleResponse = payload
		},
		PUSH_TERMINAL_SETUP(state, payload) {
			state.terminalSetupResponse.push(payload)
		},
		PUSH_RETURN_RESPONSE(state, payload) {
			state.returnResponse.push(payload)
		},
		PUSH_VOID_RESPONSE(state, payload) {
			state.voidResponse.push(payload)
		},
		PUSH_AUTHONLY_RESPONSE(state, payload) {
			state.authOnlyResponse.push(payload)
		},
		PUSH_AUTHONLY_INCRIMENT_RESPONSE(state, payload) {
			state.authOnlyIncrimentResponse.push(payload)
		},
		PUSH_AUTHCOMPLETE_RESPONSE(state, payload) {
			state.authCompleteResponse.push(payload)
		},
		PUSH_AUTHDELETE_RESPONSE(state, payload) {
			state.authDeleteResponse.push(payload)
		},
		//Debit Cards
		PUSH_BINLOOKUP_RESPONSE(state, payload) {
			state.binLookupResponse = payload
		},
		//Tip
		PUSH_UPDATETIP_RESPONSE(state, payload) {
			state.updateTipResponse.push(payload)
		},
		//Card Manager
		PUSH_QUERYTOKEN_RESPONSE(state, payload) {
			state.queryTokenResponse.push(payload)			
		},
		PUSH_UPDATETOKEN_RESPONSE(state, payload) {
			state.updateTokenResponse.push(payload)
		},
		PUSH_CREATETOKEN_RESPONSE(state, payload) {
			state.createTokenResponse.push(payload)
		},
		PUSH_DELETETOKEN_RESPONSE(state, payload) {
			state.deleteTokenResponse.push(payload)
		},
		//End Of Day
		PUSH_EMAILTXN_RESPONSE(state, payload) {
			state.emailTxnResponse.push(payload)
		},
		PUSH_QUERYTXN_RESPONSE(state, payload) {
			state.queryTxnResponse.push(payload)
		},
		PUSH_TOTALS_RESPONSE(state, payload) {
			state.totalResponse.push(payload)
		},
		PUSH_SETTLE_RESPONSE(state, payload) {
			state.settleResponse.push(payload)
		}
	
	},
	actions: {
		//************************************* ADMINISTRATION *************************************//

		async POSTConvergeTerminalSetup({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Get Merchant Terminal Information';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeTerminalSetup response', response);
					if(response.status === 201) {
						commit('PUSH_TERMINAL_SETUP', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},

		//************************************* CREDIT CARD TRANSACTIONS *************************************//

		async POSTConvergeSale({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Create New CC Sale';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeSale response', response);
					if(response.status === 201) {
						commit('PUSH_SALE_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		async POSTConvergeReturn({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Credit Card Return';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeReturn response', response);
					if(response.status === 201) {
						commit('PUSH_RETURN_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		async POSTConvergeVoid({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'CVoid Transaction';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeVoid response', response);
					if(response.status === 201) {
						commit('PUSH_VOID_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Auth Only
		async POSTConvergeAuthOnly({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Authorize CC Only';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeAuthOnly response', response);
					if(response.status === 201) {
						commit('PUSH_AUTHONLY_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Auth Increiment
		async POSTConvergeAuthIncriment({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Incriment a Prior Auth';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeAuthIncriment response', response);
					if(response.status === 201) {
						commit('PUSH_AUTHONLY_INCRIMENT_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Auth Complete
		async POSTConvergeAuthComplete({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Complete Prior Auth';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeAuthComplete response', response);
					if(response.status === 201) {
						commit('PUSH_AUTHCOMPLETE_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Auth Delete
		async POSTConvergeAuthDelete({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Delete Prior Auth';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeAuthDelete response', response);
					if(response.status === 201) {
						commit('PUSH_AUTHDELETE_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},

		//************************************* TIP *************************************//

		async POSTConvergeUpdateTip({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Update Transaction Tip';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeUpdateTip response', response);
					if(response.status === 201) {
						commit('PUSH_UPDATETIP_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},

		//************************************* CARD MANAGER *************************************//
		//Query Token GET info about token
		async POSTConvergeQueryToken({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Query Token';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeQueryToken response', response);
					if(response.status === 201) {
						commit('PUSH_QUERYTOKEN_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Update Token
		async POSTConvergeUpdateToken({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Update Token';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeUpdateToken response', response);
					if(response.status === 201) {
						commit('PUSH_UPDATETOKEN_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Get Token aka Create Token
		async POSTConvergeGetToken({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Get Token';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeGetToken response', response);
					if(response.status === 201) {
						commit('PUSH_CREATETOKEN_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Delete Token
		async POSTConvergeDeleteToken({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Delete Token';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeDeleteToken response', response);
					if(response.status === 201) {
						commit('PUSH_DELETETOKEN_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},

		//************************************* DEBIT CARD TRANSACTIONS *************************************//

		async POSTBINLookup({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Debit Card Lookup';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTBINLookup response', response);
					if(response.status === 201) {
						commit('PUSH_BINLOOKUP_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},

		//************************************* END OF DAY *************************************//

		//Email Transaction
		async POSTConvergeEmailTxn({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Email Transaction';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeEmailTxn response', response);
					if(response.status === 201) {
						commit('PUSH_EMAILTXN_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Email Transaction
		async POSTConvergeQueryTxn({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Query Transaction';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeQueryTxn response', response);
					if(response.status === 201) {
						commit('PUSH_QUERYTXN_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Email Transaction
		async POSTConvergeTotal({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Get Totals Report';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeTotal response', response);
					if(response.status === 201) {
						commit('PUSH_TOTALS_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},
		//Email Transaction
		async POSTConvergeSettle({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon/';
					let type = 'Settle Terminal';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTConvergeSettle response', response);
					if(response.status === 201) {
						commit('PUSH_SETTLE_RESPONSE', response.data);
						return resolve(response)
					} else {
						return reject(response)
					}
				} catch (error) {
					return reject(response)
				}       
			}).catch(error => {
				return error;
			});
		},

	},
	getters: {


	}
};
