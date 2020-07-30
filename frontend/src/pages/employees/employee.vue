<template>
  <div>
		<!-- Main Container Row -->
		<div class="main-container">
			<!-- Left Column -->
			<div class="left-col">
				<div class="small-block">
					<v-card class="rounded-md">
						<v-card-title>
								<div class="title">Joey Cipoletti</div>
								<div class="subtitle">Employee</div>

							<v-spacer></v-spacer>

								<v-menu bottom left>
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											dark
											icon
											v-bind="attrs"
											v-on="on"
										>
										<p>Icon here</p>
											<v-icon>mdi-dots-vertical</v-icon>
										</v-btn>
									</template>

									<v-list>
										<v-list-item
											v-for="(item, i) in profileMenu"
											:key="i"
											@click=""
										>
											<v-list-item-title>{{ item.title }}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
						</v-card-title>

						<v-card-text class="flex flex-col w-full">
							<div>
								<img src="@/static/BusinessLogo170x170.png"
									style="width:170px;height:170px;"
									alt="Please load company profile">
							</div>
							<div class="mt-4">
								<div class="mt-4 business-barcode">
									D-13343645
								</div>
								<p class="text-center">D-13343645</p>
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
										text="Add New Employee"
										@click="newItemButton" />
								</div>
								<div v-show="!accountSettings.hideSaveItem" class="mt-4 w-full">
									<dx-drop-down-button
										text="Save Employee"
										width="100%"
										:split-button="true"
										@button-click="createEmployeeAndClose"
										@item-click="createEmployeeChoices"
										:items="saveEmployeeItems"
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

								<v-card-text class="flex w-full spacing">
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
											<DxTabPanel :show-nav-buttons="true">
												<DxItem title="Parent" icon="mdi mdi-domain">
													<template #default>
														<parentSelectionComponent 
														:formData="employeeForm" 
														:accountSettings="accountSettings"
														:moduleInfo="moduleInfo"></parentSelectionComponent>
													</template>
												</DxItem>
												<DxItem title="Profile" icon="mdi mdi-account-box">
													<template #default>
														<employeeProfileComponent 
															:formData="employeeForm" 
															:accountSettings="accountSettings">
														</employeeProfileComponent>
													</template>
												</DxItem>
												<DxItem title="Human Resources" icon="mdi mdi-lan">
													<template #default>
														<employeeHumanResourcesComponent :formData="employeeForm" :accountSettings="accountSettings"></employeeHumanResourcesComponent>
													</template>
												</DxItem>
												<DxItem title="Benefits" icon="mdi mdi-hand-heart">
													<template #default>
														<employeeBenefitsComponent :formData="employeeForm" :accountSettings="accountSettings"></employeeBenefitsComponent>
													</template>
												</DxItem>
												<DxItem title="Documents" icon="mdi mdi-file-multiple-outline">
													<template #default>
														<employeeDocumentsComponent :formData="employeeForm" :accountSettings="accountSettings"></employeeDocumentsComponent>
													</template>
												</DxItem>
												<DxItem title="Attendance" icon="mdi mdi-account-clock">
													<template #default>
														<attendanceRecordComponent :formData="employeeForm"></attendanceRecordComponent>
													</template>
												</DxItem>
												<DxItem title="Database" icon="mdi mdi-database">
													<template #default>
														<databaseComponent 
														:databaseSettings="databaseSettings"
														:databaseData="databaseData"
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
// import syncfusionTabs from "@/components/business/syncfusion-tabs/tabs-component"
import employeeProfileComponent from "@/components/employees/profile-component"
import shippingLocationsComponent from "@/components/business/new-docs/shipping-component"
import paymentMethodsComponent from "@/components/business/new-docs/payment-component"
import databaseComponent from "@/components/business/new-docs/database-component"
import parentSelectionComponent from "@/components/business/new-docs/parent-selection-component"
import employeeHumanResourcesComponent from "@/components/employees/human-resources-component"
import employeeBenefitsComponent from "@/components/employees/benefits-component"
import employeeDocumentsComponent from "@/components/employees/documents-component"
import attendanceRecordComponent from "@/components/employees/attendance-record-component"

