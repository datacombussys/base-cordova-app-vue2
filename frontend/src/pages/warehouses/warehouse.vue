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
								<div class="title">{{ warehouseForm.dba_name }}</div>
								<div class="row justify-between">
									<div class="col-50">
										<div class="subtitle">Warehouse</div>
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
										:openImageSheet="openImageSheet"
										@closeSheet="closeSheet"
										:profileImageSettings="profileImageSettings"
										:profileData="warehouseForm" />
									</div>
								</div>
							</v-card-title>

							<v-card-text>
								<div v-if="!warehouseForm.id" class="flex justify-center items-center">
									<img
										class="mt-3 disabled"
										src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>
								<div v-else class="flex justify-center items-center">
									<img class="mt-3" v-if="warehouseForm.profile_img" 
										:src="warehouseForm.profile_img"
										style="width:150px;height:150px;"
										alt="Please load profile">
									<img class="mt-3" v-else src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>

								<div class="mt-4" v-if="warehouseForm.barcode_obj">
									<div class="mt-4 business-barcode text-center">
										{{ warehouseForm.barcode_obj.barcode_number }}
									</div>
									<p class="text-center">{{ warehouseForm.barcode_obj.barcode_number }}</p>
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
								<div v-show="!hideCreateItem" class="mt-4 w-full">
									<DxButton
										width="100%"
										type="success"
										text="Add New Company"
										@click="newItemButton" />
								</div>
								<div v-show="!accountSettings.hideSaveItem" class="mt-4 w-full">
									<dx-drop-down-button
										text="Save Company"
										width="100%"
										:split-button="true"
										@button-click="createCompanyandClose"
										@item-click="createCompanyChoices"
										:items="saveCompanyItems"
										key-expr="id"
									/>
								</div>
								<div v-if="hideCreateItem" class="mt-4 w-full">
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
								<div class="title">Quicklinks</div>
						</v-card-title>

						<v-card-text class="flex w-full spacing mt-4">
							<div class="m-4">
								<div class="mdi mdi-account-lock mdi-60 text-datacom mb-3"></div>
								<div class="mt-4 text-center">Permissions</div>
							</div>
							<div class="m-4">
								<div class="mdi mdi-account-cash-outline mdi-60 text-datacom mb-3"></div>
								<div class="mt-4 text-center">Subscription</div>
							</div>
							<div class="m-4">
								<div class="mdi mdi-cogs mdi-60 text-datacom mb-3"></div>
								<div class="mt-4 text-center">Setup / Admin</div>
							</div>
							<div class="m-4">
								<div class="mdi mdi-lifebuoy mdi-60 text-datacom mb-3"></div>
								<div class="mt-4 text-center">Support</div>
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
									<DxTabPanel :show-nav-buttons="true" :selected-index.sync="selectedTabIndex">
										<DxItem title="Parent" icon="mdi mdi-domain">
											<template #default>
												<parentSelectionComponent 
													:formData="warehouseForm" 
													:accountSettings="accountSettings"
													:moduleInfo="moduleInfo">
												</parentSelectionComponent>
											</template>
										</DxItem>
										<DxItem title="Profile" icon="mdi mdi-account-box">
											<template #default>
												<profileComponent 
													:formData="warehouseForm" 
													:accountSettings="accountSettings">
												</profileComponent>
											</template>
										</DxItem>
										<DxItem title="Contacts" icon="mdi mdi-contacts">
											<template #default>
												<contactsComponent 
													:formData="warehouseForm" 
													:accountSettings="accountSettings">
												</contactsComponent>
											</template>
										</DxItem>
										<DxItem title="Purchase Orders" icon="mdi mdi-buffer">
											<template #default>
											
											</template>
										</DxItem>
										<DxItem title="Sales Orders" icon="mdi mdi-buffer">
											<template #default>
											
											</template>
										</DxItem>
										<DxItem title="Employees" icon="mdi mdi-truck">
											<template #default>
												<employeesComponent 
												:formData="warehouseForm"></employeesComponent>
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
			<!-- Loader Panel -->
			<DxLoadPanel
				:close-on-outside-click="true"
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
import Vue from 'vue'
import { mapGetters } from "vuex"
import { mapState } from "vuex"

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
import profileComponent from "@/components/business/new-docs/profile-component"
import contactsComponent from "@/components/business/new-docs/contacts-component"
import locationsComponent from "@/components/business/new-docs/locations-component"
import shippingLocationsComponent from "@/components/business/new-docs/shipping-component"
import paymentMethodsComponent from "@/components/business/new-docs/payment-component"
import employeesComponent from "@/components/business/new-docs/employees-component"
import databaseComponent from "@/components/business/new-docs/database-component"
import profileImageComponent from "@/components/universal/new/profile-image-component"
import parentSelectionComponent from "@/components/business/new-docs/parent-selection-component"

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins"

