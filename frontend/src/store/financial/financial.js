
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import apiRoutes from '@/js/api-routes';

export const Financial = {
	namespace: true,
	state: {
		salesTaxList: [
			{id: 1, name: "Arizona", rate: "4.5%"},
			{id: 2, name: "California", rate: "22.3%"},
			{id: 2, name: "Texas", rate: "8.9%"}
		],
	},
	mutations: {
		PUSH_NEW_SALES_TAX(state, payload) {
			state.salesTaxList.push(payload)
		},
		SET_SALES_TAX_LIST(state, payload) {
			state.salesTaxList = payload
		}
	},
	actions: {
		//Create Methods
    async POSTSalesTax({commit, dispatch, rootState}, payload) {
			let endpoint = 'sales-tax/';
      let type = 'Create Sales Tax';
			let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
			console.log('POSTSalesTax response', response);
			commit('PUSH_NEW_SALES_TAX', response);
		},
		//GET List Methods
    async GETSalesTaxList({commit, dispatch, rootState}, payload) {
			let endpoint = 'sales-tax/';
      let type = 'Get Partner List';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETPartnerList response', response);
			commit('SET_SALES_TAX_LIST', response.data);
		},
	},

	getters: {
		HAS_SALES_TAX_PROFILE(state) {
			if(state.salesTaxListlength === 0) {
				return false
			}
			return true
		},
		GET_SALES_TAX_LIST(state) {
			return state.salesTaxList
		}
	}

}
