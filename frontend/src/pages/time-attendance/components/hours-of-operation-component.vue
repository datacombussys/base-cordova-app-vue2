<template>
	<div>
		<f7-card>
			<f7-card-content>
				<f7-list class="padding">
					<f7-row>
						<f7-col width="100">
							<f7-block-title>Normal Operating Hours</f7-block-title>
							<f7-row class="display-flex justify-content-center">
								<business-hours 
									:days="Attendance.dayHours" 
									name="businessHours" 
									type="select" 
									:localization="Attendance.hoursOfOperation"
									:switchWidth="switchWidth"
									timeIncriment="30"
									color="#069459"
									@updated-hours="updatedHours">
								</business-hours>
							</f7-row>
							<f7-row class="display-flex justify-content-start">
								<f7-toggle @change="showHolidays = $event.target.checked"></f7-toggle>
								<span><f7-block-title class="classy margin-left">Show Holidays?</f7-block-title></span>
							</f7-row>
							<f7-row v-if="showHolidays">
								<f7-block-title>Holiday Hours</f7-block-title>
								<business-hours 
									:days="Attendance.holidayProfile" 
									name="holidayHours" 
									type="select" 
									:localization="Attendance.hoursOfOperation"
									:switchWidth="switchWidth"
									timeIncriment="30"
									color="#069459"
									@updated-hours="updatedHolidayHours">
								</business-hours>
							</f7-row>
							<!-- <f7-row>
								<f7-col width="50">
									<f7-button @click="testingMethod">test</f7-button>
								</f7-col>
							</f7-row> -->
						</f7-col>
					</f7-row>
				</f7-list>
				<f7-row class="display-flex justify-content-center">
					<f7-col width="50">
						<f7-button fill @click="saveHours">Save Hours</f7-button>
						<f7-button fill @click="testingMethod">Test</f7-button>
					</f7-col>
				</f7-row>
			</f7-card-content>
		</f7-card>
	</div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from 'vuex';
import _ from 'lodash';

//Mixins
// import { LocaleMixin } from '../mixins/businesses/locale-mixins';
import { UniversalMixins } from "../../../mixins/universal-mixins";

//Components
//Vue Business Hours
import BusinessHours from 'vue-business-hours';
// Vue.component('business-hours', BusinessHours);

