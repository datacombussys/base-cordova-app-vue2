import axios from 'axios';
import apiRoutes from '@/js/api-routes';

export const Common = {
	namespace: true,
	state: {
		isOnline: navigator.onLine,
		platform: null,
		departmentList: [],
		positionList: [],
		shippingAddressList: [],
		generalBusinessSettingsProfile: {},
		
	},
	mutations: {
		SET_DEVICE(state, payload) {
			var devicePlatform
			let platform = device.platform
			switch(platform) {
				case "Android":
					devicePlatform = "Android"
					break
				case "iOS":
					devicePlatform = "IOS"
					break
				case "browser":
					devicePlatform = "Browser"
					break
			}
			let winLocHref = window.location.href.toString()
			
			if(winLocHref.startsWith("file")) {
				devicePlatform = "Electron"
			} 
			
			state.platform = devicePlatform
		},
		SET_AXIOS_HEADERS(state) {
			console.log("SET_AXIOS_HEADERS platform", state.platform)

			if(state.platform === "Android") {
				axios.defaults.baseURL = 'http://10.0.2.2:9010';
			} else if(state.platform === "Electron") {
				axios.defaults.baseURL = 'http://localhost:9010';
			} else {
				axios.defaults.baseURL = undefined;
			 }

			console.log("axios.defaults.baseURL", axios.defaults.baseURL)
		},
		PUSH_NEW_SHIPPING_ADDRESS(state, payload) {
			state.shippingAddressList.push(payload[0]);
		},
		SET_NEW_SHIPPING_ADDRESS(state, payload) {
			state.shippingAddressList = payload;
		},
		SET_GENERAL_BUSINESS_SETTINGS(state, payload) {
			if(payload.length === 0 || payload == undefined) {
				return
			} else {
				state.generalBusinessSettingsProfile = payload[0];
			}			
		},
		SET_DEPARTMENT_LIST(state, payload) {
			state.departmentList = payload;
		},
		SET_POSITION_LIST(state, payload) {
			state.positionList = payload;
		},
		PUSH_POSITION_LIST(state, payload) {
			state.positionList.push(payload);
		},
		PUSH_DEPT_LIST(state, payload) {
			console.log('payload', payload);
			state.departmentList.push(payload);
		},
		DELETE_COMPANY_DEPARTMENT(state, payload) {
			// console.log('DELETE_COMPANY_DEPARTMENT payload', payload);
			var indexObj = state.departmentList.findIndex(elem => elem.id === payload);
			console.log('DELETE_COMPANY_DEPARTMENT indexObj', indexObj);
			Vue.delete(state.departmentList, indexObj);
			console.log('DELETE_COMPANY_DEPARTMENT state.departmentList', state.departmentList);
		},
		DELETE_EMPLOYEE_POSITION(state, payload) {
			var indexObj = state.positionList.findIndex(elem => elem.id === payload);
			console.log('DELETE_EMPLOYEE_POSITION indexObj', indexObj);
			Vue.delete(state.positionList, indexObj);
			console.log('DELETE_EMPLOYEE_POSITION state.positionList', state.positionList);
		}


	},
	actions: {
		setDevice(commit, dispatch) {
			this.commit('SET_DEVICE')
			this.commit("SET_AXIOS_HEADERS")
		},
		//POST Employee After POST User
    async POSTShippingAddress({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        try {
          let endpoint = 'shipping/';
          let type = 'Create New Shipping Address';
          let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type);
          console.log('POSTShippingAddress response', response);
          commit('PUSH_NEW_SHIPPING_ADDRESS', response.data);
          return resolve(response)

        } catch (error) {
          console.error("POSTShippingAddress error.response", error);
					return reject(response)
        }
      }).catch(error => {
        console.error("POSTShippingAddress Promise error.response", error);
        return error;
			});
		},
		async POSTDepartment({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        try {
          let endpoint = 'departments/';
          let type = 'Create New Department';
          let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type);
          console.log('POSTDepartment response', response);
          commit('PUSH_DEPT_LIST', response.data);
          return resolve(response)

        } catch (error) {
          console.error("POSTDepartment error.response", error);
					return reject(response)
        }
      }).catch(error => {
        console.error("POSTDepartment Promise error.response", error);
        return error;
			});
		},
		async POSTPosition({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        try {
          let endpoint = 'positions/';
          let type = 'Create New Position';
          let response = await apiRoutes.POSTItem(dispatch, rootState, payload, endpoint, type);
          console.log('POSTPosition response', response);
          commit('PUSH_POSITION_LIST', response.data);
          return resolve(response)

        } catch (error) {
          console.error("POSTPosition error.response", error);
					return reject(response)
        }
      }).catch(error => {
        console.error("POSTPosition Promise error.response", error);
        return error;
			});
		},
		

		//GET Lists
    async GETShippingList({commit, dispatch, rootState}, payload) {
			let endpoint = 'shipping/';
      let type = 'Get Shipping List';
			let response = await apiRoutes.GETList(dispatch, rootState, payload, endpoint, type);
			console.log('GETShippingList response', response);
			commit('SET_NEW_SHIPPING_ADDRESS', response.data);
		},
		async GETPositionList({commit, dispatch, rootState}, payload) {
			let endpoint = 'positions/';
      let type = 'Get Employee Positions';
			let response = await apiRoutes.GETList(dispatch, rootState, payload, endpoint, type);
			console.log('GETPositionList response', response);
			commit('SET_POSITION_LIST', response.data);
		},
		async GETDepartmentList({commit, dispatch, rootState}, payload) {
			let endpoint = 'departments/';
      let type = 'Get Company Departments';
			let response = await apiRoutes.GETList(dispatch, rootState, payload, endpoint, type);
			console.log('GETDepartmentList response', response);
			commit('SET_DEPARTMENT_LIST', response.data);
		},
		//GET Profile By FilterList
		async GETGeneralSettings({commit, dispatch, rootState}, payload) {
			let endpoint = 'general-settings/';
      let type = 'Get Company Settings';
			let response = await apiRoutes.GETFilterList(dispatch, rootState, payload, endpoint, type);
			console.log('GETGeneralSettings response', response);
			commit('SET_GENERAL_BUSINESS_SETTINGS', response.data);
		},
		

    //PATCHDelete PROFILE
    async DELETEDepartment({commit, dispatch, rootState}, payload) {
			let endpoint = 'departments/';
      let type = 'Delete Company Departments';
			let response = await apiRoutes.DELETEItem(dispatch, rootState, payload, endpoint, type);
			console.log('DELETEDepartment response', response);
			commit('DELETE_COMPANY_DEPARTMENT', payload);
		},
		async DELETEPosition({commit, dispatch, rootState}, payload) {
			let endpoint = 'POSITIONS/';
      let type = 'Delete Employe Position';
			let response = await apiRoutes.DELETEItem(dispatch, rootState, payload, endpoint, type);
			console.log('DELETEPosition response', response);
			commit('DELETE_EMPLOYEE_POSITION', payload);
		},
		

	},
	getters: {
		HAS_BUSINESS_SETTINGS(state) {
			if(Object.keys(state.generalBusinessSettingsProfile).length === 0 || state.generalBusinessSettingsProfile == null) {
				return false
			}
			return true
		},
		GET_DEPARTMENTS_LIST(state) {
			console.log("departmentList from getter", state.departmentList);
			return state.departmentList;
		},
		GET_POSITIONS_LIST(state) {
			return state.positionList;
		},
		GET_SHIPPING_ADDRESS_LIST(state) {
			return state.shippingAddressList;
		},
		GET_BUSINESS_SETTINGS_PROFILE(state) {
			return state.generalBusinessSettingsProfile;
		},

	
	}
}