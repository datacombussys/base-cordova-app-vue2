
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


import apiRoutes from '@/js/api-routes';

export const Merchants = {
	namespace: true,
	state: {
		merchantList: [],

		//LoggedIN Own Profile Data
		merchantProfile: {},
		merchantEmployeesList: [],
		
		//Selected Info
		selectedCompanyProfile: {},

	},
	mutations: {
		PUSH_NEW_MERCHANT(state, payload) {
			console.log('payload', payload);
			state.merchantList.push(payload);
			console.log('state.merchantList', state.merchantList);
		},
		SET_MERCHANT_LIST(state, payload) {			
			state.merchantList = payload;
		},

		SET_MERCHANT_EMPLOYEES(state, payload) {
      state.merchantEmployeesList = payload;
		},
		SET_OWN_MERCHANT_PROFILE(state, payload) {
      state.merchantProfile = payload;
    },
    SET_SELECTED_MERCHANT_PROFILE(state, payload) {
			console.log('payload', payload);
			state.selectedCompanyProfile = payload;
			console.log('state.selectedCompanyProfile', state.selectedCompanyProfile);
    },
    UPDATE_MERCHANT_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.merchantList.findIndex(elem => elem.id === payload.id);
      state.merchantList.slice(listIndex, 1);
      state.merchantList.splice(listIndex, 1, payload);
      console.log('state.merchantList', state.merchantList);
    },
    PATCH_DELETE_MERCHANT_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.merchantList.findIndex(elem => elem.id === payload.id);
      state.merchantList.slice(listIndex, 1);
      console.log('state.merchantList', state.merchantList);
    }


	},
	actions: {
		//Create Methods
		async POSTMerchant({commit, dispatch, rootState}, payload) {
			let endpoint = 'merchant/';
			let type = 'Create New Company';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTMerchant response', response);
			commit('PUSH_NEW_MERCHANT', response);
		},
		//GET Company LIST
		async GETCompanyList({commit, dispatch, rootState}, payload) {
			let endpoint = 'merchant-list/';
			let type = 'Get Company List';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETCompanyList response', response);
			commit('SET_MERCHANT_LIST', response.data);
		},
		//GET Own Company Profile
		async GETCompanyOwnProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'merchant/';
			let type = 'Get Company Profile';
			let response = await apiRoutes.GETProfileById(dispatch, rootState,payload, endpoint, type);
			console.log('GETCompanyOwnProfile response', response);
			commit('SET_OWN_MERCHANT_PROFILE', response.data);
		},
		//GET Selected Profile
		async GETCompanySelectedProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				let endpoint = 'merchant/';
				let type = 'Get Company Profile';
				let response = await apiRoutes.GETSelectedProfile(dispatch, rootState,payload, endpoint, type);
				console.log('GETCompanySelectedProfile response', response);
				commit('SET_SELECTED_MERCHANT_PROFILE', response.data);

				return resolve(response.data);
				
			});
			
		},
		//PATCH Profile
		async PATCHCompanyProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'merchant/';
			let type = 'Update Company Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHCompanyProfile response', response);
			commit('UPDATE_MERCHANT_PROFILE', response.data);
		},
		//PATCHDelete PROFILE
		async PATCHDeleteMerchantProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'merchant/';
			let type = 'Delete Company Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHDeleteMerchantProfile response', response);
			commit('PATCH_DELETE_MERCHANT_PROFILE', payload);
		},



		
  },
	getters: {
		GET_MERCHANT_LIST(state) {
			return state.merchantList;
		},
		GET_MERCHANT_LIST_LENGTH(state) {
			return state.merchantList.length;
		},
		GET_MERCHANT_PROFILE(state) {
      return state.merchantProfile;
    },
    GET_SELECTED_MERCHANT_PROFILE(state) {
      return state.selectedCompanyProfile;
    }
		

	}

}

