;
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


export const Labels = {
	namespace: true,
	state: {
		inventoryLabelList: [],
	},
	mutations: {
    SET_INV_LABEL_LIST(state, payload) {
			state.inventoryLabelList = payload;
    },
    PUSH_NEW_LABEL(state, payload) {
      state.inventoryLabelList.push(payload);
    }
    
	},
	actions: {
    //Get methods
    getInventoryLabels({ dispatch, commit }) {
			console.log("getInventoryLabels");
			axios.get("/django/inventory-labels/").then(response => {
				console.log("Django Inventory Labels", response);
				console.log("Inventory Labels response.status", response.status);
				if (response.status === 200) {
					commit('SET_INV_LABEL_LIST', response.data);
					commit('updateNotification', `Getting Inventory Labels, Status: ${response.statusText}`);
				}
			}).catch(error => {
				if (error.response) {
					console.log("We caught an error", error.response.data);
					commit('updateNotification', `There was an error getting Inventory Labels, Response: ${error.response.data.detail}`);
					console.log("Update error Msg from axios GET Inventory Labels error", error.response);
				}
      });
    },
      //Create methods
      createInventoryLabels({ dispatch, commit }, form) {
        console.log("getInventoryLabels");
        axios.post("/django/inventory-labels/", form).then(response => {
          console.log("Creating Django Inventory Labels", response);
          console.log("Create Inventory Labels response.status", response.status);
          if (response.status === 200) {
            commit('PUSH_NEW_LABEL', response.data);
            dispatch('getInventoryLabels');
            commit('updateNotification', `Getting Inventory Labels, Status: ${response.statusText}`);
          }
        }).catch(error => {
          if (error.response) {
            console.log("We caught an error", error.response.data);
            commit('updateNotification', `There was an error getting Inventory Labels, Response: ${error.response.data.detail}`);
            console.log("Update error Msg from axios GET Inventory Labels error", error.response);
          }
        });
      },
			
  },
	getters: {
    getInventoryLabelList(state) {
			console.log("Inventory Labels from getter", state.inventoryLabelList);
			return state.inventoryLabelList;
		},
	}
}

