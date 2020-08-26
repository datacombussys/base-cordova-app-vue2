<template>
  <div>
		<!-- Main Container Row -->
		<!-- <div class="row">
			<subNavBarComponent />
		</div> -->
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
								<div class="title">{{ customerForm.first_name }} {{ customerForm.last_name }}</div>
								<div class="row justify-between">
									<div class="col-50">
										<div class="subtitle">Customer</div>
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
										:profileData="customerForm" />
									</div>
								</div>
							</v-card-title>

							<v-card-text>
								<div v-if="!customerForm.id" class="flex justify-center items-center">
									<img
										class="mt-3 disabled"
										src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>
								<div v-else class="flex justify-center items-center">
									<img class="mt-3" v-if="customerForm.profile_img" 
										:src="customerForm.profile_img"
										style="width:150px;height:150px;"
										alt="Please load profile">
									<img class="mt-3" v-else src="@/static/BusinessLogo170x170.png"
										style="width:150px;height:150px;"
										alt="Please load profile">
								</div>

								<div class="mt-4" v-if="customerForm.barcode_obj">
									<div class="mt-4 business-barcode text-center">
										{{ customerForm.barcode_obj.barcode_number }}
									</div>
									<p class="text-center">{{ customerForm.barcode_obj.barcode_number }}</p>
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
				<!-- End Profile Card -->

				<!-- Button Block -->
				<div class="small-block">
					<v-card>
						<v-card-text>
							<div class="flex flex-wrap w-full">
								<div v-show="!hideCreateItem" class="mt-4 w-full">
									<DxButton
										width="100%"
										type="success"
										text="Add New Customer"
										@click="newItemButton" />
								</div>
								<div v-show="!accountSettings.hideSaveItem" class="mt-4 w-full">
									<dx-drop-down-button
										text="Save Customer"
										width="100%"
										:split-button="true"
										@button-click="createCustomerAndClose"
										@item-click="createCustomerChoices"
										:items="saveCustomerItems"
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
										@click="testMethod"
										:focusStateEnabled="false" />
								</div>
							</div>
						</v-card-text>
					</v-card>
				</div>

			</div>
			<div class="right-col">
				<!-- Header Card -->
				<div class="small-block"><v-card class="rounded-md">
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
								<router-link to="/help-desk">
									<div class="mdi mdi-lifebuoy mdi-60 text-datacom mb-3"></div>
									<div class="mt-4 text-center">Support</div>
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
									<DxTabPanel :show-nav-buttons="true" :selected-index.sync="selectedTabIndex">
										<DxItem title="Parent" icon="mdi mdi-domain">
											<template #default>
												<parentSelectionComponent 
													:formData="customerForm" 
													:accountSettings="accountSettings"
													:moduleInfo="moduleInfo">
												</parentSelectionComponent>
											</template>
										</DxItem>
										<DxItem title="Profile" icon="mdi mdi-account-box">
											<template #default>
												<customerProfileComponent 
													:formData="customerForm" 
													:accountSettings="accountSettings">
												</customerProfileComponent>
											</template>
										</DxItem>
										<DxItem title="Documents" icon="mdi mdi-file-multiple-outline">
											<template #default>
												<customerDocumentsComponent :accountSettings="accountSettings">
												</customerDocumentsComponent>
											</template>
										</DxItem>
										<DxItem title="Shipping" icon="mdi mdi-truck-delivery-outline">
											<template #default>
												<shippingLocationsComponent :formData="customerForm">
												</shippingLocationsComponent>
											</template>
										</DxItem>
										<DxItem title="Payment" icon="mdi mdi-credit-card-outline">
											<template #default>
												<paymentMethodsComponent :formData="customerForm">
												</paymentMethodsComponent>
											</template>
										</DxItem>
										<DxItem title="Invoices" icon="material-icons picture_as_pdf">
											<template #default>
												<invoiceDatabaseComponent 
													:databaseSettings="databaseSettings"
													:databaseData="databaseData"/>
											</template>
										</DxItem>
										<DxItem title="Receipts" icon="material-icons receipt">
											<template #default>
												<receiptsDatabaseComponent 
													:databaseSettings="databaseSettings"
													:databaseData="databaseData"/>
											</template>
										</DxItem>
										<DxItem title="Database" icon="mdi mdi-database">
											<template #default>
												<databaseComponent 
													:databaseSettings="databaseSettings"
													:databaseData="databaseData"
													@editProfile="editProfileFromChild"
													@deleteProfile="deleteProfileFromChild"
												></databaseComponent>
											</template>
										</DxItem>
									</DxTabPanel>
								</div>

							</v-card-text>
						</v-card>
					</div>
				</template>

			</div>
		
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
import customerProfileComponent from "@/components/customers/profile-component"
import shippingLocationsComponent from "@/components/business/new-docs/shipping-component"
import paymentMethodsComponent from "@/components/business/new-docs/payment-component"
import receiptsDatabaseComponent from "@/components/customers/receipts-component"
import invoiceDatabaseComponent from "@/components/customers/invoices-component"
import databaseComponent from "@/components/business/new-docs/database-component"
import parentSelectionComponent from "@/components/business/new-docs/parent-selection-component"
import customerDocumentsComponent from "@/components/customers/documents-component"
import profileImageComponent from "@/components/universal/new/profile-image-component"
import subNavBarComponent from "@/components/elements/layout/sub-navbar-component"


