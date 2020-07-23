<template>
	<div>
		<!-- Setup Sheet -->
		<f7-sheet class="setup-sheet" :opened="setupSheetOpened" @sheet:closed="setupSheetOpened = false">
			<f7-toolbar>
				<div class="left padding-left">Company Setup</div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content>
				<!-- Vue Scrollbar (dragger) -->
				<div
					v-bar="{
						scrollThrottle: 30
					}"
					style="height: 100vh;"
				>
					<!-- el1 -->
					<div>
						<!-- el2 -->

						<f7-card class="margin">
							<f7-card-content class="margin-half">
								<f7-list>
									<!-- Begin Employees Display List -->
									<f7-block-title class="classy margin-top">Attendance</f7-block-title>
									<progressbar-component :settings="attendanceProgressbar"></progressbar-component>

									<f7-row>
										<f7-col width="50">
											<f7-block-title class="classy-small">Create Payroll Cycles</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled :checked="Attendance.payrollCycleList.length != 0">
													</f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline small class="setup-button" popup-open=".payroll-cycles-popup"
														>Create Now</f7-button
													>
													<payroll-cycle-component :moduleInfo="moduleInfo"></payroll-cycle-component>
												</f7-col>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<f7-block-title class="classy-small">Auto-Approve Timeacrds?</f7-block-title>
											<f7-list-item checkbox></f7-list-item>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="50">
											<f7-block-title class="classy-small">Setup Attendance Rules</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button href="/attendance-settings/" sheet-close outline class="setup-button" small
														>Setup Now</f7-button
													>
												</f7-col>
											</f7-row>
										</f7-col>
										<f7-col width="50"> </f7-col>
									</f7-row>

									<f7-row>
										<f7-block-title class="classy margin-top">Company Details</f7-block-title>
										<progressbar-component :settings="companyProgressbar"></progressbar-component>
										<f7-col width="50">
											<f7-block-title class="classy-small">Create Departments:</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item
														checkbox
														disabled
														:checked="GET_DEPARTMENTS_LIST.length != 0"
													></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline small class="setup-button" popup-open=".departments-popup"
														>Create Now</f7-button
													>
													<departments-component :moduleInfo="moduleInfo"></departments-component>
												</f7-col>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<f7-block-title class="classy-small">Create Employee Positions:</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled :checked="GET_POSITIONS_LIST.length != 0"></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline small class="setup-button" popup-open=".positions-popup"
														>Create Now</f7-button
													>
													<positions-component :moduleInfo="moduleInfo"></positions-component>
												</f7-col>
											</f7-row>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="50">
											<f7-block-title class="classy-small">Create Employees:</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled :checked="Users.employeeList.length != 0"></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline class="setup-button" small>Create Now</f7-button>
												</f7-col>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<f7-block-title class="classy-small">Create Products and Services:</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled :checked="Inventory.inventoryList.length != 0"></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline class="setup-button" small>Create Now</f7-button>
												</f7-col>
											</f7-row>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="50">
											<f7-block-title class="classy-small">Groups and Permissions:</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item
														checkbox
														disabled
														:checked="GroupsPermissions.groupsList.length != 0"
													></f7-list-item>
												</f7-col>
												<f7-col width="30" class="margin-right-half">
													<f7-button outline small class="setup-button" href="/users-groups/">Groups</f7-button>
												</f7-col>
												<f7-col width="30">
													<f7-button outline small class="setup-button" href="/groups-permissions/"
														>Permissions</f7-button
													>
												</f7-col>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<f7-block-title class="classy-small">Assign Module Managers:</f7-block-title>
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-col width="20">
													<f7-list-item checkbox disabled></f7-list-item>
												</f7-col>
												<f7-col width="40">
													<f7-button outline class="setup-button" small>Create Now</f7-button>
												</f7-col>
											</f7-row>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-block-title class="classy margin-top">Sales Tax Profile</f7-block-title>
										<progressbar-component :settings="salesTaxProgressbar"></progressbar-component>
										<f7-col width="50">
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-block-title class="classy-small">Charge Sales Tax?</f7-block-title>
												<f7-list-item checkbox></f7-list-item>
											</f7-row>
										</f7-col>
										<f7-col width="50">
											<f7-row class="display-flex justify-content-start align-items-center">
												<f7-block-title class="classy-small">Setup Sales Tax:</f7-block-title>
												<f7-col width="20">
													<f7-list-item checkbox disabled></f7-list-item>
												</f7-col>
												<f7-col width="40"><f7-button outline class="setup-button" sheet-open=".sales-tax-sheet" small>Setup Now</f7-button>
													<sales-tax-sheet-component></sales-tax-sheet-component>
												</f7-col>
											</f7-row>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-block-title class="classy margin-top">Human Resources</f7-block-title>
										<progressbar-component :settings="hrProgressbar"></progressbar-component>
										<f7-col width="50">
											<f7-block-title class="classy-small">Enable Paid Time Off (PTO)?</f7-block-title>
											<f7-list-item>
												<f7-list-item checkbox></f7-list-item>
											</f7-list-item>
										</f7-col>
										<f7-col width="50">
											<f7-block-title class="classy-small">Enable Benefits Tracking?</f7-block-title>
											<f7-list-item>
												<f7-list-item checkbox></f7-list-item>
											</f7-list-item>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-block-title class="classy-small">Time Off Allowances:</f7-block-title>
										<f7-col width="25">
											<p class="field-title">Sick Days per Year</p>
											<f7-list-input
												type="text"
												placeholder="Enter number"
												error-message="Decimal Number"
												required
												validate
												pattern="[0-9]+(\.\d{1,2})"
												clear-button
											>
											</f7-list-input>
										</f7-col>
										<f7-col width="25">
											<p class="field-title">Personal Days per Year</p>
											<f7-list-input
												type="text"
												placeholder="Enter number"
												error-message="Only numbers please!"
												required
												validate
												pattern="[0-9]*"
												clear-button
											>
											</f7-list-input>
										</f7-col>
										<f7-col width="25">
											<p class="field-title">Vacation Days per Year</p>
											<f7-list-input
												type="text"
												placeholder="Enter number"
												error-message="Only numbers please!"
												required
												validate
												pattern="[0-9]*"
												clear-button
											>
											</f7-list-input>
										</f7-col>
										<f7-col width="25">
											<p class="field-title">Paid Time Off Days per Year</p>
											<f7-list-input
												type="text"
												placeholder="Enter number"
												error-message="Only numbers please!"
												required
												validate
												pattern="[0-9]*"
												clear-button
											>
											</f7-list-input>
										</f7-col>
									</f7-row>
								</f7-list>
								<!-- END Employees Display -->
								<f7-row class="margin">
									<f7-block class="margin">
										<f7-button @click="testingMethod">Test Settings</f7-button>
									</f7-block>
								</f7-row>
							</f7-card-content>
						</f7-card>
					</div>
				</div>
				<!-- END Vue Scrollbar (dragger) -->
			</f7-page-content>
		</f7-sheet>
		<!-- END Setup Sheet -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Components
