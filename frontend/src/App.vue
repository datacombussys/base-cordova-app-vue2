<template>
  <div id="app" class="md-scrollbar">
    <div class="page-container">
      <md-app md-mode="reveal" class="h-full">
        <!-- Toolbar -->
        <md-app-toolbar class="md-primary gradient-bg text-white">
          <toolbar-component :menuVisible="menuVisible" @toggleDrawer="toggleDrawer"></toolbar-component>
        </md-app-toolbar>
        <!-- Drawer -->
        <md-app-drawer class="bg-white md-scrollbar" :md-active.sync="menuVisible">
        <drawer-component :menuVisible="menuVisible"></drawer-component>
        </md-app-drawer>
        

        <md-app-content class="md-scrollbar h-full">

            
            <!-- Here goes long content -->
            <h1>The Main Content Area</h1>
            <d-button></d-button>
            <hr>
         
            <router-view></router-view>
            <router-view name="main"></router-view>


        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import drawerComponent from '@/components/elements/layout/drawer-component'
import toolbarComponent from '@/components/elements/layout/toolbar-component'
import buttonComponent from '@/components/elements/buttons/button-component'

//Event Bus
import {bus} from '@/services/event-bus'
 


export default {
    name: "databoxxApp",
    mixins: [],
    components: {
      "drawer-component": drawerComponent,
      "toolbar-component": toolbarComponent,
      "d-button": buttonComponent
      
    },
    props: {

    },
    data() {
      return {
        //Main Settings
        height: function() {
          return window.innerHeight *.85;
        }, 
        width: "100%",
        menuVisible: false,
     
      }
    },
    methods: {
      testButton() {
   
      },
      toggleDrawer(e) {
        console.log('toggleDrawer e', e);
        this.menuVisible = e;
      }
     
    },
    computed: {
      ...mapState([]),
     
    },
    watch: {
 
    },
    mounted() {
 
     
    },
    created() {
      bus.$on('closeDrawer', (data) => {
        this.menuVisible = data;
      })
    },
    on: {
      pageInit() {
       
      }
    }
    
  }
</script>

<style lanf="scss" scoped>
@import '../node_modules/devextreme/dist/css/dx.common.css';
@import '../node_modules/devextreme/dist/css/dx.light.css';
#app {

  font-family: 'Open Sans Regular', sans-serif;
  font-size: 1.15em;
  line-height: 1.75em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.gradient-bg {
  background:  linear-gradient(90deg, #013136, #014F56);
}
</style>
