import axios from "axios";
import { f7 } from 'framework7-vue';


export const Customers = {
	namespace: true,
	name: "customers",
	state: {
		customerList: [],
		customerProfile: {},
		//Credit Cards and Banking
		customerCreditCardList: [],
		customerBankAccountList: [],
	},
	mutations: {
		SET_CUSTOMER_LIST(state, payload) {
      state.customerList = payload;
    },
    PUSH_NEW_CUSTOMER(state, payload) {
      state.customerProfile = payload;
    }
	},
	actions: {
		//Create Methods
		createCustomer({ dispatch, commit, rootState}, form) {
			return new Promise((resolve, reject) => {
				console.log("createCustomer form", form);
				if(!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/customers/", form).then(response => {
					console.log("response data", response);
					if (response.status === 200 ||response.status === 201) {
						response.type = "Create Customer";
						commit('PUSH_NEW_CUSTOMER', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
						error.response.type = "Create Customer";
						dispatch('updateNotification', error.response);
						//Customer was not created, so we need to delete the User instance that was created.
						dispatch("deleteUser", form.user_id);

						return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
    //GET and LIST Methods
    getCustomerList({commit, dispatch, rootState}, payload) {
      return new Promise((resolve, reject) => {
        console.log('getCustomerList payload', payload);
				if(!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				} 
				var url = "";
				if(payload != undefined) {
					url = payload.url;
				}
        axios.get("/django/customers/").then(response => {
          if (response.status === 200) {
            response.type = "Retrieve Customer List";
            commit('SET_CUSTOMER_LIST', response.data);
            // dispatch('updateNotification', response);
          }
        }).catch(error => {
          if (error.response) {
            error.type = "Retrieve Customer List";
            dispatch('updateNotification', error.response);
          }
        });
      });
    },
    //Update Methods Need to finish
    PATCHCustomer({ dispatch, commit, rootState }, form) {
      return new Promise((resolve, reject) => {
        console.log("PATCH Customer Info", form);
        if(!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
        axios.patch("/django/customers/" + form.id + "/", form).then(response => {
          console.log("PUT Customer Response Data", response);
          if (response.status === 200) {
            dispatch('getCustomerList');
            response.type = "Update Customer Profile";
            dispatch('updateNotification', response);

            return resolve(response.data);
          }
        }).catch(error => {
          error.response.type = "Update Customer Profile";
          dispatch('updateNotification', error.response);

          return resolve(error);
        });
      
      }).catch(error => {
        return error;
      });
    },
    //Filter Customer Profile based on User ID
		getCustomerProfileByUserID({ dispatch, commit, rootState }, userID) {
			return new Promise(async (resolve, reject) => {
				const url = '/django/customers/?user__id=' + userID;
				axios.get(url).then(response => {
					console.log("getCustomerProfileByUserID response", response);
					if (response.status === 200) {
						commit('SET_EMPLOYEE_PROFILE', response.data);
						response.type = "Retrieve Customer Profile by UserID";
						// dispatch('updateNotification', response);
						return resolve(response.data)
					}
				}).catch(error => {
					error.response.type = "Retrieve Customer Profile";
					dispatch('updateNotification', error.response);

					return resolve(error);
        });
      }).catch(error => {
        return error;
      });
		},
    //Delete Methods Need to finish
    deleteCustomer({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        console.log("Make Customer Inactive:", payload);
        axios.patch("/django/customers/"+ payload.id + "/", payload).then(response => {
          console.log("Delete Django Company", response);
          if (response.status === 200) {
            dispatch('getCustomerList');
            response.type = "Delete Customer";
            dispatch('updateNotification', response);

            return resolve(response.data)
          }
        }).catch(error => {
          error.type = "Delete Customer";
          dispatch('updateNotification', error.response);

          return resolve(error);

        });
      }).catch(error => {
        return error;
      });
    }
	},
	getters: {
		getCustomerCreditCardsList(state) {
			return state.customerCreditCardList;
    },
    GET_CUSTOMER_LIST(state) {
      return state.customerList;
    }
	}
};
