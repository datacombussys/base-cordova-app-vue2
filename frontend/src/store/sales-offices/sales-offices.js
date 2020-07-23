
;

import apiRoutes from '@/js/api-routes';


export const SalesOffices = {
	namespace: true,
	name: "sales-offices",
	state: {
		salesOfficeList: [],
		salesOfficeProfile: {},
		selectedSalesOfficeProfile: {}
	},
	mutations: {
		SET_SALESOFFICE_LIST(state, payload) {
			console.log('SET_SALESOFFICE_LIST payload', payload);
			state.salesOfficeList = payload;
			console.log('state.salesOfficeList', state.salesOfficeList);
    },
    PUSH_NEW_SALESOFFICE(state, payload) {
      state.salesOfficeList.push(payload);
    },
    SET_OWN_SALESOFFICE_PROFILE(state, payload) {
      state.salesOfficeProfile = payload;
    },
    SET_SELECTED_SALESOFFICE_PROFILE(state, payload) {
      state.selectedSalesOfficeProfile = payload;
    },
    UPDATE_SALESOFFICE_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.salesOfficeList.findIndex(elem => elem.id === payload.id);
      state.salesOfficeList.slice(listIndex, 1);
      state.salesOfficeList.splice(listIndex, 1, payload);
      console.log('state.salesOfficeList', state.salesOfficeList);
    },
    PATCH_DELETE_SALESOFFICE_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.salesOfficeList.findIndex(elem => elem.id === payload.id);
      state.salesOfficeList.slice(listIndex, 1);
      console.log('state.salesOfficeList', state.salesOfficeList);
    }
	},
	actions: {
		//Create Method
		async POSTSalesOffice({commit, dispatch, rootState}, payload) {
			let endpoint = 'sales-office/';
			let type = 'Create New Sales Office';
			let response = await apiRoutes.POSTItem(dispatch, rootState, endpoint, payload, type);
			console.log('POSTSalesOffice response', response);
			commit('PUSH_NEW_SALESOFFICE', response.data);
		},
		//GET Partner LIST
		async GETSalesOfficeList({commit, dispatch, rootState}, payload) {
			let endpoint = 'salesoffice-list/';
			let type = 'Get Sales Office List';
			let response = await apiRoutes.GETList(dispatch, rootState, endpoint, payload, type);
			console.log('GETSalesOfficeList response', response);
			commit('SET_SALESOFFICE_LIST', response.data);
		},
		async GETSelectedSalesOfficeList({commit, dispatch, rootState}, payload) {
			//filterURL is passed from the original call
			let endpoint = 'salesoffice-list/';
			let type = 'Get Sales Office List';
			let response = await apiRoutes.GETSelectedList(dispatch, rootState, endpoint, payload, type);
			console.log('GETSalesOfficeList response', response);
			commit('SET_SELECTED_SALESOFFICE_LIST', response.data);
		},
		//GET Own SalesOffice Profile
		GETSalesOfficeOwnProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				console.log('GETSalesOfficeOwnProfile payload', payload);
				let endpoint = 'sales-office/?user__id=';
				let type = 'Get Sales Office Profile';
				let response = await apiRoutes.GETOwnProfile(dispatch, rootState, endpoint, payload, type);
				console.log('GETSalesOfficeOwnProfile response', response);
				commit('SET_SALESOFFICE_PROFILE', response.data[0]);
				commit('SET_PLATFORM_INFO', response.data[0]);
				return resolve(response.data[0]);
			});
		},
		//GET Selected Profile
		async GETSalesOfficeSelectedProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				let endpoint = 'sales-office/';
				let type = 'Get Sales Office Profile';
				let response = await apiRoutes.GETSelectedProfile(dispatch, rootState, endpoint, payload, type);
				console.log('GETSalesOfficeSelectedProfile response', response);
				commit('SET_SELECTED_SALESOFFICE_PROFILE', response.data);
				return resolve(response.data)
			});
		},
		//PATCH Profile
		async PATCHSalesOfficeProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'sales-office/';
			let type = 'Update Sales Office Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHSalesOfficeProfile response', response);
			commit('UPDATE_SALESOFFICE_PROFILE', response.data);
		},
		//PATCHDelete PROFILE
		async PATCHDeleteProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'sales-office/';
			let type = 'Delete Sales Office Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHDeleteProfile response', response);
			commit('PATCH_DELETE_SALESOFFICE_PROFILE', payload);
		},
		//DELETE Item
		async DELETEUserProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'sales-office/';
			let type = 'Delete Sales Office Profile';
			let response = await apiRoutes.DELETEItem(dispatch, rootState, endpoint, payload, type);
			console.log('DELETEProfile response', response);
		},
	},
	getters: {
		GET_SALES_OFFICE_LIST(state) {
			return state.salesOfficeList;
		},
		GET_SALES_OFFICE_LIST_LENGTH(state) {
			return state.salesOfficeList.length;
		},
		GET_SALES_OFFICE_EMPLOYEE_IDS(state) {
			return state.salesOfficeList.employees;
		},
		GET_OWN_SALES_OFFICE_PROFILE(state) {
      return state.salesOfficeProfile;
    },
		GET_SELECTED_SALES_OFFICE_PROFILE(state) {
      return state.selectedSalesOfficeProfile;
		},

	}
};