export default {
  name: "customerProfile",
	mixins: [

  ],
  components: {
		parentSelectionComponent,
		customerDocumentsComponent,
		customerProfileComponent,
		receiptsDatabaseComponent,
		invoiceDatabaseComponent,
		shippingLocationsComponent,
		paymentMethodsComponent,
		databaseComponent,
		profileImageComponent,
		subNavBarComponent,
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
			saveCustomerItems: [
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
				name: "Empoyee",
				type: "profile",
				level: 5
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
				url: 'customer/',
				module: 'Customer',
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
				type: "customer",
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
				title: "Customer Database",
				header1: "Id",
				header2: "Image",
				header3: "Name",
				header4: "Type",
				header5: "Email",
				header6: "Number",
				header7: "Status",
				col1: "id",
				col2: "profile_img",
				col3: "user_obj.full_name",
				col4: "customer_type",
				col5: "user_obj.email",
				col6: "customer_number",
				col7: "user_obj.is_active"
			},
			databaseData: {
				tableId: "customerDbTable",
				list: new Array()
			},

			//Page Setting for CRUD Display
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			selectedTabIndex: 0,
			openImageSheet: false,

			//Customer / User Form
			customerForm: {
				id: null,
				datacom: null,
				partner: null,
				company: null,
				vendor: null,
				company: null,
				department: null,
				position: null,
				customer_docs: null,
				benefits: null,
				modules_managed: [],
				customer_number: null,
				salary: null,
				salary_type: null,
				customer_type: null,
				work_phone: null,
				is_business: false,
				is_sales_office_ee: false,
				is_sales_rep: false,
				is_exempt: false,
				is_warehouse_ee: false,
				is_manager: null,
				is_module_manager: null,
				reporting_manager: null,
				hire_date: null,
				termination_date: null,
				termination_reason: null,
				ssn: null,
				dob: null,
				org_name: null,
				profile_img: null,
				user: {
					id: null,
					date_added: null,
					global_id: null,
					last_login: null,
					first_name: null,
					last_name: null,
					full_name: null,
					password: null,
					verify_pw: null,
					pin: null,
					email: null,
					username: null,
					mobile_phone: null,
					fax: null,
					address: null,
					address2: null,
					city: null,
					state: null,
					zip: null,
					country: null,
					bio: null,
					is_active: true,
					is_admin: false,
					is_staff: true,
					is_superuser: false,
					is_cutomer: false,
					is_vendor: false,
					is_sales_rep: false,
					is_warehouse_ee: false,
					barcode: null,
					barcode_obj: null,
					groups: [],
					permissions: [],
				}
			},

		
		
    }
	},
	//******************************************** Methods ***********************************************//
  methods: {
    testMethod(e) {
			console.log('this.customerForm.user.password', this.customerForm.user.password)
			console.log('JQMIGRATE: Migrate is installed, version 3.0.0')

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
			this.clearUserFormData();
			// console.log("this.clearUserFormData")
			this.accountSettings.editProfile = true
			// console.log("this.accountSettings.editProfile")
			this.hideCreateItem = !this.hideCreateItem
			// console.log("this.hideCreateItem")
			this.hideUpdateItemButtons = false
			// console.log("this.hideUpdateItemButtons")
			this.accountSettings.hideSaveItem = false
			// console.log("this.accountSettings.hideSaveItem")
			this.selectedTabIndex = 2
			// console.log("this.selectedTabIndex")
		},
		clearandResetButton() {
			this.clearUserFormData()
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
		createCustomerChoices(e) {
			console.log('e', e)
			if(e.itemData === "Create and New") {
				this.createCustomerAndNew()
			} else if(e.itemData === "Create and Edit") {
				this.createCustomerAndEdit()
			} else if(e.itemData === "Create and Close") {
				this.createCustomerAndClose()
			}
		},
		refreshCustomers() {
			this.$store.dispatch("GETCustomerList");
		},
		//Create Customer and Edit Current Customer
		async createCustomerAndEdit() {
			this.$store.commit("RESET_ERRORS");
			let createCustomerRes = await this.createUser();
			//Populate Fields with Created Instance
			this.editDatacomById(createCustomerRes.id);
			console.log("createCustomerAndEdit All Done", createCustomerRes);
		},

		//Create Customer and Clear form for entering a new company
		async createCustomerAndNew() {
			this.$store.commit("RESET_ERRORS");
			await this.createUser();
			//Clear Form and Reset to Starting Editing Position
			console.log("createCustomerAndNew All Done");
			this.newItemButton();
		},
		//Create Customer and Clear form for Viewing Data
		async createCustomerAndClose() {
			try {
				this.isLoadPanelVisible = true;
				console.log("createCustomerAndClose")
				// this.$store.commit("RESET_ERRORS");
				let createCustomerRes = await this.createUser();
				//Clear Form and Reset to Starting Viewing Position
				console.log("createCustomerAndClose All Done", createCustomerRes);
				if(createCustomerRes) {
					this.isLoadPanelVisible = false;
					await this.clearUserFormData();
					this.resetViewtoHome()
				}
			} catch(error) {
				this.submissionError()
				this.isLoadPanelVisible = false
			}
		},
		createUser() {
			return new Promise(async (resolve, reject) => {
				var newUserForm = {};
				try {
					console.log("Create User this.customerForm.user", this.customerForm.user);
					let response = await this.$store.dispatch("POSTUser", this.customerForm.user);
					console.log("User POST response: ", response);
					this.customerForm.user.barcode = {};
					if (response.status === 200 || response.status === 201) {
						console.log("Response 201");
						newUserForm = response.data;

						this.customerForm["user"] = newUserForm.id;
						console.log("Successful User created:", newUserForm);

						let employeeRes = await this.createCustomer(newUserForm)

						return resolve(employeeRes)

					} else {
						return reject({newerror: "The create User had an error"})
					}
				} catch (error) {
					this.isLoadPanelVisible = false;
					console.log('error', error)
					console.log('error.message', error.message)
					console.log('error.response', error.response)
					//Return an undefined becasue was error
					return reject(error.response);
				}
				
				}).catch((error) => {
					console.log("Caught createUser Promise error:", error);
					return reject(error);
			});

		},
		createCustomer(user) {
			return new Promise(async (resolve, reject) => {
				try {
					console.log("createCustomer");
					//Get Company ID (from each company type) and UserID add to Customer Form
					console.log("this.customerForm", this.customerForm);
				
					var companyOBJ = {};
					if (this.accountSettings.accountPlatform.is_datacom) {
						companyOBJ = this.Datacom.datacomList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_datacom companyOBJ", companyOBJ);
						this.customerForm["datacom"] = companyOBJ.id;
					} else if (this.accountSettings.accountPlatform.is_partner) {
						companyOBJ = this.Partners.partnerList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_partner companyOBJ", companyOBJ);
						this.customerForm["partner"] = companyOBJ.id;
					} else if (this.accountSettings.accountPlatform.is_merchant) {
						companyOBJ = this.Companies.companyList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_merchant companyOBJ", companyOBJ);
						this.customerForm["company"] = companyOBJ.id;
					} else if (this.accountSettings.accountPlatform.is_vendor) {
						companyOBJ = this.Vendors.vendorList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_vendor companyOBJ", companyOBJ);
						this.customerForm["vendor"] = companyOBJ.id;
					} else {
						console.log("You must select a Company");
						response.type = "Create Customer";
						response.status = 400;
						this.$store.dispatch("updateNotification", response);
						return "You must select a Company";
					}

					console.log("this.customerForm", this.customerForm);
					let eeResponse = await this.$store.dispatch("POSTCustomer", this.customerForm);
					console.log("Create Customer Promise eeResponse", eeResponse);
					
					//Reset User Object to customerForm
					this.customerForm.user = user;

					this.addToSalesOffice(eeResponse)
					console.log("after addToSalesOffice");

					return resolve(eeResponse);

				} catch (error) {
					console.error('error', error).
					console.error('error.message', error.message)
					console.error('error.response', error.response)
					error.type = "Create Customer";
					this.$store.dispatch("updateNotification", error.response);
					return reject(error);
				}
			}).catch((error) => {
				console.log("Caught createCustomer Promise error:", error);
				return error;
			});

		},
		addToSalesOffice(form) {
			console.log("addToSalesOffice");
			//Make submission to add employee to Sales office or Warehouse
			if(this.GET_SALES_OFFICE_LIST.length != 0) {
				let idArray = this.GET_SALES_OFFICE_EMPLOYEE_IDS;
				console.log('idArray', idArray);
				idArray.push(this.form.data.id);

				if(this.sales_office_id.length != 0) {
					let eeObj = {
						id: this.this.sales_office_id,
						employees: idArray
					}
					console.log('eeObj', eeObj);
					
					this.$store.dispatch("PATCHSalesOfficeProfile", eeObj);
				}
			}
			return
		},
		async editCustomerById(employeeID) {
			console.log("editCustomerById employeeID", employeeID)
			this.accountSettings.showPasswordReset = true
			this.selectedTabIndex = 0
			this.clearFormData()

			try {
				// Get User ID and object and map to fields from database table
				var getSelectedCustomerObj = await this.$store.dispatch("GETCustomerSelectedProfile", {id: employeeID});
				console.group('getSelectedCustomerObj', getSelectedCustomerObj);

				for (let key in this.customerForm) {
					this.customerForm[key] = this.GET_SELECTED_EMPLOYEE_PROFILE[key];
				}

				//Switch View to Edit Mode
				this.resetViewtoHome();
				this.showEditProfile();
			} catch (error) {
				console.error("Promise error", error)
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateUserPATCH() {
			try {
				await this.$store.dispatch("PATCHCustomerProfile", this.customerForm.user).then((response) => {
					console.log("PATCH User Repsonse Update User", response);
				});
				delete this.customerForm.user;
				await this.$store.dispatch("PATCHCustomerProfile", this.customerForm).then((response) => {
					console.log("PATCH User Repsonse Update Customer", response);
				});
			} catch (error) {
				console.log("There was an error in the try catch block", error);
			}
		},
		clearUserFormData() {
			this.$store.commit("RESET_ERRORS");
			return new Promise((resolve, reject) => {
				try {
					console.log("clearUserFormData this.customerForm", this.customerForm);
					for (let key in this.customerForm.user) {
						// console.log('key', this.customerForm.user[key]);
						if (this.customerForm.user[key] === true || this.customerForm.user[key] === false) {
							// console.log('TF key', key);
							this.customerForm.user[key] = false;
						} else {
							this.customerForm.user[key] = null;
						}
					}

					//Reset Variables to Start Position
					this.customerForm.user.groups = [];
					this.customerForm.user.permissions = [];
					this.customerForm.user.is_staff = true;
					this.customerForm.user.is_active = true;

					return resolve("ClearUserForms Promise Returned");
				} catch (error) {
					console.log("Caught error", error);
					return reject(error);
				}
			});
		},
		clearCustomerFormData() {
			console.log("this.customerForm Clear Data", this.customerForm);
			const user = this.customerForm.user;
			for (let key in this.customerForm) {
				console.log("key", this.customerForm[key]);
				if (this.customerForm[key] === true || this.customerForm[key] === false) {
					// console.log('TF key', key);
					this.customerForm[key] = false;
				} else {
					this.customerForm[key] = null;
				}
			}
			//Reset Properties
			this.customerForm.modules_managed = [];
			//Reassign User to Customer
			this.customerForm.user = user;
		},
		//Set User item to inactive instead of deleting instance
		async deleteCustomer(id) {
			console.log('deleteCustomer id', id);
			try {
				let eeObject = this.GET_CUSTOMER_LIST.find(elem => elem.id === id)
				console.log('deleteCustomer eeObject', eeObject);
				eeObject.user.is_active = false;

				await this.$store.dispatch("PATCHDeleteUserProfile", eeObject.user).then((response) => {
					console.log("response from deleteCustomer method", response);
					this.clearFormData();
				});

			} catch(error) {
				console.error("Delete error", error)
			}
			await this.clearUserFormData();
			this.resetViewtoHome();
		},
		//Capture Edit by Child DataGrid Component
		editProfileFromChild(e) {
			console.log('editProfileFromChild e', e);
			this.editCustomerById(e)
		},
		deleteProfileFromChild(e) {
			console.log('deleteProfileFromChild e', e);
			this.deleteCustomer(e)
		},
		submissionError() {
			this.$nextTick(function() {
				alert("<p>The submission had errors. Please try again.</p>", "Error")
			})
		}

  },
  computed: {
		...mapState(["Auth", "Users", "Merchants", "Datacom", "Partners", "Vendors", "Customers"]),
		...mapGetters(["GET_SALES_OFFICE_LIST", "GET_WAREHOUSE_LIST", "GET_SALES_OFFICE_EMPLOYEE_IDS", "GET_CUSTOMER_LIST", "GET_SELECTED_EMPLOYEE_PROFILE"]),
		...mapGetters(["GET_USER_ERRORS_LIST", "GET_USER_ERROR_HANDLE", "GET_EMPLOYEE_ERRORS_LIST", "GET_EMPLOYEE_ERROR_HANDLE"]),
		canSubmitUserForm() {
			if (this.Auth.isAuthenticated) {
				if (this.accountSettings.accountPlatform.is_datacom) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_partner) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_merchant) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
				if (this.accountSettings.accountPlatform.is_vendor) {
					if ((this.requiredFieldsDone = 6)) {
						return false;
					}
				}
			}
			return true;
		}		
    
  },
  watch: {

  },
  mounted() {
    
  },
  created() {
		this.databaseData.list = this.GET_CUSTOMER_LIST;
  },

    
  }
</script>

<style lang="scss">
#tabContainer {
	width: 100%;
}

</style>

