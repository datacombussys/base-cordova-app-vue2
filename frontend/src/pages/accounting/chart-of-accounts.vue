<template>
  <f7-page name="accounting-dashboard">
    <nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
    <!-- Main Container Row -->
    <f7-row class="full-width full-height">
      <!-- Main Column -->
      <f7-col width="100" medium="100">
        <!-- Page content-->
        <f7-row class="full-width">

        </f7-row>
        <!-- END Page content-->
      </f7-col>
    </f7-row>
  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//LayoutComponents
import navBarComponent from "@/components/universal/navbar-component.vue";


export default {
    name: "chartOfAccounts",
    	mixins: [
		UniversalMixins
		],
	components: {
		"nav-bar-component": navBarComponent,
	},
    data() {
      return {
        //Component Data
        pageSettings: {
				leftNavDrawer: ".accounting-panel",
				pageTitle: "Accounting"
			},
        moduleInfo: {
          name: "Accounting",
          type: "dashboard",
          level: 5
			  },
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

<style lang="scss" scoped>

</style>

