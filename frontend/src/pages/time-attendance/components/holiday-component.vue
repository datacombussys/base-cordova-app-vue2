<template>
	<div>
		<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Holiday List</f7-block-title>
		<f7-data-table-component :tableData="tableData" :tableSettings="tableSettings">
			<template v-slot:button>
				<f7-row class="display-flex justify-content-center" v-if="Auth.isAuthenticated">
					<f7-col width="50">
						<f7-button fill popup-open=".new-holiday">Add New Holiday</f7-button>
					</f7-col>
				</f7-row>
				<f7-row class="display-flex justify-content-center" v-else>
					<f7-col width="50">
						<p class="text-align-center">Please Log in to create your holidays</p>
					</f7-col>
				</f7-row>
			</template>
		</f7-data-table-component>

		<!-- Popup for New Event -->
    <f7-popup class="new-holiday">
      <f7-page>
        <f7-navbar title="New Schedule">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-card>
					<f7-card-header>
						<f7-block-title medium class="margin-top no-margin-bottom no-padding-bottom padding-left">Add Holiday</f7-block-title>
					</f7-card-header>
					<f7-list>
						<f7-card-content>
							<f7-row class="full-width display-flex justify-content-space-around">
								<f7-col width="50">
									<f7-block-title class="classy-small">Holiday Name</f7-block-title>
									<f7-list-input 
										required
										validate
										class="datacom-input"
										type="text" 
										placeholder="Labor Day"
										:value="holidayForm.name"
										@input="holidayForm.name = $event.target.value">
									</f7-list-input>
								</f7-col>
								<f7-col width="50">
									<f7-block-title class="classy-small">Type</f7-block-title>
									<f7-list-input 
										required
										validate
										class="datacom-input"
										type="select" 
										:value="holidayForm.type"
										@input="holidayForm.type = $event.target.value">
										<option value="Federal">Federal</option>
										<option value="State">State</option>
										<option value="Company">Company</option>
										<option value="Religious">Religious</option>
									</f7-list-input>
								</f7-col>
							</f7-row>
							<f7-row class="full-width display-flex justify-content-space-around">
								<f7-col width="50">
									<f7-block-title class="classy-small">Date</f7-block-title>
									<f7-list-input
										required
										validate
										id="holidayDatePicker"
										ref="holidayDatePicker"
										type="datepicker"
										placeholder="Select date"
										:calendar-params="PickerOpts"
										class="datacom-input"
									></f7-list-input>
								</f7-col>
								<f7-col width="50">
									<f7-block-title class="classy-small">Duration (days)</f7-block-title>
									<f7-list-input 
										class="datacom-input"
										type="text"
										pattern="[0-9]*"
										required
										validate
										defaultValue="1"
										:value="holidayForm.duration"
										@input="holidayForm.duration = $event.target.value">
									</f7-list-input>
								</f7-col>
							</f7-row>
							<f7-row>
								<f7-col width="25">
									<!-- <f7-button @click="testingMethod">Test</f7-button> -->
								</f7-col>
								<f7-col width="50">
									<f7-button fill @click="createHoliday" popup-close>Save</f7-button>
								</f7-col>
							</f7-row>
						</f7-card-content>
					</f7-list>
				</f7-card>
      </f7-page>
    </f7-popup>
    <!-- END Popup -->

	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "../../../mixins/universal-mixins";
import { DataTableMixins } from "../../../mixins/components/table-mixins";

//Components
import f7DataTableComponent from "../../../components/layout-elements/f7-datatable-component.vue";

export default {
	name: "holidayComponent",
	components: {
		"f7-data-table-component": f7DataTableComponent
	},
	mixins: [
		UniversalMixins,
		DataTableMixins,

		],
	props: {
		settingsProfile: {
			type: Object,
		},
		hours: {
			type: Object,
		},
	},
	data() {
		return {
			//Component Data
			tableSettings: {
				popupLink: '.new-holiday',
				showCreateButton: false,
				title: "Holiday List",
				createButton: "Create Holidays",
				col1: "Id",
				col2: "Name",
				col3: "Date",
				col4: "Duration",
				col5: "Hours",
				col6: "Status"
			},
			tableData: {
				tableId: "holidayTable",
				module: "Attendance"
			},
			//Main Settings
			//F7-TimePicker
			PickerOpts: {
				yearPicker: false,
				yearSelector: false,
				touchMove: true,
				dateFormat: "MM dd",
				closeOnSelect: true
			},
			//Holiday Form
			holidayForm: {
				name: null,
				type: null,
				date: null,
				duration: null
			}

		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.Attendance.holidaysList', this.Attendance.holidaysList);
		},
		async createHoliday() {
			console.log('createHoliday');
			console.log('this.holidayForm', this.holidayForm);
			var getDate = this.$refs.holidayDatePicker.$refs.inputEl.value;
			console.log('getDate', getDate);

			if(!getDate) {
				this.$f7.dialog.create({
					title: "Form Error",
					text: "You must enter a valid date",
					buttons: [
						{
							text: "OK",
							bold: true,
							close: true,
							color: "red"
						},
					],
					closeByBackdropClick: true,
				}).open();
			} else {
				var year = new Date().getFullYear();
				var newDate = new Date(getDate + " " + year);
				console.log('newDate', newDate);
				var ISODate = newDate.toISOString();

				this.holidayForm.date = ISODate.split('T')[0];

				let response = await this.setUserPlatformPOST(this.holidayForm);

				this.$store.dispatch('addHoliday', response).then(res => {
					this.clearForm();
				});
			}
			
		},
		clearForm() {
			for(let key in this.holidayForm) {
				this.holidayForm[key] = null;
			}
		}
	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters(["getHolidayList"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped style="less">

</style>
