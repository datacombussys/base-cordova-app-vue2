;
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import apiRoutes from '@/js/api-routes';

export const Employees = {
  namespace: true,
  state: {
    //Logged In Details
    employeeList: [],
    employeeProfile: {},

    //Selected Details
    selectedEmployeeProfile: {},

    //Specific Employee Company Data
    employeeEmployeesList: [],

  },
  mutations: {
    SET_EMPLOYEE_LIST(state, payload) {
      state.employeeList = payload;
    },
    PUSH_NEW_DATACOM(state, payload) {
      state.employeeList.push(payload);
    },
    SET_OWN_EMPLOYEE_PROFILE(state, payload) {
      console.log('SET_OWN_EMPLOYEE_PROFILE, payload', payload);
      state.employeeProfile = payload;
      console.log('state.employeeProfile', state.employeeProfile);
    },
    SET_SELECTED_EMPLOYEE_PROFILE(state, payload) {
      state.selectedEmployeeProfile = payload;
    },
    SET_EMPLOYEE_EMPLOYEES(state, payload) {
      state.employeeEmployeesList = payload;
    },
    UPDATE_PROFILE_IMAGE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.employeeList.findIndex(elem => elem.id === payload.id);
      state.employeeList.slice(listIndex, 1);
      state.employeeList.splice(listIndex, 1, payload);
      console.log('state.employeeList', state.employeeList);
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
		//POST Employee After POST User
    async POSTEmployee({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        try {
          let endpoint = 'employee/';
          let type = 'Create New Employee';
          let response = await apiRoutes.POSTItem(dispatch, rootState, endpoint, payload, type);
          console.log('POSTEmployee response', response);
          commit('PUSH_NEW_EMPLOYEE', response.data);
          return resolve(response)

        } catch (error) {
          console.error("POSTEmployee error.response", error);
          dispatch('DELETEUserProfile', payload)
					return reject(response)
        }
      }).catch(error => {
        dispatch('DELETEUserProfile', payload)
        console.error("POSTEmployee Promise error.response", error);
        return error;
			});
			
    },
    //GET Employee LIST
    async GETEmployeeList({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee-list/';
      let type = 'Get Employee List';
			let response = await apiRoutes.GETList(dispatch, rootState, endpoint, payload, type);
			console.log('GETEmployeeList response', response);
			commit('SET_EMPLOYEE_LIST', response.data);
		},
		//GET Selected Employee LIST
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
        return resolve(response.data);
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
			console.log('PATCHEmployeeProfile response', response);
			commit('PATCH_DELETE_EMPLOYEE_PROFILE', payload);
    },

  },
  getters: {
    GET_EMPLOYEE_LIST(state) {
      return state.employeeList;
		},
		GET_EMPLOYEE_LIST_LENGTH(state) {
			return state.employeeList.length;
		},
    GET_OWN_EMPLOYEE_PROFILE(state) {
      return state.employeeProfile;
    },
    GET_SELECTED_EMPLOYEE_PROFILE(state) {
      return state.selectedEmployeeProfile;
    },
    GET_EMPLOYEE_PROFILE(state)   {
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

