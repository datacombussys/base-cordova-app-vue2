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
								<div class="title">Sectional Set</div>
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
													@click="clickProfileMenu"
												>
													<v-list-item-title>{{ item.title }}</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-menu>
										<profileImageComponent 
											ref="profileImageComponent"
											:openImageSheet="inventorySettings.openImageSheet"
											@closeSheet="closeSheet"
											:profileImageSettings="profileImageSettings"
											:profileData="inventoryForm" />
									</div>
								</div>
							</v-card-title>

							<v-card-text class="mt-4">
								<div v-if="!inventoryForm.id" class="flex justify-center items-center">
									<img
										class="mt-3 disabled"
										src="@/static/Databoxx-BoxLogo-175x196.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>
								<div v-else class="flex justify-center items-center">
									<img class="mt-3" v-if="inventoryForm.profile_img" 
										:src="inventoryForm.profile_img"
										style="width:150px;height:150px;"
										alt="Please load profile">
									<img class="mt-3" v-else src="@/static/Databoxx-BoxLogo-175x196.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>
								<div class="mt-4" v-if="inventoryForm.barcode_obj">
									<div class="mt-4 business-barcode text-center">
										{{ inventoryForm.barcode_obj.barcode_number }}
									</div>
									<p class="text-center">{{ inventoryForm.barcode_obj.barcode_number }}</p>
								</div>	
								<div class="mt-4" v-else>
									<div class="mt-4 business-barcode text-center">
										1234567890
									</div>
									<p class="text-center">1234567890</p>
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
										:focusStateEnabled="false",
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
												<inventorySalesComponent 
													:formData="inventoryForm"
													:inventorySettings="inventorySettings">
													</inventorySalesComponent>
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
													:databaseData="databaseData"
													@editProfile="editProfileFromChild"
													@deleteProfile="deleteProfileFromChild">
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
import profileImageComponent from "@/components/universal/new/profile-image-component"
import databaseComponent from "@/components/business/new-docs/database-component"

//Mixins
import {UniversalMixins} from "@/mixins/universal-mixins"

export default {
  name: "inventoryProfile",
	mixins: [
		UniversalMixins
  ],
  components: {
		inventoryProfileComponent,
		inventoryDetailsComponent,
		inventorySalesComponent,
		inventoryHistoryComponent,
		inventoryImagesGalleryComponent,
		inventoryFinanceComponent,
		profileImageComponent,
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
				openImageSheet: false,
				type: "inventory",

			},
			//Database Compoennt Data
			databaseSettings: {
				title: "Inventory Database",
				header1: "Id",
				header2: "Image",
				header3: "Name",
				header4: "List",
				header5: "Category",
				header6: "Barcode",
				header7: "Status",
				col1: "id",
				col2: "profile_img",
				col3: "name",
				col4: "list_price",
				col5: "category",
				col6: "barcode.barcode_number",
				col7: "is_active"
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
				barcode_obj: null,
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
				description: null,
				specifications: null,
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
				uom_dimensions: null,
				files: []
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
			console.log('this.Inventory.categoryList', this.Inventory.categoryList)
			console.log('this.GET_INVENTORY_LIST', this.GET_INVENTORY_LIST)
			console.log('this.inventoryForm', this.inventoryForm)
			
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
			this.isLoadPanelVisible = false
		},
		createItemChoices(e) {
			console.log('e', e)
		},
		closeSheet(e) {
			console.log("closeSheet e", e)
			this.inventorySettings.openImageSheet = e
		},
		//Capture Edit by Child DataGrid Component
		editProfileFromChild(e) {
			console.log('editProfileFromChild e', e);
			this.editInventoryById(e)
		},
		deleteProfileFromChild(e) {
			console.log('deleteProfileFromChild e', e);
			this.DELETEInventoryItem(e)
		},
		clickProfileMenu(e) {
			console.log("clickProfileMenu e", e)
			if(e.target.innerText === 'Profile Image') {
				this.inventorySettings.openImageSheet = true
			}
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
			await this.editInventoryById(reponse.id);
			this.showEditProfile();
			console.log("createInventoryandEdit All Done", reponse);
		},
		async createItemandClose() {
			try {
				this.$store.commit("RESET_ERRORS");
				console.log("createInventoryandClose Start");
				let newitem = await this.createInventory();
				console.log("newitem", newitem);
				//Clear Form and Reset to Starting Viewing Position
				console.log("createInventoryandClose All Done");
				await this.clearFormData();
				this.resetViewtoHome();
			} catch(error) {
				alert("<p>The submission had errors. Please try again.</p>", "Error");
				this.isLoadPanelVisible = false;
			}
		},
		async createInventory() {
			return new Promise( async (resolve, reject) => {
				try {
					var inventoryFormCopy = JSON.parse(JSON.stringify(this.inventoryForm));
					inventoryFormCopy.category = this.invCategory.id;

					//Dispatch creation method and update Fields with latest Object
					console.log("inventoryFormCopy pre-Action", inventoryFormCopy);

					let newInvForm = await this.setUserPlatformPOST(inventoryFormCopy);
					let response = await this.$store.dispatch("POSTInventory", newInvForm);
					console.log('createInventory response', response)

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
		editInventoryById(invID) {
			return new Promise(async (resolve, reject) => {
				console.log("editInventoryById invID", invID);
				try {
					this.clearFormData();
					this.activeTab = 0;

					//2) Get User ID and object and map to fields from database table
					var getSelectedInvObj = await this.$store.dispatch("GETInventoryProfile", {id: invID});
					console.group('getSelectedInvObj', getSelectedInvObj);

					for (let key in this.inventoryForm) {
						this.inventoryForm[key] = this.GET_INVENTORY_PROFILE[key];
					}

					this.getInventoryImages(invID);
					//Switch View to Edit Mode
					this.resetViewtoHome();
					this.showEditProfile();
					return resolve("editInventoryById Completed");
				} catch(error) {
					console.log("Caught error", error)
					return reject(error);
				}			
			});
		},
		//Get images including Barcode
		async getInventoryImages(invID) {
			//I need to reconfigure this to only get the images for the selected Inventory Item
			try {
				//Get Inventory Gallery Images for ID
				console.log("Get Inv Gallery Imgs this.inventoryForm", {id: invID});
				this.$store.dispatch("GETInventoryImagesByFilter", {id: invID});

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
		async DELETEInventoryItem(item) {
			console.log('DELETEInventoryItem id', id);
			try {
				let object = this.GET_INVENTORY_LIST.find(elem => elem.id === item)
				console.log('deleteInventory object', object);
				//Set Variables to make account inactive
				delete object.profile_img;
				object.is_active = false;

				await this.$store.dispatch("PATCHDeleteInventoryProfile", object).then((response) => {
					console.log("response from PATCHDeleteInventoryProfile method", response);
					this.clearFormData();
				});
			} catch (error) {
				console.error("Promise Response Error", error);
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
		...mapGetters(["GET_INVENTORY_LIST", "GET_INV_CATEGORY_LIST", "GET_INVENTORY_PROFILE"]),
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
		this.databaseData.list = this.GET_INVENTORY_LIST
  },

    
  }
</script>

<style lang="scss">
#tabContainer {
	width: 100%;
}

</style>

