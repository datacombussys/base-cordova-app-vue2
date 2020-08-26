


import apiRoutes from '@/js/api-routes';

export const Customers = {
	namespace: true,
	name: "customers",
	state: {
		customerList: [],
		customerProfile: {},
    selectedCustomerProfile: {},

	},
	mutations: {
		SET_CUSTOMER_LIST(state, payload) {
      state.customerList = payload;
    },
    PUSH_NEW_CUSTOMER(state, payload) {
      state.customerList.push(payload);
    },
    SET_OWN_CUSTOMER_PROFILE(state, payload) {
      state.customerProfile = payload;
    },
    SET_SELECTED_CUSTOMER_PROFILE(state, payload) {
      state.selectedPartnerProfile = payload;
    },
    UPDATE_CUSTOMER_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.customerList.findIndex(elem => elem.id === payload.id);
      state.customerList.slice(listIndex, 1);
      state.customerList.splice(listIndex, 1, payload);
      console.log('state.customerList', state.customerList);
    },
    PATCH_DELETE_CUSTOMER_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.customerList.findIndex(elem => elem.id === payload.id);
      state.customerList.slice(listIndex, 1);
      console.log('state.customerList', state.customerList);
    }
	},
	actions: {
		//Create Method
		async POSTCustomer({commit, dispatch, rootState}, payload) {
			let endpoint = 'customer/';
			let type = 'Create New Customer';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTCustomer response', response);
			commit('PUSH_NEW_CUSTOMER', response.data);
		},
		//GET Partner LIST
		async GETCustomerList({commit, dispatch, rootState}, payload) {
			let endpoint = 'customer-list/';
			let type = 'Get Customer List';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETCustomerList response', response);
			commit('SET_CUSTOMER_LIST', response.data);
		},
		async GETSelectedCustomerList({commit, dispatch, rootState}, payload) {
			//filterURL is passed from the original call
			let endpoint = 'customer-list/';
			let type = 'Get Customer List';
			let response = await apiRoutes.GETSelectedList(dispatch, rootState,payload, endpoint, type);
			console.log('GETCustomerList response', response);
			commit('SET_SELECTED_CUSTOMER_LIST', response.data);
		},
		//GET Own Customer Profile
		GETCustomerOwnProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				console.log('GETCustomerOwnProfile payload', payload);
				let endpoint = 'customer/?user__id=';
				let type = 'Get Customer Profile';
				let response = await apiRoutes.GETProfileById(dispatch, rootState,payload, endpoint, type);
				console.log('GETCustomerOwnProfile response', response);
				commit('SET_CUSTOMER_PROFILE', response.data[0]);
				commit('SET_PLATFORM_INFO', response.data[0]);
				return resolve(response.data[0]);
			});
		},
		//GET Selected Profile
		async GETCustomerSelectedProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				let endpoint = 'customer/';
				let type = 'Get Customer Profile';
				let response = await apiRoutes.GETSelectedProfile(dispatch, rootState,payload, endpoint, type);
				console.log('GETCustomerSelectedProfile response', response);
				commit('SET_SELECTED_CUSTOMER_PROFILE', response.data);
				return resolve(response.data)
			});
		},
		//PATCH Profile
		async PATCHCustomerProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'customer/';
			let type = 'Update Customer Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHCustomerProfile response', response);
			commit('UPDATE_CUSTOMER_PROFILE', response.data);
		},
		//PATCHDelete PROFILE
		async PATCHDeleteCustomerProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'customer/';
			let type = 'Delete Customer Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHDeleteCustomerProfile response', response);
			commit('PATCH_DELETE_CUSTOMER_PROFILE', payload);
		},
		//DELETE Item
		async DELETECustomerProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'customer/';
			let type = 'Delete Customer Profile';
			let response = await apiRoutes.DELETEItem(dispatch, rootState,payload, endpoint, type);
			console.log('DELETECustomerProfile response', response);
		},

	},
	getters: {
    GET_CUSTOMER_LIST(state) {
      return state.customerList;
    },
    GET_OWN_CUSTOMER_PROFILE(state) {
      return state.customerProfile;
    },
    GET_SELECTED_CUSTOMER_PROFILE(state) {
      return state.selectedCustomerProfile;
    }
	}
};
