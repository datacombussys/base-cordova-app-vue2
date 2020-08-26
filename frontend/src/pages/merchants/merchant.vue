<template>
  <div>
		<!-- Main Container Row -->
		<div class="main-container">
			<!-- Left Column -->
			<div class="left-col">
				<div class="small-block">
					<v-card class="rounded-md">
						<v-card-title>
								<div class="title">{{ merchantForm.dba_name }}</div>
								<div class="row justify-between">
									<div class="col-50">
										<div class="subtitle">Super User</div>
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
										:profileData="merchantForm" />
									</div>
								</div>
							</v-card-title>

						<v-card-text>
								<div v-if="!merchantForm.id" class="flex justify-center items-center">
									<img
										class="mt-3 disabled"
										src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>
								<div v-else class="flex justify-center items-center">
									<img class="mt-3" v-if="merchantForm.profile_img" 
										:src="merchantForm.profile_img"
										style="width:150px;height:150px;"
										alt="Please load profile">
									<img class="mt-3" v-else src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>

								<div class="mt-4" v-if="merchantForm.barcode_obj">
									<div class="mt-4 business-barcode text-center">
										{{ merchantForm.barcode_obj.barcode_number }}
									</div>
									<p class="text-center">{{ merchantForm.barcode_obj.barcode_number }}</p>
								</div>	
								<div class="mt-4" v-else>
									<div class="mt-4 business-barcode text-center">
										1234567890
									</div>
									<p class="text-center">1234567890</p>
								</div>
							</v-card-text>
					</v-card>
				</div>

				<div class="small-block">
					<v-card>
						<v-card-text>
							<div class="flex flex-wrap w-full">
								<div v-show="!hideCreateItem" class="mt-4 w-full">
									<DxButton
										width="100%"
										type="success"
										text="Add New Merchant"
										@click="newItemButton" />
								</div>
								<div v-show="!accountSettings.hideSaveItem" class="mt-4 w-full">
									<dx-drop-down-button
										text="Save Merchant"
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

						<v-card-text class="flex w-full spacing mt-6">
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
													:formData="merchantForm" 
													:accountSettings="accountSettings"
													:moduleInfo="moduleInfo">
												</parentSelectionComponent>
											</template>
										</DxItem>
										<DxItem title="Profile" icon="mdi mdi-account-box">
											<template #default>
												<profileComponent 
													:formData="merchantForm" 
													:accountSettings="accountSettings">
												</profileComponent>
											</template>
										</DxItem>
										<DxItem title="Contacts" icon="mdi mdi-contacts">
											<template #default>
												<contactsComponent :formData="merchantForm" :accountSettings="accountSettings"></contactsComponent>
											</template>
										</DxItem>
										<DxItem title="Locations" icon="mdi mdi-account-box-multiple-outline">
											<template #default>
												<locationsComponent :formData="merchantForm"></locationsComponent>
											</template>
										</DxItem>
										<DxItem title="Shipping" icon="mdi mdi-truck-delivery-outline">
											<template #default>
												<shippingLocationsComponent :formData="merchantForm"></shippingLocationsComponent>
											</template>
										</DxItem>
										<DxItem title="Payment" icon="mdi mdi-credit-card-outline">
											<template #default>
												<paymentMethodsComponent :formData="merchantForm"></paymentMethodsComponent>
											</template>
										</DxItem>
										<DxItem title="Reporting" icon="mdi mdi-newspaper-variant-outline">
											<template #default>
												<reportingComponent :formData="merchantForm"></reportingComponent>
											</template>
										</DxItem>
										<DxItem title="Employees" icon="mdi mdi-account-group">
											<template #default>
												<employeesComponent :formData="merchantForm"></employeesComponent>
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
import parentSelectionComponent from "@/components/business/new-docs/parent-selection-component"
import paymentMethodsComponent from "@/components/business/new-docs/payment-component"
import reportingComponent from "@/components/business/new-docs/reporting-component"
import employeesComponent from "@/components/business/new-docs/employees-component"
import databaseComponent from "@/components/business/new-docs/database-component"
import profileImageComponent from "@/components/universal/new/profile-image-component"

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins"

