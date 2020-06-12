import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Datacom = {
  namespace: true,
  state: {
    //Logged In Details
    datacomList: [],
    datacomProfile: {},

    //Selected Details
    selectedDataomcProfile: [],

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
    SET_DATACOM_PROFILE(state, payload) {
      state.datacomProfile = payload;
    },
    SET_SELECTED_DATACOM_PROFILE(state, payload) {
      state.selectedDataomcProfile = payload;
    },
    SET_DATACOM_EMPLOYEES(state, payload) {
      state.datacomEmployeesList = payload;
    }

  },
  actions: {
    //Create Methods
    addDatacom({ dispatch, commit }, form) {
      return new Promise((resolve, reject) => {
        console.log("createDatacom form in Store", form);
        axios.post("/django/datacom/", form).then(response => {
          console.log("Django Datacom response data", response);
          if (response.status === 201) {
            response.type = "Create Datacom";
            commit('PUSH_NEW_DATACOM', response.data);
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          f7.preloader.hide();
          error.response.type = "Create Datacom";
          dispatch('updateNotification', error.response);
          return resolve(error);
        });
      }).catch(error => {

        return error;
      });
    },
    //GET and LIST Methods
    getDatacomList({ commit, dispatch, rootState }) {
      console.log("getDatacomList");
      axios.get("/django/datacom/").then(response => {
        // console.log("Django Company List", response);
        if (response.status === 200) {
          response.type = "Retrieve Datacom List";
          commit('SET_DATACOM_LIST', response.data);
          // dispatch('updateNotification', response);
        }
      }).catch(error => {
        if (error.response) {
          error.type = "Retrieve Datacom List";
          dispatch('updateNotification', error.response);
        }
      });
    },
    //Get Datacom Profile based on Logged in User (Datacom Employee)
    getDatacomLoggedInProfile({ dispatch, commit, rootState }, payload) {
      return new Promise(async (resolve, reject) => {
        if (!rootState.Auth.isAuthenticated) {
          let error = {};
          error.type = "Login Required";
          error.status = 2000;
          dispatch('updateNotification', error);
          return reject(error);
        }
        console.log("getDatacomList", payload);
        var url = "";
        if (payload != undefined) {
          url = '/django/datacom/?id=' + payload.id + '&domain=' + payload.domain;
        }
        axios({
          url: url,
          method: 'get',
          data: payload
        }).then(response => {
          console.log("getDatacomLoggedInProfile response", response);
          if (response.status === 200) {
            commit('SET_DATACOM_PROFILE', response.data[0]);
            response.type = "Retrieve Datacom Profile of Logged In";
            // dispatch('updateNotification', response);
            return resolve(response.data)
          }
        }).catch(error => {
          f7.preloader.hide();
          error.response.type = "Retrieve Datacom Profile of Logged In";
          dispatch('updateNotification', error.response);

          return resolve(error);
        });
      }).catch(error => {
        return error;
      });
    },
    //Get profile of Selected Datacom Company
    getDatacomSelectedProfile({ dispatch, commit, rootState }, payload) {
      return new Promise(async (resolve, reject) => {
        const url = '/django/datacom/?id=' + payload.id;
        axios.get(url).then(response => {
          console.log("getDatacomSelectedProfile response", response);
          if (response.status === 200) {
            commit('SET_SELECTED_DATACOM_PROFILE', response.data);
            response.type = "Retrieve Datacom Profile of Selected";
            // dispatch('updateNotification', response);
            return resolve(response.data)
          }
        }).catch(error => {
          f7.preloader.hide();
          error.response.type = "Retrieve Datacom Profile of Selected";
          dispatch('updateNotification', error.response);

          return resolve(error);
        });
      }).catch(error => {
        return error;
      });
    },
    //Filter Employees by Company
    getDatacomEmployees({ dispatch, commit }, id) {
      return new Promise((resolve, reject) => {
        console.log("Filtering Employees by Datacom Company", id);
        axios.get("/django/employees/?datacom__id=" + id).then(response => {
          console.log("response data", response);
          if (response.status === 200) {
            commit('SET_DATACOM_EMPLOYEES', response.data);
            response.type = "Retrieve Datacom Company Employees";
            dispatch('updateNotification', response);

            return resolve(response.data);
          }
        }).catch(error => {
          f7.preloader.hide();
          error.response.type = "Retrieve Datacom Company Employees";
          dispatch('updateNotification', error.response);

          return resolve(error);
        });
      }).catch(error => {
        return error;
      });
    },
    //Update Methods Need to finish
    updateDatacom({ dispatch, commit }, form) {
      console.log("updateDatacomItem form", form);
      axios.patch("/django/datacom/" + form.id + "/", form).then(response => {
        console.log("Django Update Datacom Item", response);
        if (response.status === 202) {
          dispatch('getDatacomList');
          response.type = "Update Datacom";
          dispatch('updateNotification', response);
        }
      }).catch(error => {
        if (error.response) {
          error.type = "Update Datacom";
          dispatch('updateNotification', error.response);
        }
      })
    },
    //Delete Methods Need to finish
    deleteDatacom({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        console.log("Make Datacom Inactive:", payload);
        axios.patch("/django/datacom/" + payload.id + "/", payload).then(response => {
          console.log("Delete Django Company", response);
          if (response.status === 200) {
            dispatch('getDatacomList');
            response.type = "Delete Datacom";
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          error.type = "Delete Datacom";
          dispatch('updateNotification', error.response);

          return resolve(error);

        });
      }).catch(error => {
        return error;
      });
    }

  },
  getters: {

  }

}

