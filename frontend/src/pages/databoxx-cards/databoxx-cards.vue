<template>
    <f7-page name="databoxx-cards">
       <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".databoxx-cards">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Databoxx Cards</f7-nav-title>
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
          <!-- Page content-->
          <f7-row class="full-width">
            <!-- Left Column-->
            <f7-col width="50" class="display-flex flex-direction-column padding">
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title>In this room</f7-block-title>
                <f7-col>
                  
                  
                </f7-col>
              </f7-row>
            </f7-col>
            <!-- END Left Column-->

            <!-- Right Column-->
            <f7-col width="50" class="no-padding full-height">
              <f7-row class="full-width full-height display-flex justify-content-space-evenly">
                  <f7-col>
      
                  </f7-col>
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


export default {
    name: "databoxxCards",
    data() {
      return {
        //Main Settings
     
      }
    },
    methods: {
      testButton() {
   
       
      },
     
      

      
      //Custom Scrollbar
   
  
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

