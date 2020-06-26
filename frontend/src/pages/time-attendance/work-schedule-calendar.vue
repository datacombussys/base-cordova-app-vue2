<template>
  <f7-page name="work-schedule">
    <nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
    <!-- Main Container Row -->
    <f7-row class="full-height">
      <!-- Main Column -->
      <f7-col width="100" medium="100" class="full-height display-flex flex-direction-column">
        <!-- Page content-->
        <f7-row class="full-width">
          <!-- Left Column-->
          <f7-col width="25" class="display-flex flex-direction-column padding">
            <f7-row class="full-width display-flex justify-content-center">
              <f7-row class="full-width">
              <f7-col width="100" class="display-flex align-content-center">
                  <f7-button fill 
                  class="full-width display-flex justify-content-space-evenly" 
                  large round raised icon-color="white" 
                  icon-size="30" icon="mdi mdi-email-plus-outline" 
                  text="New Event"
                  popup-open=".new-event-popup"></f7-button>
              </f7-col>
            </f7-row>
                
              <!-- Options -->
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">Options</f7-block-title>
                <f7-col width="100">
                  <f7-list no-hairlines-md>
                    <f7-list-item checkbox @change="showWeekends = !showWeekends" title="Hide Weekends"></f7-list-item>
                    <f7-list-item checkbox @change="showTimeZones = !showTimeZones" title="Show Time Zones"></f7-list-item>
                    <f7-button fill @click="testingMethod">Test Button</f7-button>
                  </f7-list>
                </f7-col>
              </f7-row>
              <!-- END Options -->
              <f7-row>
                <div class="draggable-element event-style">Drag Me</div>
              </f7-row>
              <f7-row>
                <f7-button popup-open=".view-event">Open View Popup</f7-button>
                <f7-button popup-open=".new-event-popup">Open Create Popup</f7-button>
                <f7-button popup-open=".confirm-delete">Confirm Delete Popup</f7-button>
              </f7-row>
            </f7-row>
          </f7-col>
          <!-- END Left Column-->

          <!-- Right Column-->
          <f7-col width="75" class="no-padding full-height">
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
                editable="true"
                @drop="dropCallback"
                />
            </f7-row>
            <f7-row>
              <create-event-popup-component :scheduleForm="scheduleForm"></create-event-popup-component>
              <view-event-popup-component :scheduleForm="scheduleForm"></view-event-popup-component>
              <confirm-delete-component :scheduleForm="scheduleForm"></confirm-delete-component>
            </f7-row>
          </f7-col>
          <!-- END Right Column-->

        </f7-row>
        <!-- END Page content-->
      </f7-col>
    </f7-row>
        

  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Components
import fullCalendar from '@fullcalendar/vue';
import navBarComponent from "../../components/universal/navbar-component.vue";
import createEventPopupComponent from '../../components/layout-elements/calendar/calendar-create-event-component.vue';
import viewEventPopupComponent from '../../components/layout-elements/calendar/calendar-view-event-component.vue';
import confirmDeleteComponent from '../../components/layout-elements/confirm-delete-popup-component.vue';

//Calendar Plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
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
    name: "workScheduleCalendar",
    components: {
      navBarComponent,
      fullCalendar,
      createEventPopupComponent,
      viewEventPopupComponent,
      confirmDeleteComponent
    },
    mixins: [

    ],
    props: {
      createCalendarArgs: {
        type: Object
      },
    },
    data() {
      return {
        //Components Data
        moduleInfo: {
          name: "Shift Calendar",
          type: "calendar",
        },
        pageSettings: {
          leftNavDrawer: ".time-attendance",
          pageTitle: "Time and Attendance"
        },
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
          left: 'prev today next',
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
        
      }
    },
    methods: {
      testingMethod() {
        var popup = this.$f7.popup.get('.myPopup');
        console.log('popup', popup);
        this.popupOpened = true;
        console.log('this.Dom7', this.Dom7);
        var $$ = this.Dom7;
        var element = $$('.myPopup');
        console.log('element', element);
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
      handleEventClick(eventInfo) {
        console.log('eventInfo', eventInfo);
        console.log('this.$f7', this.$f7);
        this.$f7.popup.open('.view-event');
        
    },
    dropCallback(dropInfo) {
      console.log('dropInfo', dropInfo);
      this.$f7.popup.open('.new-event-popup');
    }
    
   
    },
    computed: {
      ...mapState(["Auth", "Attendance", "Calendar"]),
      ...mapGetters(["GET_EVENTS"])
      },
    watch: {
      
    },
    created() {

    },
    mounted() {
      let draggableDiv = document.querySelector('.draggable-element');
        new Draggable(draggableDiv, {
        itemSelector: '.draggable-element',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText,
            body: "Evnt description goes here"
          };
        }
      });
    },
  }
</script>

<style lang="scss" scoped>
.event-style{
  background: #3778F5;
  border: 2px rgb(0, 0, 0) solid;
  border-radius: 10px;
  height: 30px;
  width: 200px;
  cursor: pointer;
  text-align: center;
  font-weight: 400;
  color: white;
}
</style>

