<template>
	<div>
		<f7-sheet
      class="time-off-request-sheet">
			<f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Close</f7-link>
        </div>
      </f7-toolbar>
      <f7-page-content class="parent-scroll">
          <!-- Vue Scrollbar (dragger) -->
			<div
				v-bar="{
					preventParentScroll: true,
					scrollThrottle: 30
				}"
				style="height: 100vh;">
				<!-- el1 -->
				<div>
				<!-- el2 -->
					<f7-block>
						<f7-card>
							<f7-card-header>
								<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Time Off Request</f7-block-title>
							</f7-card-header>
							<f7-list>
								<f7-card-content>
									<f7-row class="full-width display-flex justify-content-space-around">
										<f7-col width="50">
											<p class="field-title">Sender</p>
											<f7-list-item 
												:title="notificationForm.sender">
											</f7-list-item>
										</f7-col>
										<f7-col width="50">
											<p class="field-title">Recipient</p>
											<f7-list-item 
												:title="notificationForm.receiver">
											</f7-list-item>
										</f7-col>
									</f7-row>
									<f7-row class="full-width display-flex justify-content-space-around">
										<f7-col width="50">
											<p class="field-title">Start Date</p>
											<f7-list-input
												required
												validate
												id="leaveStartDate"
												ref="leaveStartDate"
												type="datepicker"
												placeholder="Select date"
												:calendar-params="PickerOpts"
												class="datacom-input"
												@change="changeStartDate"
											></f7-list-input>
										</f7-col>
										<f7-col width="50">
											<p class="field-title">End Date</p>
											<f7-list-input
												required
												validate
												id="leaveEndDate"
												ref="leaveEndDate"
												type="datepicker"
												placeholder="Select date"
												:calendar-params="PickerOpts"
												class="datacom-input"
												@change="changeEndDate"
											></f7-list-input>
										</f7-col>
									</f7-row>
									<f7-row class="full-width display-flex justify-content-space-around">
										<f7-col width="50">
											<p class="field-title">Today's Date</p>
											<f7-list-item 
												:title="todaysDate | moment('MMMM Do, YYYY')">
											</f7-list-item>
										</f7-col>
										<f7-col width="50">
											<p class="field-title">Duration (calendar days)</p>
											<f7-list-item 
											:title="leaveForm.days_requested">
											</f7-list-item>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="100">
											<p class="field-title">Subject</p>
											<f7-list-input 
												class="datacom-input"
												type="text"
												required
												validate
												:value="notificationForm.subject"
												@input="notificationForm.subject = $event.target.value">
											</f7-list-input>
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="100">
											<p class="field-title">Message:</p>
											<f7-text-editor ref="requestBody" style="background: rgb(216,252,253)" />
										</f7-col>
									</f7-row>
									<f7-row>
										<f7-col width="25">
											<f7-button fill @click="testingMethod" popup-close>Test</f7-button>
										</f7-col>
										<f7-col width="50">
											<f7-button fill @click="sendNotification" popup-close>Save</f7-button>
										</f7-col>
									</f7-row>
								</f7-card-content>
							</f7-list>
						</f7-card>
						<f7-row>
							<f7-block class="margin padding"></f7-block>
						</f7-row>
						</f7-block>
					</div>
				</div>
      </f7-page-content>
    </f7-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';
var moment = require('moment');

//Components


export default {
	name: "timeOffRequestNotificationComponent",
	mixins: [],
	components: {
	},
	props: {

	},
	data() {
		return {
			//Component Data

			//Main Data
			todaysDate: String(new Date()),
			notificationForm: {
				date_added: null,
				sender: null,
				approved_declined_by: null,
				receiver: null,
				leave_request: null,
				mileage_reimbursement: null,
				read: null,
				is_archived: null,
				is_deleted: null,
			},
			leaveForm: {
				id: null,
				leave_type: null,
				start_date: null,
				end_date: null,
				days_requested: null,
				status: null,
				disposition_date: null,
				title: null,
				subject: null,
				message: null,
				docs: null,
				approval_remarks: null,
			},
			//Picker Opts
			PickerOpts: {
				yearPicker: true,
				yearSelector: true,
				touchMove: true,
				dateFormat: "MM dd, yyyy",
				closeOnSelect: true
			},


		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.leaveForm", this.leaveForm);
			console.log("this.Users.employeeProfile", this.Users.employeeProfile);
		},
		sendNotification(e) {
			console.log("sendNotification e", e);
			let newmessage = this.$refs.requestBody;
			let messageBody = newmessage.f7TextEditor.value;
			console.log("message", message);
			console.log("messageBody", messageBody);
			this.leaveForm.message = messageBody;
		},
		changeStartDate(e) {
			console.log("changeStartDate e", e);
			let date = e.target.value;
			let javaDate = new Date(date);
			let formattedDate = javaDate.toISOString();
			console.log("formattedDate", formattedDate);

			this.leaveForm.start_date = formattedDate;
		},
		changeEndDate(e) {
			console.log("changeEndDate e", e);
			let date = e.target.value;
			let javaDate = new Date(date);
			let formattedDate = javaDate.toISOString();
			console.log("formattedDate", formattedDate);

			this.leaveForm.end_date = formattedDate;

			var x = new moment(this.leaveForm.start_date)
			console.log("x", x);
			var y = new moment(this.leaveForm.end_date)
			console.log("y", y);

			var duration = moment.duration(y.diff(x)).as('days');
			console.log("duration", duration);

			this.leaveForm.days_requested = duration;

		}
	},
	computed: {
		...mapState(['Users']),
		...mapGetters([]),

	},
	created() {

	},
	mounted() {
		console.log("this.Users.employeeProfile.user.full_name", this.Users.employeeProfile.user.full_name);
		this.notificationForm.sender = this.Users.employeeProfile.user.full_name;
		this.notificationForm.receiver = "User Manager";
	}
};
</script>

<style scoped lang="less">
.time-off-request-sheet {
	height : 100%;
}
.parent-scroll {
	scrollbar-width: 0px;
}
</style>