export default {
	name: "hoursOfOperationComponent",
	components: {
		"business-hours": BusinessHours
	},
	mixins: [UniversalMixins],
	props: {
	},
	data() {
		return {
			//Main Data
			showHolidays: false,
			has_current_times: true,
			//Business Hours Component
			switchWidth: 80,
			//ctk-date-time-picker
			openTime: null,
			minuteInterval: 10,
			//Date Data
			holidayHours: {},
			vuexDayObjects: null,
			dayObjectsToSet: {},
			vuexHolidayObjects: null,
			holidayObjectsToSet: {},
			hoursForm: {
				id: null,
				company: null,
				partner: null,
				datacom: null,
				day_of_week: null,
				isOpen: null,
				open: null,
				close: null,
			},
			hoursDayList: [
				{
					name: "sunday",
					id: null,
					isOpen: false,
					open: null,
					close: null,
				},
				{
					name: "monday",
					id: null,
					isOpen: false,
					open: null,
					close: null,
				},
				{
					name: "tuesday",
					id: null,
					isOpen: false,
					open: null,
					close: null,
				},
				{
					name: "wednesday",
					id: null,
					isOpen: false,
					open: null,
					close: null,
				},
				{
					name: "thursday",
					id: null,
					isOpen: false,
					open: null,
					close: null,
				},
				{
					name: "friday",
					id: null,
					isOpen: false,
					open: null,
					close: null,
				},
				{
					name: "saturday",
					id: null,
					isOpen: false,
					open: null,
					close: null,
				},
			],
		}
	},
	methods: {
		async testingMethod(e) {
			console.log('this.Attendance.holidayProfile', this.Attendance.holidayProfile);
			console.log('this.Attendance.hoursOfOperationOriginal', this.Attendance.hoursOfOperationOriginal);
			console.log('this.Attendance.hoursOfOperation', this.Attendance.hoursOfOperation);


		},
		updatedHours(evt) {
			console.log('updatedHours evt', evt);
			var daysOfWeek = _.cloneDeep(this.vuexDayObjects);	
			console.log("daysOfWeek 1", daysOfWeek);
			console.log("Store Day Object", this.vuexDayObjects);
			console.log("this.Attendance.dayHours", this.Attendance.dayHours);
			console.log("this.Attendance.dayHoursOriginal", this.Attendance.dayHoursOriginal);

			const evtName = Object.keys(evt)[0];
			console.log('evtName', evtName);

			const open = evt[evtName][0].open;
			console.log('open', open);
			var formattedOpenTime = "";
			if(open.length != 0) {
				const formatOpenHours = open.substring(0,2);
				const formatOpenMinutes = open.substring(2,4);
				formattedOpenTime = formatOpenHours + ":" + formatOpenMinutes;
			} 

			const close = evt[evtName][0].close;
			console.log('close', close);	
			const isOpen = evt[evtName][0].isOpen;
			console.log('isOpen', isOpen);
			const id = evt[evtName][0].id;
			console.log('id', id);

			//Make new Object and place in a list
			let dayObject = [{
				day_of_week: evtName,
				id: id,
				isOpen: isOpen,
				open: open,
				close: close,
			}];
			console.log('dayObject', dayObject);

			daysOfWeek[evtName] = dayObject;
			console.log('daysOfWeek Full New Object', daysOfWeek);
			console.log('Local Repository Before Set Values', this.dayObjectsToSet);
			this.dayObjectsToSet = daysOfWeek;
			console.log('Local Repository After Set Values', this.dayObjectsToSet);
			
		},
		updatedHolidayHours(e) {
			console.log('updatedHolidayHours e', e);
		},
		//Not Used But shows how to pass data back from component to parent
		sendOpenToParent() {
			this.$emit("receiveOpenTimes", this.timeOpenList);
		},
		//Not Used But shows how to pass data back from component to parent
		sendCloseToParent() {
			this.$emit("receiveCloseTimes", this.timeCloseList);
		},

		async saveHours() {
			//1) Process Days 
			const daysOriginal = JSON.parse(JSON.stringify(this.Attendance.dayHoursOriginal));
			console.log("daysOriginal", daysOriginal);
			var daysToSend = JSON.parse(JSON.stringify(this.dayObjectsToSet));
			console.log("daysToSend", daysToSend);
			
			// For each object in list, Map to hoursForm and send to Django
			const dayNames = Object.keys(this.dayObjectsToSet);
			if(dayNames.length === 0) {
				this.$f7.dialog.alert("You must change a time to submit the form");
			} else {
				console.log('array of keys dayNames', dayNames);
				for(let key in dayNames) {
					const djangoDayObj = {};
					console.log('dayNames[key]', dayNames[key]);
					const dayName = dayNames[key];
					const dayObj = daysOriginal[dayName].slice(0,1)[0];
					const dayToSendObj = daysToSend[dayName].slice(0,1)[0];
					console.log('dayObj', dayObj);
					console.log('dayToSendObj', dayToSendObj);
					if(dayObj.isOpen) {
						if(dayToSendObj.isOpen) {
							console.log("daysToSend: true, dayObj: true");
							//Make a PATCH Request
							var newObj = dayToSendObj;
							newObj.day_of_week = dayNames[key];
							let POSTresponse = await this.setUserPlatformPOST(newObj);
							console.log('POSTresponse', POSTresponse);
							this.$store.dispatch('PATCHBusinessHours', POSTresponse);
							delete this.dayObjectsToSet[dayName];
							console.log("this.dayObjectsToSet", this.dayObjectsToSet);

						} else if(!dayToSendObj.isOpen) {
							console.log("daysToSend: false, dayObj: true");
							// Delete Request
							this.$store.dispatch('DELETEBusinessHours', dayToSendObj);
							delete this.dayObjectsToSet[dayName];
							console.log("this.dayObjectsToSet", this.dayObjectsToSet);
						}
					} 
					if(!dayObj.isOpen) {
						if(dayToSendObj.isOpen) {
							console.log("daysToSend: true, dayObj: false");
							//POST New Request
							var newObj = dayToSendObj;
							newObj.day_of_week = dayNames[key];
							let POSTresponse = await this.setUserPlatformPOST(newObj);
							console.log('POSTresponse', POSTresponse);
							this.$store.dispatch('POSTBusinessHours', POSTresponse);
							delete this.dayObjectsToSet[dayName];
							console.log("this.dayObjectsToSet", this.dayObjectsToSet);
						} 
						// else if(!dayToSendObj.isOpen) {
						// 	console.log("daysToSend: false, dayObj: false");
						// 	//Do Nothing, No Changes
						}

					}
				};
			}

			//2) Process Holidays


	},
	computed: {
		...mapState(["Auth", "Users", "Attendance"]),
		...mapGetters(["isValidOperatingHours"]),
	},
	async mounted() {
		
	},
	beforeMount() {
		this.vuexDayObjects = this.Attendance.dayHours;
		this.vuexHolidayObjects = this.Attendance.holidayProfile;
	}

};
</script>

<style scoped style="less">

</style>
