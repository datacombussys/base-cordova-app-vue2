
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const Accounting = {
	namespace: true,
	state: {
		incomeAccountsList: [],
		expenseAccountsList: [],
		liabilityAccountList: [],
		assetsAccountList: [],
		ownerEquityAccountList: []
	},
	mutations: {},
	actions: {},
	getters: {}
};
