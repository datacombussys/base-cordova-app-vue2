<template>
	<div>
		<f7-datatable-component 
			:tableData="tableData" 
			:tableSettings="tableSettings" 
			:editItem="editItem">
			<!-- Slot Header -->
			<template v-slot:headerLinks>
				<div class="data-table-links" :v-if="tableSettings.showEditLinks">
					<f7-list-button class="link" :popup-open="tableSettings.popupLink">New</f7-list-button>
					<f7-list-button id="edit-popup" class="link" @click="editItem">Edit</f7-list-button>
					<f7-list-button class="link confirm-deactivate">Deactivate</f7-list-button>
					<f7-list-button class="link confirm-delete">Delete</f7-list-button>
				</div>
			</template>
			<!--END Slot Header -->

			<!-- Table Body Scoped Slot -->
			<template v-slot:tbody>
				<tbody v-if="tableData.list.length != 0">
					<tr v-for="item in paginatedList" :key="item.id">
						<td class="checkbox-cell">
							<label class="checkbox">
								<input :id="item.id" type="checkbox" @change="checkedItem($event, tableData.list)">
								<i class="icon-checkbox"></i>
							</label>
						</td>
						<td :id="item.id" class="label-cell text-align-center">{{ item.id }}</td>
						<td class="label-cell text-align-center">{{ item.name  }}</td>
						<td class="label-cell text-align-center">{{item.date }}</td>
						<td class="numeric-cell text-align-center">{{ item.duration_days }}</td>
						<td class="numeric-cell text-align-center">{{ item.type }}</td>
						<td class="label-cell text-align-center">
							<b-tag size="is-medium" :type="`${ item.is_active ? 'is-success' : 'is-danger'}`">{{
								item.is_active ? "Active" : "Inactive"
							}}</b-tag>
						</td>
					</tr>
				</tbody>
			</template>
			<!-- END Table Body Scoped Slot -->
		</f7-datatable-component>

		<!-- Popup for New Event -->
    <f7-popup 
			swipeToClose
			class="holiday-popup"
			:opened="HolidayPopupOpened"
			@popup:closed="HolidayPopupOpened = false">
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
import { UniversalMixins } from "@/mixins/universal-mixins";
import { DataTableMixins } from "@/mixins/components/table-mixins";

//Components
import f7DataTableComponent from "@/components/layout-elements/datatables/f7-datatable-component.vue";

export default {
	name: "holidayComponent",
	components: {
		"f7-datatable-component": f7DataTableComponent
	},
	mixins: [
		UniversalMixins,
		DataTableMixins

		],
	props: {

	},
	data() {
		return {
			//Component Data
			tableSettings: {
				popupLink: '.holiday-popup',
				showCreateButton: false,
				title: "Holiday List",
				createButton: "Create Holidays",
				header1: "Id",
				header2: "Name",
				header3: "Date",
				header4: "Duration",
				header5: "Type",
				header6: "Status",
				col1: "id",
				col2: "name",
				col3: "date",
				col4: "duration_days",
				col5: "type",
				col6: "is_active"
			},
			tableData: {
				tableId: "holidayTable",
				list: new Array()
			},
			//Main Settings
			HolidayPopupOpened: false,
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
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
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

				this.$store.dispatch('POSTHoliday', response).then(res => {
					this.clearForm();
				});
			}
			
		},
		resetForm() {
			for (let key in this.holidayForm) {
				console.log("value", this.holidayForm[key]);
				if (this.holidayForm[key] === true || this.holidayForm[key] === false) {
					this.holidayForm[key] = false;
				} else {
					this.holidayForm[key] = null;
				}
			}
			//Reset Variables
			this.holidayForm.employees = [];
			this.holidayForm.is_active = true;
		},
		editItem() {
			console.log("EditItem");
			console.log("this.selectedList", this.selectedList);
			var list2 = this.GET_HOLIDAY_LIST[2];
			var newList = this.selectedList[0];

			for(let key in this.holidayForm) {
				// this.holidayForm[key] = list2[key];
				Object.defineProperty(this.holidayForm, key, {
					value: list2[key],
					writable: true
				});
			}

			// this.$f7.popup.open(".shift-popup-component");
			this.ShiftPopupOpened = true;
			console.log("this.holidayForm", this.holidayForm);
		},
		deleteItem() {
      //Grab item from this.selectedList and delete it from Django
			try {
				// this.$store.dispatch('deleteShift', this.selectedList);
				this.$f7.dialog.alert('Successfully Deleted!');

			} catch {
				this.$f7.dialog.alert('There was an error deleting the record(s)');
			}
		},
		deactivate() {
      //Grab item from this.selectedList and delete it from Django
			try {
				// this.$store.dispatch('deleteShift', this.selectedList);
				this.$f7.dialog.alert('Successfully Deactivated!');

			} catch {
				this.$f7.dialog.alert('There was an error deleting the record(s)');
			}
		},

	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters(["GET_HOLIDAY_LIST", "GET_HOLIDAY_LIST_LENGTH"])

	},
	created() {
		this.tableData.list = this.GET_HOLIDAY_LIST;
		this.paginatedList = this.GET_HOLIDAY_LIST_LENGTH;
		console.log("created this.GET_HOLIDAY_LIST_LENGTH", this.GET_HOLIDAY_LIST_LENGTH);
	},
	async mounted() {
		var $$ = this.Dom7;
		// Confirm Delete Dislog
		$$('.confirm-delete').on('click', () => {
			let length = this.selectedList.length;
			console.log('length resonse', length);
			if(length === 0) {
				this.$f7.dialog.confirm('You must first select at least one record');
			}
			if(length === 1) {
				this.$f7.dialog.confirm('Are you sure you want to delete this record?', () => {
					this.deleteItem();
				});
			}
			if(length >= 2) {
				this.$f7.dialog.confirm('Are you sure you want to delete these records?', () => {
					this.deleteItem();
				});
			}
		});
		//Confirm Deactivate Dialog
		$$('.confirm-deactivate').on('click', () => {
			let length = this.selectedList.length;
			if(length === 0) {
				this.$f7.dialog.confirm('You must first select at least one record');
			}
			if(length === 1) {
				this.$f7.dialog.confirm('Are you sure you want to deactivate this record?', () => {
					this.deleteItem();
				});
			}
			if(length >= 2) {
				this.$f7.dialog.confirm('Are you sure you want to deactivate these records?', () => {
					this.deleteItem();
				});
			}
			this.$f7.dialog.confirm('Are you sure you want to deactivate this record?', () => {
				this.deactivate();
			});
		});
		
	}
};
</script>

<style scoped lang="scss">

</style>
