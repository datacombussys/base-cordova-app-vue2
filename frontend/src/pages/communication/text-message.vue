<template>
    <f7-page name="text-message">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left-3">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Text Messaging</f7-nav-title>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height">
          <!-- Page content-->
          <f7-row class="title-bar display-flex justify-content-space-between align-items-center">
            <f7-col class="margin-left" width="15">
         
            </f7-col>
            <f7-col class="margin-left" width="15">
    
            </f7-col>
   

          </f7-row>
        </f7-col>
      </f7-row>
      
   
        

        
            




    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';


export default {
    name: "textMessage",
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
    on: {
      pageInit() {
       
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>

