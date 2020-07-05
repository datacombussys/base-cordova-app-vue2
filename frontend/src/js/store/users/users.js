import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

import apiRoutes from '@/js/api-routes';

export const Users = {
	namespace: true,
	state: {
		//User and Employee Personal Data
		employeeProfile: {},
		//All Users based on Logged in User

		//Own Business Employees
		employeeList: [],
		companyFilteredEmployeeList: [],

		//Selected Business Employees
		selectedEmployeeList: [],
	},
	mutations: {
		SET_EMPLOYEE_PROFILE(state, payload) {
			state.employeeProfile = {};
			state.employeeProfile = payload;
			console.log("state.employeeProfile", state.employeeProfile);
		},
		SET_EMPLOYEE_LIST(state, payload) {
			console.log("SET_EMPLOYEE_LIST payload", payload);
			state.employeeList = payload;
		},
		PUSH_NEW_EMPLOYEE(state, payload) {
			state.employeeList.push(payload);
		},
		SET_SELECTED_EMPLOYEE_LIST(state, payload) {
			state.selectedEmployeeList = payload;
		},	
		CLEAR_USER_DATA(state, payload) {
			state.employeeProfile = {};
		},
		SET_SELECTED_EMPLOYEE_PROFILE(state, payload) {
      state.selectedPartnerProfile = payload;
    },
    UPDATE_EMPLOYEE_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.employeeList.findIndex(elem => elem.id === payload.id);
      state.employeeList.slice(listIndex, 1);
      state.employeeList.splice(listIndex, 1, payload);
      console.log('state.employeeList', state.employeeList);
    },
    PATCH_DELETE_EMPLOYEE_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.employeeList.findIndex(elem => elem.id === payload.id);
      state.employeeList.slice(listIndex, 1);
      console.log('state.employeeList', state.employeeList);
    }

		
	},
	actions: {
		//Create Methods
    async POSTUser({commit, dispatch, rootState}, payload) {
			let endpoint = 'users/';
      let type = 'Create New User';
			let response = await apiRoutes.POSTItem(dispatch, rootState, endpoint, payload, type);
			console.log('POSTUser response', response);
		},
		async POSTEmployee({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee/';
      let type = 'Create New Employee';
			let response = await apiRoutes.POSTItem(dispatch, rootState, endpoint, payload, type);
			console.log('POSTEmployee response', response);
			commit('PUSH_NEW_EMPLOYEE', response.data);
			//Handle response error to dfelete user that was created
			//dispatch("DELETEUserProfile", form.user);
    },
    //GET Partner LIST
    async GETEmployeeList({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee-list/';
      let type = 'Get Employee List';
			let response = await apiRoutes.GETList(dispatch, rootState, endpoint, payload, type);
			console.log('GETEmployeeList response', response);
			commit('SET_EMPLOYEE_LIST', response.data);
		},
		async GETSelectedEmployeeList({commit, dispatch, rootState}, payload) {
			//filterURL is passed from the original call
			let endpoint = 'employee-list/';
      let type = 'Get Employee List';
			let response = await apiRoutes.GETSelectedList(dispatch, rootState, endpoint, payload, type);
			console.log('GETEmployeeList response', response);
			commit('SET_SELECTED_EMPLOYEE_LIST', response.data);
    },
    //GET Own Employee Profile
    GETEmployeeOwnProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				console.log('GETEmployeeOwnProfile payload', payload);
				let endpoint = 'employee/?user__id=';
				let type = 'Get Employee Profile';
				let response = await apiRoutes.GETOwnProfile(dispatch, rootState, endpoint, payload, type);
				console.log('GETEmployeeOwnProfile response', response);
				commit('SET_EMPLOYEE_PROFILE', response.data[0]);
				commit('SET_PLATFORM_INFO', response.data[0]);
				return resolve(response.data[0]);
			});
    },
    //GET Selected Profile
    async GETEmployeeSelectedProfile({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				let endpoint = 'employee/';
				let type = 'Get Employee Profile';
				let response = await apiRoutes.GETSelectedProfile(dispatch, rootState, endpoint, payload, type);
				console.log('GETEmployeeSelectedProfile response', response);
				commit('SET_SELECTED_EMPLOYEE_PROFILE', response.data);
				return resolve(response.data)
			});
    },
    //PATCH Profile
    async PATCHEmployeeProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee/';
      let type = 'Update Employee Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHEmployeeProfile response', response);
			commit('UPDATE_EMPLOYEE_PROFILE', response.data);
    },
    //PATCHDelete PROFILE
    async PATCHDeleteProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee/';
      let type = 'Delete Employee Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHDeleteProfile response', response);
			commit('PATCH_DELETE_EMPLOYEE_PROFILE', payload);
		},
		//DELETE Item
		async DELETEUserProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'users/';
      let type = 'Delete Employee Profile';
			let response = await apiRoutes.DELETEItem(dispatch, rootState, endpoint, payload, type);
			console.log('DELETEProfile response', response);
		},


	},
	getters: {
		GET_USER_LIST(state) {
			return state.userList;
		},
		GET_EMPLOYEE_LIST(state) {
			return state.employeeList;
		},
		GET_EMPLOYEE_LIST_LENGTH(state) {
			return state.employeeList.length;
		},
		GET_EMPLOYEE_PROFILE(state) {
			return state.employeeProfile;
		},
		GET_SELECTED_EMPLOYEE_LIST(state) {
			return state.selectedEmployeeList;
		},
		GET_SELECTED_EMPLOYEE_LIST_LENGTH(state) {
			return state.selectedEmployeeList.length;
		}
	}
}

