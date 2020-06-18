<template>
	<div>
		<f7-block>
			<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Shift Database</f7-block-title> 
			<f7-card v-if="Auth.isAuthenticated" class="data-table data-table-init">
				<f7-card-header class="data-table-header">
					<div class="data-table-links">
						<f7-list-button class="link" popup-open=".shift-popup-component">New</f7-list-button>
						<f7-list-button id="edit-popup" class="link" @click="editItem">Edit</f7-list-button>
						<f7-list-button class="link confirm-deactivate">Deactivate</f7-list-button>
						<f7-list-button class="link confirm-delete">Delete</f7-list-button>
						<!-- <a class="link" @click="uncheckAllCells">Unselect All</a> -->
					</div>
					<div class="data-table-links">
						<f7-list-button v-if="showActive === 1" class="link" @click="tableFilter({value: 'Inactive'}, tableData.tableId)">Show Inactive</f7-list-button>
						<f7-list-button v-if="showActive === 2" class="link" @click="tableFilter({value: 'Active'}, tableData.tableId)">Show Active</f7-list-button> 
						<f7-list-button v-if="showActive === 3" class="link" @click="showAllRows(tableData.tableId)">Show All</f7-list-button> 

					</div>
				</f7-card-header>
				<f7-card-content>
					<f7-list>
						<f7-row>
							<table :id="tableData.tableId">
								<thead>
									<tr>
										<th class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox" @change="toggleAllChecks($event, tableData.tableId, returnStoreModule(tableData.module).shiftList)" :checked="isAllChecked">
												<i class="icon-checkbox"></i>
											</label>
										</th>
										<th @click="sortTable(1, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">Id</span>
										</th>
										<th @click="sortTable(2, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">Name</span>
										</th>
										<th @click="sortTable(3, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">Type</span>
										</th>
										<th @click="sortTable(4, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">Start Time</span>
										</th>
										<th @click="sortTable(5, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">End Time</span>
										</th>
										<th @click="sortTable(6, tableData.tableId)" class="sortable-cell text-align-center">
											<span class="table-head-label">Status</span>
										</th>
									</tr>

									<tr>
										<th></th>
										<th class="input-cell">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
										<th class="input-cell">
											<div class="input filter-input datacom-input">
												<f7-icon class="margin-right-half" size="20" icon="mdi mdi-magnify"></f7-icon>
												<input type="text" class="table-filter" :data-table="tableData.tableId" placeholder="Filter" @input="tableFilter($event.target, tableData.tableId)">
											</div>
										</th>
									</tr>
								</thead>
								<tbody v-if="Attendance.shiftList.length != 0">
									<tr v-for="shiftObj in Attendance.shiftList" :key="shiftObj.id">
										<td class="checkbox-cell">
											<label class="checkbox">
												<input :id="shiftObj.id" type="checkbox" @change="checkedItem($event, returnStoreModule(tableData.module).shiftList)">
												<i class="icon-checkbox"></i>
											</label>
										</td>
										<td :id="shiftObj.id" class="label-cell text-align-center">{{shiftObj.id}}</td>
										<td class="label-cell text-align-center">{{shiftObj.name}}</td>
										<td class="label-cell text-align-center">{{shiftObj.attendance_type}}</td>
										<td class="numeric-cell text-align-center">{{shiftObj.start_time}}</td>
										<td class="numeric-cell text-align-center">{{shiftObj.end_time}}</td>
										<td class="label-cell text-align-center">
											<b-tag size="is-medium" :type="`${shiftObj.is_active ? 'is-success' : 'is-danger'}`">{{
												shiftObj.is_active ? "Active" : "Inactive"
											}}</b-tag>
										</td>
									</tr>
								</tbody>
							</table>
							<f7-row class="full-width" v-if="Attendance.shiftList.length === 0">
								<div class="text-align-center error-text margin">No records to display</div>
							</f7-row>
						</f7-row>
					</f7-list>
				</f7-card-content>
			</f7-card>

			<f7-card v-if="Attendance.shiftList.length === 0">
				<f7-card-content>
					<f7-row class="display-flex justify-content-center" v-if="Auth.isAuthenticated">
						<f7-col width="50"class="display-flex justify-content-center align-content-center">
							<f7-button fill popup-open=".shift-popup-component">Add New Shift</f7-button>
						</f7-col>
					</f7-row>
					<f7-row class="display-flex justify-content-center" v-else>
						<f7-col width="100">
							<div class="text-align-center error-text margin">No records to display</div>
							<p class="text-align-center">Please log in to create a shift</p>
						</f7-col>
					</f7-row>
				</f7-card-content>
			</f7-card>

		</f7-block>

		<!-- <f7-button @click="testMethod">Test</f7-button> -->

		<!-- Popup -->
		<f7-popup
			style="scrollbar-width: none;"
			swipeToClose
			class="shift-popup-component"
			:opened="ShiftPopupOpened"
			@popup:closed="ShiftPopupOpened = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title large class="margin-top text-color-white">
							Add / Edit Shift
						</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right margin-right margin-top-half"
							popup-close
							icon-size="50"
							icon-color="white"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 600px;">
					<div>
						<f7-block>
							<f7-card>
								<f7-card-content>
									<f7-list>
										<f7-row class="full-width">
											<f7-col width="50">
												<p>Shift Name<span style="color: red;"> *</span></p>
													<f7-list-input
														type="text"
														placeholder="Morning Shift"
														:value="newShiftForm.name"
														@input="newShiftForm.name = $event.target.value"
														clear-button
														class="datacom-input">
													</f7-list-input>
											</f7-col>
											<f7-col width="50">
												<p>Attendance Type:</p>
													<f7-list-input
														type="select"
														placeholder="Normal"
														:value="newShiftForm.attendance_type"
														@input="newShiftForm.attendance_type = $event.target.value"
														class="datacom-input">
														<option v-for="(type, $typeIndex) in Attendance.attendanceTypeList" 
															:key="$typeIndex"
															:value="type">
															{{type}}
														</option>
													</f7-list-input>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-col width="50">
												<f7-row>
													<f7-col width="50">
														<p>Disable Clock-In Before:</p>
														<f7-list-input
															type="time"
															:value="newShiftForm.min_clockin_time"
															@input="newShiftForm.min_clockin_time = $event.target.value"
															class="datacom-input">
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p>Start Time: <span style="color: red;"> *</span></p>
														<f7-list-input
															type="time"
															:value="newShiftForm.start_time"
															@input="newShiftForm.start_time = $event.target.value"
															class="datacom-input">
														</f7-list-input>
													</f7-col>
												</f7-row>
											</f7-col>
											<f7-col width="50">
												<f7-row>
													<f7-col width="50">
														<p>End Time:<span style="color: red;"> *</span></p>
														<f7-list-input
															type="time"
															:value="newShiftForm.end_time"
															@input="newShiftForm.end_time = $event.target.value"
															class="datacom-input">
														</f7-list-input>
													</f7-col>
													<f7-col width="50">
														<p>Disable Clock-Out After:</p>
														<f7-list-input
															type="time"
															:value="newShiftForm.max_clockout_time"
															@input="newShiftForm.max_clockout_time = $event.target.value"
															class="datacom-input">
														</f7-list-input>
													</f7-col>
												</f7-row>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-col width="50">
												<f7-list-item 
													title="Require Clock-In">
													<f7-toggle 
														:checked="newShiftForm.require_clock_in"
														@change="newShiftForm.require_clock_in = $event.target.checked"
														class="tooltip-init"
														data-tooltip="Defaults to shift start time" slot="media"></f7-toggle>
												</f7-list-item>
											</f7-col>
											<f7-col width="50">
												<f7-list-item  
													title="Require Clock-Out" >
													<f7-toggle 
														class="tooltip-init"
														:checked="newShiftForm.require_clock_out"
														@change="newShiftForm.require_clock_out = $event.target.checked"
														data-tooltip="Defaults to shift start time" slot="media"></f7-toggle>
												</f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-col width="50">
												<f7-block-title class="small">Meals</f7-block-title>
												<f7-row>
													<f7-col>
														<f7-list-item  
															title="Automatically deduct meal(s)">
															<f7-toggle 
																:checked="newShiftForm.auto_deduct_meal"
																@change="newShiftForm.auto_deduct_meal = $event.target.checked"
																slot="media"></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col>
														<f7-list-input
															label="Minutes"
															type="number"
															step="1"
															placeholder="45"
															:value="newShiftForm.meal_minutes"
															@input="newShiftForm.meal_minutes = $event.target.value"
															class="datacom-input">
														</f7-list-input>
													</f7-col>
												</f7-row>
											</f7-col>
											<f7-col width="50">
												<f7-block-title class="small">Breaks</f7-block-title>
												<f7-row class="display-flex justify-content-start">
													<f7-col>
														<f7-list-item  
															title="Automatically deduct break(s)">
															<f7-toggle 
																:checked="newShiftForm.auto_deduct_break"
																@change="newShiftForm.auto_deduct_break = $event.target.checked"
																slot="media"></f7-toggle>
														</f7-list-item>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col>
														<f7-list-input
															label="Minutes"
															type="number"
															step="1"
															placeholder="45"
															:value="newShiftForm.break_minutes"
															@input="newShiftForm.break_minutes = $event.target.value"
															class="datacom-input">
														</f7-list-input>
													</f7-col>
												</f7-row>
											</f7-col>
										</f7-row>
										<f7-row class="full-width">
											<f7-block-title class="small">Add Employees to Shift</f7-block-title>
											<f7-col width="100" v-if="Users.employeeList.length != 0">
												<f7-list-item 
												title="Employees" 
												smart-select 
												:smart-select-params="{openIn: 'popup', searchbar: true, virtualList: true, searchbarPlaceholder: 'Search employees'}"
												class="datacom-input">
													<select @change="UpdateEmployeesToShift($event.target.value)" name="employee" multiple>
														<optgroup label="Entire Company">
															<option v-for="employee in Users.employeeList" :key="employee.id" :value="employee.id">{{ employee.user.full_name }}</option>
														</optgroup>
													</select>
												</f7-list-item>
												<f7-popup class="demo-popup" swipe-to-close>
													<f7-page>
														<f7-navbar title="Swipe To Close">
															<f7-nav-right>
																<f7-link popup-close>Close</f7-link>
															</f7-nav-right>
														</f7-navbar>

														<div style="height: 100%" class="display-flex justify-content-center align-items-center">
															<p>Swipe me up or down</p>
														</div>
													</f7-page>
												</f7-popup>
											</f7-col>
										</f7-row>

										<f7-row class="full-width margin-top">
											<f7-col width="25">
												<f7-button fill @click="testMethod">Test</f7-button>
											</f7-col>
											<f7-col width="25">
												<f7-button fill popup-close @click="addShift">Save</f7-button>
											</f7-col>
										</f7-row>
										<f7-row class="margin-top padding-top">
											<f7-block>

											</f7-block>
										</f7-row>
									</f7-list>
								</f7-card-content>
							</f7-card>
						</f7-block>
					</div>
				</div>
			</f7-page>
		</f7-popup>

	</div>