export default {
  name: "employeeProfile",
	mixins: [

  ],
  components: {
		parentSelectionComponent,
		employeeHumanResourcesComponent,
		employeeBenefitsComponent,
		employeeDocumentsComponent,
		attendanceRecordComponent,
		employeeProfileComponent,
		shippingLocationsComponent,
		paymentMethodsComponent,
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
			saveEmployeeItems: [
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
				url: 'employee/',
				module: 'Employee',
				mutation: 'UPDATE_PROFILE_IMAGE'
			},
			profileMenu: [
        { title: 'Profile Image' },
      ],
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
			//Database Compoennt Data
			databaseSettings: {
				title: "Employee Database",
				header1: "Id",
				header2: "Name",
				header3: "Number",
				header4: "Position",
				header5: "Mobile",
				header6: "Status",
				col1: "id",
				col2: "user_obj.full_name",
				col3: "employee_number",
				col4: "position",
				col5: "user_obj.mobile_phone",
				col6: "user_obj.is_active"
			},
			databaseData: {
				tableId: "employeeDbTable",
				list: new Array()
			},

			//Page Setting for CRUD Display
			hideUpdateItemButtons: false,
			hideCreateItem: false,
			selectedTabIndex: 0,

			//Employee / User Form
			employeeForm: {
				id: null,
				datacom: null,
				partner: null,
				company: null,
				vendor: null,
				company: null,
				department: null,
				position: null,
				employee_docs: null,
				benefits: null,
				modules_managed: [],
				employee_number: null,
				salary: null,
				salary_type: null,
				employee_type: null,
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
					barcode: {},
					groups: [],
					permissions: [],
				}
			},

		
		
    }
	},
	//******************************************** Methods ***********************************************//
  methods: {
    testMethod(e) {
			console.log('this.employeeForm.user.password', this.employeeForm.user.password)


		},
		testMethodMain(e) {
			console.log("testMethodMain e", e);
			console.log("Test Button Clicked");
		},
		editImage() {

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
		},
		createEmployeeChoices(e) {
			console.log('e', e)
			//Find out if tryin to crete nre company and edit or create nrew company and NEW
		},
		//Create Employee and Edit Current Employee
		async createEmployeeAndEdit() {
			this.$store.commit("RESET_ERRORS");
			let createEmployeeRes = await this.createUser();
			//Populate Fields with Created Instance
			this.editDatacomById(createEmployeeRes.id);
			console.log("createEmployeeAndEdit All Done", createEmployeeRes);
		},

		//Create Employee and Clear form for entering a new company
		async createEmployeeAndNew() {
			this.$store.commit("RESET_ERRORS");
			await this.createUser();
			//Clear Form and Reset to Starting Editing Position
			console.log("createEmployeeAndNew All Done");
			this.newItemButton();
		},
		//Create Employee and Clear form for Viewing Data
		async createEmployeeAndClose() {
			try {
				this.isLoadPanelVisible = true;
				console.log("createEmployeeAndClose")
				// this.$store.commit("RESET_ERRORS");
				let createEmployeeRes = await this.createUser();
				//Clear Form and Reset to Starting Viewing Position
				console.log("createEmployeeAndClose All Done", createEmployeeRes);
				if(createEmployeeRes) {
					this.isLoadPanelVisible = false;
					await this.clearUserFormData();
					this.resetViewtoHome()
				}
			} catch(error) {
				this.isLoadPanelVisible = false;
				throw error
			}
		},
		createUser() {
			return new Promise(async (resolve, reject) => {
				var newUserForm = {};
				try {
					console.log("Create User this.employeeForm.user", this.employeeForm.user);
					let response = await this.$store.dispatch("POSTUser", this.employeeForm.user);
					console.log("User POST response: ", response);
					this.employeeForm.user.barcode = {};
					if (response.status === 200 || response.status === 201) {
						console.log("Response 201");
						newUserForm = response.data;

						this.employeeForm["user"] = newUserForm.id;
						console.log("Successful User created:", newUserForm);

						let employeeRes = await this.createEmployee(newUserForm)

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
					this.isLoadPanelVisible = false;
					alert("<p>The submission had errors. Please try again.</p>", "Error");
					console.log("Caught createUser Promise error:", error);
					return error;
			});

		},
		createEmployee(user) {
			return new Promise(async (resolve, reject) => {
				try {
					console.log("createEmployee");
					//Get Company ID (from each company type) and UserID add to Employee Form
					console.log("this.employeeForm", this.employeeForm);
				
					var companyOBJ = {};
					if (this.accountSettings.accountPlatform.is_datacom) {
						companyOBJ = this.Datacom.datacomList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_datacom companyOBJ", companyOBJ);
						this.employeeForm["datacom"] = companyOBJ.id;
					} else if (this.accountSettings.accountPlatform.is_partner) {
						companyOBJ = this.Partners.partnerList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_partner companyOBJ", companyOBJ);
						this.employeeForm["partner"] = companyOBJ.id;
					} else if (this.accountSettings.accountPlatform.is_merchant) {
						companyOBJ = this.Companies.companyList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_merchant companyOBJ", companyOBJ);
						this.employeeForm["company"] = companyOBJ.id;
					} else if (this.accountSettings.accountPlatform.is_vendor) {
						companyOBJ = this.Vendors.vendorList.find((elem) => elem.dba_name == this.accountSettings.accountPlatform.company_name);
						console.log("is_vendor companyOBJ", companyOBJ);
						this.employeeForm["vendor"] = companyOBJ.id;
					} else {
						console.log("You must select a Company");
						response.type = "Create Employee";
						response.status = 400;
						this.$store.dispatch("updateNotification", response);
						return "You must select a Company";
					}

					console.log("this.employeeForm", this.employeeForm);
					let eeResponse = await this.$store.dispatch("POSTEmployee", this.employeeForm);
					console.log("Create Employee Promise eeResponse", eeResponse);
					
					//Reset User Object to employeeForm
					this.employeeForm.user = user;

					this.addToSalesOffice(eeResponse)
					console.log("after addToSalesOffice");

					return resolve(eeResponse);

				} catch (error) {
					console.error('error', error).
					console.error('error.message', error.message)
					console.error('error.response', error.response)
					error.type = "Create Employee";
					this.$store.dispatch("updateNotification", error);
					return reject(error);
				}
			}).catch((error) => {
				console.log("Caught createEmployee Promise error:", error);
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
		refreshEmployees() {
			this.$store.dispatch("GETEmployeeList");
		},
		// Populate Fields for editing in browser
		async showUserData(employeeID) {
			console.log("showUserData employeeID", employeeID);
			this.accountSettings.showPasswordReset = true;
			this.accountSettings.activeTab = 0;
			//Get User ID and object and map to fields
			var emloyeeListID = null;
			if (this.checkedRows.length != 0) {
				var rowID = this.checkedRows.slice(-1)[0].id;
				var eeIndex = this.Employees.employeeList.findIndex((elem) => elem.id === rowID);
				console.log("editUsers eeIndex", eeIndex);
				emloyeeListID = eeIndex;
				console.log("IF emloyeeListID", emloyeeListID);
			} else {
				var findIndexPos = this.Employees.employeeList.findIndex((elem) => {
					return elem.id === employeeID;
				});
				emloyeeListID = findIndexPos;
				console.log("Else emloyeeListID", emloyeeListID);
				console.log("Else this.Employees.employeeList", this.Employees.employeeList);
			}
			//Is there a list of companies to lookup?
			if (this.Employees.employeeList.length === 0) {
				return "There are no items available";
			}
			if (this.Employees.employeeList.length != 0) {
				console.log("this.Employees.employeeList", this.Employees.employeeList);
				console.log("Then employeeListID", emloyeeListID);
				var employeeObj = this.Employees.employeeList[emloyeeListID];
				console.log("showUserData employeeObj", employeeObj);
				this.employeeForm = employeeObj;
				for (let key in this.employeeForm) {
					this.employeeForm[key] = employeeObj[key];
				}
				//Parse the User SubLevel Info for User Data
				for (let attribute in this.employeeForm.user) {
					this.employeeForm.user[attribute] = employeeObj.user[attribute];
				}
				this.employeeForm.company = employeeObj.company;


				//Populate User Bio Field
				//Switch View to Edit Mode
				this.resetViewtoHome();
				this.showEditProfile();
			}
		},
		//Make the PUT request to update datebase instance from updated form Data
		async updateUserPATCH() {
			try {
				await this.$store.dispatch("PATCHEmployeeProfile", this.employeeForm.user).then((response) => {
					console.log("PATCH User Repsonse Update User", response);
				});
				delete this.employeeForm.user;
				await this.$store.dispatch("PATCHEmployeeProfile", this.employeeForm).then((response) => {
					console.log("PATCH User Repsonse Update Employee", response);
				});
			} catch (error) {
				console.log("There was an error in the try catch block", error);
			}
		},
		clearUserFormData() {
			this.$store.commit("RESET_ERRORS");
			return new Promise((resolve, reject) => {
				try {
					console.log("clearUserFormData this.employeeForm", this.employeeForm);
					for (let key in this.employeeForm.user) {
						// console.log('key', this.employeeForm.user[key]);
						if (this.employeeForm.user[key] === true || this.employeeForm.user[key] === false) {
							// console.log('TF key', key);
							this.employeeForm.user[key] = false;
						} else {
							this.employeeForm.user[key] = null;
						}
					}

					//Reset Variables to Start Position
					this.employeeForm.user.groups = [];
					this.employeeForm.user.permissions = [];
					this.employeeForm.user.is_staff = true;
					this.employeeForm.user.is_active = true;

					return resolve("ClearUserForms Promise Returned");
				} catch (error) {
					throw error
					console.log("Caught error", error);
				}
			});
		},
		clearEmployeeFormData() {
			console.log("this.employeeForm Clear Data", this.employeeForm);
			const user = this.employeeForm.user;
			for (let key in this.employeeForm) {
				console.log("key", this.employeeForm[key]);
				if (this.employeeForm[key] === true || this.employeeForm[key] === false) {
					// console.log('TF key', key);
					this.employeeForm[key] = false;
				} else {
					this.employeeForm[key] = null;
				}
			}
			//Reset Properties
			this.employeeForm.modules_managed = [];
			//Reassign User to Employee
			this.employeeForm.user = user;
		},
		//Set User item to inactive instead of deleting instance
		async deleteEmployee() {
			// Is item Selected in table?
			if (this.checkedRows[0].id) {
				var rowID = this.checkedRows[0].id;
				var findIndexID = this.Users.userList.findIndex((elem) => {
					return elem.id == rowID;
				});
				console.log("deleteEmployee findIndexID", findIndexID);
				if (this.Users.userList.length === 0) {
					this.$store.commit("updateNotification", "There are no items available");
				}
				if (this.Users.userList.length === 1) {
					let UserItem = this.Users.userList[0];
					console.log("deleteEmployee len===1 UserItem", UserItem);
					for (let key in this.employeeForm) {
						this.employeeForm[key] = UserItem[key];
					}
					this.employeeForm.is_active = false;
					await this.$store.dispatch("deleteEmployee", this.employeeForm);
				}
				if (this.Users.userList.length >= 2) {
					// Map function to assign the varibles to the form variables
					let UserItem = this.Users.userList[findIndexID];
					console.log("deleteEmployee len>=2 UserItem", UserItem);
					for (let key in this.employeeForm) {
						this.employeeForm[key] = UserItem[key];
					}
					this.employeeForm.is_active = false;
					await this.$store.dispatch("deleteEmployee", this.employeeForm);
				}
			} else {
				this.$store.commit("updateNotification", "You must select an item first");
			}
			await this.clearUserFormData();
		},

  },
  computed: {
		...mapState(["Auth", "Users", "Merchants", "Datacom", "Partners", "Vendors"]),
		...mapGetters(["GET_SALES_OFFICE_LIST", "GET_WAREHOUSE_LIST", "GET_SALES_OFFICE_EMPLOYEE_IDS", "GET_SELECTED_EMPLOYEE_LIST"]),
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
		this.databaseData.list = this.GET_SELECTED_EMPLOYEE_LIST;
  },

    
  }
</script>

<style lang="scss">
#tabContainer {
	width: 100%;
}

</style>