export default {
  name: "merchantProfile",
	mixins: [
		UniversalMixins
  ],
  components: {
		profileComponent,
		contactsComponent,
		locationsComponent,
		parentSelectionComponent,
		shippingLocationsComponent,
		paymentMethodsComponent,
		reportingComponent,
		employeesComponent,
		databaseComponent,
		profileImageComponent,
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
			platformLevel: 3,
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
				name: "Merchant",
				type: "profile",
				level: 3
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
				url: 'datacom/',
				module: 'Merchant',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},
			profileMenu: [
        { title: 'Upload Image' },
				{ title: 'Take Photo' }
      ],
			accountSettings: {
				showPasswordReset: false,
				editProfile: false,
				hideSaveItem: true,
				type: "company",
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
				title: "Merchant Database",
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
				tableId: "merchantDbTable",
				list: new Array()
			},

			//Page Setting for CRUD Display
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			selectedTabIndex: 0,
			openImageSheet: false,

			//Form Data
			merchantForm: {
				//datacom Specific
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

				is_datacom: true,
				is_partner: false,
				is_merchant: false,
				is_vendor: false,
			},
    }
	},
	//******************************************** Methods ***********************************************//
  methods: {
    testMethod(e) {
			console.log('this.merchantForm', this.merchantForm)
			// console.log('this.accountSettings.editProfile', this.accountSettings.editProfile)
			// this.accountSettings.editProfile = !this.accountSettings.editProfile
			console.log('this.Auth.authLevel', this.Auth.authLevel)
			console.log("GET_DATACOM_LIST", this.GET_DATACOM_LIST)

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
			let createCompanyRes = await this.createCompany();
			//Populate Fields with Created Instance
			this.editMerchantById(createCompanyRes.id);
			console.log("createCompanyandEdit All Done", createCompanyRes);
		},

		//Create Company and Clear form for entering a new company
		async createCompanyandNew() {
			this.$store.commit("RESET_ERRORS");
			await this.createCompany();
			//Clear Form and Reset to Starting Editing Position
			console.log("createCompanyandNew All Done");
			this.newItemButton();
		},
		//Create Company and Clear form for Viewing Data
		async createCompanyandClose() {
			console.log("createCompanyandClose")
			try {
				// this.$store.commit("RESET_ERRORS");
				let createCompanyRes = await this.createCompany();
				//Clear Form and Reset to Starting Viewing Position
				console.log("createCompanyandClose All Done", createCompanyRes);
				await this.clearFormData();
				this.resetViewtoHome();
			} catch(error) {
				this.submissionError()
				this.isLoadPanelVisible = false
			}
		},
		createCompany() {
			console.log("createCompany");
			return new Promise( async(resolve, reject) => {
				console.log("promise");

				try {
					console.log("try");
				
					this.isLoadPanelVisible = true;

					console.log("createMerchant, this.merchantForm", this.merchantForm);
					var newMerchantForm = JSON.parse(JSON.stringify(this.merchantForm));
					console.log("newMerchantForm", newMerchantForm);

					var companyResponse = await this.$store.dispatch("POSTMerchant", newMerchantForm);
					console.log("companyResponse", companyResponse);

					this.isLoadPanelVisible = false;

					return resolve(companyResponse);
				} catch (error) {
					console.error("Promise Response Error creating Company", error);
					return reject(error);
				}
			});
			
		},
		refreshMerchant() {
			console.log("GETMerchantList");
			this.$store.dispatch("GETMerchantList");
		},
		//Clear Form Data
		clearFormData() {
			console.log("clearFormData this.merchantForm", this.merchantForm);
			for (let key in this.merchantForm) {
				console.log("key", this.merchantForm[key]);
				if (this.merchantForm[key] === true || this.merchantForm[key] === false) {
					// console.log('TF key', key);
					this.merchantForm[key] = false;
				} else {
					this.merchantForm[key] = null;
				}
			}
			//Reset Merchant Variables
			this.merchantForm.is_merchant = true;
			this.merchantForm.is_active = true;
			this.merchantForm.primary_contacts= [];
			this.merchantForm.billing_contacts= [];
			this.merchantForm.technical_contacts= [];
			this.merchantForm.shipping_contacts= [];
		},
		//Capture Edit by Child DataGrid Component
		editProfileFromChild(e) {
			console.log('editProfileFromChild e', e);
			this.editDatacomById(e)
		},
		deleteProfileFromChild(e) {
			console.log('deleteProfileFromChild e', e);
			this.deleteDatacom(e)
		},
		async editMerchantById(companyID) {
			console.log("editMerchant");
			try {
				this.clearFormData();
				this.selectedTabIndex = 0;

				//Get User ID and object and map to fields from database table
				var getSelectedMerchantObj = await this.$store.dispatch("GETMerchantSelectedProfile", {id: companyID});
				console.group('getSelectedMerchantObj', getSelectedMerchantObj);

				for (let key in this.merchantForm) {
					this.merchantForm[key] = this.GET_SELECTED_MERCHANT_PROFILE[key];
				}
				this.showEditProfile();
			} catch(error) {
				console.error("editMerchantById error", error)
			}
		},
		//Load Merchant On itnitial render
		async loadLoggedInProfile() {
			try {
				if(Object.keys(this.GET_MERCHANT_PROFILE).length != 0) {
					for (let key in this.merchantForm) {
						this.merchantForm[key] = this.GET_MERCHANT_PROFILE[key];
					}
					let response = await this.getObjectQueryFilter(this.GET_MERCHANT_PROFILE);
					console.log('editMerchant response', response);
					this.$store.dispatch("GETEmployeeFilterList", {id: response.id, filterURL: response.filterURL});
					console.log('this.$refs', this.$refs);
					this.$refs.employeeDatabaseRef.mountSelectedEmployeeList();
					this.resetViewtoHome();
				}
				
			} catch(error) {
				console.error("There was an error", error)
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateMerchantPATCH() {
			let newMerchantForm = await this.setUserPlatformPOST();
			console.log("updateCompanyPATCH newMerchantForm", newMerchantForm);
			this.$store.dispatch("PATCHMerchantProfile", newMerchantForm);
			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteMerchant(id) {
			console.log('deleteMerchant id', id);
			try {
				let object = this.GET_PARTNER_LIST.find(elem => elem.id === id)
				console.log('deleteMerchant object', object);
				//Set Variables to make account inactive
				object.is_active = false;
				const date = Date.now();
				const newDate = new Date(date)
				const isoDate = newDate.toISOString()
				const dateOnly = isoDate.split("T")[0]
				console.log("newDate", newDate);
				console.log("newDate", newDate.toISOString());
				object.closure_date = dateOnly;

				await this.$store.dispatch("PATCHDeleteMerchantProfile", object).then((response) => {
					console.log("response from deleteMerchant method", response);
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
	
		}

  },
  computed: {
		...mapGetters(["GET_MERCHANT_LIST", "GET_MERCHANT_PROFILE", "GET_SELECTED_MERCHANT_PROFILE", "GET_DATACOM_LIST"]),
		...mapState(["Auth"]),
    
  },
  watch: {

  },
  mounted() {


  },
  created() {
		this.databaseData.list = this.GET_MERCHANT_LIST
		this.loadLoggedInProfile()
  },

    
  }
</script>

<style lang="scss">
#tabContainer {
	width: 100%;
}

</style>

