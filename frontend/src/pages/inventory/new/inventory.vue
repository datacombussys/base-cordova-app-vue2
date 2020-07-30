<template>
  <div>
		<!-- Main Container Row -->
		<div class="main-container">
			<!-- Left Column -->
			<div class="left-col">
				<div class="small-block">
					<template>
						<v-card
							max-width="100%"
							class="mx-auto custom-card"
						>
							<v-card-title>
								<div class="title">Elise Sectional Set</div>
								<div class="row justify-between">
									<div class="col-50">
										<div class="subtitle">Inventory</div>
									</div>
									<div class="col-50">
										<v-menu>
											<template v-slot:activator="{ on, attrs }">
												<v-btn 
													small 
													icon
													v-bind="attrs"
													v-on="on">
													<v-icon>mdi-dots-vertical</v-icon>
												</v-btn>
											</template>

											<v-list>
												<v-list-item
													v-for="(item, i) in profileMenu"
													:key="i"
												>
													<v-list-item-title>{{ item.title }}</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-menu>
									</div>
								</div>
							</v-card-title>

							<v-card-text class="mt-4">
								<div class=" flex justify-center items-center">
									<img src="@/static/Databoxx-BoxLogo-175x196.png"
										style="width:130px;height:130px;"
										alt="Please load company profile">
								</div>
								<div class="mt-6">
									<div class="mt-4 business-barcode text-center">
										D-13343645
									</div>
									<p class="text-center">D-13343645</p>
								</div>	
							</v-card-text>
						</v-card>
					</template>
				</div>

				<div class="small-block">
					<v-card>
						<v-card-text>
							<div class="flex flex-wrap w-full">
								<div v-show="!inventorySettings.hideCreateItem" class="mt-4 w-full">
									<DxButton
										width="100%"
										type="success"
										text="New Product"
										@click="newItemButton" />
									<DxButton
										class="mt-4"
										width="100%"
										type="success"
										text="New Service"
										@click="newServiceButton" />
								</div>
								<div v-show="!inventorySettings.hideSaveItem" class="mt-4 w-full">
									<dx-drop-down-button
										text="Save Item"
										width="100%"
										:split-button="true"
										@button-click="createItemandClose"
										@item-click="createItemChoices"
										:items="saveInventoryItems"
										key-expr="id"
									/>
								</div>
								<div v-if="inventorySettings.hideCreateItem" class="mt-4 w-full">
									<DxButton
										width="100%"
										type="danger"
										text="Clear"
										@click="clearandResetButton" />
								</div>
								<div class="mt-4 w-full">
									<DxButton
										width="100%"
										type="warning"
										text="Test"
										@click="testMethod" />
								</div>
							</div>
						</v-card-text>
					</v-card>
				</div>
			</div>
			<div class="right-col">
				<!-- Header Card -->
				<div class="small-block">
					<v-card class="rounded-md">
						<v-card-title>
								<div class="title">Quicklinks
								</div>
						</v-card-title>

						<v-card-text class="flex w-full spacing mt-4">
							<div class="m-4">
								<div class="material-icons mdi-60 text-datacom">multiline_chart</div>
								<div class="text-center">Stats</div>
							</div>
							<div class="m-4 text-center">
								<div class="material-icons mdi-60 text-datacom">notifications</div>
								<div class="text-center">Notifications</div>
							</div>
							<div class="m-4">
								<div class="material-icons mdi-60 text-datacom">pie_chart</div>
								<div class="text-center">Reports</div>
							</div>
							<div class="m-4">
								<router-link to="/help-desk">
								<div class="material-icons mdi-60 text-datacom">settings_applications</div>
								<div class="text-center">Settings</div>
								</router-link>
							</div>
								
						</v-card-text>
					</v-card>
				</div>
				
				<!-- Devextreme Tabs -->
				<template>
					<div class="small-block">
						<v-card class="rounded-md">
							
							<v-card-text class="flex w-full spacing">
								<div id="tabContainer">
									<DxTabPanel 
									:animation-enabled="true"
									:selectedIndex="selectedIndex" 
									:show-nav-buttons="true">
										<DxItem title="Profile" icon="mdi mdi-account-box">
											<template #default>
												<inventoryProfileComponent 
													:formData="inventoryForm"
													:inventorySettings="inventorySettings">
												</inventoryProfileComponent>
											</template>
										</DxItem>
										<DxItem :visible="!inventoryForm.is_service" title="Inventory" icon="mdi mdi-warehouse">
											<template #default>
												<inventoryDetailsComponent
													:formData="inventoryForm"
													:inventorySettings="inventorySettings">
												</inventoryDetailsComponent>
											</template>
										</DxItem>
										<DxItem title="Finance" icon="mdi mdi-cash-usd-outline">
											<template #default>
												<inventoryFinanceComponent 
													:formData="inventoryForm"
													:inventorySettings="inventorySettings">
												</inventoryFinanceComponent>
											</template>
										</DxItem>
										<DxItem title="Sales" icon="mdi mdi-point-of-sale">
											<template #default>
												<inventorySalesComponent :formData="inventoryForm"></inventorySalesComponent>
											</template>
										</DxItem>
										<DxItem title="Gallery" icon="mdi mdi-image">
											<template #default>
												<inventoryImagesGalleryComponent :formData="inventoryForm"></inventoryImagesGalleryComponent>
											</template>
										</DxItem>
										<DxItem title="History" icon="mdi mdi-history">
											<template #default>
												<inventoryHistoryComponent :formData="inventoryForm"></inventoryHistoryComponent>
											</template>
										</DxItem>
										<DxItem title="Database" icon="mdi mdi-database">
											<template #default>
												<databaseComponent 
													:databaseSettings="databaseSettings"
													:databaseData="databaseData">
												</databaseComponent>
											</template>
										</DxItem>
									</DxTabPanel>
								</div>
																	
							</v-card-text>
						</v-card>
					</div>
				</template>
			</div>
			<!-- Dx Scroller -->
			<!-- Loading Spinner Panel -->
			<DxLoadPanel
				:close-on-outside-click="false"
				:visible.sync="isLoadPanelVisible"
				:show-indicator="true"
				:show-pane="true"
				:shading="true"
				shading-color="rgba(0,0,0,0.4)"
			/>
		
		</div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { mapGetters } from "vuex"
