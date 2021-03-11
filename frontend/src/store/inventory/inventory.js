import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import apiRoutes from '@/js/api-routes';

export const Inventory = {
	namespace: true,
	state: {
		inventoryList: [],
		inventoryProfile: {},
		categoryList: [],
		categoryProfile: {},
		selectedCategoryList: [],
		selectedCategoryProfile: {},
		inventoryGalleryList: [],
		inventoryGalleryProfile: {},
		selectedInventoryGalleryList: [],
		selectedInventoryGalleryProfile: {},

		//POS Module Selected Category
		selectedCategory: '',

	},
	mutations: {
		SET_INVENTORIES_LIST(state, payload) {
			console.log('SET_INVENTORY_LIST', payload)
			console.log('state.inventoryList', state.inventoryList)
      // setting price as the sale price or retail price
			var saleItemList = payload.filter(item => item.sale_price != null)
			console.log('saleItemList', saleItemList)
			saleItemList.map(elem => {
				elem['price'] = elem.sale_price;
			});
			var listPriceItemList = payload.filter(item => item.sale_price === null)
			console.log('listPriceItemList', listPriceItemList)
			listPriceItemList.map(elem => {
				// console.log("elem", elem);
				elem['price'] = elem.list_price;
			});
			var combined = listPriceItemList.concat(saleItemList);

			state.inventoryList = combined;
			console.log('state.inventoryList', state.inventoryList)
    },
    PUSH_NEW_INVENTORY(state, payload) {
      state.inventoryList.push(payload);
		},
		SET_SELECTED_INVENTORY_LIST(state, payload) {
			state.selectedInventoryList = payload
		},
		SET_INVENTORY_PROFILE(state, payload) {
			state.inventoryProfile = payload
		},

		UPDATE_INVENTORY_PROFILE_AND_LIST(state, payload) {
			console.log('payload', payload);
			let listIndex = state.inventoryList.findIndex(elem => elem.id === payload.id);
			state.inventoryList.splice(listIndex, 1, payload);
			console.log('state.inventoryList', state.inventoryList);
			state.inventoryProfile = payload
		},
		UPDATE_SELECTED_INVENTORY_PROFILE_AND_LIST() {
			let listIndex = state.selectedInventoryList.findIndex(elem => elem.id === payload.id);
      state.selectedInventoryList.splice(listIndex, 1, payload);
			console.log('state.selectedInventoryList', state.selectedInventoryList);

		},
    PATCH_DELETE_INVENTORY_PROFILE(state, payload) {
      console.log('payload', payload);
      let listIndex = state.inventoryList.findIndex(elem => elem.id === payload.id);
      state.inventoryList.slice(listIndex, 1);
      console.log('state.inventoryList', state.inventoryList);
		},
		//********************************************************************** */

		//Catgories
		PUSH_NEW_INVENTORY_CATEGORY(state, payload) {
			console.log('PUSH_NEW_INVENTORY_CATEGORY payload', payload);
			state.categoryList.push(payload);
		},
		SET_CATEGORIES_LIST(state, payload) {
			console.log('SET_CATEGORY_LIST payload', payload);
			state.categoryList = payload;
		},
		DELETE_INVENTORY_CATEGORY(state, payload) {
			console.log('REMOVE_CATEGORY_LIST payload', payload);
			var indexObj = state.categoryList.findIndex(elem => elem.id === payload.id);
			console.log('REMOVE_CATEGORY_LIST indexObj', indexObj);
			Vue.delete(state.categoryList, indexObj);
			console.log('REMOVE_CATEGORY_LIST state.categoryList', state.categoryList);
		},

		//Image Gallery
		SET_INVENTORY_IMAGES_LIST(state, payload) {
			state.inventoryGalleryList = payload;
		},
		DELETE_INVENTORY_IMAGE(state, payload) {
			var indexObj = state.inventoryGalleryList.findIndex(elem => elem.id === payload);
			Vue.delete(state.inventoryGalleryList, indexObj);
			console.log('DELETE_INVENTORY_IMAGE state.inventoryGalleryList', state.inventoryGalleryList);
		},

		
	},
	actions: {
		POSTInventory({dispatch}, payload) {
			return new Promise(async (resolve, reject) => {
				payload.endpoint = 'inventory/';
				payload.type = 'Create Inventory';
				payload.mutation = 'PUSH_NEW_INVENTORY'
				await dispatch("POSTItem",  payload)
				return resolve()
			})
		},
		GETInventoryList({dispatch}, payload) {
			return new Promise(async (resolve, reject) => {
				payload.endpoint = 'inventory-list/';
				payload.type = 'Get Inventory List';
				payload.mutation = 'SET_INVENTORIES_LIST'
				await dispatch("GETItemList",  payload)
				return resolve()
			})
		},

		GETInventoryProfile({dispatch}, payload) {
			return new Promise(async (resolve, reject) => {
				payload.endpoint = 'inventory/';
				payload.type = 'Get Inventory Profile';
				payload.mutation = 'SET_INVENTORY_PROFILE'
				let response = await dispatch("GETItemProfileById",  payload)
				console.log('GETInventoryProfile response', response)
				return resolve(response)
			})
			
		},

		PATCHInventoryProfile({dispatch}, payload) {
			payload.endpoint = 'inventory/';
			payload.type = 'Update Inventory';
			payload.mutation = 'UPDATE_INVENTORY_PROFILE_AND_LIST'
			dispatch("PATCHItemProfile",  payload)
		},
		PATCHDeleteInventoryProfile({dispatch}, payload) {
			payload.endpoint = 'inventory/';
			payload.type = 'Delete Inventory';
			payload.mutation = 'PATCH_DELETE_INVENTORY_PROFILE'
			dispatch("PATCHDeleteItemProfile",  payload)
		},
		//********************************************************************** */

		//Categories Actions
		POSTCategories({dispatch}, payload) {
			return new Promise(async(resolve, reject) => {
				payload.endpoint = 'inventory-category/';
				payload.type = 'Create Inventory Category';
				payload.mutation = 'PUSH_NEW_INVENTORY_CATEGORY'
				await dispatch("POSTItem",  payload)
				return resolve()
			})
			
		},
		GETInvCategoriesByFilter({dispatch}, payload) {
			return new Promise(async(resolve, reject) => {
				payload.endpoint = 'inventory-category/';
				payload.type = 'Get Inventory Categories';
				payload.mutation = 'SET_CATEGORIES_LIST'
				await dispatch("GETFilterList",  payload)
				return resolve()
			})
			
		},
		DELETEInventoryCategory({dispatch}, payload) {
			payload.endpoint = 'inventory-category/';
			payload.type = 'Delete Inventory Category';
			payload.mutation = 'DELETE_INVENTORY_CATEGORY'
			dispatch("DELETEItemProfile",  payload)
		},
		
		//Inventory Images
		GETInventoryImagesByFilter({dispatch}, payload) {
			payload.endpoint = "inventory-gallery/"
			payload.filterURL = "?product="
			payload.type = 'Get Inventory Images';
			payload.mutation = 'SET_INVENTORY_IMAGES_LIST'
			dispatch("GETFilterList",  payload)
		},
		DELETEInventoryImage({dispatch}, payload) {
			payload.endpoint = "inventory-gallery/"
			payload.type = 'Delete Inventory Image';
			payload.mutation = 'DELETE_INVENTORY_IMAGE'
			dispatch("DELETEItemProfile",  payload)
		},

		//POST Inventory
    async POSTItem({commit, dispatch, rootState},  payload) {
      return new Promise( async (resolve, reject) => {
        try {
          let response = await apiRoutes.POSTItem(dispatch, rootState, payload, payload.endpoint, payload.type);
					console.log('POSTInventory response', response);
					if(response.status === 201) {
						commit(payload.mutation, response.data);
          return resolve(response)
					}
          else {
						return reject(response)
					}

        } catch (error) {
          console.error("POSTInventory error.response", error);
					return reject(response)
        }
      }).catch(error => {
        console.error("POSTInventory Promise error.response", error);
        return error;
			});
    },
    //GET Inventory list - Abbreviated List relating to logged in user
    async GETItemList({commit, dispatch, rootState},  payload) {
			return new Promise( async (resolve, reject) => {
				try {
					let response = await apiRoutes.GETList(dispatch, rootState, payload, payload.endpoint, payload.type);
					console.log('GETItemList response', response);
					commit(payload.mutation, response.data);
					return resolve(response)
				} catch(error) {
					console.error("POSTInventory Promise error.response", error);
        	return error;
				}
			})
			
		},
		//GET List by Filter
		async GETFilterList({commit, dispatch, rootState}, payload) {
			//filterURL is passed from the original call
			let response = await apiRoutes.GETFilterList(dispatch, rootState, payload, payload.endpoint, payload.type);
			console.log('GETSelectedFilterList response', response);
			commit(payload.mutation, response.data);
		},
     //GET Inventory Profile - Get full details of selected Inventory Item relating to logged in users account
		 GETItemProfileById({commit, dispatch, rootState}, payload) {
			return new Promise( async (resolve, reject) => {
				console.log('GETItemProfileById payload', payload);
				let response = await apiRoutes.GETProfileById(dispatch, rootState, payload, payload.endpoint, payload.type);
				console.log('GETItemProfileById response', response);
				commit(payload.mutation, response.data);
				return resolve(response.data);
			});
		},
    
		//PATCH Profile
		//This endpoint only updates items of itmes relating to user account only
    async PATCHItemProfile({commit, dispatch, rootState}, payload) {
			let response = await apiRoutes.PATCHItem(dispatch, rootState, payload, payload.endpoint, payload.type);
			console.log('PATCHItemProfile response', response);
			commit(payload.mutation, response.data);
		},
		//This endpoint only updates items of itmes relating to user account only
    async PATCHSelectedItemProfile({commit, dispatch, rootState}, payload) {
			let response = await apiRoutes.PATCHItem(dispatch, rootState, payload, payload.endpoint, payload.type);
			console.log('PATCHSelectedItemProfile response', response);
			commit(payload.mutation, response.data);
		},

		//PATCHDelete PROFILE - Changes is_active to false
		//This endpoint only updates items of itmes relating to user account only
    async PATCHDeleteItemProfile({commit, dispatch, rootState}, payload) {
			let response = await apiRoutes.PATCHDeleteItem(dispatch, rootState, payload, payload.endpoint, payload.type);
			console.log('PATCHDeleteItemProfile response', response);
			commit(payload.mutation, payload);
		},
		//DELETEProfile - Actually deleted the item from the db
		async DELETEItemProfile({commit, dispatch, rootState}, payload) {
			let response = await apiRoutes.DELETEItem(dispatch, rootState, payload, payload.endpoint, payload.type);
			console.log('DELETEItemProfile response', response);
			commit(payload.mutation, payload);
		},
		//Not possible to delete items from sub-accounts from parent
		

	},
	getters: {
		GET_INVENTORY_LIST(state) {
      return state.inventoryList;
		},
		GET_INVENTORY_LIST_LENGTH(state) {
			return state.inventoryList.length;
		},
    GET_SELECTED_INVENTORY_PROFILE(state) {
      return state.selectedInventoryProfile;
    },
    GET_INVENTORY_PROFILE(state)   {
      return state.inventoryProfile;
		},
		GET_SELECTED_INVENTORY_LIST(state) {
			return state.selectedInventoryList;
		},
		GET_SELECTED_INVENTORY_LIST_LENGTH(state) {
			return state.selectedInventoryList.length;
		},
		GET_INVENTORY_IMAGE_GALLERY_LIST(state) {
			return state.inventoryGalleryList;
		},
		GET_INV_CATEGORY_LIST(state) {
			return state.categoryList;
		},
		GET_INV_CATEGORY_LIST_LENGTH(state) {
			return state.categoryList.length;
		}
	}
}
