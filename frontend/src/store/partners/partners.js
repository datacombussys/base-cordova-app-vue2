

import apiRoutes from '@/js/api-routes';


export const Partners = {
  namespace: true,
  name: "partners",
  state: {
    partnerList: [],
    partnerProfile: {},
    partnerFilterList: [],
    selectedPartnerProfile: {},
  },
  mutations: {
    SET_PARTNER_LIST(state, payload) {
      state.partnerList = payload;
    },
    PUSH_NEW_PARTNER(state, payload) {
      state.partnerList.push(payload);
    },
    SET_PARTNER_PROFILE(state, payload) {
      state.partnerProfile = payload;
    },
    SET_SELECTED_PARTNER_PROFILE(state, payload) {
      state.selectedPartnerProfile = payload;
    },
    SET_PARTNER_FILTERED_LIST(state, payload) {
      this.partnerFilterList = payload
    },
    UPDATE_PARTNER_PROFILE() {
      console.log('payload', payload);
      let listIndex = state.partnerList.findIndex(elem => elem.id === payload.id);
      state.partnerList.slice(listIndex, 1);
      state.partnerList.splice(listIndex, 1, payload);
      console.log('state.partnerList', state.partnerList);
    },
    PATCH_DELETE_PARTNER_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.partnerList.findIndex(elem => elem.id === payload.id);
      state.partnerList.slice(listIndex, 1);
      console.log('state.partnerList', state.partnerList);
    }
  },
  actions: {
    //Create Methods
    async POSTPartner({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let endpoint = 'partner/';
					let type = 'Create New Partner';
					let response = await apiRoutes.POSTItem(dispatch, rootState,payload, endpoint, type);
					console.log('POSTPartner response', response);
					commit('PUSH_NEW_PARTNER', response);

					return resolve(response)
				} catch(error) {
					return reject(response)
				}
			})
    },
    //GET Partner LIST
    async GETPartnerList({commit, dispatch, rootState}, payload) {
			let endpoint = 'partner-list/';
      let type = 'Get Partner List';
			let response = await apiRoutes.GETList(dispatch, rootState,payload, endpoint, type);
			console.log('GETPartnerList response', response);
			commit('SET_PARTNER_LIST', response.data);
    },
    //GET Own Partner Profile by Id
    async GETPartnerProfileById({commit, dispatch, rootState}, payload) {
			let endpoint = 'partner/';
      let type = 'Get Partner Profile';
      let response = await apiRoutes.GETProfileById(dispatch, rootState,payload, endpoint, type);
      console.log('GETPartnerOwnProfile response', response);
      commit('SET_PARTNER_PROFILE', response.data);
    },
    //GET Selected Profile by Id
    async GETSelectedPartnerProfileById({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        let endpoint = 'partner/';
        let type = 'Get Partner Profile';
        let response = await apiRoutes.GETProfileById(dispatch, rootState,payload, endpoint, type);
        console.log('GETSelectedPartnerProfileById response', response);
        commit('SET_SELECTED_PARTNER_PROFILE', response.data);
        
        return resolve(response.data);
      });
    },
    //GET Selected Profile by Filter
    async GETFilteredPartnerList({commit, dispatch, rootState}, payload) {
      return new Promise( async (resolve, reject) => {
        let endpoint = 'partner/';
        let type = 'Get Partner List';
        let response = await apiRoutes.GETProfileById(dispatch, rootState,payload, endpoint, type);
        console.log('GETSelectedPartnerProfileById response', response);
        commit('SET_PARTNER_FILTERED_LIST', response.data);
        
        return resolve(response.data);
      });
    },
    //PATCH Profile
    async PATCHPartnerProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'partner/';
      let type = 'Update Partner Profile';
			let response = await apiRoutes.PATCHItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHPartnerProfile response', response);
			commit('UPDATE_PARTNER_PROFILE', response.data);
    },
    //PATCHDelete PROFILE
    async PATCHDeletePartnerProfile({commit, dispatch, rootState}, payload) {
			let endpoint = 'partner/';
      let type = 'Delete Partner Profile';
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState,payload, endpoint, type);
			console.log('PATCHDeletePartnerProfile response', response);
			commit('PATCH_DELETE_PARTNER_PROFILE', payload);
    },
  },




  getters: {
    GET_PARTNER_LIST(state) {
      console.log("partnerList from getter", state.partnerList);
      return state.partnerList;
    },
    GET_PARTNER_PROFILE(state) {
      return state.partnerProfile;
    },
    GET_SELECTED_PARTNER_PROFILE(state) {
      return state.selectedPartnerProfile;
    }
  }
};
