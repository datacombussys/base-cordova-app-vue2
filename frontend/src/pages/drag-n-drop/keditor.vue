<template>
  <f7-page name=keditor id="keditorpage">
		<nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
    <div class="selector"></div>

    <shift-v2-component></shift-v2-component>
  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

// require('@kademi/keditor/dist/js/keditor');

//Components
import navBarComponent from "@/components/universal/navbar-component.vue";
import ShiftV2Component from "@/pages/time-attendance/components/shift-v2-component.vue";


export default {
		name: "Editor",
		mixins: [],
		components: {
      "nav-bar-component": navBarComponent,
      "shift-v2-component": ShiftV2Component
		},
    data() {
      return {
				//Component Data
				pageSettings: {
					leftNavDrawer: "",
					pageTitle: "K-Editor"
				},
				moduleInfo: {
					name: "K-Editor",
					type: "webpage",
				},
        //Main Settings

      }
    },
    methods: {
      testButton() {
      console.log("this.Common", this.Common);
      },
 
    },
    computed: {
      ...mapState([]),
     
    },
    watch: {
 
    },
    mounted () {
      // console.log('Jquery $', $)
      // KEditor.init($('.selector'), {
 
      // });

    },
    created() {

    },

    
  }
</script>
<style lang="scss">

</style>



