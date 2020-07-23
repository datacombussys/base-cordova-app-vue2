<template>
  <div>
		<!-- Main Container Row -->
		<div class="main-container">
			<!-- Left Column -->
			<div class="left-col">
				<div class="small-block">
					<md-card class="rounded-md">
						<md-card-header>
							<md-card-header-text>
								<div class="md-title">Partner Sales, Inc.</div>
								<div class="md-subhead">Partner</div>
							</md-card-header-text>

							<md-menu md-size="big" md-direction="bottom-end">
								<md-button class="md-icon-button" md-menu-trigger>
									<md-icon>more_vert</md-icon>
									
								</md-button>

								<md-menu-content>
									<md-menu-item @click="editImage">
										<div class="rounded-full border border-gray-400 p-1 mr-6">
											<md-icon>create</md-icon>
										</div>
										<div>Edit Image</div>
									</md-menu-item>
								</md-menu-content>
							</md-menu>
						</md-card-header>

						<md-card-content class="flex flex-col w-full">
							<div>
								<img src="@/static/BusinessLogo170x170.png"
									style="width:170px;height:170px;"
									alt="Please load company profile">
							</div>
							<div class="mt-4">
								<div class="mt-4 business-barcode">
									P-13343645
								</div>
								<p class="text-center">P-13343645</p>
							</div>									
						</md-card-content>
					</md-card>
				</div>

				<div class="small-block">
					<md-card>
						<md-card-content>
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
							


						</md-card-content>
					</md-card>
					
				</div>
		
				
			</div>
			<div class="right-col">


						<!-- Header Card -->
						<div class="small-block">
							<md-card class="rounded-md">
								<md-card-header>
									<md-card-header-text>
										<div class="md-title">Quicklinks</div>
									</md-card-header-text>
								</md-card-header>

								<md-card-content class="flex w-full spacing">
									<div class="m-4">
										<div class="mdi mdi-account-lock mdi-60px mb-3">
										</div>
										<div class="mt-4 text-center">Permissions</div>
									</div>
									<div class="m-4">
										<div class="mdi mdi-account-cash-outline mdi-60px mb-3">
										</div>
										<div class="mt-4 text-center">Subscription</div>
									</div>
									<div class="m-4">
										<div class="mdi mdi-cogs mdi-60px mb-3">
										</div>
										<div class="mt-4 text-center">Setup / Admin</div>
									</div>
									<div class="m-4">
										<div class="mdi mdi-lifebuoy mdi-60px mb-3">
										</div>
										<div class="mt-4 text-center">Support</div>
									</div>
										
								</md-card-content>
							</md-card>
						</div>
						
						<!-- Devextreme Tabs -->
						<template>
							<div class="small-block">
								<md-card class="rounded-md">
									
									<md-card-content class="flex w-full spacing">
										<div id="tabContainer">
											<DxTabPanel :show-nav-buttons="true">
												<DxItem title="Profile" icon="mdi mdi-account-box">
													<template #default>
														<profileComponent 
															:formData="partnerForm" 
															:accountSettings="accountSettings">
														</profileComponent>
													</template>
												</DxItem>
												<DxItem title="Contacts" icon="mdi mdi-contacts">
													<template #default>
														<contactsComponent :formData="partnerForm" :accountSettings="accountSettings"></contactsComponent>
													</template>
												</DxItem>
												<DxItem title="Locations" icon="mdi mdi-account-box-multiple-outline">
													<template #default>
														<locationsComponent :formData="partnerForm"></locationsComponent>
													</template>
												</DxItem>
												<DxItem title="Shipping" icon="mdi mdi-truck-delivery-outline">
													<template #default>
														<shippingLocationsComponent :formData="partnerForm"></shippingLocationsComponent>
													</template>
												</DxItem>
												<DxItem title="Payment" icon="mdi mdi-credit-card-outline">
													<template #default>
														<paymentMethodsComponent :formData="partnerForm"></paymentMethodsComponent>
													</template>
												</DxItem>
												<DxItem title="Reporting" icon="mdi mdi-newspaper-variant-outline">
													<template #default>
														<reportingComponent :formData="partnerForm"></reportingComponent>
													</template>
												</DxItem>
												<DxItem title="Employees" icon="mdi mdi-account-group">
													<template #default>
														<employeesComponent :formData="partnerForm"></employeesComponent>
													</template>
												</DxItem>
												<DxItem title="Database" icon="mdi mdi-database">
													<template #default>
														<databaseComponent :formData="partnerForm"></databaseComponent>
													</template>
												</DxItem>
											</DxTabPanel>
										</div>
										
							

											
	
											
									</md-card-content>
								</md-card>
							</div>
						</template>

			</div>
			<!-- Dx Scroller -->
			<!-- Loader Panel -->
			<DxLoadPanel
				:close-on-outside-click="true"
				:visible.sync="isLoadPanelVisible"
			/>
		
		</div>
  </div>
