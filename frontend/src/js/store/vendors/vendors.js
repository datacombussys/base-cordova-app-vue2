import axios from "axios";
import { f7 } from 'framework7-vue';


export const Vendors = {
  namespace: true,
  name: "vendors",
  state: {
    vendorList: [],
    vendorProfile: {}
  },
  mutations: {
    SET_VENDOR_LIST(state, payload) {
      state.vendorList = payload;
    },
    PUSH_NEW_VENDOR(state, payload) {
      state.vendorProfile = payload;
    }
  },
  actions: {
    //Create Methods
    addVendor({ dispatch, commit }, form) {
      return new Promise((resolve, reject) => {
        console.log("createCompany form in Store", form);
        axios.post("/django/vendors/", form).then(response => {
          console.log("Django Company response data", response);
          if (response.status === 201) {
            response.type = "Create Vendor";
            commit('PUSH_NEW_VENDOR', response.data);
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          error.response.type = "Create Vendor";
          dispatch('updateNotification', error.response);
          return resolve(error);
        });
      }).catch(error => {

        return error;
      });
    },
    //GET and LIST Methods
    getVendorList({ commit, dispatch, rootState }, payload) {
      return new Promise((resolve, reject) => {
        if (!rootState.Auth.isAuthenticated) {
          let error = {};
          error.type = "Login Required";
          error.status = 2000;
          dispatch('updateNotification', error);
          return reject(error);
        }
        console.log("getVendorList", payload);
        var url = "";
        if (payload != undefined) {
          url = payload.url;
        }
        axios.get("/django/vendors/" + url, rootState.Auth.axiosHeader).then(response => {
          // console.log("Django Company List", response);
          if (response.status === 200) {
            response.type = "Retrieve Vendor List";
            commit('SET_VENDOR_LIST', response.data);
            // dispatch('updateNotification', response);
            return resolve(response.data);
          }
        }).catch(error => {
          if (error.response) {
            error.type = "Retrieve Vendor List";
            error.response.status = 500;
            dispatch('updateNotification', error.response);
            return resolve(error);
          }
        });
      }).catch(error => {
        return error;
      });
    },
    //Update Methods Need to finish
    updateVendor({ dispatch, commit }, form) {
      console.log("updateVendorItem form", form);
      axios.patch("/django/vendors/" + form.id + "/", form).then(response => {
        console.log("Django Update Vendor Item", response);
        if (response.status === 202) {
          dispatch('getVendorList');
          response.type = "Update Vendor";
          dispatch('updateNotification', response);
        }
      }).catch(error => {
        if (error.response) {
          error.type = "Update Vendor";
          dispatch('updateNotification', error.response);
        }
      })
    },
    //Delete Methods Need to finish
    deleteVendor({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        console.log("Make Vendor Inactive:", payload);
        axios.patch("/django/vendors/" + payload.id + "/", payload).then(response => {
          console.log("Delete Django Company", response);
          if (response.status === 200) {
            dispatch('getVendorList');
            response.type = "Delete Vendor";
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          error.type = "Delete Vendor";
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
};
