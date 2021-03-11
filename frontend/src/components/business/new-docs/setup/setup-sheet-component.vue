<template>
	<div>
		<v-bottom-sheet class="top-sheet" v-model="setupSheetOpened">
      <v-sheet height="100vh">
				<nav class="close-sheet-button">
					<div class="header">
						Account Setup
					</div>
					<div class="close-button">
						<a href="#" @click="closePopup">
							<fa-layer class="mdi-35">
								<fa-icon :icon="['fas', 'circle']" style="color:#F75403;"></fa-icon>
								<fa-icon :icon="['fas', 'times']" style="color:white;" data-fa-transform="shrink-6"></fa-icon>
							</fa-layer>
						</a>
					</div>
				</nav>
				<div class="frame-container-sheet">
					<DxScrollView
						id="contractsScroll"
						ref="contractsScrollWidget"
						height="100%"
						width="100%"
						:scroll-by-content="false"
						:scroll-by-thumb="true"
						show-scrollbar="always"
						:bounce-enabled="true">
						<div class="content-block">
							
							<template>
								<div class="row">
									<div class="headline-3">Attendance</div>
									<v-progress-linear
										color="light-blue"
										height="20"
										:value="attendanceProgressbar.value"
										striped
									>
									<span>{{ attendanceProgressbar.value }}%</span>
									</v-progress-linear>
									<div class="row">
										<div class="col-4">
											<div class="headline-5 mt-4">Create Payroll Cycles</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														disabled>
														Create Now
													</v-btn>
												</div>
											</div>
										</div>
										<div class="col-4">
											<div class="headline-5 mt-4">Approve Timecards</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														disabled>
														Setup Now
													</v-btn>
												</div>
											</div>
										</div>
										<div class="col-4">
											<div class="headline-5">Attendance Rules</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														disabled>
														Setup Now
													</v-btn>
												</div>
											</div>
										</div>
									</div>
								</div>
							</template>

							<template>
								<div class="row">
									<div class="headline-3">Company Details</div>
									<v-progress-linear
										color="light-blue"
										height="20"
										:value="companyProgressbar.value"
										striped
									>
										<span>{{ companyProgressbar.value }}%</span>
									</v-progress-linear>
									<div class="row">
										<div class="col-6">
											<div class="headline-5 mt-4">Create Departments</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
													@click="openDepartmentsPopup">
														Create Now
													</v-btn>
													<departmentsComponent 
														ref="departmentsPopup" />
												</div>
											</div>
										</div>
										<div class="col-6">
											<div class="headline-5 mt-4">Positions</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
													@click="openPositionsPopup">
														Setup Now
													</v-btn>
													<employeePositionsComponent 
														ref="positionsPopup" />
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-6">
											<div class="headline-5 mt-4">Create Employees</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn>
														Create Now
													</v-btn>
												</div>
											</div>
										</div>
										<div class="col-6">
											<div class="headline-5 mt-4">Create Products / Services</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn>
														Setup Now
													</v-btn>
												</div>
											</div>
										</div>
									</div>
								</div>
							</template>

							<template>
								<div class="row">
									<div class="headline-3">Groups and Permissions</div>
									<v-progress-linear
										color="light-blue"
										height="20"
										:value="groupsProgressbar.value"
										striped
									>
										<span>{{ groupsProgressbar.value }}%</span>
									</v-progress-linear>
									<div class="row">
										<div class="col-4">
											<div class="headline-5 mt-4">Groups</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														@click="openGroupsPopup">
														Create Now
													</v-btn>
													<groupsSheetComponent
														ref="groupSheetRef"/>
												</div>
											</div>
										</div>
										<div class="col-4">
											<div class="headline-5 mt-4">Permissions</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn 
														@click="openPermissionsPopup">
														Setup Now
													</v-btn>
													<permissionsSheetComponent
														ref="permissionSheetRef"/>
												</div>
											</div>
										</div>
										<div class="col-4">
											<div class="headline-5 mt-4">Module Managers</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														disabled>
														Setup Now
													</v-btn>
												</div>
											</div>
										</div>
									</div>
								</div>
							</template>


							<template>
								<div class="row">
									<div class="headline-3">Tax Profile</div>
									<v-progress-linear
										color="light-blue"
										height="20"
										:value="salesTaxProgressbar.value"
										striped
									>
										<span>{{ salesTaxProgressbar.value }}%</span>
									</v-progress-linear>
									<div class="row">
										<div class="col-6">
											<div class="headline-5 mt-4">Sales Tax</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														disabled>
														Create Now
													</v-btn>
												</div>
											</div>
										</div>
										<div class="col-6">
		
										</div>
									</div>
								</div>
							</template>

							<template>
								<div class="row">
									<div class="headline-3">Human Resources</div>
									<v-progress-linear
										color="light-blue"
										height="20"
										:value="hrProgressbar.value"
										striped
									>
										<span>{{ hrProgressbar.value }}%</span>
									</v-progress-linear>
									<div class="row">
										<div class="col-6">
											<div class="headline-5 mt-4">HR Setup Wizard</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														disabled>
														Setup Now
													</v-btn>
												</div>
											</div>
										</div>
										<div class="col-6">
											<p>PTO?</p>
											<p>Benefits?</p>
											<p>Time Off Allowances</p>
										</div>
									</div>
								</div>
							</template>

							<template>
								<div class="row">
									<div class="headline-3">API Keys</div>
									<v-progress-linear
										color="light-blue"
										height="20"
										:value="apiProgressbar.value"
										striped
									>
										<span>{{ apiProgressbar.value }}%</span>
									</v-progress-linear>
									<div class="row">
										<div class="col-6">
											<div class="headline-5 mt-4">Credit Card Processing</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														@click="openElavonAPIPopup">
														Setup Now
													</v-btn>
													<ElavonApiKeysComponent
														ref="elavonAPIPopup" />
												</div>
											</div>
										</div>
										<div class="col-6">
											<div class="headline-5 mt-4">ACH Processing</div>
											<div class="row">
												<div class="col-6">
													<v-checkbox label="Completed"></v-checkbox>
												</div>
												<div class="col-6">
													<v-btn
														disabled>
														Setup Now
													</v-btn>
												</div>
											</div>
										</div>
									</div>
								</div>
							</template>

						</div>
					</DxScrollView>
					<v-divider></v-divider>
						<v-divider></v-divider>
						<v-divider></v-divider>
					<div class="row justify-end">
						
						<div class="col-2 mr-3 text-right">
							<v-btn @click="closePopup">
								Close
							</v-btn>
						</div>
					</div>
				</div>
      </v-sheet>
    </v-bottom-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Devexorcess
