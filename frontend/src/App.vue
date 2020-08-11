<template>
  <div id="root" data-app>

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
            <div class="loader">
            <DxLoadPanel
              :close-on-outside-click="false"
              :visible.sync="Notifications.isLoadPanelVisible"
              :show-indicator="true"
              :show-pane="true"
              :shading="true"
              shading-color="rgba(0,0,0,0.4)"
            />
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

  </div>
</template>

<script>
import {mapState} from 'vuex';
import { DxLoadPanel } from 'devextreme-vue/load-panel';

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
      document.addEventListener("deviceready", onDeviceReady, false);
      // device APIs are available
      function onDeviceReady() {
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        document.addEventListener("menubutton", onMenuKeyDown, false);
        // Add similar listeners for other events

        subscribe(this.screenSizeChanged);
        console.log("App.vue mounted");
        console.log("device", device);
        //Need to get device info
        this.$store.dispatch("preFetchProfile");
        this.$store.dispatch("initTimeZone");
        this.$store.dispatch("initTime");
        this.$store.dispatch("initDate");
      
      }

      function onPause() {
        // Handle the pause event
      }

      function onResume() {
        // Handle the resume event
      }

      function onMenuKeyDown() {
        // Handle the menubutton event
      }

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
#app {
  font-family: 'Open Sans Regular', sans-serif;
  font-size: 1.15em;
  line-height: 1.75em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