import devices from "devextreme/core/devices";
//DevExpress
import { DxScrollView } from 'devextreme-vue/scroll-view'
import DxButton from "devextreme-vue/button"
import DxDropDownButton from 'devextreme-vue/drop-down-button'
import { confirm, custom, alert } from 'devextreme/ui/dialog';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import DxCheckBox from 'devextreme-vue/check-box';
import DxTabPanel, { DxItem } from 'devextreme-vue/tab-panel';


//Components
import inventoryProfileComponent from "./components/inventory-profile-component"
import inventoryDetailsComponent from "./components/inventory-details-component"
import inventorySalesComponent from "./components/inventory-sales-component"
import inventoryHistoryComponent from "./components/inventory-history-component"
import inventoryImagesGalleryComponent from "./components/inventory-images-gallery-component"
import inventoryFinanceComponent from "./components/inventory-finance-component"

import databaseComponent from "@/components/business/new-docs/database-component"

export default {
  name: "inventoryProfile",
	mixins: [

  ],
  components: {
		inventoryProfileComponent,
		inventoryDetailsComponent,
		inventorySalesComponent,
		inventoryHistoryComponent,
		inventoryImagesGalleryComponent,
		inventoryFinanceComponent,
		databaseComponent,
		DxScrollView,
		DxButton,
		DxDropDownButton,
		confirm,
		custom,
		DxLoadPanel,
		alert,
		DxItem,
		DxTabPanel,


	},


	//******************************************** Methods ***********************************************//
  data() {
    return {
			//Main Settings
			selectedIndex: 0,
			saveInventoryItems: [
				"Create and New" ,
				"Create and Edit",
				"Create and Close",
			],
			isLoadPanelVisible: false,
			//Page Settings
			pageSettings: {
				pageTitle: "Inventory Profile"
			},
			profileCardSettings: {
				type: "inventory",
				title: "Inventory Details"
			},
			moduleInfo: {
				name: "inventory",
				type: "profile",
				level: 5
			},
			//Category Popup Component
			invCategory: {
				id: null,
				name: null
			},
			categorySettings: {
				catPopupOpened: false,
			},
			//Image Gallery Popup
			galleryUploadSettings: {
				gallerySheetOpened: false,
			},
			//Edit Profile IMage
			profileImageSettings: {
				url: 'inventory/',
				module: 'Inventory',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},
			profileMenu: [
        { title: 'Profile Image' },
      ],
			//Page Setting for CRUD Display
			inventorySettings: {
				editProfile: false,
				hideUpdateItemButtons: false,
				hideCreateItem: false,
				hideSaveItem: true,	
			},
			//Database Compoennt Data
			databaseSettings: {
				title: "Inventory Database",
				header1: "Id",
				header2: "Name",
				header3: "Number",
				header4: "Position",
				header5: "Mobile",
				header6: "Status",
				col1: "id",
				col2: "profile_img",
				col3: "date_added",
				col4: "name",
				col5: "category",
				col6: "is_active"
			},
			databaseData: {
				tableId: "inventoryTable",
				list: new Array()
			},
			
			//Form Data
			categories: [],
			saleExpireCalendar: [],
			inventoryForm: {
				company: null,
				partner: null,
				datacom: null,
				vendor: null,
				warehouse_loc: null,
				category: null,
				barcode: null,
				id: null,
				name: null,
				global_id: null,
				manufacturer: null,
				model: null,
				model_number: null,
				date_added: null,
				profile_img: null,
				gallery_imgs: null,
				is_service: false,
				is_active: true,
				is_tracked: false,
				is_downloadable: false,
				is_on_website: false,
				is_on_sale: false,
				is_taxable: false,
				product_id: null,
				sku: null,
				product_type: null,
				sales_notes: null,
				vendor_notes: null,
				product_desc: null,
				list_price: null,
				purchase_price: null,
				wholesale_price: null,
				disocunt: null,
				sale_price: null,
				sale_expires: null,
				income_acct: null,
				expense_acct: null,
				retail_margin: 0,
				wholesale_margin: 0,
				qty_on_hand: 0,
				reorder_level: 0,
				weight: 0,
				uom_weight: null,
				width: 0,
				length: 0,
				height: 0,
				uom_dimensions: null
			},
			invImgGallery: {
				files: null,
				title: null,
				sub_title: ""
			},
    }
	},
	//******************************************** Methods ***********************************************//
  methods: {
    testMethod(e) {
		},
		showEditProfile() {
			this.inventorySettings.editProfile = true;
			this.inventorySettings.hideUpdateItemButtons = true;
			this.inventorySettings.hideCreateItem = true;
			this.inventorySettings.hideSaveItem = true;
		},
		toggleEditProfile() {
			this.inventorySettings.editProfile = !this.inventorySettings.editProfile;
			this.inventorySettings.hideUpdateItemButtons = !this.inventorySettings.hideUpdateItemButtons;
			this.inventorySettings.hideCreateItem = !this.inventorySettings.hideCreateItem;
			this.inventorySettings.hideSaveItem = true;
		},
		newItemButton() {
			this.clearFormData();
			//Show/Hide Edit Fields and buttons
			this.inventorySettings.editProfile = true;
			this.inventorySettings.hideCreateItem = !this.inventorySettings.hideCreateItem;
			this.inventorySettings.hideUpdateItemButtons = false;
			this.inventorySettings.hideSaveItem = false;
			this.selectedIndex = 0;
			this.inventoryForm.is_service = false
		},
		newServiceButton() {
			this.clearFormData();
			this.inventorySettings.editProfile = true;
			this.inventorySettings.hideCreateItem = !this.inventorySettings.hideCreateItem;
			this.inventorySettings.hideUpdateItemButtons = false;
			this.inventorySettings.hideSaveItem = false;
			this.selectedIndex = 0;
			this.inventoryForm.is_service = true
		},
		clearandResetButton() {
			this.clearFormData();
			this.resetViewtoHome();
		},
		resetViewtoHome() {
			this.inventorySettings.editProfile = false;
			this.inventorySettings.hideUpdateItemButtons = false;
			this.inventorySettings.hideCreateItem = false;
			this.inventorySettings.hideSaveItem = true;
			this.selectedIndex = 0;
			this.$store.commit("RESET_ERRORS");
		},
		createItemChoices(e) {
			console.log('e', e)
		},
		async createItemandNew() {
			this.$store.commit("RESET_ERRORS");
			console.log("createInventoryandNew Start");
			let reponse = await this.createInventory();
			console.log("reponse", reponse);
			//Clear Form and Reset to Starting Editing Position
			console.log("createInventoryandNew All Done", reponse);
			this.resetViewtoHome();
			this.newItemButton();
		},
		async createItemandEdit() {
			this.$store.commit("RESET_ERRORS");
			console.log("createInventoryandEdit Start");
			let reponse = await this.createInventory();
			console.log("reponse", reponse);
			//Populate Fields with Created Instance
			await this.editInventoryItem(reponse.id);
			this.showEditProfile();
			console.log("createInventoryandEdit All Done", reponse);
		},
		async createItemandClose() {
			this.$store.commit("RESET_ERRORS");
			console.log("createInventoryandClose Start");
			let newitem = await this.createInventory();
			console.log("newitem", newitem);
			//Clear Form and Reset to Starting Viewing Position
			console.log("createInventoryandClose All Done");
			if(newitem != undefined) {
				await this.clearFormData();
				this.resetViewtoHome();
			} else {
			}
		},
		async createInventory() {
			return new Promise( async (resolve, reject) => {
				try {
					var inventoryFormCopy = JSON.parse(JSON.stringify(this.companyForm));

					inventoryFormCopy.sales_notes = this.$refs.salesNotes.f7TextEditor.contentEl.innerHTML;
					inventoryFormCopy.vendor_notes = this.$refs.vendorNotes.f7TextEditor.contentEl.innerHTML;
					inventoryFormCopy.product_desc = this.$refs.productDesc.f7TextEditor.contentEl.innerHTML;
					inventoryFormCopy.sale_expires = this.saleExpireCalendar[0];
					// Handle the Category
					if (this.invCategory.id) {
						var catID = this.invCategory.id;
					}
					inventoryFormCopy.category_id = this.invCategory.id;

					//Dispatch creation method and update Fields with latest Object
					console.log("inventoryFormCopy pre-Action", inventoryFormCopy);

					let newInvForm = await this.setUserPlatformPOST(inventoryFormCopy);
					let response = await this.$store.dispatch("POSTInventory", newInvForm);

					return resolve(response);
				} catch (error) {
					console.log("Promise Response Container Error Create Inventory Item", error);
					return reject(error);
				}
			});
		},
		clearFormData() {
			return new Promise((resolve, reject) => {
				try {
					this.$store.commit("RESET_ERRORS");
					console.log("clearFormData this.inventoryForm", this.inventoryForm);
					for (let key in this.inventoryForm) {
						console.log("key", this.inventoryForm[key]);
						if (this.inventoryForm[key] === true || this.inventoryForm[key] === false) {
							// console.log('TF key', key);
							this.inventoryForm[key] = false;
						} else {
							this.inventoryForm[key] = null;
						}
					}
					for (let key in this.invImgGallery) {
						console.log("key", this.invImgGallery[key]);
						this.invImgGallery[key] = null;
					}
	
					//Reset Variables
					this.inventoryForm.is_active = true;

					return resolve();
				} catch (error) {
					console.log('clearFormData error', error)
					return reject(error);
				}
			});
		},
		async refreshInventory() {
			await this.$store.dispatch("GETInventoryList");
		},
		// Populate Fields for editing in Browser
		editInventoryItem(invID) {
			return new Promise((resolve, reject) => {
				try {
					console.log("editInventoryItem invID", invID);
					this.clearFormData();
					//Get Inventory Item object and map to fields
					var inventoryListID = null;
					if (this.checkedRows.length != 0) {
						var rowID = this.checkedRows.slice(-1)[0].id;
						var findIndexID = this.Inventory.inventoryList.findIndex((elem) => {
							return elem.id == rowID;
						});
						console.log("editInventoryItem findIndexID", findIndexID);
						inventoryListID = findIndexID;
						console.log("IF inventoryListID", inventoryListID);
					} else {
						//Findindex based on ID being passed into the function
						console.log("else editInventoryItem2 invID2", invID);
						console.log("else this.Inventory.inventoryList", this.Inventory.inventoryList);
						var findObj = this.Inventory.inventoryList.findIndex((item) => item.id == invID);
						inventoryListID = findObj;
						console.log("Else inventoryListID", inventoryListID);
					}
					if (this.Inventory.inventoryList === 0) {
						//Is there a list of Inventory items to lookup?
						return "There are no inventory items available";
					}
					if (this.Inventory.inventoryList.length != 0) {
						console.log("editInventoryItem Inventory.inventoryList", this.Inventory.inventoryList);
						console.log("Available List inventoryListID", inventoryListID);

						var InventoryItem = this.Inventory.inventoryList[inventoryListID];
						console.log("editInventory InventoryItem", InventoryItem);
						for (let key in this.inventoryForm) {
							this.inventoryForm[key] = InventoryItem[key];
						}
					}
					this.getInventoryImages();
					//Switch View to Edit Mode
					this.resetViewtoHome();
					this.showEditProfile();
					return resolve("editInventoryItem Completed");
				} catch (error) {
					return reject(error);
				}
			});
		},
		//Get images including Barcode
		async getInventoryImages() {
			//I need to reconfigure this to only get the images for the selected Inventory Item
			try {
				//Get Inventory Gallery Images for ID
				console.log("Get Inv Gallery Imgs this.inventoryForm", this.inventoryForm);
				this.$store.dispatch("GETInventoryImagesById", this.inventoryForm);

			} catch (error) {
				console.log("getInventoryImages Try Catch error", error);
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		PATCHInventoryItem() {
			//House Cleaning
			console.log("PATCHInventoryItem this.inventoryForm", this.inventoryForm);
			this.$store.commit("RESET_ERRORS");

			// Handle Product Description, Vendor Notes, Sales Notes, Calendar Dates
			this.inventoryForm.sales_notes = this.$refs.salesNotes.f7TextEditor.contentEl.innerHTML;
			this.inventoryForm.vendor_notes = this.$refs.vendorNotes.f7TextEditor.contentEl.innerHTML;
			this.inventoryForm.product_desc = this.$refs.productDesc.f7TextEditor.contentEl.innerHTML;
			this.inventoryForm.sale_expires = this.saleExpireCalendar[0];
			// Handle item Categories
			// 1) Item Does have a category Selected, so add
			if (this.invCategory.name) {
				console.log("this.Inventory.categories", this.Inventory.categories);
				console.log("this.invCategory.name", this.invCategory.name);
				var findIndexCat = this.Inventory.categories.findIndex((elem) => {
					return elem.name == this.invCategory.name;
				});
				console.log("Object.keys(this.invCategory).length != 0 findIndexCat", findIndexCat);
				this.inventoryForm.category_id = this.Inventory.categories[findIndexCat]["id"];
			}
			// Handle Product Supplier
			// Handle Warehouse Name
			// Handle Income Acocunt and Expense Account
			// remove profile_img from form
			delete this.inventoryForm.profile_img;
			console.log("this.inventoryForm", this.inventoryForm);
			this.$store.dispatch("PATCHInventoryItem", this.inventoryForm);
			//I may have to refresh the database Inventory items
		},
		//Set inventory item to inactive instead of deleting instance
		async DELETEInventoryItem() {
			console.log("DELETEInventoryItem Start");
			this.$store.commit("RESET_ERRORS");
			// Item MUST be selected from table - No other way to delete
			if (this.checkedRows.length >= 2) {
				//Only Select one item Not more than that
				this.$store.commit("updateNotification", "You must select an item first");
			}
			if (this.checkedRows.length === 0) {
				// None have been selected
				this.$store.commit("updateNotification", "You must select an item first");
			} else {
				var inventoryListID = null;
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.Inventory.inventoryList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("DELETEInventoryItem findIndexID", findIndexID);
				inventoryListID = findIndexID;

				if (this.Inventory.inventoryList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				//Populate current fields with the one in the Store
				if (this.Inventory.inventoryList.length != 0) {
					let InventoryItem = this.Inventory.inventoryList[inventoryListID];
					console.log("DELETEInventoryitem len===1 InventoryItem", InventoryItem);
					for (let key in this.inventoryForm) {
						this.inventoryForm[key] = InventoryItem[key];
					}
					//Set to inactive
					this.inventoryForm.is_active = false;
					await this.$store.dispatch("DELETEInventoryItem", this.inventoryForm);
				}
			}
			await this.clearFormData();
			this.resetViewtoHome();
		},
		deleteChip() {
			console.log("deleting Chip");
		},	
		calcWholesaleMargin(e) {
			console.log("calcWholesaleMargin");
			this.inventoryForm.wholesale_price = e.target.value;
			this.inventoryForm.wholesale_margin =
				(this.inventoryForm.wholesale_price - this.inventoryForm.purchase_price) / this.inventoryForm.list_price;
		},
		calcRetailMargin(e) {
			console.log("calcRetailMargin");
			this.inventoryForm.list_price = e.target.value;
			this.inventoryForm.retail_margin = (this.inventoryForm.list_price - this.inventoryForm.purchase_price) / this.inventoryForm.list_price;
		},
		receiveExpDate(date) {
			console.log('receiveExpDate date', date);
			this.inventoryForm.sale_expires = date;
		}
		
  },
  computed: {
		...mapState(["Auth", "Inventory", "Orders", "Merchants", "Errors", "Static", "Users"]),
		...mapGetters(["GET_INVENTORY_LIST", "GET_INV_CATEGORY_LIST"]),
		...mapGetters(["GET_DATACOM_ERRORS_LIST", "GET_DATACOM_ERROR_HANDLE"]),
		errorData() {
			return this.GET_DATACOM_ERRORS_LIST
		},
		errorHandle() {
			return this.GET_DATACOM_ERROR_HANDLE
		}
    
  },
  watch: {

  },
  mounted() {


		
		
    
  },
  created() {

  },

    
  }
</script>

<style lang="scss">
#tabContainer {
	width: 100%;
}

</style>

