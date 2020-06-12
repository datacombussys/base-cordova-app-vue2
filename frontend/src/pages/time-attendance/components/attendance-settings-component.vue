<template>
	<div>
		<f7-card>
			<f7-card-content>
				<f7-list class="padding">
					<f7-row>
						<f7-col width="50">
							<f7-block-title>General Attendance Rules</f7-block-title>
							<f7-row class="display-flex justify-content-start">
								<f7-col width="50">
									<p class="field-title">Name:<span style="color: red;"> *</span></p>
									<f7-list-input
									label="Of Rule"
										type="text"
										placeholder="General Attendacne Settings"
										:value="settingsForm.name"
										@input="settingsForm.name = $event.target.value"
									></f7-list-input>
								</f7-col>

								<f7-col width="50">
									<p class="field-title">Workday:</p>
									<f7-list-input
										label="Hours"
										type="number"
										step="1"
										placeholder="8"
										:value="settingsForm.workday_hours"
										@input="settingsForm.workday_hours = $event.target.value"
									></f7-list-input>
								</f7-col>

							</f7-row>
							<f7-block-title>Overtime</f7-block-title>
							<f7-list-item title="Enable Overtime">
								<f7-toggle
									slot="media"
									:checked="settingsForm.allow_overtime"
									@change="settingsForm.allow_overtime = !settingsForm.allow_overtime"
								></f7-toggle>
							</f7-list-item>
							<f7-row v-if="settingsForm.allow_overtime">
								<f7-col>
									<p>Overtime is calculated when employee exceeds:</p>
									<f7-row class="display-block">
										<f7-list-item
											radio
											title="40 hours/week"
											name="overtimeType"
											@change="settingsForm.is_overtime_over_40 = true"
										></f7-list-item>
									</f7-row>
									<f7-row>
										<f7-list-item
											radio
											title="# hours/day"
											name="overtimeType"
											@change="settingsForm.is_overtime_over_40 = false"
										>
											<f7-list-input
												v-show="!settingsForm.is_overtime_over_40"
												slot="content"
												label="hours per day"
												type="number"
												step="1"
												placeholder="8"
												:value="settingsForm.overtime_hrs_per_day"
												@input="settingsForm.overtime_hrs_per_day = $event.target.value"
											></f7-list-input>
										</f7-list-item>
									</f7-row>
									<f7-list-item title="Weekends are overtime">
										<f7-toggle
											:checked="settingsForm.is_weekend_overtime"
											@change="settingsForm.is_weekend_overtime = !settingsForm.is_weekend_overtime"
											slot="media"
										></f7-toggle>
									</f7-list-item>
									<f7-list-item title="Holidays are overtime">
										<f7-toggle
											:checked="settingsForm.is_holiday_overtime"
											@change="settingsForm.is_holiday_overtime = !settingsForm.is_holiday_overtime"
											slot="media"
										></f7-toggle>
									</f7-list-item>
								</f7-col>
							</f7-row>

							<f7-row v-if="!settingsForm.allow_overtime">
								<f7-row>
									<f7-row>
										<f7-list-item>
											<strong>
												<p>If clock-in early:</p>
											</strong>
										</f7-list-item>
									</f7-row>
									<f7-row>
										<f7-col width="15">
											<f7-list-item>
												<f7-toggle
													:checked="settingsForm.allow_clockin_early"
													@change="settingsForm.allow_clockin_early = !settingsForm.allow_clockin_early"
													slot="media"
												></f7-toggle>
											</f7-list-item>
										</f7-col>
										<f7-col width="80">
											<p>Disable clock-in early.</p>
											<p>Clock-in time defaults to shift start time.</p>
										</f7-col>
									</f7-row>
								</f7-row>
								<f7-row>
									<f7-row>
										<f7-list-item>
											<strong>
												<p>If clock-out late:</p>
											</strong>
										</f7-list-item>
									</f7-row>
									<f7-row>
										<f7-col width="15">
											<f7-list-item>
												<f7-toggle
													:checked="settingsForm.allow_clockout_late"
													@change="settingsForm.allow_clockout_late = !settingsForm.allow_clockout_late"
													slot="media"
												></f7-toggle>
											</f7-list-item>
										</f7-col>
										<f7-col width="80">
											<p>Disable clock-out late.</p>
											<p>Clock-out time defaults to shift end time.</p>
										</f7-col>
									</f7-row>
								</f7-row>
							</f7-row>
						</f7-col>
						<f7-col width="50">
							<f7-block-title>Early/Late/Absence</f7-block-title>
							<f7-row class="display-flex align-items-center">
								<f7-col width="15">
									<f7-list-item checkbox :checked="clockInPast" @change="clockInPast = !clockInPast"></f7-list-item>
								</f7-col>
								<f7-col width="85">
									<f7-row class="display-flex align-items-center">
										<f7-col width="30">
											<p>Clock-in past</p>
										</f7-col>
										<f7-col width="30">
											<f7-list-input
												:disabled="!clockInPast"
												label="Minutes"
												type="number"
												step="1"
												placeholder="30"
												:value="settingsForm.late_clockin_late_minutes"
												@input="settingsForm.late_clockin_late_minutes = $event.target.value"
											></f7-list-input>
										</f7-col>
										<f7-col width="30">
											<p>minutes as "Late"</p>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>
							<f7-row class="display-flex align-items-center">
								<f7-col width="15">
									<f7-list-item
										checkbox
										:checked="lateClockInPast"
										@change="lateClockInPast = !lateClockInPast"
									></f7-list-item>
								</f7-col>
								<f7-col width="85">
									<f7-row class="display-flex align-items-center">
										<f7-col width="30">
											<p>Late Clock-in past</p>
										</f7-col>
										<f7-col width="30">
											<f7-list-input
												:disabled="!lateClockInPast"
												label="Minutes"
												type="number"
												step="1"
												placeholder="30"
												clear-button
												:value="settingsForm.late_clockin_absent_minutes"
												@input="settingsForm.late_clockin_absent_minutes = $event.target.value"
											></f7-list-input>
										</f7-col>
										<f7-col width="30">
											<p>count as absent</p>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>

							<f7-row class="display-flex align-items-center">
								<f7-col width="15">
									<f7-list-item
										checkbox
										:checked="clockOutBefore"
										@change="clockOutBefore = !clockOutBefore"
									></f7-list-item>
								</f7-col>
								<f7-col width="85">
									<f7-row class="display-flex align-items-center">
										<f7-col width="30">
											<p>Clock-out before</p>
										</f7-col>
										<f7-col width="30">
											<f7-list-input
												:disabled="!clockOutBefore"
												label="Minutes"
												type="number"
												step="1"
												placeholder="30"
												:value="settingsForm.early_clockout_minutes"
												@input="settingsForm.early_clockout_minutes = $event.target.value"
											></f7-list-input>
										</f7-col>
										<f7-col width="30">
											<p>minutes as "Early"</p>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>

							<f7-row class="display-flex align-items-center">
								<f7-col width="15">
									<f7-list-item
										checkbox
										:checked="earlyClockOutBefore"
										@change="earlyClockOutBefore = !earlyClockOutBefore"
									></f7-list-item>
								</f7-col>
								<f7-col width="85">
									<f7-row class="display-flex align-items-center">
										<f7-col width="30">
											<p>Early Clock-out before</p>
										</f7-col>
										<f7-col width="30">
											<f7-list-input
												:disabled="!earlyClockOutBefore"
												label="Minutes"
												type="number"
												step="1"
												placeholder="30"
												:value="settingsForm.early_clockout_absent_minutes"
												@input="settingsForm.early_clockout_absent_minutes = $event.target.value"
											></f7-list-input>
										</f7-col>
										<f7-col width="30">
											<p>count as absent</p>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>

							<f7-row class="display-flex align-items-center">
								<f7-col width="15">
									<f7-list-item checkbox :checked="noClockIn" @change="noClockIn = !noClockIn"></f7-list-item>
								</f7-col>
								<f7-col width="85">
									<f7-row class="display-flex align-items-center">
										<f7-col width="30">
											<p>If No Clock-In</p>
										</f7-col>
										<f7-col width="30">
											<p>count as:</p>
										</f7-col>
										<f7-col width="30">
											<f7-list-input 
											:disabled="!noClockIn" 
											type="select"
											:value="settingsForm.no_clockin_is"
											@change="settingsForm.no_clockin_is = $event.target.value">
												<option value="Leave Early">Leave Early</option>
												<option value="Absent">Absent</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>
							<f7-row class="display-flex align-items-center">
								<f7-col width="15">
									<f7-list-item checkbox :checked="noClockOut" @change="noClockOut = !noClockOut"></f7-list-item>
								</f7-col>
								<f7-col width="85">
									<f7-row class="display-flex align-items-center">
										<f7-col width="30">
											<p>If No Clock-Out</p>
										</f7-col>
										<f7-col width="30">
											<p>count as:</p>
										</f7-col>
										<f7-col width="30">
											<f7-list-input 
											:disabled="!noClockOut" 
											type="select"
											:value="settingsForm.no_clock_out_is"
											@change="settingsForm.no_clock_out_is = $event.target.value">
												<option value="Leave Early">Leave Early</option>
												<option value="Absent">Absent</option>
											</f7-list-input>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>
						</f7-col>
					</f7-row>
					<f7-row>
						<f7-col width="100">
							<f7-block-title>Manager Notifications</f7-block-title>
							<f7-row class="display-flex align-items-center">
								<f7-col width="100">
									<f7-row class="display-flex align-items-center">
										<f7-col width="25">
											<f7-list-item title="No clock-in">
												<f7-toggle
													:checked="settingsForm.notify_no_clockin"
													@change="settingsForm.notify_no_clockin = !settingsForm.notify_no_clockin"
													slot="media"
												></f7-toggle>
											</f7-list-item>
										</f7-col>
										<f7-col width="25">
											<f7-list-item title="No clock-out">
												<f7-toggle
													:checked="settingsForm.notify_no_clockout"
													@change="settingsForm.notify_no_clockout = !settingsForm.notify_no_clockout"
													slot="media"
												></f7-toggle>
											</f7-list-item>
										</f7-col>
										<f7-col width="25">
											<f7-list-item title="Clock-in late">
												<f7-toggle
													:checked="settingsForm.notify_clockin_late"
													@change="settingsForm.notify_clockin_late = !settingsForm.notify_clockin_late"
													slot="media"
												></f7-toggle>
											</f7-list-item>
										</f7-col>
										<f7-col width="25">
											<f7-list-item title="Clock-out early">
												<f7-toggle
													:checked="settingsForm.notify_clockout_early"
													@change="settingsForm.notify_clockout_early = !settingsForm.notify_clockout_early"
													slot="media"
												></f7-toggle>
											</f7-list-item>
										</f7-col>
									</f7-row>
								</f7-col>
							</f7-row>
						</f7-col>
					</f7-row>
				</f7-list>
				<f7-row class="display-flex justify-content-center">
					<f7-col width="50">
						<f7-button fill @click="saveAttendanceSettings">Save Settings</f7-button>
						<f7-button fill @click="testingMethod">Test</f7-button>
					</f7-col>
				</f7-row>
			</f7-card-content>
		</f7-card>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import TimePicker from "tui-time-picker";

