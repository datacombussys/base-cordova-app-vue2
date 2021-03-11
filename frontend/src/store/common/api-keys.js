import apiRoutes from '@/js/api-routes';

export const APIKeys = {
	namespace: true,
	state: {
		elavonAPIKeyList: null,
		elavonAPIKeyProfile: {}
		
	},
	mutations: {
		PUSH_ELAVON_API_KEY(state, payload) {
			state.elavonAPIKey = payload
		},
		SET_API_KEY(state, payload) {
			state.elavonAPIKeyProfile = {...payload}
		}


	},
	actions: {
		//POST Elavon API Key
		async POSTElavonAPIKey({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'elavon-account/';
					let type = 'Create Elavon API Key';
					let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type);
					console.log('POSTElavonAPIKey response', response);
					commit('PUSH_ELAVON_API_KEY', response.data);
					return resolve(response)

				} catch (error) {
					console.error("POSTElavonAPIKey axios error", error);
					return reject(response)
				}
			}).catch(error => {
				console.error("POSTElavonAPIKey Promise error", error);
				return error;
			});
		},
		//GET Methods
		GETAPIKeyById({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				let endpoint = 'elavon-account/';
				let type = 'Get Elavon API Key';
				let response = await apiRoutes.GETList(dispatch, rootState, payload, endpoint, type);
				console.log('GETAPIKeyById response', response);
				if(response.status === 200) {
					commit('SET_API_KEY', response.data[0]);
					return resolve(response);
				} else {
					return reject(response)
				}
			}).catch(error => {
				console.error("GETAPIKeyById Promise error", error);
				return error;
			});
		},

	},
	getters: {


	
	}
}