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
						<f7-button fill @click="saveAll">Save Hours</f7-button>
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
		updatedHolidayHours(evt) {
			console.log('updatedHolidayHours evt', evt);
			var holidayDay = _.cloneDeep(this.vuexHolidayObjects);	
			console.log("holidayDay 1", holidayDay);
			console.log("Holiday Day Object", this.vuexHolidayObjects);
			console.log("this.Attendance.holidayProfile", this.Attendance.holidayProfile);
			console.log("this.Attendance.holidayProfileOriginal", this.Attendance.holidayProfileOriginal);

			const evtName = Object.keys(evt)[0];
			console.log('evtName', evtName);

			const open = evt[evtName][0].open;
			console.log('open', open);
			const close = evt[evtName][0].close;
			console.log('close', close);	
			const isOpen = evt[evtName][0].isOpen;
			console.log('isOpen', isOpen);
			const id = evt[evtName][0].id;
			console.log('id', id);

			//Make new Object and place in a list
			let holidayObject = [{
				name: evtName,
				id: id,
				is_open: isOpen,
				open_time: open,
				close_time: close,
			}];
			console.log('holidayObject', holidayObject);

			holidayDay[evtName] = holidayObject;
			console.log('holidayDay Full New Object', holidayDay);

			this.holidayObjectsToSet = holidayDay;
			console.log('Local Repository After Set Values', this.holidayObjectsToSet);

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
					console.log('dayNames[key]', dayNames[key]);
					const dayName = dayNames[key];
					const dayObj = daysOriginal[dayName].slice(0,1)[0];
					const dayToSendObj = daysToSend[dayName].slice(0,1)[0];
					
					//If additional Hours added, I need to format the object to include the open2 and clode2 fields.
					console.log('dayObj', dayObj);
					console.log('dayToSendObj', dayToSendObj);
					if(JSON.stringify(daysToSend[dayName]) != JSON.stringify(daysOriginal[dayName])) {
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
						}
					}
					
				}
			};
		},
		async saveHolidayHours() {
			//1) Process Days 
			const holidaysOriginal = JSON.parse(JSON.stringify(this.Attendance.holidayProfileOriginal));
			console.log("holidaysOriginal", holidaysOriginal);
			var holidaysToSend = JSON.parse(JSON.stringify(this.holidayObjectsToSet));
			console.log("holidaysToSend", holidaysToSend);
			
			//Compare new Array with Original in store and ony make changes to the changed Objects
			const holidayNames = Object.keys(this.holidayObjectsToSet);
			console.log('holidayNames', holidayNames);
			if(holidayNames.length === 0) {
				this.$f7.dialog.alert("You must change a time to submit the form");
			} else {
				for(let key in holidayNames) {
					var holidayNameKey = holidayNames[key];
					console.log('holidayNameKey', holidayNameKey);
					if(JSON.stringify(holidaysToSend[holidayNameKey]) != JSON.stringify(holidaysOriginal[holidayNameKey])) {
						console.log('holidaysToSend[holidayNameKey]', holidaysToSend[holidayNameKey]);
						let POSTresponse = await this.setUserPlatformPOST(holidaysToSend[holidayNameKey][0]);
						console.log('holidaysToSend[holidayNameKey]', holidaysToSend[holidayNameKey]);

						//Convert Format for Django Models
						//If additional Hours added, I need to format the object to include the open2 and clode2 fields.
						var newName = holidayNameKey.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ');
						POSTresponse.name = newName;
						//Send to Database
						console.log('POSTresponse', POSTresponse);
												
						this.$store.dispatch('PATCHHolidays', POSTresponse);
					
						console.log('holidaysToSend[holidayNameKey]', holidaysToSend[holidayNameKey]);
					}
				}
			}
			

		
		},
		saveAll() {
			this.saveHours();
			this.saveHolidayHours();
		}

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
