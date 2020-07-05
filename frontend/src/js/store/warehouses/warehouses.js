import axios from "axios";
import { f7 } from 'framework7-vue';

import apiRoutes from '@/js/api-routes';


export const Warehouses = {
	namespace: true,
	name: "warehouses",
	state: {
		warehouseList: [],
		warehouseProfile: {},
		selectedWarehouseProfile: {}
	},
	mutations: {
		SET_WAREHOUSE_LIST(state, payload) {
      state.warehouseList = payload;
    },
    PUSH_NEW_WAREHOUSE(state, payload) {
      state.warehouseList.push(payload);
    },
    SET_OWN_WAREHOUSE_PROFILE(state, payload) {
      state.warehouseProfile = payload;
    },
    SET_SELECTED_WAREHOUSE_PROFILE(state, payload) {
      state.selectedWarehouseProfile = payload;
    },
    UPDATE_WAREHOUSE_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.warehouseList.findIndex(elem => elem.id === payload.id);
      state.warehouseList.slice(listIndex, 1);
      state.warehouseList.splice(listIndex, 1, payload);
      console.log('state.warehouseList', state.warehouseList);
    },
    PATCH_DELETE_WAREHOUSE_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.warehouseList.findIndex(elem => elem.id === payload.id);
      state.warehouseList.slice(listIndex, 1);
      console.log('state.warehouseList', state.warehouseList);
    }
	},
	actions: {
		//Create Method
		async POSTWarehouse({commit, dispatch, rootState}, payload) {
			let endpoint = 'warehouse/';
			let type = 'Create New Warehouse';
			let response = await apiRoutes.POSTItem(dispatch, rootState, endpoint, payload, type);
			console.log('POSTWarehouse response', response);
			commit('PUSH_NEW_WAREHOUSE', response.data);
		},
		//GET Partner LIST
		async GETWarehouseList({commit, dispatch, rootState}, payload) {
			let endpoint = 'warehouse-list/';
			let type = 'Get Warehouse List';
			let response = await apiRoutes.GETList(dispatch, rootState, endpoint, payload, type);
			console.log('GETWarehouseList response', response);
			commit('SET_WAREHOUSE_LIST', response.data);
		},
		async GETSelectedWarehouseList({commit, dispatch, rootState}, payload) {
			//filterURL is passed from the original call
			let endpoint = 'warehouse-list/';
			let type = 'Get Warehouse List';
			let response = await apiRoutes.GETSelectedList(dispatch, rootState, endpoint, payload, type);
			console.log('GETWarehouseList response', response);
			commit('SET_SELECTED_WAREHOUSE_LIST', response.data);
		},
		//GET Own Warehouse Profile
		GETWarehouseOwnProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				console.log('GETWarehouseOwnProfile payload', payload);
				let endpoint = 'warehouse/?user__id=';
				let type = 'Get Warehouse Profile';
				let response = await apiRoutes.GETOwnProfile(dispatch, rootState, endpoint, payload, type);
				console.log('GETWarehouseOwnProfile response', response);
				commit('SET_WAREHOUSE_PROFILE', response.data[0]);
				commit('SET_PLATFORM_INFO', response.data[0]);
				return resolve(response.data[0]);
			});
		},
		//GET Selected Profile
		async GETWarehouseSelectedProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				let endpoint = 'warehouse/';
				let type = 'Get Warehouse Profile';
				let response = await apiRoutes.GETSelectedProfile(dispatch, rootState, endpoint, payload, type);
				console.log('GETWarehouseSelectedProfile response', response);
				commit('SET_SELECTED_WAREHOUSE_PROFILE', response.data);
				return resolve(response.data)
			});
		},
		//PATCH Profile
		async PATCHWarehouseProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'warehouse/';
			let type = 'Update Warehouse Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHWarehouseProfile response', response);
			commit('UPDATE_WAREHOUSE_PROFILE', response.data);
		},
		//PATCHDelete PROFILE
		async PATCHDeleteProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'warehouse/';
			let type = 'Delete Warehouse Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHDeleteProfile response', response);
			commit('PATCH_DELETE_WAREHOUSE_PROFILE', payload);
		},
		//DELETE Item
		async DELETEUserProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'warehouse/';
			let type = 'Delete Warehouse Profile';
			let response = await apiRoutes.DELETEItem(dispatch, rootState, endpoint, payload, type);
			console.log('DELETEProfile response', response);
		},
	},
	getters: {
		GET_WAREHOUSE_LIST(state) {
			return state.warehouseList
		},
		GET_SELECTED_WAREHOUSE_PROFILE(state) {
			return state.warehouseList.length
		},
		GET_WAREHOUSE_EMPLOYEE_IDS(state) {
			return state.warehouseList.employees;
		},
		GET_OWN_WAREHOUSE_PROFILE(state) {
      return state.warehouseProfile;
    },
		GET_SELECTED_WAREHOUSE_PROFILE(state) {
      return state.selectedWarehouseProfile;
    }
	}
};
