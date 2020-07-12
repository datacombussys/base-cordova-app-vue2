<template>
    <f7-page name=admin>
       <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link icon-color="white" icon-ios="material:menu" icon-aurora="material:menu" icon-md="material:menu" panel-open=".panel-left"></f7-link>
        </f7-nav-left>
        <f7-nav-title>Super User Admin</f7-nav-title>
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
          <f7-row class="full-width body-row display-flex justify-content-stretch">
            <!-- Left Column-->
            <f7-col width="50" class="display-flex flex-direction-column padding">
              <f7-row class="full-width display-flex justify-content-center">
                <f7-block-title>File Upload - Fixture Maker</f7-block-title>
                <f7-col>
                  <f7-list>
                    <input name="CSVJsonFixtureFile" ref="CSVJsonFixtureFile" type="file">
                  </f7-list>
                  <f7-row>
                    <f7-col width="50">
                      <f7-button @click="uploadCSV">Upload</f7-button>
                    </f7-col>
                  </f7-row>
                  
                </f7-col>
              </f7-row>
            </f7-col>
            <!-- END Left Column-->

            <!-- Right Column-->
            <f7-col width="50" class="no-padding full-height">
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
    name: "admin",
    data() {
      return {
        //Main Settings
        //FileUpload
        CSVJSONFixtureFile: null,
     
      }
    },
    methods: {
      testButton() {
   
       
      },
      uploadCSV() {
        console.log('uploadCSV');
        console.log('this.$refs.CSVJsonFixtureFile', this.$refs.CSVJsonFixtureFile);
        this.CSVJSONFixtureFile = this.$refs.CSVJsonFixtureFile.files[0];
        console.log('this.CSVJSONFixtureFile', this.CSVJSONFixtureFile);

        this.$store.dispatch('CSVJSONFixtureFile', this.CSVJSONFixtureFile);
      }
     
         
  
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

