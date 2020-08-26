<template>
  <div id="root">
    <v-app>

      <div class="cssClasses">
        <router-view
          name="layout"
          :title="title"
          :isXSmall="screen.isXSmall"
          :isLarge="screen.isLarge"
        >
          <div class="main-content">
            <router-view name="content" class="page-container"/>
          </div>
          <template #footer>
            <the-footer />

						<!--Spinner and Poaders --><
						<v-overlay :value="Notifications.isLoadPanelVisible">
							<div class="row">
								<v-card
									color="blue-grey darken-4"
									class="mx-auto"
									max-width="250"
								>
									<v-container style="height: 150px;">
										<v-row
											class="fill-height"
											align-content="center"
											justify="center"
										>
											<v-col cols="6">
												<v-progress-linear
													color="deep-orange darken-1"
													indeterminate
													rounded
													height="6"
												></v-progress-linear>
											</v-col>
											<v-col
												class="subtitle-1 text-center"
												cols="12"
											>
												Please wait while we load your data...
											</v-col>
										</v-row>
									</v-container>
								</v-card>
							</div>
						</v-overlay>

						
            <div class="loader">
							<DxLoadPanel
								:close-on-outside-click="false"
								:visible.sync="Notifications.spinner"
								:show-indicator="true"
								:show-pane="true"
								:shading="true"
								shading-color="rgba(0,0,0,0.4)"
							/>
            </div>
						<div class="snackbar">
							<v-snackbar v-model="Notifications.showSnackbar">
								{{message}}
								<v-btn color="accent" @click.native="Notifications.showSnackbar = false">Close</v-btn>
							</v-snackbar>
						</div>
          </template>
        </router-view>
        <router-view
          name="categories"
          :title="title"
          :isXSmall="screen.isXSmall"
          :isLarge="screen.isLarge"
        >
          <div class="main-content">
            <router-view name="pos" class="page-container"/>
          </div>
    
        </router-view>
        
      </div>
    </v-app>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import { confirm, custom, alert } from 'devextreme/ui/dialog';

//Event Bus
import {bus} from '@/services/event-bus'
 
import TheFooter from "@/components/elements/layout/footer-component";
import { sizes, subscribe, unsubscribe } from "./utils/media-query";

function getScreenSizeInfo() {
  const screenSizes = sizes();

  return {
    isXSmall: screenSizes["screen-x-small"],
    isLarge: screenSizes["screen-large"],
    cssClasses: Object.keys(screenSizes).filter(cl => screenSizes[cl])
  };
}

export default {
    name: "databoxxApp",
    mixins: [],
    components: {
      DxLoadPanel,
      TheFooter,
      // "drawer-component": drawerComponent,
      // "toolbar-component": toolbarComponent,
      // "d-button": buttonComponent
      
    },
    props: {

    },
    data() {
      return {
        //Main Seettings
        platformLevel: 1,
        windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
        
        //DevExorcess
        Init: "Christ Jesus",
        title: this.$appInfo.title,
        screen: getScreenSizeInfo(),

        //VueMaterial
        height: function() {
          return window.innerHeight *.85;
        }, 

				menuVisible: false,
				
				//Snackbar
      	message: 'My snackbar message'
     
      }
    },
    methods: {
      testButton() {
   
      },
      toggleDrawer(e) {
        console.log('toggleDrawer e', e);
        this.menuVisible = e;
      },
      screenSizeChanged() {
        this.screen = getScreenSizeInfo();
      }
     
    },
    computed: {
      ...mapState(["Notifications"]),
      //  cssClasses() {
      //   return ["app"].concat(this.screen.cssClasses);
      // }

     
    },
    watch: {
 
    },
    async mounted() {
      let onDeviceReady = () => {
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        document.addEventListener("menubutton", onMenuKeyDown, false);
        screen.orientation.lock('landscape')
        // Add similar listeners for other events

        subscribe(this.screenSizeChanged);
        console.log("App.vue mounted");
        console.log("device", device);
        //Need to get device info
        this.$store.dispatch("preFetchProfile");
        this.$store.dispatch("initTimeZone");
        this.$store.dispatch("initTime");
        this.$store.dispatch("initDate");
        this.$store.dispatch("setDevice")
      
      }
      let onPause = () => {
        // Handle the pause event
      }

      let onResume = () => {
        // Handle the resume event
      }

      let onMenuKeyDown = () => {
        // Handle the menubutton event
      }
      document.addEventListener("deviceready", onDeviceReady, false);
      // device APIs are available
      

      

      // Add similar event handlers for other events

     
    },
    created() {
      bus.$on('closeDrawer', (data) => {
        this.menuVisible = data;
      })
    },
    beforeDestroy() {
    unsubscribe(this.screenSizeChanged);
  },
    
}
</script>

<style lang="scss">



</style>