</template>

<script>
import { mapState } from "vuex";
// import {EventBus} from '@/services/event-bus'

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";
import { DataTableMixins } from "@/mixins/components/table-mixins";
import { StoreModuleMixins } from "@/mixins/components/module-store-data-mixins";

export default {
	name: "shiftComponent",
	components: {
	},
	mixins: [
		UniversalMixins,
		DataTableMixins,
		StoreModuleMixins
		],
	props: {

	},
	data() {
		return {
			//Component Settings
			tableData: {
				tableId: 'shiftTable',
				module: "Attendance"
			},
			//Main Settings
			ShiftPopupOpened: false,
			isAllChecked: false,
			//formData
			newShiftForm: {
				datacom: null,
				partner: null,
				company: null,
				employees: null,
				name: null,
				attendance_type: null,
				date_added: null,
				start_time: null,
				end_time: null,
				require_clock_in: null,
				require_clock_out: null,
				auto_deduct_meal: null,
				meal_minutes: null,
				auto_deduct_break: null,
				break_minutes: null,
				is_active: null,
				start_clockin_time: null,
				stop_clockout_time: null
			}
		};
	},
	methods: {
		testMethod() {
			// var list2 = this.Attendance.shiftList[2];
			// console.log("list2", list2);
			// console.log("this.Auth.isAuthenticated", this.Auth.isAuthenticated);
			console.log("this.newShiftForm", this.newShiftForm);
			console.log("this.selectedList", this.selectedList);
			console.log("this.Auth.platformInfo", this.Auth.platformInfo);
		},
		inputTest() {
			console.log("Input test");
		},	
		// async getInactiveItems() {
		// 	var response = await this.setUserPlatformGET();
		// 	console.log("response", response);
		// 	response.url += 'is_active=false';
		// 	let returnData = await this.$store.dispatch("addShift", response);
		// 	console.log("returnData", returnData);
		// },
		async addShift() {
			console.log("this.newShiftForm", this.newShiftForm);
			var newShiftForm = JSON.parse(JSON.stringify(this.newShiftForm));
			console.log("newShiftForm", newShiftForm);

			let platformForm = await this.setUserPlatformPOST(newShiftForm);
			console.log("platformForm", platformForm);
			let response = await this.$store.dispatch("addShift", platformForm);
			console.log("response", response);

			this.resetForm();
		},
		UpdateEmployeesToShift(id) {
			console.log("employee ID", id);
			this.newShiftForm.employees.push(id);
			console.log("this.newShiftForm", this.newShiftForm);
		},
		resetForm() {
			for (let key in this.newShiftForm) {
				console.log("value", this.newShiftForm[key]);
				if (this.newShiftForm[key] === true || this.newShiftForm[key] === false) {
					this.newShiftForm[key] = false;
				} else {
					this.newShiftForm[key] = null;
				}
			}
			//Reset Variables
			this.newShiftForm.employees = [];
			this.newShiftForm.is_active = true;
		},
		editItem() {
			console.log("EditItem");
			console.log("this.selectedList", this.selectedList);
			var list2 = this.Attendance.shiftList[2];
			var newList = this.selectedList[0];

			for(let key in this.newShiftForm) {
				// this.newShiftForm[key] = list2[key];
				Object.defineProperty(this.newShiftForm, key, {
					value: list2[key],
					writable: true
				});
			}

			// this.$f7.popup.open(".shift-popup-component");
			this.ShiftPopupOpened = true;
			console.log("this.newShiftForm", this.newShiftForm);
		},
		deleteItem() {
      //Grab item from this.selectedList and delete it from Django
			try {
				// this.$store.dispatch('DELETEShift', this.selectedList);
				this.$f7.dialog.alert('Successfully Deleted!');

			} catch {
				this.$f7.dialog.alert('There was an error deleting the record(s)');
			}
		},
		deactivate() {
      //Grab item from this.selectedList and delete it from Django
			try {
				// this.$store.dispatch('DELETEShift', this.selectedList);
				this.$f7.dialog.alert('Successfully Deactivated!');

			} catch {
				this.$f7.dialog.alert('There was an error deleting the record(s)');
			}
		},
		checkIfSelected() {
			var record = this.selectedList[0];
		}



	},
	computed: {
		...mapState(["Users", "Auth", "Attendance"]),


	},
	created() {},
	async mounted() {

		var $$ = this.Dom7;

		// Confirm Delete Dislog
		$$('.confirm-delete').on('click', () => {
			let response = this.selectedList.length;
			console.log('length resonse', response);
			if(response === 0) {
				this.$f7.dialog.confirm('You must first select at least one record');
			}
			if(response === 1) {
				this.$f7.dialog.confirm('Are you sure you want to DELETE this record?', () => {
					this.deleteItem();
				});
			}
			if(response >= 2) {
				this.$f7.dialog.confirm('Are you sure you want to DELETE these records?', () => {
					this.deleteItem();
				});
			}
		});
		//Confirm Deactivate Dialog
		$$('.confirm-deactivate').on('click', () => {
			this.$f7.dialog.confirm('Are you sure you want to DEACTIVATE this record?', () => {
				this.deactivate();
			});
		});
		
	}
};
</script>

<style scoped style="less">
.shift-popup-component {
	width: 750px;
	left: 45%;
}
</style>
