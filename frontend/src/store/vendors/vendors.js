


import apiRoutes from '@/js/api-routes';


export const Vendors = {
  namespace: true,
  name: "vendors",
  state: {
    vendorList: [],
    vendorProfile: {},
    selectedVendorProfile: {},
  },
  mutations: {
    SET_VENDOR_LIST(state, payload) {
      state.vendorList = payload;
    },
    PUSH_NEW_VENDOR(state, payload) {
      state.vendorList.push(payload);
    },
    SET_OWN_VENDOR_PROFILE(state, payload) {
      state.vendorProfile = payload;
    },
    SET_SELECTED_VENDOR_PROFILE(state, payload) {
      state.selectedVendorProfile = payload;
    },
    UPDATE_VENDOR_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.vendorList.findIndex(elem => elem.id === payload.id);
      state.vendorList.slice(listIndex, 1);
      state.vendorList.splice(listIndex, 1, payload);
      console.log('state.vendorList', state.vendorList);
    },
    PATCH_DELETE_VENDOR_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.vendorList.findIndex(elem => elem.id === payload.id);
      state.vendorList.slice(listIndex, 1);
      console.log('state.vendorList', state.vendorList);
    },

  },
  actions: {
    //Create Methods
    async POSTVendor({commit, dispatch, rootState}, payload) {
      let endpoint = 'vendor/';
      let type = 'Create New Vendor';
      let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
      console.log('POSTVendor response', response);
      commit('PUSH_NEW_VENDOR', response);
    },
    //GET Vendor LIST
    async GETVendorList({commit, dispatch, rootState}, payload) {
      let endpoint = 'vendor-list/';
      let type = 'Get Vendor List';
      let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
      console.log('GETVendorList response', response);
      commit('SET_VENDOR_LIST', response.data);
    },
    //GET Own Vendor Profile
    async GETVendorOwnProfile({commit, dispatch, rootState}, payload) {
      let endpoint = 'vendor/';
      let type = 'Get Vendor Profile';
      let response = await apiRoutes.GETOwnProfile(dispatch, rootState,payload, endpoint, type);
      console.log('GETVendorOwnProfile response', response);
      commit('SET_OWN_VENDOR_PROFILE', response.data);
    },
    //GET Selected Profile
    async GETVendorSelectedProfile({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        let endpoint = 'vendor/';
        let type = 'Get Vendor Profile';
        let response = await apiRoutes.GETSelectedProfile(dispatch, rootState,payload, endpoint, type);
        console.log('GETVendorSelectedProfile response', response);
        commit('SET_SELECTED_VENDOR_PROFILE', response.data);
        return resolve(response.data);
      });
    },
    //PATCH Profile
    async PATCHVendorProfile({commit, dispatch, rootState}, payload) {
      let endpoint = 'vendor/';
      let type = 'Update Vendor Profile';
      let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
      console.log('PATCHVendorProfile response', response);
      commit('UPDATE_VENDOR_PROFILE', response.data);
    },
    //PATCHDelete PROFILE
    async PATCHDeleteProfile({commit, dispatch, rootState}, payload) {
      let endpoint = 'vendor/';
      let type = 'Delete Vendor Profile';
      let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState,payload, endpoint, type);
      console.log('PATCHVendorProfile response', response);
      commit('PATCH_DELETE_VENDOR_PROFILE', payload);
    },

  },
  getters: {
    GET_VENDOR_LIST(state) {
			return state.vendorList;
    },
    GET_VENDOR_LIST_LENGTH(state) {
			return state.vendorList.length;
    },
    GET_OWN_VENDOR_PROFILE(state) {
      return state.vendorProfile;
    },
    GET_SELECTED_VENDOR_PROFILE(state) {
      return state.selectedVendorProfile;
    }
  }
};