import positionsComponent from "@/components/business/positions-component.vue";
import departmentsComponent from "@/components/business/departments-component.vue";
import payrollCycleComponent from "@/components/business/payroll-cycles-component.vue";
import progressbarComponent from "@/components/layout-elements/progressbar-component.vue";
import salesTaxPopupComponent from "@/pages/financial/components/sales-tax-sheet-component.vue";

export default {
	name: "setupComponent",
	mixins: [],
	components: {
		"positions-component": positionsComponent,
		"departments-component": departmentsComponent,
		"payroll-cycle-component": payrollCycleComponent,
		"progressbar-component": progressbarComponent,
		"sales-tax-sheet-component": salesTaxPopupComponent
	},
	props: {
		moduleInfo: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			setupSheetOpened: false,
			companyProgressbar: {
				value: null,
				title: null
			},
			attendanceProgressbar: {
				value: 95,
				title: "Attendance 95%"
			},
			companyProgressbar: {
				value: null,
				title: null
			},
			salesTaxProgressbar: {
				value: 38,
				title: "Sales tax 38%"
			},
			hrProgressbar: {
				value: 52,
				title: "Human Resources 52%"
			}
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.Inventory.inventoryList", this.Inventory.inventoryList);
			console.log("this.GET_DEPARTMENTS_LIST", this.GET_DEPARTMENTS_LIST);
			console.log("this.GET_POSITIONS_LIST", this.GET_POSITIONS_LIST);
			console.log("this.Users.employeeList", this.Users.employeeList);
			console.log("this.GroupsPermissions.groupsList", this.GroupsPermissions.groupsList);
		}
	},
	computed: {
		...mapState(["Merchants", "Users", "Attendance", "GroupsPermissions", "Inventory"]),
		...mapGetters(["GET_DEPARTMENTS_LIST", "GET_POSITIONS_LIST"]),
	},
	created() {},
	mounted() {
		//Company Progressbar
		var percent = 0;
		var count = 0;
		var total = 6;
		this.GET_DEPARTMENTS_LIST.length >= 1 ? (count = +1) : null;
		this.GET_POSITIONS_LIST.length >= 1 ? (count = +1) : null;
		this.Users.employeeList.length >= 1 ? (count = +1) : null;
		this.Inventory.inventoryList.length >= 1 ? (count = +1) : null;
		this.GroupsPermissions.groupsList >= 1 ? (count = +1) : null;
		// this.GET_DEPARTMENTS_LIST.length >= 1 ? count =+ 1: null;

		console.log("total", total);
		console.log("count", count);
		percent = (count / total) * 100;

		this.companyProgressbar["title"] = "Company";
		this.companyProgressbar["value"] = percent;
	}
};
</script>

<style scoped lang="less">
.setup-sheet {
	height: 100%;
	z-index: 11000;
}
.setup-button {
	background: rgb(2, 75, 93);
	background-image: linear-gradient(45deg, rgb(5, 159, 194) 0%, rgb(25, 138, 163) 100%);
	color: rgb(255, 255, 255);
}
.setup-button:hover {
	background: rgb(2, 75, 93);
}
</style>