export default {
  name: "warehouseProfile",
	mixins: [
		UniversalMixins
  ],
  components: {
		profileComponent,
		contactsComponent,
		locationsComponent,
		shippingLocationsComponent,
		paymentMethodsComponent,
		employeesComponent,
		databaseComponent,
		profileImageComponent,
		parentSelectionComponent,
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
			//Main Seettings
			platformLevel: 1,
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			isLoadPanelVisible: false,
			saveCompanyItems: [
				"Create and New" ,
				"Create and Edit",
				"Create and Close",
			],
      //Component Data
			profileCardSettings: {
				type: "business",
				title: "Profile Details"
			},
			moduleInfo: {
				name: "Warehouse",
				type: "profile",
				level: 4
			},
			primaryContactSettings: {
				type: "primary"
			},
			shippingContactSettings: {
				type: "shipping"
			},
			billingContactSettings: {
				type: "billing"
			},
			//Edit Profile Image
			profileImageSettings: {
				url: 'partner/',
				module: 'Warehouse',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},
			cameraImage: null,
			cameraSettings: {
				quality: 80,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.CAMERA,
				mediaType: Camera.MediaType.PICTURE,
				encodingType: Camera.EncodingType.JPEG,
				cameraDirection: Camera.Direction.BACK,
				targetWidth: 300,
				targetHeight: 300
			},
			profileMenu: [
				{ title: 'Upload Image' },
				{ title: 'Take Photo' }
      ],
			accountSettings: {
				showPasswordReset: false,
				editProfile: false,
				hideSaveItem: true,
				type: "warehouse",
				accountPlatform: {
					company_name: null,
					is_datacom: false,
					is_partner: true,
					is_merchant: false,
					is_vendor: false
				},
			},
			//Database Compoennt Data
			databaseSettings: {
				title: "Warehouse Database",
				header1: "Id",
				header2: "Image",
				header3: "Date Added",
				header4: "Name",
				header5: "Domain",
				header6: "Account #",
				header7: "Status",
				col1: "id",
				col2: "profile_img",
				col3: "date_added",
				col4: "dba_name",
				col5: "domain",
				col6: "account_number",
				col7: "is_active"
			},
			databaseData: {
				tableId: "employeeDbTable",
				list: new Array()
			},

			//Page Setting for CRUD Display
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			selectedTabIndex: 0,
			openImageSheet: false,

			//Form Data
			warehouseForm: {
				//partner Specific
				id: null,
				account_number: null,
				barcode: null,
				barcode_obj: null,
				profile_img: null,
				logo: null,
				date_added: null,
				global_id: null,
				is_active: false,

				primary_contacts: [],
				billing_contacts: [],
				technical_contacts: [],
				shipping_contacts: [],

				dba_name: null,
				legal_name: null,
				domain: null,
				website: null,
				tax_id: null,
				resale_id: null,
				board_date: null,
				description: null,
				closure_date: null,
				closure_reason: null,

				primary_first_name: null,
				primary_last_name: null,
				primary_mailing_address: null,
				primary_mailing_city: null,
				primary_mailing_state: null,
				primary_mailing_zip: null,
				primary_mailing_country: null,
				primary_phone: null,
				primary_fax: null,
				primary_email: null,

				shipping_first_name: null,
				shipping_last_name: null,
				shipping_address: null,
				shipping_city: null,
				shipping_state: null,
				shipping_zip: null,
				shipping_country: null,
				shipping_phone: null,
				shipping_fax: null,
				shipping_email: null,

				billing_first_name: null,
				billing_last_name: null,
				billing_address: null,
				billing_city: null,
				billing_state: null,
				billing_zip: null,
				billing_country: null,
				billing_phone: null,
				billing_fax: null,
				billing_email: null,

				is_partner: true,
				is_partner: false,
				is_merchant: false,
				is_vendor: false,
			},
    }
	},
	//******************************************** Methods ***********************************************//
  methods: {
    testMethod(e) {
			console.log('this.warehouseForm', this.warehouseForm)
			console.log('this.Warehouses.partnerList', this.Warehouses.partnerList)
		},
		testMethodMain(e) {
			console.log("testMethodMain e", e);
			console.log("Test Button Clicked");
		},
		closeSheet(e) {
			console.log("closeSheet e", e)
			this.openImageSheet = e
		},
		clickProfileMenu(e) {
			console.log("clickProfileMenu e", e)
			if(e.target.innerText === 'Upload Image') {
				this.openImageSheet = true
			}
			if(e.target.innerText === 'Take Photo') {
				console.log("Open Camera for photo")
				//Open Sheet
				this.openImageSheet = true
				//Execute Camera
				this.$refs.profileImageComponent.captureImage()
				this.$refs.profileImageComponent.setMobile()
			}
		},
		showEditProfile() {
			this.accountSettings.editProfile = true
			this.hideUpdateItemButtons = true
			this.hideCreateItem = true
			this.accountSettings.hideSaveItem = true
		},
		toggleEditProfile() {
			this.accountSettings.editProfile = !this.accountSettings.editProfile
			this.hideUpdateItemButtons = !this.hideUpdateItemButtons
			this.hideCreateItem = !this.hideCreateItem
			this.accountSettings.hideSaveItem = true;
		},
		newItemButton() {
			//Show/Hide Edit Fields and buttons
			this.clearFormData();
			this.accountSettings.editProfile = true
			this.hideCreateItem = !this.hideCreateItem
			this.hideUpdateItemButtons = false
			this.accountSettings.hideSaveItem = false
			this.selectedTabIndex = 2
			this.selectedTabIndex = 0
		},
		clearandResetButton() {
			this.clearFormData()
			this.resetViewtoHome()
		},
		resetViewtoHome() {
			this.accountSettings.editProfile = false
			this.hideUpdateItemButtons = false
			this.hideCreateItem = false
			this.accountSettings.hideSaveItem = true
			this.selectedTabIndex = 0
			this.isLoadPanelVisible = false
		},
		createCompanyChoices(e) {
			console.log('e', e)
			if(e.itemData === "Create and New") {
				this.createCompanyAndNew()
			} else if(e.itemData === "Create and Edit") {
				this.createCompanyAndEdit()
			} else if(e.itemData === "Create and Close") {
				this.createCompanyAndClose()
			}
		},
		//Create Company and Edit Current Company
		async createCompanyandEdit() {
			this.$store.commit("RESET_ERRORS");
			let createCompanyRes = await this.createWarehouse();
			//Populate Fields with Created Instance
			this.editWarehouseById(createCompanyRes.id);
			console.log("createCompanyandEdit All Done", createCompanyRes);
		},

		//Create Company and Clear form for entering a new company
		async createCompanyandNew() {
			this.$store.commit("RESET_ERRORS");
			await this.createWarehouse();
			//Clear Form and Reset to Starting Editing Position
			console.log("createCompanyandNew All Done");
			this.newItemButton();
		},
		//Create Company and Clear form for Viewing Data
		async createCompanyandClose() {
			try {
				console.log("createCompanyandClose")
				this.$store.commit("RESET_ERRORS");
				let createCompanyRes = await this.createWarehouse();
				console.log("createCompanyandClose All Done", createCompanyRes);
				await this.clearFormData();
				this.resetViewtoHome();

			} catch(error) {
				this.submissionError()
				this.isLoadPanelVisible = false;
			}
		},
		createWarehouse() {
			console.log("createWarehouse");
			return new Promise( async(resolve, reject) => {
				console.log("promise");

				try {
					console.log("createWarehouse try");
				
					this.isLoadPanelVisible = true;

					console.log("createWarehouse, this.warehouseForm", this.warehouseForm);
					var newWarehouseForm = JSON.parse(JSON.stringify(this.warehouseForm));
					console.log("newWarehouseForm", newWarehouseForm);

					var partnerResponse = await this.$store.dispatch("POSTWarehouse", newWarehouseForm);
					console.log("partnerResponse", partnerResponse);

					this.isLoadPanelVisible = false;

					return resolve(partnerResponse);
				} catch (error) {
					console.error("Promise Response Error creating Warehouse", error);
					return reject(error);
				}
			});
			
		},
		refreshWarehouse() {
			console.log("GETWarehouseList");
			this.$store.dispatch("GETWarehouseList");
		},
		//Capture Edit by Child DataGrid Component
		editProfileFromChild(e) {
			console.log('editProfileFromChild e', e);
			this.editWarehouseById(e)
		},
		deleteProfileFromChild(e) {
			console.log('deleteProfileFromChild e', e);
			this.deleteWarehouse(e)
		},
		//Clear Form Data
		clearFormData() {
			console.log("clearFormData this.warehouseForm", this.warehouseForm);
			for (let key in this.warehouseForm) {
				console.log("key", this.warehouseForm[key]);
				if (this.warehouseForm[key] === true || this.warehouseForm[key] === false) {
					// console.log('TF key', key);
					this.warehouseForm[key] = false;
				} else {
					this.warehouseForm[key] = null;
				}
			}
			//Reset Warehouse Variables
			this.warehouseForm.is_partner = true;
			this.warehouseForm.is_active = true;
			this.warehouseForm.primary_contacts= [];
			this.warehouseForm.billing_contacts= [];
			this.warehouseForm.technical_contacts= [];
			this.warehouseForm.shipping_contacts= [];
		},
		// Populate Fields for editing in browser
		async editWarehouseById(companyID) {
			console.log("editWarehouse");
			try {
				this.clearFormData();
				this.selectedTabIndex = 1;
				//2) Get User ID and object and map to fields from database table
				var getSelectedWarehouseObj = await this.$store.dispatch("GETSelectedWarehouseProfileById", {id: companyID});
				console.group('getSelectedWarehouseObj', getSelectedWarehouseObj);

				for (let key in this.warehouseForm) {
					this.warehouseForm[key] = this.GET_SELECTED_WAREHOUSE_PROFILE[key];
				}
				this.resetViewtoHome();
				this.showEditProfile();
			} catch(error) {
				console.error("Caught error", error)
			}
		},
		//Load Warehouse On itnitial render
		async loadLoggedInProfile() {
			try {
				if(Object.keys(this.GET_WAREHOUSE_PROFILE).length != 0) {
					for (let key in this.warehouseForm) {
						this.warehouseForm[key] = this.GET_WAREHOUSE_PROFILE[key];
					}
					let response = await this.getObjectQueryFilter(this.GET_WAREHOUSE_PROFILE);
					console.log('editWarehouse response', response);
					this.$store.dispatch("GETEmployeeFilterList", {id: response.id, filterURL: response.filterURL});
					console.log('this.$refs', this.$refs);
					this.resetViewtoHome();
				}
			} catch(error) {
				console.error("There was an error", error)
			}
			
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateWarehousePATCH() {
			let newWarehouseForm = await this.setUserPlatformPOST();
			console.log("updateCompanyPATCH newWarehouseForm", newWarehouseForm);
			this.$store.dispatch("PATCHWarehouseProfile", newWarehouseForm);
			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteWarehouse(id) {
			console.log('deleteWarehouse id', id);
			try {
				let object = this.GET_WAREHOUSE_LIST.find(elem => elem.id === id)
				console.log('deleteWarehouse object', object);
				//Set Variables to make account inactive
				object.is_active = false;
				const date = Date.now();
				const newDate = new Date(date)
				const isoDate = newDate.toISOString()
				const dateOnly = isoDate.split("T")[0]
				console.log("newDate", newDate);
				console.log("newDate", newDate.toISOString());
				object.closure_date = dateOnly;

				await this.$store.dispatch("PATCHDeleteWarehouseProfile", object).then((response) => {
					console.log("response from deleteWarehouse method", response);
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
		dialogBox() {
			// this.$nextTick(function() {
			// 	let result = confirm("<i>Are you sure?</i>", "Confirm changes");
			// })
			this.$nextTick(function() {
				let myDialog = custom({
					title: "Custom dialog",
					messageHtml: "<b>Dialog with custom buttons</b>",
					buttons: [{
						text: "button 1",
						onClick: (e) => {
							return { buttonText: e.component.option("text") }
						}
					}]
				});
				myDialog.show().then((dialogResult) => {
						console.log(dialogResult.buttonText);
				});
			})
		},
		submissionError() {
			this.$nextTick(function() {
				alert("<p>The submission had errors. Please try again.</p>", "Error")
			})
		}

  },
  computed: {
		...mapGetters(["GET_WAREHOUSE_LIST", "GET_WAREHOUSE_PROFILE", "GET_SELECTED_WAREHOUSE_PROFILE"]),
		...mapState(["Warehouses", "Warehouses"]),

    
  },
  watch: {

  },
  mounted() {

    
  },
  created() {
		this.databaseData.list = this.GET_WAREHOUSE_LIST
		this.loadLoggedInProfile()
  },

    
  }
</script>

<style lang="scss">
#tabContainer {
	width: 100%;
}

</style>

