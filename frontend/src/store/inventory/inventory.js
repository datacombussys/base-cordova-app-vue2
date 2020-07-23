import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios"

import apiRoutes from '@/js/api-routes';

export const Inventory = {
	namespace: true,
	state: {
		//POS Selected Category
		selectedCategory: '',
		inventoryData: {},
		inventoryList: [],
		categoriesList: [],
		inventoryGalleryImgs: [],

	},
	mutations: {
		SET_INVENTORY_LIST(state, payload) {
			// setting price as the sale price or retail price
			var saleItemList = payload.filter(item => item.sale_price != null)
			saleItemList.map(elem => {
				elem['price'] = elem.sale_price;
			});
			var listPriceItemList = payload.filter(item => item.sale_price === null)
			listPriceItemList.map(elem => {
				// console.log("elem", elem);
				elem['price'] = elem.list_price;
			});
			var combined = listPriceItemList.concat(saleItemList);

			state.inventoryList = combined;
		},
		PUSH_INVENTORY_LIST(state, payload) {
			state.inventoryList.push(payload);
		},
		SET_CATEGORY_LIST(state, payload) {
			state.categoriesList = payload;
		},
		PUSH_INVENTORY_CATEGORY(state, payload) {
			state.categoriesList.push(payload);
		},
		SET_GALLERY_LIST(state, payload) {
			state.inventoryGalleryImgs = payload;
		},
		APPEND_GALLERY_LIST(state, payload) {
			state.inventoryGalleryImgs.push(payload);
		},

		REMOVE_CATEGORY_FROM_LIST(state, payload) {
			console.log('REMOVE_CATEGORY_LIST payload', payload);
			var indexObj = state.categoryList.findIndex(elem => elem.id === payload);
			console.log('REMOVE_CATEGORY_LIST indexObj', indexObj);
			Vue.delete(state.categoryList, indexObj);
			console.log('REMOVE_CATEGORY_LIST state.categoryList', state.categoryList);
		}
	},
	actions: {
		//Create Methods
		POSTInventory({ commit, dispatch, rootState }, form) {
			console.log("createInventory", form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/inventory/", form).then(response => {
					if (response.status === 200 || response.status === 201) {
						response.type = "Create Inventory";
						commit('PUSH_INVENTORY_LIST', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Create Inventory";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		POSTCategories({ commit, dispatch, rootState }, form) {
			console.log("createCategories", form);
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios.post("/django/invcategory/", form).then(response => {
					if (response.status === 200 || response.status === 201) {
						response.type = "Create Inventory Categories";
						commit('PUSH_INVENTORY_CATEGORY', response.data);
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Create Inventory Categories";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		//GET and LIST Methods
		GETInventoryList({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("GETInventoryList error", error);
					return reject(error);
				}
				console.log("GETInventoryList", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/inventory/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_INVENTORY_LIST', response.data);
						response.type = "Retrieve Inventory";
						// dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Inventory";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			});
		},
		//Still Need to fix by passing in the ID of the inventory Item
		GETInventoryImagesById({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("GETInventoryList error", error);
					return reject(error);
				}
				console.log("GETInventoryList", payload);
				axios.get("/django/inventorygallery/?product=" + payload.id).then(response => {
					if (response.status === 200) {
						commit('SET_INVENTORY_LIST', response.data);
						response.type = "Retrieve Inventory Item";
						dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Inventory Item";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			});
		},
		GETInventoryCategories({ dispatch, commit, rootState }, payload) {
			var platForm = rootState.Auth.platformInfo;
			return new Promise((resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("GETInventoryList error", error);
					return reject(error);
				}
				console.log("getHolidays", payload);
				var url = platForm.url;
				if (payload != undefined) {
					url = payload.url;
				}
				axios.get("/django/invcategory/" + url).then(response => {
					if (response.status === 200) {
						commit('SET_CATEGORY_LIST', response.data);
						response.type = "Retrieve Inventory Categories";
						dispatch('updateNotification', response);

						return resolve();
					}
				}).catch(error => {
					error.type = "Retrieve Inventory Categories";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			});
		},

		//Filter by ID
		GETInventoryBarcodeById({ dispatch, commit }, form) {
			return new Promise((resolve, reject) => {
				axios.get("/django/invbarcodes/" + form.id + "/").then(response => {
					console.log("Getting barceodes by ID", form);
					if (response.status === 200) {
						response.type = "Retrieve Inventory Barcode";
						dispatch('updateNotification', response);

						return resolve(response.data);
					}
				}).catch(error => {
					if (error.response) {
						dispatch('updateNotification', error.response);

						return resolve(error);
					}
				});
			}).catch(error => {
				return error;
			});

		},
		//Update Methods
		PATCHInventoryItem({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("PATCH Inventory Item", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("PATCHInventoryItem error", error);
					return reject(error);
				}
				axios.patch("/django/inventory/" + form.id + "/", form).then(response => {
					console.log("PATCH Inventory Item", response);
					if (response.status === 200) {
						response.type = "Update Inventory Item";
						dispatch('updateNotification', response);
						//I still need to make a commitment to update the current inventoy in Vuex

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Update Inventory Item";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},

		//Delete Methods
		DELETEInventoryCategory({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("DELETE Inventory Category", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("DELETEInventoryCategory error", error);
					return reject(error);
				}
				axios.delete("/django/invcategory/" + form.id).then(response => {
					console.log("DELETE Inventory Category", response);
					if (response.status === 204) {
						response.type = "Delete Inventory Category";
						dispatch('updateNotification', response);
						commit('REMOVE_CATEGORY_FROM_LIST', form.id);
						//Need to make a mutation to remove from Vuex using form.id

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete Inventory Category";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		DELETEInventoryImage({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("DELETE Inventory Item", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("DELETEInventoryImage error", error);
					return reject(error);
				}
				axios.delete("/django/inventorygallery/" + form.id).then(response => {
					console.log("DELETE Inventory Item", response);
					if (response.status === 204) {
						response.type = "Delete Inventory Item";
						dispatch('updateNotification', response);
						//Need to make a mutation to remove from Vuex using form.id

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete Inventory Item";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		DELETEInventoryItem({ dispatch, commit, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("DELETE Inventory Item", form);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					console.log("DELETEInventoryItem error", error);
					return reject(error);
				}
				form.is_active=false;
				axios.delete("/django/inventory/" + form.id).then(response => {
					console.log("DELETE Inventory Item", response);
					if (response.status === 204) {
						response.type = "Delete Inventory Item";
						dispatch('updateNotification', response);
						//Need to make a mutation to remove from Vuex using form.id

						return resolve(response.data);
					}
				}).catch(error => {
					error.type = "Delete Inventory Item";
					dispatch('updateNotification', error);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},


	},
	getters: {
		GET_INVENTORY_LIST(state) {
			return state.inventoryList;
		},
		GET_INVENTORY_IMAGE_GALLERY_LIST(state) {
			return state.inventoryGalleryImgs;
		},
		GET_INV_CATEGORY_LIST(state) {
			return state.categoriesList;
		},
		GET_INV_CATEGORY_LIST_LENGTH(state) {
			return state.categoriesList.length;
		}
	}
}

