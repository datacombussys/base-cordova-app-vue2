import apiRoutes from '@/js/api-routes';

export const VTHPP = {
	namespace: true,
	name: "vthpp",
	state: {
		creditCardList: [],
		achAccountList: [],
		
	},
	mutations: {
		//User Account Info
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
		},
		UPDATE_CREDIT_CARD(state, payload) {
			console.log('payload', payload);
			let listIndex = state.creditCardList.findIndex(elem => elem.id === payload.id);
			state.creditCardList.splice(listIndex, 1, payload);
			console.log('state.creditCardList', state.creditCardList);
		},
		UPDATE_ACH_ACCOUNT(state, payload) {
			console.log('payload', payload);
			let listIndex = state.achAccountList.findIndex(elem => elem.id === payload.id);
			state.achAccountList.splice(listIndex, 1, payload);
			console.log('state.achAccountList', state.achAccountList);
		},
		DELETE_CREDIT_CARD(state, payload) {
			console.log('payload', payload);
			let listIndex = state.creditCardList.findIndex(elem => elem.id === payload.id);
			state.creditCardList.slice(listIndex, 1);
		},
		DELETE_ACH_ACCOUNT(state, payload) {
			console.log('payload', payload);
			let listIndex = state.achAccountList.findIndex(elem => elem.id === payload.id);
			state.achAccountList.slice(listIndex, 1);
		},
		
		
	},
	actions: {
		//POST and CREATE Item
		async POSTCreditCard({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'creditcard/';
					let type = 'Create New Credit Card';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTCreditCard response', response);
					if(response.status === 201) {
						console.log("Successful");
						commit('PUSH_NEW_CREDIT_CARD', response.data);
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
		async POSTACHAccount({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'bankacct/';
					let type = 'Create New Bank Account';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type)
					console.log('POSTACHAccount response', response);
					if(response.status === 201) {
						console.log("Successful");
						commit('PUSH_NEW_ACH_ACCOUNT', response.data);
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

		

	
		//GET Methods
    async GETCreditCardList({commit, dispatch, rootState}, payload) {
			let endpoint = 'creditcard/';
      let type = 'Get Credit Cards';
			let response = await apiRoutes.GETList(dispatch, rootState, payload, endpoint, type);
			console.log('GETCreditCardList response', response);
			commit('SET_CREDIT_CARD_LIST', response.data);
		},
		async GETACHAccountList({commit, dispatch, rootState}, payload) {
			let endpoint = 'bankacct/';
      let type = 'Get Bank Accounts';
			let response = await apiRoutes.GETList(dispatch, rootState, payload, endpoint, type);
			console.log('GETACHAccountList response', response);
			commit('SET_ACH_ACCOUNT_LIST', response.data);
    },
		//PATCH Mehtods
			async PATCHCreditCard({commit, dispatch, rootState}, payload) {
			let endpoint = 'creditcard/';
			let type = 'Update Credit Card';
			let response = await apiRoutes.PATCHItem(dispatch, rootState, payload, endpoint, type);
			console.log('PATCHCreditCard response', response);
			commit('UPDATE_CREDIT_CARD', response.data);
		},
		async PATCHCreditCard({commit, dispatch, rootState}, payload) {
			let endpoint = 'bankacct/';
			let type = 'Update Bank Account';
			let response = await apiRoutes.PATCHItem(dispatch, rootState, payload, endpoint, type);
			console.log('PATCHCreditCard response', response);
			commit('UPDATE_ACH_ACCOUNT', response.data);
		},
		//DELETEProfile
		async DELETECreditCard({commit, dispatch, rootState}, payload) {
			let endpoint = "creditcard/"
			let type = 'Delete Credit Card';
			let response = await apiRoutes.DELETEItem(dispatch, rootState, payload, endpoint, type);
			console.log('DELETECreditCard response', response);
			commit('DELETE_CREDIT_CARD', response.data);
		},
		async DELETEACHAccount({commit, dispatch, rootState}, payload) {
			let endpoint = "bankacct/"
			let type = 'Delete Bank Account';
			let response = await apiRoutes.DELETEItem(dispatch, rootState, payload, endpoint, type);
			console.log('DELETEACHAccount response', response);
			commit('DELETE_ACH_ACCOUNT', response.data);
		},
	
	},
	getters: {
		RETRIEVE_CREDIT_CARD_LIST(state) {
				return state.creditCardList
		},
		RETRIEVE_ACH_ACCOUNT_LIST(state) {
			return state.achAccountList
		},
		
	}
};
