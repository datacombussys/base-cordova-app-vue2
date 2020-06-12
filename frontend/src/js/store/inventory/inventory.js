import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Inventory = {
	namespace: true,
	state: {
		//POS Selected Category
		selectedCategory: '',
		inventoryData: {},
		inventoryList: [],
		categories: [],
		inventoryBarcodes: [],
		inventoryGalleryImgs: [],
		//Error Data
		errorHandle: false,
		errorData: [],

	},
	mutations: {
		SET_INVENTORY_LIST(state, payload) {
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
		PUSH_NEW_INVENTORY(state, payload) {
			state.inventoryList.push(payload);
		},
		SET_BARCODE_LIST(state, payload) {
			state.inventoryBarcodes = payload;
		},
		SET_CATEGORY_LIST(state, payload) {
			state.categories = [];
			state.categories = payload;
		},
		SET_GALLERY_LIST(state, payload) {
			state.inventoryGalleryImgs = [];
			state.inventoryGalleryImgs = payload;
		},
		APPEND_GALLERY_LIST(state, payload) {
			state.inventoryGalleryImgs.push(payload);
		},
		SET_ERROR_HANDLER(state, payload) {
			state.errorHandle = true;
			state.errorData = Object.entries(payload.data);
		},
		RESET_ERRORS(state, payload) {
			state.errorData = [];
			state.errorHandle = false;
		},
		REMOVE_CATEGORY_LIST(state, payload) {
			console.log('REMOVE_CATEGORY_LIST payload', payload);
			var indexObj = state.categoryList.findIndex(elem => elem.id === payload);
			console.log('REMOVE_CATEGORY_LIST indexObj', indexObj);
			Vue.delete(state.categoryList, indexObj);
			console.log('REMOVE_CATEGORY_LIST state.categoryList', state.categoryList);
		}
	},
	actions: {
		//Create Methods
		createInventory({ commit, dispatch, rootState }, form) {
			return new Promise((resolve, reject) => {
				console.log("createInventory", form);
				console.log("rootState.Auth.axiosHeader", rootState.Auth.axiosHeader);
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				axios({
					url: "/django/inventory/",
					method: 'post',
					headers: rootState.Auth.axiosHeader.headers,
					data: form
				}).then(response => {
					if (response.status === 201) {
						response.type = "Create Inventory";
						commit('PUSH_NEW_INVENTORY', response.data);
						dispatch('updateNotification', response);
						return resolve(response.data);
					}
				}).catch(error => {
					f7.preloader.hide();
					error.response.type = "Create Inventory";
					error.response.status = "400";
					dispatch('updateNotification', error.response);

					return resolve(error);
				});
			}).catch(error => {
				return error;
			});
		},
		createCategories({ dispatch, commit }, payload) {
			console.log("Creating CategoriesList");
			axios.post("/django/invcategory/", payload).then(response => {
				if (response.status === 201) {
					response.type = "Create Inventory Categories";
					dispatch('getInventoryCategories');
					dispatch('updateNotification', response);
				}
			}).catch(error => {
				if (error.response) {
					dispatch('updateNotification', error.response);
				}
			})
		},
		//GET and LIST Methods
		getInventoryList({ dispatch, commit, rootState }, form) {
			return new Promise(async (resolve, reject) => {
				if (!rootState.Auth.isAuthenticated) {
					let error = {};
					error.type = "Login Required";
					error.status = 2000;
					dispatch('updateNotification', error);
					return reject(error);
				}
				var url = "";
				if (form != undefined) {
					url = form.url;
				}
				axios.get("/django/inventory/" + url, rootState.Auth.axiosHeader).then(response => {
					if (response.status === 200) {
						commit('SET_INVENTORY_LIST', response.data);
						response.type = "Retrieve Inventory List";
						dispatch('updateNotification', response);
					}
				}).catch(error => {
					error.response.type = "Retrieve Inventory List";
					error.response.status = "400";
					dispatch('updateNotification', error.response);
					return resolve(error);

				});
			}).catch(error => {
				return error;
			});

		},
		//Filter by Inventory ID# to retrieve
		getInventoryImages({ dispatch, commit }, id) {
			console.log("getInventoryImages id", id);
			axios.get("django/inventorygallery/?product=" + id).then(response => {
				if (response.status === 200) {
					commit('SET_GALLERY_LIST', response.data);
					response.type = "Retrieve Inventory Images";
					// dispatch('updateNotification', response);
				}
			}).catch(error => {
				if (error.response) {
					dispatch('updateNotification', error.response);
				}
			})
		},
		getInventoryBarcodes({ dispatch, commit }) {
			console.log("getInventoryBarcodes");
			axios.get("/django/invbarcodes/").then(response => {
				if (response.status === 200) {
					commit('SET_BARCODE_LIST', response.data);
					response.type = "Retrieve Inventory Barcodes";
					// dispatch('updateNotification', response);
				}
			}).catch(error => {
				if (error.response) {
					dispatch('updateNotification', error.response);
				}
			})
		},
		getInventoryCategories({ dispatch, commit }) {
			console.log("getInventoryCategories");
			axios.get("/django/invcategory/").then(response => {
				if (response.status === 200) {
					commit('SET_CATEGORY_LIST', response.data);
					response.type = "Retrieve Inventory Categories";
					// dispatch('updateNotification', response);
				}
			}).catch(error => {
				if (error.response) {
					dispatch('updateNotification', error.response);
				}
			})
		},
		//Filter by ID
		getInventoryBarcodesbyId({ dispatch, commit }, form) {
			return new Promise((resolve, reject) => {
				axios.get("/django/invbarcodes/" + form + "/").then(response => {
					console.log("Getting barceodes by ID", form);
					if (response.status === 200) {
						commit('SET_BARCODE_LIST', response.data);
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
		async updateInventoryItem({ dispatch, commit, rootState }, form) {
			await commit('AXIOS_HEADER');
			console.log("updateInventoryItem form", form);
			axios.put("/django/inventory/" + form.id + '/', form, rootState.Auth.axiosHeader).then(response => {
				if (response.status === 200) {
					f7.preloader.hide();
					response.type = "Update Inventory";
					dispatch('updateNotification', response);
					dispatch('getInventoryList');

				}
			}).catch(error => {
				if (error.response) {
					f7.preloader.hide();
					dispatch('updateNotification', error.response);
				}
			})
		},
		//Delete Methods
		deleteInventoryCategories({ dispatch, commit }, payload) {
			console.log("deleteInventoryCategories Payload", payload);
			axios.delete("/django/invcategory/" + payload + "/").then(response => {
				if (response.status === 204) {
					f7.preloader.hide();
					dispatch('getInventoryCategories');
					response.type = "Delete Inventory Categories";
					dispatch('updateNotification', response);
					commit('REMOVE_CATEGORY_LIST', payload);
				}
			}).catch(error => {
				if (error.response) {
					f7.preloader.hide();
					dispatch('updateNotification', error.response);
				}
			});
		},
		deleteInventoryImage({ dispatch, commit }, payload) {
			console.log("deleteInventoryImage Payload", payload);
			axios.delete("/django/inventorygallery/" + payload + '/').then(response => {
				if (response.status === 204) {
					dispatch('getInventoryImages');
					response.type = "Delete Inventory Images";
					dispatch('updateNotification', response);
				}
			}).catch(error => {
				if (error.response) {
					dispatch('updateNotification', error.response);
				}
			});
		},
		deleteInventoryItem({ dispatch, commit }, payload) {
			console.log("deleteInventoryItem Payload", payload);
			axios.put("/django/inventory/" + payload.id + '/', payload).then(response => {
				console.log("Delete Django Inventory Item", response);
				if (response.status === 200) {
					dispatch('getInventoryList');
					response.type = "Delete Inventory";
					dispatch('updateNotification', response);
				}
			}).catch(error => {
				if (error.response) {
					dispatch('updateNotification', error.response);
				}
			});
		},
		//Set Axios Header Informaiton
		setAxiosHeader() {

		},

	},
	getters: {
		getInventory(state) {
			console.log("inventoryList from getter", state.inventoryList);
			return state.inventoryList;
		},
		getInventoryBarcodes(state) {
			console.log("inventoryBarcodes from getter", state.inventoryBarcodes);
			return state.inventoryBarcodes;
		},
		getInventoryGallery(state) {
			console.log("inventoryGalleryImgs from getter", state.inventoryBarcodes);
			return state.inventoryGalleryImgs;
		},
		getInventoryCategories(state) {
			console.log("getInventoryCategories from getter", state.categories);
			return state.categories;
		}
	}
}

