
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

  },
  mutations: {
    SET_EMPLOYEE_LIST(state, payload) {
      state.employeeList = payload;
		},
		PUSH_NEW_EMPLOYEE_TO_LIST(state, payload) {
			state.employeeList.push(payload)
		},
    SET_EMPLOYEE_PROFILE(state, payload) {
      state.employeeProfile = payload;
    },
    SET_SELECTED_EMPLOYEE_LIST(state, payload) {
			state.selectedEmployeeList = payload;
		},
    SET_SELECTED_EMPLOYEE_PROFILE(state, payload) {
      state.selectedEmployeeProfile = payload;
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
          let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type);
          console.log('POSTEmployee response', response);
          commit('PUSH_NEW_EMPLOYEE_TO_LIST', response.data);
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
      return new Promise( async (resolve, reject) => {
        let endpoint = 'employee-list/';
        let type = 'Get Employee List';
        let response = await apiRoutes.GETList(dispatch, rootState, payload, endpoint, type);
        console.log('GETEmployeeList response', response);
        commit('SET_EMPLOYEE_LIST', response.data);
        return resolve();
      })
			
    },
    //GET Selected Profile By Id
    async GETEmployeeSelectedProfile({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        let endpoint = 'employee/';
        let type = 'Get Employee Profile';
        let response = await apiRoutes.GETProfileById(dispatch, rootState, payload, endpoint, type);
        console.log('GETEmployeeSelectedProfile response', response);
        commit('SET_SELECTED_EMPLOYEE_PROFILE', response.data);
        return resolve(response.data);
      });
    },

    //GET Own Employee Profile by Id
		 GETEmployeeProfileById({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				console.log('GETEmployeeProfileById payload', payload);
				let endpoint = 'employee/?user__id=';
				let type = 'Get Employee Profile';
				let response = await apiRoutes.GETProfileById(dispatch, rootState, payload, endpoint, type);
				console.log('GETEmployeeProfileById response', response);
				commit('SET_EMPLOYEE_PROFILE', response.data[0]);
				commit('SET_PLATFORM_INFO', response.data[0]);
				return resolve(response.data[0]);
			});
    },
		//GET Selected Employee List by FilterURL
		async GETEmployeeFilterList({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee-list/';
      let type = 'Get Employee List';
			let response = await apiRoutes.GETFilterList(dispatch, rootState, payload, endpoint, type);
			console.log('GETEmployeeList response', response);
			commit('SET_SELECTED_EMPLOYEE_LIST', response.data);
    },

    //PATCH Profile
    async PATCHEmployeeProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee/';
      let type = 'Update Employee Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState, payload, endpoint, type);
			console.log('PATCHEmployeeProfile response', response);
			commit('UPDATE_EMPLOYEE_PROFILE', response.data);
    },
    //PATCHDelete PROFILE
    async PATCHDeleteEmployeeProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'employee/';
      let type = 'Delete Employee Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState, payload, endpoint, type);
			console.log('PATCHDeleteEmployeeProfile response', response);
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