</template>

<script>
import Vue from 'vue'
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
// import syncfusionTabs from "@/components/business/syncfusion-tabs/tabs-component"
import profileComponent from "@/components/business/new-docs/profile-component"
import contactsComponent from "@/components/business/new-docs/contacts-component"
import locationsComponent from "@/components/business/new-docs/locations-component"
import shippingLocationsComponent from "@/components/business/new-docs/shipping-component"
import paymentMethodsComponent from "@/components/business/new-docs/payment-component"
import reportingComponent from "@/components/business/new-docs/reporting-component"
import employeesComponent from "@/components/business/new-docs/employees-component"
import databaseComponent from "@/components/business/new-docs/database-component"

export default {
  name: "partnerProfile",
	mixins: [

  ],
  components: {
		profileComponent,
		contactsComponent,
		locationsComponent,
		shippingLocationsComponent,
		paymentMethodsComponent,
		reportingComponent,
		employeesComponent,
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
				name: "Datacom",
				type: "profile",
				level: 1
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
				module: 'Datacom',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},
			accountSettings: {
				showPasswordReset: false,
				activeTab: 0,
				editProfile: false,
				hideSaveItem: true,
				accountPlatform: {
					company_name: null,
					is_datacom: false,
					is_partner: false,
					is_merchant: false,
					is_vendor: false
				},
			},

			//Page Setting for CRUD Display
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			selectedTabIndex: 0,

			//Tabs
			colCount: {
				xs: 1,
				sm: 1,
				md: 2,
				lg: 3
			},
			tabList: [
				{
					id: 0,
					text: 'Profile',
					icon: 'home',
					content: "Content"
				},
				{
					id:1,
					text: 'Contacts',
					icon: 'home',
					content: "Content"
				},
				{
					id: 2,
					text: 'Locations',
					icon: 'home',
					content: "Content"
				},
				{
					id:3,
					text: 'Payment',
					icon: 'home',
					content: "Content"
				},
				{
					id: 4,
					text: 'Shipping',
					icon: 'home',
					content: "Content"
				},
				{
					id: 5,
					text: 'Employees',
					icon: 'home',
					content: "Content"
				},
				{
					id: 6,
					text: 'Reports',
					icon: 'home',
					content: "Content"
				},
				{
					id: 7,
					text: 'Database',
					icon: 'home',
					content: "Content"
				},
			],

			//Form Data
			partnerForm: {
				//datacom Specific
				id: null,
				account_number: null,
				barcode: null,
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
			console.log('this.partnerForm', this.partnerForm)
			// console.log('this.accountSettings.editProfile', this.accountSettings.editProfile)
			// this.accountSettings.editProfile = !this.accountSettings.editProfile
			console.log('this.GET_DATACOM_LIST', this.GET_DATACOM_LIST)
		},
		testMethodMain(e) {
			console.log("testMethodMain e", e);
			console.log("Test Button Clicked");
		},
		captureEvent(e) {
			console.log("captured Event e", e)
		},
		//Profil Image Funciton placeholder
		editImage() {
			// edit profile image
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
			console.log("this.clearFormData")
			this.accountSettings.editProfile = true
			console.log("this.accountSettings.editProfile")
			this.hideCreateItem = !this.hideCreateItem
			console.log("this.hideCreateItem")
			this.hideUpdateItemButtons = false
			console.log("this.hideUpdateItemButtons")
			this.accountSettings.hideSaveItem = false
			console.log("this.accountSettings.hideSaveItem")
			this.selectedTabIndex = 2
			console.log("this.selectedTabIndex")
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
		},
		createCompanyChoices(e) {
			console.log('e', e)
			//Find out if tryin to crete nre company and edit or create nrew company and NEW
		},
		//Create Company and Edit Current Company
		async createCompanyandEdit() {
			this.$store.commit("RESET_ERRORS");
			let createCompanyRes = await this.createCompany();
			//Populate Fields with Created Instance
			this.editDatacomById(createCompanyRes.id);
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
			// this.$store.commit("RESET_ERRORS");
			let createCompanyRes = await this.createCompany();
			//Clear Form and Reset to Starting Viewing Position
			console.log("createCompanyandClose All Done", createCompanyRes);
			if(createCompanyRes != undefined) {
				await this.clearFormData();
				this.resetViewtoHome();
			} else {
				alert("<p>The submission had errors. Please try again.</p>", "Error");
			}
		},
		createCompany() {
			console.log("createCompany");
			return new Promise( async(resolve, reject) => {
				console.log("promise");

				try {
					console.log("try");
				
					this.isLoadPanelVisible = true;

					console.log("createDatacom, this.partnerForm", this.partnerForm);
					var newDatacomForm = JSON.parse(JSON.stringify(this.partnerForm));
					console.log("newDatacomForm", newDatacomForm);

					var companyResponse = await this.$store.dispatch("POSTDatacom", newDatacomForm);
					console.log("companyResponse", companyResponse);

					this.isLoadPanelVisible = false;

					return resolve(companyResponse);
				} catch (error) {
					console.error("Promise Response Error creating Company", error);
					return reject(error);
				}
			});
			
		},
		refreshDatacom() {
			console.log("GETDatacomList");
			this.$store.dispatch("GETDatacomList");
		},
		//Clear Form Data
		clearFormData() {
			console.log("clearFormData this.partnerForm", this.partnerForm);
			for (let key in this.partnerForm) {
				console.log("key", this.partnerForm[key]);
				if (this.partnerForm[key] === true || this.partnerForm[key] === false) {
					// console.log('TF key', key);
					this.partnerForm[key] = false;
				} else {
					this.partnerForm[key] = null;
				}
			}
			//Reset Datacom Variables
			this.partnerForm.is_datacom = true;
			this.partnerForm.is_active = true;
			this.partnerForm.primary_contacts= [];
			this.partnerForm.	billing_contacts= [];
			this.partnerForm.technical_contacts= [];
			this.partnerForm.shipping_contacts= [];
		},
		// Populate Fields for editing in browser
		async editDatacom() {
			this.clearFormData();
			this.activeTab = 1;
			if (this.checkedRows.length != 0) {
				this.$refs.employeeDatabaseRef.clearData();
				console.log("this.checkedRows != 0", this.checkedRows);
				var rowID = this.checkedRows.slice(-1)[0].id;

				var getSelectedDatacomObj = await this.$store.dispatch("GETDatacomSelectedProfile", {id: rowID});
				console.group('getSelectedDatacomObj', getSelectedDatacomObj);

				for (let key in this.partnerForm) {
					this.partnerForm[key] = this.GET_SELECTED_DATACOM_PROFILE[key];
				}
				this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML = this.partnerForm.description;
				//get employee List for specified company
				let response = await this.getObjectQueryFilter(getSelectedDatacomObj);
				console.log('editDatacom response', response);
				this.$store.dispatch("GETSelectedEmployeeList", {id: response.id, filterURL: response.filterURL});
				console.log('this.$refs', this.$refs);
				this.$refs.employeeDatabaseRef.mountSelectedEmployeeList();
			} 
			this.showEditProfile();
		},
		async editDatacomById(companyID) {
			console.log("editDatacom");
			this.clearFormData();
			this.activeTab = 0;
			//2) Get User ID and object and map to fields from database table
			var getSelectedDatacomObj = await this.$store.dispatch("GETDatacomSelectedProfile", {id: companyID});
			console.group('getSelectedDatacomObj', getSelectedDatacomObj);

			for (let key in this.partnerForm) {
				this.partnerForm[key] = this.GET_SELECTED_DATACOM_PROFILE[key];
			}
			this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML = this.partnerForm.description;
			this.showEditProfile();
		},
		//Load Datacom On itnitial render
		async loadDatacomProfile() {
			for (let key in this.partnerForm) {
				this.partnerForm[key] = this.GET_DATACOM_PROFILE[key];
			}
			this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML = this.partnerForm.description;

			let response = await this.getObjectQueryFilter(this.GET_DATACOM_PROFILE);
			console.log('editDatacom response', response);
			this.$store.dispatch("GETSelectedEmployeeList", {id: response.id, filterURL: response.filterURL});
			console.log('this.$refs', this.$refs);
			this.$refs.employeeDatabaseRef.mountSelectedEmployeeList();
			this.resetViewtoHome();
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateDatacomPATCH() {
			this.syncWithMixin();
			let newDatacomForm = await this.setUserPlatformPOST();
			newDatacomForm.description = this.$refs.datacomDescription.f7TextEditor.contentEl.innerHTML;
			delete newDatacomForm.profile_img;
			console.log("updateCompanyPATCH newDatacomForm", newDatacomForm);
			this.$store.dispatch("PATCHDatacomProfile", newDatacomForm);
			this.resetViewtoHome();
		},
		//Set inventory item to inactive instead of deleting instance
		async deleteDatacom() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var findIndexID = this.GET_DATACOM_LIST.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteDatacom findIndexID", findIndexID);
				if (this.GET_DATACOM_LIST.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.GET_DATACOM_LIST.length != 0) {
					let companyItem = this.GET_DATACOM_LIST[findIndexID];
					console.log("deleteDatacom != 0 companyItem", companyItem);
					for (let key in this.partnerForm) {
						this.partnerForm[key] = companyItem[key];
					}
					//Set Variables to make account inactive
					delete this.partnerForm.profile_img;
					this.partnerForm.is_active = false;
					const date = Date.now();
					const newDate = new Date(date);
					console.log("newDate", newDate.toISOString());
					this.partnerForm.acct_closure_date = newDate;
					try {
						await this.$store.dispatch("deleteDatacom", this.partnerForm).then((response) => {
							console.log("response from deleteDatacom method", response);
							this.clearFormData();
						});
					} catch (error) {
						console.error("Promise Response Error", error);
					}
				}
			} else {
				this.$store.commit("updateNotification", "You must select an item first");
			}
			this.resetViewtoHome();
		},
		//Callback function from Child Component
		syncWithMixin(payload) {
			console.log("Must emit informaiotn from child component to parent");
			console.log('syncWithMixin payload', payload);
			return new Promise((resolve, reject) => {
				this.partnerForm.primary_mailing_country = payload.primary_country_name;
				this.partnerForm.primary_mailing_state = payload.primary_state_name;
				this.partnerForm.billing_country = payload.billing_country_name;
				this.partnerForm.billing_state = payload.billing_state_name;
				this.partnerForm.shipping_country = payload.shipping_country_name;
				this.partnerForm.shipping_state = payload.shipping_state_name;
				console.log('this.partnerForm', this.partnerForm);
				console.log('this.localeCities', this.localeCities);

				return resolve(payload.primary_state_name);
			});
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
		...mapGetters(["GET_DATACOM_LIST"]),
		scrollHeight() {
			if(this.windowWidth > 640) {
				let footerPercent = this.windowHeight * .19
				return this.windowHeight - footerPercent
			} 
			return "100%"
		},
		tabWidth() {
			if(this.windowWidth <= 850) {
				return 400
			} else if(this.windowWidth > 850 && this.windowWidth <=1280) {
				return 600
			}
			return "100%"
		}
    
  },
  watch: {

  },
  mounted() {
		window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      console.log("Window width is:", this.windowWidth);
		})
		window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight
      console.log("Window height is:", this.windowHeight);
		})



		
		
    
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

