<template>
  <f7-page name=template-page>
    <f7-navbar back-link="Back">
      <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-title>Super USer Admin</f7-nav-title>
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
              <f7-col class="nav-col-2 display-flex">
                <f7-link icon-color="white" icon-size="40" icon="mdi mdi-chevron-left">Lobby</f7-link>
              </f7-col>
              <f7-col class="nav-col-2 display-flex">
                <f7-searchbar
                class="searchbar"
                  disable-button-text="Cancel"
                  placeholder="Search"
                  :clear-button="true"
                ></f7-searchbar>
              </f7-col>
              <f7-col class="nav-col-3 display-flex justify-content-end">
                <div class="field">
                  <b-switch 
                  size="is-large"
                  :value="$socket.connected"
                  type="is-success">Connected</b-switch>
              </div>
              </f7-col>
          </f7-col>
          </f7-navbar>
        </f7-row>
        <!-- END Title Bar -->

        <!-- Page content-->
        <f7-row class="full-width body-row display-flex justify-content-stretch">
          <!-- Left Column-->
          <f7-col width="25" class="display-flex flex-direction-column padding">
            <f7-row class="full-width display-flex justify-content-center">
              <f7-block-title>In this room</f7-block-title>
              <f7-col>
                
                
              </f7-col>
            </f7-row>
          </f7-col>
          <!-- END Left Column-->

          <!-- Right Column-->
          <f7-col width="75" class="no-padding full-height">
            <f7-row class="full-width full-height display-flex justify-content-space-evenly">
                <f7-col width="100" class="full-height">
    
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
    name: "template",
    data() {
      return {
        //Main Settings
     
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

    
  }
</script>

<style lang="less" scoped>

</style>

