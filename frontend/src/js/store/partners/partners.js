import axios from "axios";
import { f7 } from 'framework7-vue';


export const Partners = {
  namespace: true,
  name: "partners",
  state: {
    partnerList: [],
    partnerProfile: {},
    positionList: [],
    departmentList: [],
    testList: [
      { name: "Bacon and Eggs" },
      { name: "Ham" },
      { name: "Pork" },
      { name: "Ribs" },
      { name: "Gravy" }
    ],
    testName: "Bacon and Eggs"
  },
  mutations: {
    SET_PARTNER_LIST(state, payload) {
      state.partnerList = payload;
    },
    PUSH_NEW_PARTNER(state, payload) {
      state.partnerList.push(payload);
    }
  },
  actions: {
    //Create Methods
    createPartner({ dispatch, commit }, form) {
      return new Promise((resolve, reject) => {
        console.log("createCompany form in Store", form);
        axios.post("/django/partners/", form).then(response => {
          console.log("Django Company response data", response);
          if (response.status === 201) {
            response.type = "Create Partner";
            commit('PUSH_NEW_PARTNER', response.data);
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          error.response.type = "Create Partner";
          dispatch('updateNotification', error.response);
          return resolve(error);
        });
      }).catch(error => {

        return error;
      });
    },
    //GET and LIST Methods
    getPartnerList({ commit, dispatch, rootState }, payload) {
      return new Promise((resolve, reject) => {
        if (!rootState.Auth.isAuthenticated) {
          let error = {};
          error.type = "Login Required";
          error.status = 2000;
          dispatch('updateNotification', error);
          return reject(error);
        }
        var url = "";
        if (payload != undefined) {
          url = payload.url;
        }
        console.log("getPartnerList");
        axios.get("/django/partners/" + url).then(response => {
          console.log("Django Partner List", response);
          if (response.status === 200) {
            response.type = "Retrieve Partner List";
            commit('SET_PARTNER_LIST', response.data);
            // dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          if (error.response) {
            error.type = "Retrieve Partner List";
            dispatch('updateNotification', error.response);

            return resolve(error);
          }
        });
      }).catch(error => {
        return error;
      });

    },
    //Update Methods Need to finish
    updatePartner({ dispatch, commit }, form) {
      console.log("updatePartupdatePartnernerItem form", form);
      axios.patch("/django/partners/" + form.id + "/", form).then(response => {
        console.log("Django Update Partner", response);
        if (response.status === 200 || response.status === 202) {
          dispatch('getPartnerList');
          response.type = "Update Partner";
          dispatch('updateNotification', response);
        }
      }).catch(error => {
        if (error.response) {
          error.type = "Update Partner";
          dispatch('updateNotification', error.response);
        }
      })
    },
    //Delete Methods Need to finish
    deletePartner({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        console.log("Make Partner Inactive:", payload);
        axios.patch("/django/partners/" + payload.id + "/", payload).then(response => {
          console.log("Delete Django Company", response);
          if (response.status === 200) {
            dispatch('getPartnerList');
            response.type = "Delete Partner";
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          error.type = "Delete Partner";
          dispatch('updateNotification', error.response);

          return resolve(error);

        });
      }).catch(error => {
        return error;
      });
    }

  },
  getters: {
    getPartneres(state) {
      console.log("partnerList from getter", state.partnerList);
      return state.partnerList;
    },
    getPartnerDepartments(state) {
      console.log("departmentList from getter", state.departmentList);
      return state.departmentList;
    },
    getPartnerPositions(state) {
      console.log("positionList from getter", state.positionList);
      return state.positionList;
    },
  }
};