import { DxScrollView } from 'devextreme-vue/scroll-view';

//Components
import employeePositionsComponent from "@/components/business/new-docs/setup/positions-popup-component"
import departmentsComponent from "@/components/business/new-docs/setup/departments-popup-component"
import groupsSheetComponent from "@/components/employees/groups-permissions/groups-sheet-component"
import permissionsSheetComponent from "@/components/employees/groups-permissions/permissions-sheet-component"
import ElavonApiKeysComponent from "@/components/financial/new/elavon-apikeys-component"

export default {
	name: "setupSheetComponent",
	mixins: [],
	components: {
		DxScrollView,
		employeePositionsComponent,
		departmentsComponent,
		permissionsSheetComponent,
		groupsSheetComponent,
		ElavonApiKeysComponent
	},
	props: {
		setupSheetOpened: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {

			companyProgressbar: {
				value: null,
				title: "Company Setup 14"
			},
			attendanceProgressbar: {
				value: 95,
				title: "Attendance 95"
			},
			groupsProgressbar: {
				value: 39,
				title: "Groups Permissions 39"
			},
			salesTaxProgressbar: {
				value: 38,
				title: "Sales tax 38"
			},
			hrProgressbar: {
				value: 52,
				title: "Human Resources 52"
			},
			apiProgressbar: {
				value: 10,
				title: "Processing API"
			}
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.Inventory.inventoryList", this.Inventory.inventoryList);
			console.log("this.GET_DEPARTMENTS_LIST", this.GET_DEPARTMENTS_LIST);
			console.log("this.GET_POSITIONS_LIST", this.GET_POSITIONS_LIST);
			console.log("this.Employees.employeeList", this.Employees.employeeList);
			console.log("this.GroupsPermissions.groupsList", this.GroupsPermissions.groupsList);
		},
		closePopup(e) {
			this.$emit('closeSetupSheet', false)
		},
		openPositionsPopup() {
			this.$refs.positionsPopup.openPositionsPopup = true
		},
		openDepartmentsPopup() {
			this.$refs.departmentsPopup.openedDeptPopup = true
		},
		openGroupsPopup() {
			this.$refs.groupSheetRef.groupSheetOpened = true
		},
		openPermissionsPopup() {
			this.$refs.permissionSheetRef.permissionSheetOpened = true
		},
		openElavonAPIPopup() {
			this.$refs.elavonAPIPopup.openedBasicPopup = true
		}
	},
	computed: {
		...mapState(["Merchants", "Employees", "Attendance", "GroupsPermissions", "Inventory"]),
		...mapGetters(["GET_DEPARTMENTS_LIST", "GET_POSITIONS_LIST"]),
	},
	created() {},
	mounted() {
		//Company Progressbar
		var percent = 0;
		var count = 0;
		var total = 6;
		// this.GET_DEPARTMENTS_LIST.length >= 1 ? (count = +1) : null;
		// this.GET_POSITIONS_LIST.length >= 1 ? (count = +1) : null;
		// this.Employees.employeeList.length >= 1 ? (count = +1) : null;
		// this.Inventory.inventoryList.length >= 1 ? (count = +1) : null;
		// this.GroupsPermissions.groupsList >= 1 ? (count = +1) : null;
		// this.GET_DEPARTMENTS_LIST.length >= 1 ? count =+ 1: null;

		console.log("total", total);
		console.log("count", count);
		percent = (count / total) * 100;

		this.companyProgressbar["title"] = "Company";
		this.companyProgressbar["value"] = percent;
	}
	
};
</script>

<style scoped lang="scss">
.top-sheet {
	z-index: 1000;
}
.close-sheet-button {
	position: relative;
	right: 20px;
	top: 0px;
}

.frame-container-sheet {
	height: calc(90vh - 150px);
}
</style>
