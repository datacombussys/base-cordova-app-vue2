<template>
	<div>
		<!-- Popup for New Event -->
    <f7-popup id="view-event" class="view-event">
      <f7-page>
        <f7-navbar title="View Event">
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
                  <f7-list-item 
                    :title="scheduleForm.title ">
                    <b-icon slot="media" icon="star" size="is-medium"></b-icon>
                  </f7-list-item>
                </f7-col>
                <f7-col width="50">
                  <p class="field-title">Location:</p>
                  <f7-list-item 
                    :title="scheduleForm.location"
                    <b-icon slot="media" icon="map-marker-outline" size="is-medium"></b-icon>
                  </f7-list-item>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col width="50">
                  <p class="field-title">Start Date:</p>
									<f7-list-item :title="scheduleForm.startDate"></f7-list-item>
                </f7-col>
                <f7-col width="50">
                  <p class="field-title">Start Time:</p>
									<f7-list-item :title="scheduleForm.startDate"></f7-list-item>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col width="50">
                  <p class="field-title">End Date:</p>
									<f7-list-item :title="scheduleForm.endDate"></f7-list-item>
                </f7-col>
                <f7-col width="50">
                  <p class="field-title">End Time:</p>
									<f7-list-item :title="scheduleForm.endDate"></f7-list-item>
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col width="50">
                  <p class="field-title">Category</p>
                  <f7-list-item :title="scheduleForm.category"></f7-list-item>
                </f7-col>
                <f7-col width="50">
									<f7-list-item title="Attendees"></f7-list-item>

                  
                  <!-- <f7-list-item 
                  class="full-width"
                    type="select"
                    multiple
                    :value="scheduleForm.attendees"
                    @input="scheduleForm.attendees.push($event.target.value)">
                    
                      <option value="">Ian Christensen</option>
                      <option value="">Franklin Thomas</option>
                 
                    
                    <div slot="root-start" class="field-title">Attendees:</div>
                    <b-icon slot="media" icon="account" size="is-medium"></b-icon>
                  </f7-list-item> -->
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
            <f7-button fill popup-close>Save</f7-button>
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

var moment = require("moment");

export default {
	name: "viewCalendarEventComponent",
	components: {

	},
	mixins: [

		],
	props: {
		scheduleForm: {
      type: Object
		},
		popupOpened: {
			type: Boolean
		}
		
	},
	data() {
		return {

		};
	},
	methods: {
		testingMethod(e) {
			console.log('this');
		},
		
	
	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters(["GET_HOLIDAY_LIST"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped lang="less">

</style>
