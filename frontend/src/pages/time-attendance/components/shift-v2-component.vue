<template>
	<div>
		<!-- DataTable -->
		<f7-block>
			<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Shift Database</f7-block-title> 
			<f7-card v-if="Auth.isAuthenticated" class="data-table data-table-init">
				<f7-card-header class="data-table-header">
					<div class="data-table-links">
						<f7-list-button class="link" popup-open=".shift-v2-popup-component">New</f7-list-button>
						<f7-list-button id="edit-popup" class="link" @click="editItem">Edit</f7-list-button>
						<a class="link">Deactivate</a>
						<a class="link" @click="deleteItem">Delete</a>
						<f7-list-button class="link" @click="testMethod">Test</f7-list-button>
						<!-- <a class="link" @click="uncheckAllCells">Unselect All</a> -->
					</div>
				</f7-card-header>
				<f7-card-content>
					<f7-list>
						<f7-row>
							<table id="shiftV2">
								<thead>
									<tr>
										<th class="checkbox-cell">
											<label class="checkbox">
												<input type="checkbox" @change="toggleAllChecks" :checked="isAllChecked">
												<i class="icon-checkbox"></i>
											</label>
										</th>
										<th @click="sortTable(1, 'shiftV2')" class="label-cell sortable-cell margin-left padding-left">Id</th>
										<th @click="sortTable(2, 'shiftV2')" class="label-cell sortable-cell margin-left padding-left">Name</th>
										<th @click="sortTable(3, 'shiftV2')" class="sortable-cell text-align-center">Type</th>
										<th @click="sortTable(4, 'shiftV2')" class="numeric-cell sortable-cell text-align-center">Start Time</th>
										<th @click="sortTable(5, 'shiftV2')" class="numeric-cell sortable-cell text-align-center">End Time</th>
										<th @click="sortTable(6, 'shiftV2')" class="text-align-center">Status</th>
									</tr>
								</thead>
								<tbody v-if="Attendance.shiftList != 0">
									<tr v-for="shiftObj in Attendance.shiftList" :key="shiftObj.id">
										<td class="checkbox-cell">
											<label class="checkbox">
												<input :id="shiftObj.id" type="checkbox" @change="checkedItem($event, returnStoreModule('Attendance').shiftList)">
												<i class="icon-checkbox"></i>
											</label>
										</td>
										<td :id="shiftObj.id" class="label-cell margin-left padding-left">{{shiftObj.id}}</td>
										<td class="label-cell margin-left padding-left">{{shiftObj.name}}</td>
										<td class="text-align-center">{{shiftObj.attendance_type}}</td>
										<td class="numeric-cell text-align-center">{{shiftObj.start_time}}</td>
										<td class="numeric-cell text-align-center">{{shiftObj.end_time}}</td>
										<td class="numeric-cell text-align-center">
											<b-tag size="is-medium" :type="`${shiftObj.is_active ? 'is-success' : 'is-danger'}`">{{
												shiftObj.is_active ? "Active" : "Inactive"
											}}</b-tag>
										</td>
									</tr>
								</tbody>
							</table>
							<!-- <f7-row class="full-width" v-if="Attendance.shiftList.length === 0">
								<div class="text-align-center error-text margin">No records to display</div>
							</f7-row> -->
						</f7-row>
					</f7-list>
				</f7-card-content>
			</f7-card>

			<f7-card v-if="Attendance.shiftList.length === 0">
				<f7-card-content>
					<f7-row class="display-flex justify-content-center" v-if="Auth.isAuthenticated">
						<f7-col width="50"class="display-flex justify-content-center align-content-center">
							<f7-button fill popup-open=".shift-v2-popup-component">Add New Shift</f7-button>
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
		<!-- END DataTable -->

		<f7-card>
			<f7-card-content>
				<f7-list class="padding">

				</f7-list>
				<f7-row class="display-flex justify-content-center">
					<f7-col width="50">
						<f7-button fill @click="testMethod">Test</f7-button>
					</f7-col>
				</f7-row>
			</f7-card-content>
		</f7-card>

		<!-- Popup -->
		<f7-popup
			style="scrollbar-width: none;"
			swipeToClose
			class="shift-v2-popup-component"
			:opened="Shift2PopupOpened"
			@popup:closed="Shift2PopupOpened = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title large class="margin-top text-color-white">
							<slot name="title"></slot>
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
														@change="newShiftForm.require_clock_in = !newShiftForm.require_clock_in"
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
														@change="newShiftForm.require_clock_out = !newShiftForm.require_clock_out"
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
																@change="newShiftForm.auto_deduct_meal = !newShiftForm.auto_deduct_meal"
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
																@change="newShiftForm.auto_deduct_break = !newShiftForm.auto_deduct_break"
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
												<f7-button fill popup-close>Add Shift</f7-button>
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
		<!-- END Popup -->


	</div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from 'vuex';

//Mixins
import { UniversalMixins } from "../../../mixins/universal-mixins";
import { DataTableMixins } from '@/mixins/components/table-mixins';
import { StoreModuleMixins } from '@/mixins/components/module-store-data-mixins';


//Components



export default {
	name: "hoursOfOperationComponent",
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
			//Main Data
			isAllChecked: false,
			Shift2PopupOpened: false,
			//Holiday Form
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
		}
	},
	methods: {
		async testMethod(e) {
			var list2 = this.Attendance.shiftList[2];
			console.log("list2", list2);
		},
		newitem() {

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
					writable: false
				});
			}
			console.log("this.newShiftForm", this.newShiftForm);
		},
		deleteItem() {
			console.log("deleteItem");

		},



	},
	computed: {
		...mapState(["Auth", "Users", "Attendance"]),
		// ...mapGetters(["HAS_OPERATING_HOURS"]),
	},
	async mounted() {
		
	},
	beforeMount() {

	}

};
</script>

<style scoped lang="less">
.shift-v2-popup-component {
	width: 750px;
	left: 45%;
}
</style>
