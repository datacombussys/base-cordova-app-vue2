<template>
	<div>
		<shift-database-component></shift-database-component>

		<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Add Edit Shifts</f7-block-title>
			<f7-card>
				<f7-list>
					<f7-card-content>
						<f7-row>
							<f7-row class="full-width">
								<f7-col width="50">
									<p>Shift Name<span style="color: red;"> *</span></p>
										<f7-list-input
											type="text"
											placeholder="Morning Shift"
											:value="shiftForm.name"
											@input="shiftForm.name = $event.target.value"
											clear-button
										>
										</f7-list-input>
								</f7-col>
								<f7-col width="50">
									<p>Attendance Type:</p>
										<f7-list-input
											type="select"
											placeholder="Normal"
											:value="shiftForm.attendance_type"
											@input="shiftForm.attendance_type = $event.target.value">
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
												:value="shiftForm.min_clockin_time"
												@input="shiftForm.min_clockin_time = $event.target.value"
											>
											</f7-list-input>
										</f7-col>
										<f7-col width="50">
											<p>Start Time: <span style="color: red;"> *</span></p>
											<f7-list-input
												type="time"
												:value="shiftForm.start_time"
												@input="shiftForm.start_time = $event.target.value"
											>
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
												:value="shiftForm.end_time"
												@input="shiftForm.end_time = $event.target.value"
											>
											</f7-list-input>
										</f7-col>
										<f7-col width="50">
											<p>Disable Clock-Out After:</p>
											<f7-list-input
												type="time"
												:value="shiftForm.max_clockout_time"
												@input="shiftForm.max_clockout_time = $event.target.value"
											>
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
											:checked="shiftForm.require_clock_in"
											@change="shiftForm.require_clock_in = !shiftForm.require_clock_in"
											class="tooltip-init"
											data-tooltip="Defaults to shift start time" slot="media"></f7-toggle>
									</f7-list-item>
								</f7-col>
								<f7-col width="50">
									<f7-list-item  
										title="Require Clock-Out" >
										<f7-toggle 
											class="tooltip-init"
											:checked="shiftForm.require_clock_out"
											@change="shiftForm.require_clock_out = !shiftForm.require_clock_out"
											data-tooltip="Defaults to shift start time" slot="media"></f7-toggle>
									</f7-list-item>
								</f7-col>
							</f7-row>
							<f7-row class="full-width">
								<f7-col width="50">
									<f7-block-title class="small">Meals</f7-block-title>
									<f7-row>
										<f7-col width="75">
											<f7-list-item  
												title="Automatically deduct meal(s)">
												<f7-toggle 
													:checked="shiftForm.auto_deduct_meal"
													@change="shiftForm.auto_deduct_meal = !shiftForm.auto_deduct_meal"
													slot="media"></f7-toggle>
											</f7-list-item>
										</f7-col>
										<f7-col width="25">
											<f7-list-input
												label="Minutes"
												type="number"
												step="1"
												placeholder="45"
												:value="shiftForm.meal_minutes"
												@input="shiftForm.meal_minutes = $event.target.value"
											>
											</f7-list-input>
										</f7-col>
									</f7-row>
								</f7-col>
								<f7-col width="50">
									<f7-block-title class="small">Breaks</f7-block-title>
									<f7-row class="display-flex justify-content-start">
										<f7-col width="75">
											<f7-list-item  
												title="Automatically deduct break(s)">
												<f7-toggle 
													:checked="shiftForm.auto_deduct_break"
													@change="shiftForm.auto_deduct_break = !shiftForm.auto_deduct_break"
													slot="media"></f7-toggle>
											</f7-list-item>
										</f7-col>
										<f7-col width="25">
											<f7-list-input
												label="Minutes"
												type="number"
												step="1"
												placeholder="45"
												:value="shiftForm.break_minutes"
												@input="shiftForm.break_minutes = $event.target.value"
											>
											</f7-list-input>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>
							<f7-row class="full-width">
								<f7-block-title class="small">Add Employees to Shift</f7-block-title>
								<f7-col width="100" v-if="Users.employeeList.length != 0">
									<f7-list-item title="Employees" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, virtualList: true, searchbarPlaceholder: 'Search car'}">
										<select @change="UpdateEmployeesToShift($event.target.value)" name="employee" multiple>
											<optgroup label="Sales">
												<option v-for="employee in Users.employeeList" :key="employee.id" :value="employee.id">{{ employee.user.full_name }}</option>
											</optgroup>
											<optgroup label="Marketing">
												<option value="audi">Joe Smith</option>
											</optgroup>
											<optgroup label="Customer Support">
												<option value="audi">Allison Jones</option>
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
						</f7-row>
						<f7-row class="full-width">
							<f7-col width="25">
								<f7-button fill @click="testButton">Test</f7-button>
							</f7-col>
							<f7-col width="25">
								<f7-button fill @click="addShift">Add Shift</f7-button>
							</f7-col>
						</f7-row>
					</f7-card-content>
				</f7-list>
			</f7-card>
		<!-- END Shifts --> 
	</div>
</template>

<script>
import { mapState } from "vuex";

//Mixins
import { UniversalMixins } from "../../../mixins/universal-mixins";

//Components
import shiftDatabaseComponent from "./shift-database-component.vue";

export default {
	name: "shiftComponent",
	components: {
		"shift-database-component": shiftDatabaseComponent
	},
	mixins: [UniversalMixins],
	props: {

	},
	data() {
		return {
			//Main Settings
			shiftForm: {
          company: null,
          partner: null,
          datacom: null,
          employees: [],
          name: null,
          attendance_type: null,
          date_added: null,
          start_time: null,
          end_time: null,
          start_clockin_time: null,
          stop_clockout_time: null,
          require_clock_in: false,
          require_clock_out: false,
          auto_deduct_meal: false,
          meal_minutes: null,
          auto_deduct_break: false,
          break_minutes: null,
          is_active: true,
        },
	
		};
	},
	methods: {
		async testButton(e) {
	
		},
		async addShift() {
        console.log("this.shiftForm", this.shiftForm);
        var newShiftForm = JSON.parse(JSON.stringify(this.shiftForm));
        console.log("newShiftForm", newShiftForm);

        let platformForm = await this.setUserPlatformPOST(newShiftForm);
        console.log("platformForm", platformForm);
        let response = await this.$store.dispatch("addShift", platformForm);
        console.log("response", response);
      },
      UpdateEmployeesToShift(id) {
        this.shiftForm.employees.push(id);
      },
	
	},
	computed: {
		...mapState(["Users", "Attendance"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped style="less">

</style>
