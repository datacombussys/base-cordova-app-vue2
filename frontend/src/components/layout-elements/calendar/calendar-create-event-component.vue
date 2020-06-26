<template>
	<div>
		<!-- Popup for New Event -->
    <f7-popup id="new-event-popup" class="new-event-popup">
      <f7-page>
        <f7-navbar title="New Schedule">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-card class="margin">
          <f7-card-content>
             <f7-list>
              <f7-row>
                <f7-col width="50">
                  <p class="field-title">Title:</p>
                  <f7-list-input 
                    type="text"
                    :value="scheduleForm.title"
                    @input="scheduleForm.title = $event.target.value">
                    <b-icon slot="media" icon="star" size="is-medium"></b-icon>
                  </f7-list-input>
                </f7-col>
                <f7-col width="50">
                  <p class="field-title">Location:</p>
                  <f7-list-input 
                    type="text"
                    :value="scheduleForm.location"
                    @input="scheduleForm.location = $event.target.value">
                    <b-icon slot="media" icon="map-marker-outline" size="is-medium"></b-icon>
                  </f7-list-input>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col width="50">
                  <p class="field-title">Start Date:</p>
                  <f7-date-picker-component :dateSettings="startDate"></f7-date-picker-component>
                </f7-col>
                <f7-col width="50">
                  <p class="field-title">End Date:</p>
                    <!-- <f7-date-picker-component :dateSettings="endDate"></f7-date-picker-component> -->
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col width="50">
                  <p class="field-title">Category</p>
                  <f7-list-input
                    type="select"
                    :value="scheduleForm.category"
                    @input="scheduleForm.category = $event.target.value">
                    <option value="time">Normal Event</option>
                    <option value="allday">All Day Event</option>
                    <option value="task">Task</option>
                  </f7-list-input>
                </f7-col>
                <f7-col width="50">
                  <p class="field-title">Attendees</p>
                  <div class="view view-init">
                    <f7-list-item smart-select :smart-select-params="{openIn: 'popover'}">
                      <select name="attendees" multiple>
                        <option value="Ian" selected>Ian</option>
                        <option value="Joe">Joe</option>
                        <option value="Mike">Mike</option>
                      </select>
                      <b-icon slot="media" icon="account" size="is-medium"></b-icon>
                    </f7-list-item>
                  </div>
                  
                  <!-- <f7-list-input 
                  class="full-width"
                    type="select"
                    multiple
                    :value="scheduleForm.attendees"
                    @input="scheduleForm.attendees.push($event.target.value)">
                    
                      <option value="">Ian Christensen</option>
                      <option value="">Franklin Thomas</option>
                 
                    
                    <div slot="root-start" class="field-title">Attendees:</div>
                    <b-icon slot="media" icon="account" size="is-medium"></b-icon>
                  </f7-list-input> -->
                </f7-col>
              </f7-row>
            </f7-list>

          </f7-card-content>
        </f7-card>
        <f7-row>
          <f7-col width="50">
            <f7-button @click="testingMethod" fill>Cancel</f7-button>
          </f7-col>
          <f7-col width="50">
            <f7-button fill popup-close @click="createEvent">Save</f7-button>
          </f7-col>
        </f7-row>
       
        
      </f7-page>
    </f7-popup>
    <!-- END Popup for New Event -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Components
import f7DatePickerComponent from '@/components/layout-elements/date-and-time/f7-datetimepicker-component.vue';

export default {
	name: "createCalendarEventComponent",
	components: {
    "f7-date-picker-component": f7DatePickerComponent
	},
	mixins: [

		],
	props: {
		createCalendarArgs: {
			type: Object
    },
    scheduleForm: {
      type: Object
    }
	},
	data() {
		return {
      //Component Data
      startDate: {
        ref: "startDateShift",
        PickerID: "startDateShift"
      },
      endDate: {
        ref: "endDateShift",
        PickerID: "endDateShift"
      },
		};
	},
	methods: {
		testingMethod(e) {
			console.log('this');
		},
		createEvent(e) {
			console.log('e', e);
      console.log('this.Calendar.calendarArgs', this.Calendar.calendarArgs);
      var args = this.Calendar.calendarArgs;

			this.$store.commit('CREATE_EVENT', {
				title: "My event title",
				start: args.start,
				end: args.end,
				allDay: args.allDay
			});
		}
	
	},
	computed: {
		...mapState(["Auth", "Attendance", "Calendar"]),
		...mapGetters(["GET_HOLIDAY_LIST"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped lang="less">

</style>
