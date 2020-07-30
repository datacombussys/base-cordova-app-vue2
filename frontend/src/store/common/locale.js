
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


export const Locale = {
	namespace: true,
	state: {
    //Profile Components
    primaryCountryList: [],
    shippingCountryList: [],
    billingCountryList: [],
    primaryStateList: [],
    shippingStateList: [],
    billingStateList: [],
    primaryCityList: [],
    shippingCityList: [],
    billingCityList: [],
    // Shared Popup Components
    countryList: [],
    stateList: [],
    cityList: [],

	},
	mutations: {
    SET_PRIMARY_COUNTRY_LIST(state, payload) {
      state.primaryCountryList = payload;
    },
    SET_SHIPPING_COUNTRY_LIST(state, payload) {
      state.shippingCountryList = payload;
    },
    SET_BILLING_COUNTRY_LIST(state, payload) {
      state.billingCountryList = payload;
    },
    SET_COUNTRY_LISTS(state, payload) {
      state.primaryCountryList = payload;
      state.shippingCountryList = payload;
      state.billingCountryList = payload;
      state.countryList = payload;
    },
    SET_PRIMARY_STATE_LIST(state, payload) {
      var regions = payload.sort((a,b)=> {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      });
      state.primaryStateList = regions;
    }, 
    SET_BILLING_STATE_LIST(state, payload) {
      var regions = payload.sort((a,b)=> {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      });
      state.billingStateList = regions;
    }, 
    SET_SHIPPING_STATE_LIST(state, payload) {
      var regions = payload.sort((a,b)=> {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      });
      state.shippingStateList = regions;
    }, 
    SET_STATE_LISTS(state, payload) {
      var regions = payload.sort((a,b)=> {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      });
      state.primaryStateList = regions;
      state.billingStateList = regions;
      state.shippingStateList = regions;
      state.stateList = regions;
    }, 
    SET_PRIMARY_CITIES_LIST(state, payload) {
      state.primaryCityList = payload;
    },
    SET_SHIPPING_CITIES_LIST(state, payload) {
      state.shippingCityList = payload;
    },
    SET_BILLING_CITIES_LIST(state, payload) {
      state.billingCityList = payload;
    },
    SET_CITIES_LIST(state, payload) {
      state.cityList = payload;
    } 

	},
	actions: { 
    getCountries({ dispatch, commit }, payload) {
      console.log("Getting Countries payload", payload);
      axios.get("/django/countries/").then(response => {
        console.log("Getting Django Countries", response);
        if (response.status === 200) {
          if(payload.type === 'primary') {
            commit('SET_PRIMARY_COUNTRY_LIST', response.data);
          } else if(payload.type === 'billing') {
            commit('SET_SHIPPING_COUNTRY_LIST', response.data);
          } else if(payload.type === 'shipping') {
            commit('SET_BILLING_COUNTRY_LIST', response.data);
          }
          // response.type = "Retrieve Country List"";
          // dispatch('updateNotification', response);
        }
        return response
      }).catch(error => {
          error.type = "Retrieve Country List";
          dispatch('updateNotification', error);
      })
    },
    getStates({ dispatch, commit }, payload) {
      axios.get("/django/region/?country_id="+ payload.id).then(response => {
        console.log("Getting Django States (Regions)", response);
        if (response.status === 200) {
          if(payload.type === 'primary') {
            commit('SET_PRIMARY_STATE_LIST', response.data);
          } else if(payload.type === 'billing') {
            commit('SET_BILLING_STATE_LIST', response.data);
          } else if(payload.type === 'shipping') {
            commit('SET_SHIPPING_STATE_LIST', response.data);
          }
          // response.type = "Retrieve State List"";
          // dispatch('updateNotification', response);
        }
        return response
      }).catch(error => {
          error.type = "Retrieve State List";
          dispatch('updateNotification', error);
      })
    },
    getCities({ dispatch, commit }, payload) {
      // I need to modify for Company to POST request for shipping, billing, and Primary 
      console.log("GET cities for state id:", payload.id);
      console.log("getCities type:", payload.type);
      axios.get("/django/city/?region_id=" + payload.id).then(response => {
        console.log("Getting Django Cities", response);
        if (response.status === 200) {
          if(payload.type === 'primary') {
            commit('SET_PRIMARY_CITIES_LIST', response.data);
          } else if(payload.type === 'billing') {
            commit('SET_BILLING_CITIES_LIST', response.data);
          } else if(payload.type === 'shipping') {
            commit('SET_SHIPPING_CITIES_LIST', response.data);
          }
          
          // response.type = "Retrieve City List"";
          // dispatch('updateNotification', response);
        }
        return response
      }).catch(error => {
          error.type = "Retrieve City List";
          dispatch('updateNotification', error);
      });
    },
    //Shared Popup Components
    getSharedCountries({ dispatch, commit }) {
      console.log("Getting Countries");
      axios.get("/django/countries/").then(response => {
        console.log("Getting Django Countries", response);
        if (response.status === 200) {
          commit('SET_COUNTRY_LISTS', response.data);
          // response.type = "Retrieve Country List"";
          // dispatch('updateNotification', response);
        }
        return response
      }).catch(error => {
          error.type = "Retrieve Country List";
          dispatch('updateNotification', error);
      })
    },
    getSharedStates({ dispatch, commit }, payload) {
      axios.get("/django/region/?country_id="+ payload).then(response => {
        console.log("Getting Django States (Regions)", response);
        if (response.status === 200) {
          commit('SET_STATE_LISTS', response.data);
          // response.type = "Retrieve State List"";
          // dispatch('updateNotification', response);
        }
        return response
      }).catch(error => {
          error.type = "Retrieve State List";
          dispatch('updateNotification', error);
      })
    },
    getSharedCities({ dispatch, commit }, payload) {
      // I need to modify for Company to POST request for shipping, billing, and Primary 
      console.log("GET cities for state id:", payload);
      console.log("getCities type:", payload.type);
      axios.get("/django/city/?region_id=" + payload).then(response => {
        console.log("Getting Django Cities", response);
        if (response.status === 200) {
          commit('SET_CITIES_LIST', response.data);
          
          // response.type = "Retrieve City List"";
          // dispatch('updateNotification', response);
        }
        return response
      }).catch(error => {
          error.type = "Retrieve City List";
          dispatch('updateNotification', error);
      });
    },


	},
	getters: {
    GET_PRIMARY_COUNTRY_LIST(state) {
      console.log("GET_PRIMARY_COUNTRY_LIST getter",state.primaryCountryList);
      return state.primaryCountryList;
    },
		GET_PRIMARY_STATE_LIST(state) {
      return state.primaryStateList;
    },
    GET_PRIMARY_CITY_LIST(state) {
      return state.primaryCityList;
    },
    GET_BILLING_COUNTRY_LIST(state) {
      return state.billingCountryList;
    },
		GET_BILLING_STATE_LIST(state) {
      return state.billingStateList;
    },
    GET_BILLING_CITY_LIST(state) {
      return state.billingCityList;
    },
    GET_SHIPPING_COUNTRY_LIST(state) {
      return state.shippingCountryList;
    },
		GET_SHIPPING_STATE_LIST(state) {
      return state.shippingStateList;
    },
    GET_SHIPPING_CITY_LIST(state) {
      return state.shippingCityList;
    },
    GET_COUNTRY_LIST(state) {
      return state.countryList;
    },
    GET_STATE_LIST(state) {
      return state.stateList;
    },
    GET_CITY_LIST(state) {
      return state.cityList;
    },

	}
}