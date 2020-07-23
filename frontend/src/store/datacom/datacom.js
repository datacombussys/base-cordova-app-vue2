;
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import apiRoutes from '@/js/api-routes';

export const Datacom = {
  namespace: true,
  state: {
    //Logged In Details
    datacomList: [],
    datacomProfile: {},

    //Selected Details
    selectedDatacomProfile: {},

    //Specific Datacom Company Data
    datacomEmployeesList: [],

  },
  mutations: {
    SET_DATACOM_LIST(state, payload) {
      state.datacomList = payload;
    },
    PUSH_NEW_DATACOM(state, payload) {
      state.datacomList.push(payload);
    },
    SET_OWN_DATACOM_PROFILE(state, payload) {
      console.log('SET_OWN_DATACOM_PROFILE, payload', payload);
      state.datacomProfile = payload;
      console.log('state.datacomProfile', state.datacomProfile);
    },
    SET_SELECTED_DATACOM_PROFILE(state, payload) {
      state.selectedDatacomProfile = payload;
    },
    SET_DATACOM_EMPLOYEES(state, payload) {
      state.datacomEmployeesList = payload;
    },
    UPDATE_PROFILE_IMAGE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.datacomList.findIndex(elem => elem.id === payload.id);
      state.datacomList.slice(listIndex, 1);
      state.datacomList.splice(listIndex, 1, payload);
      console.log('state.datacomList', state.datacomList);
    },
    UPDATE_DATACOM_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.datacomList.findIndex(elem => elem.id === payload.id);
      state.datacomList.slice(listIndex, 1);
      state.datacomList.splice(listIndex, 1, payload);
      console.log('state.datacomList', state.datacomList);
    },
    PATCH_DELETE_DATACOM_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.datacomList.findIndex(elem => elem.id === payload.id);
      state.datacomList.slice(listIndex, 1);
      console.log('state.datacomList', state.datacomList);
    }

  },
  actions: {

    //POST and CREATE Item
    async POSTDatacom({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        try {
          let endpoint = 'datacom/';
          let type = 'Create New Datacom';
          let response = await apiRoutes.POSTItem(dispatch, rootState, endpoint, payload, type)
          console.log('POSTDatacom response', response);
          if(response.status === 201) {
            console.log("Successful");
            commit('PUSH_NEW_DATACOM', response);
            return resolve(response)
          } else {
            return reject(response)
          }
        } catch (error) {
          return reject(response)
        }       
      }).catch(error => {
        return error;
			});
    },
    //GET Datacom LIST
    async GETDatacomList({commit, dispatch, rootState}, payload) {
			let endpoint = 'datacom-list/';
      let type = 'Get Datacom List';
			let response = await apiRoutes.GETList(dispatch, rootState, endpoint, payload, type);
			console.log('GETDatacomList response', response);
			commit('SET_DATACOM_LIST', response.data);
    },
    //GET Own Datacom Profile and Related Data
    async GETDatacomOwnProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'datacom/';
      let type = 'Get Datacom Profile';
      let response = await apiRoutes.GETOwnProfile(dispatch, rootState, endpoint, payload, type);
      console.log('GETDatacomOwnProfile response', response);
      commit('SET_OWN_DATACOM_PROFILE', response.data);
    },
    //GET Selected Profile
    async GETDatacomSelectedProfile({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        let endpoint = 'datacom/';
        let type = 'Get Datacom Profile';
        let response = await apiRoutes.GETSelectedProfile(dispatch, rootState, endpoint, payload, type);
        if(response.data) {
          console.log('GETDatacomSelectedProfile response', response);
          commit('SET_SELECTED_DATACOM_PROFILE', response.data);
          return resolve(response.data);
        } else {
          return reject(response)
        }
      });
			
    },
    //PATCH Profile
    async PATCHDatacomProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'datacom/';
      let type = 'Update Datacom Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHDatacomProfile response', response);
			commit('UPDATE_DATACOM_PROFILE', response.data);
    },
    //PATCHDelete PROFILE
    async PATCHDeleteProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'datacom/';
      let type = 'Delete Datacom Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState, endpoint, payload, type);
			console.log('PATCHDatacomProfile response', response);
			commit('PATCH_DELETE_DATACOM_PROFILE', payload);
    },

  },
  getters: {
    GET_DATACOM_LIST(state) {
      return state.datacomList;
    },
    GET_OWN_DATACOM_PROFILE(state) {
      return state.datacomProfile;
    },
    GET_SELECTED_DATACOM_PROFILE(state) {
      return state.selectedDatacomProfile;
    },
    GET_DATACOM_PROFILE(state)   {
      return state.datacomProfile;
    }
  }

}

