
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


import apiRoutes from '@/js/api-routes';

export const Companies = {
	namespace: true,
	state: {
		companyList: [],

		//LoggedIN Own Profile Data
		companyProfile: {},
		companyEmployeesList: [],
		
		//Selected Info
		selectedCompanyProfile: {},

	},
	mutations: {
		PUSH_NEW_COMPANY(state, payload) {
			console.log('payload', payload);
			state.companyList.push(payload);
			console.log('state.companyList', state.companyList);
		},
		SET_COMPANY_LIST(state, payload) {			
			state.companyList = payload;
		},

		SET_COMPANY_EMPLOYEES(state, payload) {
      state.companyEmployeesList = payload;
		},
		SET_OWN_COMPANY_PROFILE(state, payload) {
      state.companyProfile = payload;
    },
    SET_SELECTED_COMPANY_PROFILE(state, payload) {
			console.log('payload', payload);
			state.selectedCompanyProfile = payload;
			console.log('state.selectedCompanyProfile', state.selectedCompanyProfile);
    },
    UPDATE_COMPANY_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.companyList.findIndex(elem => elem.id === payload.id);
      state.companyList.slice(listIndex, 1);
      state.companyList.splice(listIndex, 1, payload);
      console.log('state.companyList', state.companyList);
    },
    PATCH_DELETE_COMPANY_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.companyList.findIndex(elem => elem.id === payload.id);
      state.companyList.slice(listIndex, 1);
      console.log('state.companyList', state.companyList);
    }


	},
	actions: {
		//Create Methods
		async POSTCompany({commit, dispatch, rootState}, payload) {
			let endpoint = 'company/';
			let type = 'Create New Company';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTCompany response', response);
			commit('PUSH_NEW_COMPANY', response);
		},
		//GET Company LIST
		async GETCompanyList({commit, dispatch, rootState}, payload) {
			let endpoint = 'company-list/';
			let type = 'Get Company List';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETCompanyList response', response);
			commit('SET_COMPANY_LIST', response.data);
		},
		//GET Own Company Profile
		async GETCompanyOwnProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'company/';
			let type = 'Get Company Profile';
			let response = await apiRoutes.GETProfileById(dispatch, rootState,payload, endpoint, type);
			console.log('GETCompanyOwnProfile response', response);
			commit('SET_OWN_COMPANY_PROFILE', response.data);
		},
		//GET Selected Profile
		async GETCompanySelectedProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				let endpoint = 'company/';
				let type = 'Get Company Profile';
				let response = await apiRoutes.GETSelectedProfile(dispatch, rootState,payload, endpoint, type);
				console.log('GETCompanySelectedProfile response', response);
				commit('SET_SELECTED_COMPANY_PROFILE', response.data);

				return resolve(response.data);
				
			});
			
		},
		//PATCH Profile
		async PATCHCompanyProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'company/';
			let type = 'Update Company Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHCompanyProfile response', response);
			commit('UPDATE_COMPANY_PROFILE', response.data);
		},
		//PATCHDelete PROFILE
		async PATCHDeleteMerchantProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'company/';
			let type = 'Delete Company Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHDeleteMerchantProfile response', response);
			commit('PATCH_DELETE_COMPANY_PROFILE', payload);
		},



		
  },
	getters: {
		GET_MERCHANT_LIST(state) {
			return state.companyList;
		},
		GET_COMPANY_LIST_LENGTH(state) {
			return state.companyList.length;
		},
		GET_OWN_COMPANY_PROFILE(state) {
      return state.companyProfile;
    },
    GET_SELECTED_COMPANY_PROFILE(state) {
      return state.selectedCompanyProfile;
    }
		

	}

}

