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
								<div class="title">{{ salesOfficeForm.dba_name }}</div>
								<div class="row justify-between">
									<div class="col-50">
										<div class="subtitle">Sales Office</div>
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
										:profileData="salesOfficeForm" />
									</div>
								</div>
							</v-card-title>

							<v-card-text>
								<div v-if="!salesOfficeForm.id" class="flex justify-center items-center">
									<img
										class="mt-3 disabled"
										src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>
								<div v-else class="flex justify-center items-center">
									<img class="mt-3" v-if="salesOfficeForm.profile_img" 
										:src="salesOfficeForm.profile_img"
										style="width:150px;height:150px;"
										alt="Please load profile">
									<img class="mt-3" v-else src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>

								<div class="mt-4" v-if="salesOfficeForm.barcode_obj">
									<div class="mt-4 business-barcode text-center">
										{{ salesOfficeForm.barcode_obj.barcode_number }}
									</div>
									<p class="text-center">{{ salesOfficeForm.barcode_obj.barcode_number }}</p>
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
										text="Add New Office"
										@click="newItemButton" />
								</div>
								<div v-show="!accountSettings.hideSaveItem" class="mt-4 w-full">
									<dx-drop-down-button
										text="Save Office"
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
													:formData="salesOfficeForm" 
													:accountSettings="accountSettings"
													:moduleInfo="moduleInfo">
												</parentSelectionComponent>
											</template>
										</DxItem>
										<DxItem title="Profile" icon="mdi mdi-account-box">
											<template #default>
												<profileComponent 
													:formData="salesOfficeForm" 
													:accountSettings="accountSettings">
												</profileComponent>
											</template>
										</DxItem>
										<DxItem title="Contacts" icon="mdi mdi-contacts">
											<template #default>
												<contactsComponent 
													:formData="salesOfficeForm" 
													:accountSettings="accountSettings">
												</contactsComponent>
											</template>
										</DxItem>
										<DxItem title="Purchase Orders" icon="mdi mdi-buffer">
											<template #default>
											
											</template>
										</DxItem>
										<DxItem title="Sales Orders" icon="mdi mdi-truck">
											<template #default>
											
											</template>
										</DxItem>
										<DxItem title="Employees" icon="mdi mdi-account-group">
											<template #default>
												<employeesComponent 
												:formData="salesOfficeForm"></employeesComponent>
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
// import syncfusionTabs from "@/components/business/syncfusion-tabs/tabs-component"
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
  name: "salesOfficeProfile",
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
				name: "Sales Office",
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
				url: 'sales-office/',
				module: 'Sales Office',
				mutation: 'UPDATE_SALESOFFICE_PROFILE'
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
				type: "sales-office",
				accountPlatform: {
					company_name: null,
					is_datacom: false,
					is_partner: false,
					is_merchant: false,
					is_vendor: false
				},
			},
			//Database Compoennt Data
			databaseSettings: {
				title: "Sales Office Database",
				header1: "Id",
				header2: "Image",
				header3: "Date Added",
				header4: "Name",
				header5: "Phone",
				header6: "Location #",
				header7: "Status",
				col1: "id",
				col2: "profile_img",
				col3: "date_added",
				col4: "salesoffice_name",
				col5: "primary_phone",
				col6: "salesoffice_number",
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
			salesOfficeForm: {
				id: 0,
				datacom: null,
				partner: null,
				company: null,
				barcode: null,

				salesoffice_name: null,
				salesoffice_number: null,
				profile_img: null,
				date_added: null,
				global_id: null,
				description: null,
				is_active: false,
				status: null,

				//Arrays
				primary_contacts: [],
				billing_contacts: [],
				technical_contacts: [],
				shipping_contacts: [],
				warehouses: [],
				employees: [],

				primary_mailing_address: null,
				primary_mailing_address2: null,
				primary_mailing_city: null,
				primary_mailing_state: null,
				primary_mailing_zip: null,
				primary_mailing_country: null,
				primary_first_name: null,
				primary_last_name: null,
				primary_phone: null,
				primary_fax: null,
				primary_email: null,

				shipping_address: null,
				shipping_address2: null,
				shipping_city: null,
				shipping_state: null,
				shipping_zip: null,
				shipping_mailing_country: null,
				shipping_first_name: null,
				shipping_last_name: null,
				shipping_phone: null,
				shipping_fax: null,
				shipping_email: null,

				billing_address: null,
				billing_address2: null,
				billing_city: null,
				billing_state: null,
				billing_zip: null,
				billing_mailing_country: null,
				billing_first_name: null,
				billing_last_name: null,
				billing_phone: null,
				billing_fax: null,
				billing_email: null,
				closure_date: null,
				closure_reason: null,
			},
    }
	},
	//******************************************** Methods ***********************************************//
  methods: {
    testMethod(e) {
			console.log('this.salesOfficeForm', this.salesOfficeForm)
			console.log('this.SalesOffices.salesOfficeList', this.SalesOffices.salesOfficeList)
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
			let createCompanyRes = await this.createSalesOffice();
			//Populate Fields with Created Instance
			this.editSalesOfficeById(createCompanyRes.id);
			console.log("createCompanyandEdit All Done", createCompanyRes);
		},

		//Create Company and Clear form for entering a new company
		async createCompanyandNew() {
			this.$store.commit("RESET_ERRORS");
			await this.createSalesOffice();
			//Clear Form and Reset to Starting Editing Position
			console.log("createCompanyandNew All Done");
			this.newItemButton();
		},
		//Create Company and Clear form for Viewing Data
		async createCompanyandClose() {
			try {
				console.log("createCompanyandClose")
				this.$store.commit("RESET_ERRORS");
				let createCompanyRes = await this.createSalesOffice();
				console.log("createCompanyandClose All Done", createCompanyRes);
				await this.clearFormData();
				this.resetViewtoHome();

			} catch(error) {
				this.submissionError()
				this.isLoadPanelVisible = false;
			}
		},
		createSalesOffice() {
			console.log("createSalesOffice");
			return new Promise( async(resolve, reject) => {
				console.log("promise");

				try {
					console.log("createSalesOffice try");
				
					this.isLoadPanelVisible = true;

					console.log("createSals Office, this.salesOfficeForm", this.salesOfficeForm);
					var newSalesOfficeForm = JSON.parse(JSON.stringify(this.salesOfficeForm));
					console.log("newSalesOfficeForm", newSalesOfficeForm);

					var partnerResponse = await this.$store.dispatch("POSTSalesOffice", newSalesOfficeForm);
					console.log("partnerResponse", partnerResponse);

					this.isLoadPanelVisible = false;

					return resolve(partnerResponse);
				} catch (error) {
					console.error("Promise Response Error creating Sales Office", error);
					return reject(error);
				}
			});
			
		},
		refreshSalesOffice() {
			console.log("GETSales OfficeList");
			this.$store.dispatch("GETSalesOfficeList");
		},
		//Capture Edit by Child DataGrid Component
		editProfileFromChild(e) {
			console.log('editProfileFromChild e', e);
			this.editSalesOfficeById(e)
		},
		deleteProfileFromChild(e) {
			console.log('deleteProfileFromChild e', e);
			this.deleteSalesOffice(e)
		},
		//Clear Form Data
		clearFormData() {
			console.log("clearFormData this.salesOfficeForm", this.salesOfficeForm);
			for (let key in this.salesOfficeForm) {
				console.log("key", this.salesOfficeForm[key]);
				if (this.salesOfficeForm[key] === true || this.salesOfficeForm[key] === false) {
					// console.log('TF key', key);
					this.salesOfficeForm[key] = false;
				} else {
					this.salesOfficeForm[key] = null;
				}
			}
			//Reset Sales Office Variables
			this.salesOfficeForm.is_partner = true;
			this.salesOfficeForm.is_active = true;
			this.salesOfficeForm.primary_contacts= [];
			this.salesOfficeForm.billing_contacts= [];
			this.salesOfficeForm.technical_contacts= [];
			this.salesOfficeForm.shipping_contacts= [];
			this.salesOfficeForm.employees= [];
		},
		// Populate Fields for editing in browser
		async editSalesOfficeById(companyID) {
			console.log("editSales Office");
			try {
				this.clearFormData();
				this.selectedTabIndex = 1;
				//2) Get User ID and object and map to fields from database table
				var getSelectedSalesOfficeObj = await this.$store.dispatch("GETSalesOfficeSelectedProfile", {id: companyID});
				console.group('getSelectedSalesOfficeObj', getSelectedSalesOfficeObj);

				for (let key in this.salesOfficeForm) {
					this.salesOfficeForm[key] = this.GET_SELECTED_SALES_OFFICE_PROFILE[key];
				}
				this.resetViewtoHome();
				this.showEditProfile();
			} catch(error) {
				console.error("Caught error", error)
			}
		},
		//Load Sales Office On itnitial render
		async loadLoggedInProfile() {
			try {
				if(Object.keys(this.GET_SALES_OFFICE_PROFILE).length != 0) {
					for (let key in this.salesOfficeForm) {
						this.salesOfficeForm[key] = this.GET_SALES_OFFICE_PROFILE[key];
					}
					let response = await this.getObjectQueryFilter(this.GET_SALES_OFFICE_PROFILE);
					console.log('editSales Office response', response);
					this.$store.dispatch("GETEmployeeFilterList", {id: response.id, filterURL: response.filterURL});
					console.log('this.$refs', this.$refs);
					this.resetViewtoHome();
				}
			} catch(error) {
				console.error("There was an error", error)
			}
			
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateSalesOfficePATCH() {
			let newSalesOfficeForm = await this.setUserPlatformPOST();
			console.log("updateCompanyPATCH newSalesOfficeForm", newSalesOfficeForm);
			this.$store.dispatch("PATCHSalesOfficeProfile", newSalesOfficeForm);
			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteSalesOffice(id) {
			console.log('deleteSalesOffice id', id);
			try {
				let object = this.GET_SALES_OFFICE_LIST.find(elem => elem.id === id)
				console.log('deleteSalesOffice object', object);
				//Set Variables to make account inactive
				object.is_active = false;
				const date = Date.now();
				const newDate = new Date(date)
				const isoDate = newDate.toISOString()
				const dateOnly = isoDate.split("T")[0]
				console.log("newDate", newDate);
				console.log("newDate", newDate.toISOString());
				object.closure_date = dateOnly;

				await this.$store.dispatch("PATCHDeleteSalesOfficeProfile", object).then((response) => {
					console.log("response from deleteSalesOffice method", response);
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
		...mapGetters(["GET_SALES_OFFICE_LIST", "GET_SALES_OFFICE_PROFILE", "GET_SELECTED_SALES_OFFICE_PROFILE"]),
		...mapState(["Warehouses", "SalesOffices"]),

    
  },
  watch: {

  },
  mounted() {

    
  },
  created() {
		this.databaseData.list = this.GET_SALES_OFFICE_LIST
		this.loadLoggedInProfile()
  },

    
  }
</script>

<style lang="scss">
#tabContainer {
	width: 100%;
}

</style>

