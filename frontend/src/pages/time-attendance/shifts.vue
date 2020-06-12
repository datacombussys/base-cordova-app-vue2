<template>
  <f7-page name=shifts>
    <f7-navbar back-link="Back">
      <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-title>Shift Management</f7-nav-title>
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
        <!-- Vue Scrollbar (dragger) -->
        <div v-bar="{
          preventParentScroll: true,
          scrollThrottle: 30,
        }" style="height: 100vh;"> <!-- el1 -->
          <div> <!-- el2 -->
            <!-- Page content-->
            <f7-row class="full-width">
              <f7-block class="full-width no-margin-top">
                <!-- Shifts -->  
                

                <!-- Indsert Component -->
                <shift-component></shift-component>
                
              </f7-block>

            </f7-row>
            <!-- END Page content-->
          </div>
        </div>
        <!-- END Vue Scrollbar (dragger) -->
      </f7-col>
    </f7-row>
  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
var moment = require('moment');

//Mixins
import { UniversalMixins } from '../../mixins/universal-mixins';
import { DataTableMixins } from '../../mixins/components/table-mixins';

//Components
import shiftComponent from "./components/shift-component.vue";


export default {
    name: "shifts",
    mixins: [
      UniversalMixins,
      DataTableMixins
    ],
    components: {
		"shift-component": shiftComponent,

	},
    data() {
      return {
        //Main Settings
        
     
      }
    },
    methods: {
      testButton() {
       console.log('this.Auth.platformInfo', this.Auth.platformInfo);
       console.log('this.Attendance.shiftList', this.Attendance.shiftList);
       console.log('this.Users.employeeList', this.Users.employeeList);
      },
      
 
    },
    computed: {
      ...mapState(["Users", "Inventory", "Attendance", "Auth"]),
     
    },
    watch: {
 
    },
    async mounted() {
      //get User Platform and get Shift List
      let response = await this.setUserPlatformGET();
      console.log('Mounted response', response);
      this.$store.dispatch('getCompanyShifts', response);
      if(this.Users.employeeList != null) {
        this.$store.dispatch('getEmployeeList', response);
      }
     
    },
    created() {

    },

    
  }
</script>

<style lang="less" scoped>

</style>

