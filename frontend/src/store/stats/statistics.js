// import apiRoutes from '@/js/api-routes';
//Use this to captire device usage data
// import devices from "devextreme/core/devices";

export const Statistics = {
	namespace: true,
	name: "statisticsReporter",
	state: {
		
	},
	mutations: {
	
	},
	actions: {
		//Create Method
		async POSTStatistic({commit, dispatch, rootState}, payload) {
			let endpoint = 'sales-office/';
			let type = 'Report Stat';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTSalesOffice response', response);
			commit('PUSH_NEW_SALESOFFICE', response.data);
		},

	},
	getters: {


	}
};
