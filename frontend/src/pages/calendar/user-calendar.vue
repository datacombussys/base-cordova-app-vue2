<template>
    <f7-page name="userCalendar">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left-3">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>User Calendar</f7-nav-title>
        <f7-nav-right>
          <f7-col class="nav-col-3 display-flex justify-content-end">
            <f7-link icon-color="white" icon-ios="f7:gear_alt" icon-aurora="f7:gear_alt" icon-md="f7:gear_alt" href="/checkout/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
          </f7-col>
        </f7-nav-right>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height display-flex flex-direction-column">
          <!-- Title Bar -->
          <f7-row class="full-width title-bar display-flex justify-content-stretch">
            <f7-navbar>
              <f7-col class="row-col-1 display-flex justify-content-center align-items-center text-color-white padding">
                <img src="/static/UserProfile600x600.png" style="width:60px; height: 60px;" class="no-margin-left margin-right-half">
                <span style="font-size: 0.75em;">Ian Christensen</span>
                <span><f7-icon class="color-white" size="30" icon="mdi mdi-chevron-down" slot="media"></f7-icon></span>
              </f7-col>
              <f7-col class="row-col-2 display-flex align-items-center justify-content-space-between text-color-white padding">
                <f7-col class="nav-col-1 display-flex">
                  <f7-link @click="view = 'month'">Monthly</f7-link>
                  <f7-link @click="view = 'week'">Weekly</f7-link>
                  <f7-link @click="view = 'day'">Daily</f7-link>
                  <f7-link @click="taskView = ['task', 'milestone']">Task View</f7-link>
             
                </f7-col>
                <f7-col class="nav-col-2 display-flex">
                  <f7-searchbar
                  class="searchbar"
                    disable-button-text="Cancel"
                    placeholder="Search"
                    :clear-button="true"
                  ></f7-searchbar>
                </f7-col>
                <f7-col class="nav-col-3 display-flex justify-content-space-evenly">
                  <f7-link icon-size="30" icon-color="white" @click="next" icon="mdi mdi-chevron-double-left"></f7-link>
                  <f7-link icon-size="30" icon-color="white" @click="next" icon="mdi mdi-chevron-left"></f7-link>
                  <f7-link icon-size="30" icon-color="white" @click="next" icon="mdi mdi-chevron-right"></f7-link>
                  <f7-link icon-size="30" icon-color="white" @click="next" icon="mdi mdi-chevron-double-right"></f7-link>
             
                </f7-col>
            </f7-col>
            </f7-navbar>
          </f7-row>
          <!-- END Title Bar -->
          <!-- Content Section -->
          <f7-row class="full-width body-row display-flex justify-content-stretch">
            <f7-col class="body-col-1 display-flex flex-direction-column padding">
              <!-- Left Nav Section -->
              <f7-row class="full-width">
                <f7-col width="100" class="display-flex align-content-center">
                   <f7-button fill 
                   class="full-width display-flex" 
                   large round raised icon-color="white" 
                   icon-size="30" icon="mdi mdi-email-plus-outline" 
                   text="New Event"
                   @click="addSchedule"></f7-button>
                </f7-col>
              </f7-row>
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">Shared Calendars</f7-block-title>
                <f7-col width="100">
                  <div>
                    <f7-list-index
                      indexes="auto"
                      list-el=".list.contacts-list"
                      :scroll-list="true"
                      :label="true"
                      @listindex:select="onIndexSelect"
                    ></f7-list-index>

                    <f7-list contacts-list>
                      <f7-list-group>
                        <f7-list-item title="A" group-title></f7-list-item>
                        <f7-list-item link="#" title="Aaron"></f7-list-item>
                        <f7-list-item title="Adam"></f7-list-item>
                        <f7-list-item title="Aiden"></f7-list-item>
                        <f7-list-item title="Albert"></f7-list-item>
                        <f7-list-item title="Alex"></f7-list-item>
                        <f7-list-item title="Alexander"></f7-list-item>
                        <f7-list-item title="Alfie"></f7-list-item>
                        <f7-list-item title="Archie"></f7-list-item>
                        <f7-list-item title="Arthur"></f7-list-item>
                        <f7-list-item title="Austin"></f7-list-item>
                      </f7-list-group>
                      <f7-list-group>
                        <f7-list-item title="B" group-title></f7-list-item>
                        <f7-list-item title="Benjamin"></f7-list-item>
                        <f7-list-item title="Blake"></f7-list-item>
                        <f7-list-item title="Bobby"></f7-list-item>
                      </f7-list-group>
                    </f7-list>
                  </div>
                </f7-col>
              </f7-row>
              <!-- END Users Calendars -->

              <!-- Module Calendars -->
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">Module Calendars</f7-block-title>
                <f7-col width="100">
                  <div>
                    <f7-list-index
                      indexes="auto"
                      list-el=".list.contacts-list"
                      :scroll-list="true"
                      :label="true"
                      @listindex:select="onIndexSelect"
                    ></f7-list-index>
                    <f7-list contacts-list>
                      <f7-list-group>
                        <f7-list-item title="A" group-title></f7-list-item>
                        <f7-list-item link="#" title="Accounting"></f7-list-item>
                        <f7-list-item title="Appointments"></f7-list-item>
                        <f7-list-item title="Payroll"></f7-list-item>
                        <f7-list-item title="Corporate"></f7-list-item>
                        <f7-list-item title="Help Desk"></f7-list-item>
                      </f7-list-group>
                      <f7-list-group>
                        <f7-list-item title="B" group-title></f7-list-item>
                        <f7-list-item title="Bookkeeping"></f7-list-item>
                        <f7-list-item title="Projects"></f7-list-item>
                      </f7-list-group>
                    </f7-list>
                  </div>
                </f7-col>
              </f7-row>
              <!-- END Module Calendars -->

              <!-- Options -->
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title class="no-margin-bottom" style="border-bottom: none;">Options</f7-block-title>
                <f7-col width="100">
                  <f7-list no-hairlines-md>
                   
                    <f7-list-item checkbox @change="month.workweek = $event.target.checked" title="Only Workweek"></f7-list-item>
                    <f7-list-item checkbox @change="month.workweek = $event.target.checked" title="Time Zones (EST)"></f7-list-item>
                    <f7-button fill @click="testButton">Test Button</f7-button>
                  </f7-list>
                </f7-col>
              </f7-row>
              <!-- END Options -->

            </f7-col>
            <!-- END Left Nav Container -->

           


          <!-- Col-2 Main Calendar-->
          <f7-col class="body-col-2 display-flex flex-direction-column padding">
          
          </f7-col>
          <!-- END Col-2 Main Calendar -->

            
          </f7-row>
          <!-- END Content Section -->
        </f7-col>
        <!-- END Main Column -->
      </f7-row>
      <!-- END Main Container Row-->

      <!-- Popup for New Schedule -->


    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

export default {
    name: "userCalendar",
    data() {
      return {
        //Main Settings
        //Scrollbar Settings
        settings: {
          maxScrollbarLength: 120
        },
        //Calendar Form
      }
    
    },
    methods: {
      testButton() {
    
      },
 
   
  
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
     
    },
    watch: {
 
    },
    mounted() {
      
    },
    created() {

    },
    on: {
      pageInit() {
       
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>

