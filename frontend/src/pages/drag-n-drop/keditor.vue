<template>
  <f7-page name=keditor id="keditorpage">
		<nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
    <div class="selector"></div>


  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

// require('@kademi/keditor/dist/js/keditor');

//Components
import navBarComponent from "../../components/universal/navbar-component.vue";


export default {
		name: "Editor",
		mixins: [],
		components: {
			"nav-bar-component": navBarComponent,
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
<style lang="less">

</style>