//Mixins
import { UniversalMixins } from "../../../mixins/universal-mixins";

export default {
	name: "attendanceSettingComponent",
	components: {},
	mixins: [UniversalMixins],
	props: {
		settingsProfile: {
			type: Object,
		},

	},
	data() {
		return {
			//Main Settings
			has_current_settings: false,
			//Attendance Form
			settingsForm: {
				id: null,
				company: null,
				partner: null,
				datacom: null,
				operating_hours: null,
				shift: [],
				workday_hours: 8,
				name: null,
				is_company: true,
				is_location: false,
				date_added: null,
				allow_overtime: false,
				allow_clockin_early: false,
				allow_clockout_late: false,
				is_overtime_over_40: false,
				is_weekend_overtime: false,
				is_holiday_overtime: false,
				overtime_hrs_per_day: null,
				late_clockin_late_minutes: null,
				late_clockin_absent_minutes: null,
				early_clockout_minutes: null,
				early_clockout_absent_minutes: null,
				no_clockin_is: null,
				no_clock_out_is: null,
				notify_no_clockin: false,
				notify_no_clockout: false,
				notify_clockin_late: false,
				notify_clockout_early: false
			},
			//Attendance variables Not form items
			clockInPast: false,
			lateClockInPast: false,
			clockOutBefore: false,
			earlyClockOutBefore: false,
			noClockIn: false,
			noClockOut: false,
	

	
		};
	},
	methods: {
		async testingMethod(e) {
			console.log('this.Attendance.attendanceSettingsObj', this.Attendance.attendanceSettingsObj);
			console.log('this.Attendance.operatingHoursObj', this.Attendance.operatingHoursObj);
			console.log('this.settingsForm', this.settingsForm);
			var plat = this.Auth.platformInfo;
			console.log('plat', plat);

		},
		async saveAttendanceSettings() {
			if(!this.settingsForm.operating_hours) {
				this.$f7.dialog.create({
					title: "Create Error",
					text: "You must first complete your operating hours",
					closeByBackdropClick: true,
					buttons: [
						{
						close: true,
						text: "Ok",
						color: "red"
					}
					]
				}).open();
			}

			//I need to Only keep ONE Database record per company and only update that record
			//Save initially POST then PATCH to update if changes occur

			console.log("saveAttendanceSettings, this.settingsForm", this.settingsForm);
			var attendanceFormCopy = JSON.parse(JSON.stringify(this.settingsForm));

			let platformForm = await this.setUserPlatformPOST(this.settingsForm);
			console.log("platformForm", platformForm);

			this.$store.dispatch("addAttendanceSettings", platformForm);
		},
		retrieveAndMountSettings() {
			console.log('retrieveAndMountSettings');
			console.log('this.settingsForm1', this.settingsForm);
			console.log('retrieveAndMountSettings this.Attendance.settingsProfile1', this.Attendance.settingsProfile);

			this.has_current_settings = true;
			this.settingsForm.id = this.Attendance.settingsProfile.id;
			this.settingsForm.datacom = this.Attendance.settingsProfile.datacom;
			this.settingsForm.partner = this.Attendance.settingsProfile.partner;
			this.settingsForm.company = this.Attendance.settingsProfile.company;
			for(let key in this.settingsForm) {
				this.settingsForm[key] = this.Attendance.settingsProfile[key];
			}
			console.log('this.settingsForm2', this.settingsForm);
		},
		getHoursFromStore() {
			if(this.isValidOperatingHours) {
				console.log("Settings Page hours2", this.Attendance.operatingHoursObj);
				this.settingsForm.operating_hours = this.Attendance.operatingHoursObj.id;
			}

		},
		getSettings() {
			if(this.isValidSettingsObj) {
				console.log("getSettings this.Attendance.settingsProfile", this.Attendance.settingsProfile);
				this.retrieveAndMountSettings();
			}
		}
	},
	computed: {
		...mapState(["Auth", "Users", "Attendance"]),
		...mapGetters(["isValidOperatingHours", "isValidSettingsObj"])

	},
	created() {},
	async mounted() {
		console.log("Settings Page hours0", this.hours);
		this.getHoursFromStore();
		
	}
};
</script>

<style scoped style="less">

</style>
