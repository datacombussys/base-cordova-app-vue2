<template>
	<div>
		<f7-row>
			<full-calendar
				:plugins="calendarPlugins"
				:header="headerObj"
				:buttonText="buttonsObj" 
				:weekends="showWeekends" 
				selectable="true" 
				:events="Calendar.events" 
				@select="handleSelect" 
				@eventClick="handleEventClick" 
				droppable="true"
				/>
		</f7-row>
		<f7-row>
			<create-event-popup-component :scheduleForm="scheduleForm"></create-event-popup-component>
			<!-- <confirm-delete-component :scheduleForm="scheduleForm"></confirm-delete-component> -->
			<modal name="hello-world">
				hello, world!
			</modal>
		</f7-row>
		<f7-row>
			<f7-button @click="testingMethod">Test</f7-button>
		</f7-row>
		
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Components
import FullCalendar from '@fullcalendar/vue';
import createEventPopupComponent from './calendar/calendar-create-event-component.vue';
import confirmDeleteComponent from './confirm-delete-popup-component.vue';


//Calendar Plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeLinePlugin from '@fullcalendar/timeline';

import resourceCommonPlugin from '@fullcalendar/resource-common';
// import rrulePlugin from '@fullcalendar/rrule';

//CalendarStyling
require('@fullcalendar/core/main.min.css');
require('@fullcalendar/timegrid/main.min.css');
require('@fullcalendar/daygrid/main.min.css');
require('@fullcalendar/list/main.min.css');
require('@fullcalendar/timeline/main.min.css');

export default {
	name: "calendarComponent",
	components: {
		confirmDeleteComponent,
		"full-calendar": FullCalendar,
		"create-event-popup-component": createEventPopupComponent,
		
	},
	mixins: [

		],
	props: {

	},
	data() {
		return {
			//Calendar Data
			calendarPlugins: [ // plugins must be defined in the JS
				dayGridPlugin,
				timeGridPlugin,
				interactionPlugin, // needed for dateClick
				listPlugin,
				timeLinePlugin,
				resourceCommonPlugin
			],
			calendarWeekends: true,
			calendarEvents: [ // initial event data
				{ title: 'Event Now', start: new Date() }
			],
			showWeekends: true,
			headerObj: {
				left: 'prev next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				},
			buttonsObj: {
				today: 'Today',
				month: 'Month',
				week: 'Week',
				day: 'Day',
				list: 'List'
			},
			//Schedule Data for Components
			scheduleForm: {
				id: '2',
				calendarId: '0',
				title: '',
				location: '',
				attendees: [],
				category: 'time',
				start: null,
				startDate: null,
				startTimeH: null,
				startTimeM: null,
				startTimeA: null,
				endDate: null,
				endTime: null,
				end: null,
				body: null,
				isReadOnly: true,
				color: "",
				bgColor: "",
				state: "Busy",
				isAllDay: false
			},
			popupOpened: false,


		};
	},
	methods: {
		testingMethod(e) {
			var popup = this.$f7.popup.get('.confirm-delete');
			console.log('popup', popup);
			this.popupOpened = true;
			console.log('this.Dom7', this.Dom7);
			var $$ = this.Dom7;
			var element = $$('.confirm-delete');
			console.log('element', element);
			this.$modal.show('hello-world');
		},
		toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    },
    handleSelect(args) {
			console.log('args', args);
			this.$store.commit('SET_CALENDAR_ARGS', args);
			this.$f7.popup.open('.new-event-popup');

		},
		handleEventClick(args) {
			console.log('args', args);
			console.log('this.$f7', this.$f7);
			this.$f7.popup.open('.view-event');
			
		},

	
	},
	computed: {
		...mapState(["Auth", "Attendance", "Calendar"]),
		...mapGetters(["GETEVENTS"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped lang="less">

</style>
