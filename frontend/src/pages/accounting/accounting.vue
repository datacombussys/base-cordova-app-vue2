<template>
  <f7-page name="accounting-dashboard">
    <nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
    <!-- Main Container Row -->
    <f7-row class="full-width full-height">
      <!-- Main Column -->
      <f7-col width="100" medium="100">
        	<!-- Vue Scrollbar (dragger) -->
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 100vh;"
				>
					<!-- el1 -->
					<div>
          <!-- el2 -->
            <!-- Page content-->
            <f7-block>
              <f7-row class="full-width">
                <f7-segmented strong tag="p">
                  <f7-button>Journal</f7-button>
                  <f7-button>Settings</f7-button>
                  <f7-button active>Vendors</f7-button>
                  <f7-button @click="testButton">Test</f7-button>
                </f7-segmented>
              </f7-row>

              <f7-row class="full-width full-height-percent">
                <grid-layout
                  class="full-width grid-container"
                  :layout.sync="gridLayout"
                  :col-num="1"
                  :row-height="400"           
                  :is-draggable="true"
                  :is-resizable="true"
                  :is-mirrored="false"
                  :vertical-compact="false"
                  :margin="[10, 10]"
                  :use-css-transforms="true"
                >

                  <grid-item v-for="item in gridLayout"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i"
                    :key="item.i"
                    class="grid-item-style">
                    <template>
                      <component v-if="item.isComponent" :is="item.data"></component>
                      <div v-else v-html="item.data"></div>
                    </template>

                  </grid-item>
                </grid-layout>
              </f7-row>
            </f7-block>
            <!-- END Page content-->
          </div>
				</div>
        <!-- END Vue Scrollbar (dragger) -->
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

//DevExtreme Modules
import notify from 'devextreme/ui/notify';
import { DxScrollView } from 'devextreme-vue/scroll-view';

//Chart Of Accounts Compoents
import assetsComponent from "@/pages/accounting/chart-of-accounts/components/assets-component.vue";
import liabilitiesComponent from "@/pages/accounting/chart-of-accounts/components/liabilities-component.vue";
import equityComponent from "@/pages/accounting/chart-of-accounts/components/equity-component.vue";

export default {
    name: "accountingDashboard",
    	mixins: [
		UniversalMixins
		],
	components: {
    "nav-bar-component": navBarComponent,
    "assets-component": assetsComponent,
    "liabilities-component": liabilitiesComponent,
    "equity-component": equityComponent,
    notify,
    DxScrollView
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
        //Main Data
        //Grid Layout
        gridSettings: {
          autoSize: true
        },
        dataTreeInstance: null,
        gridLayout: [
          {"x":0,"y":0,"w":1,"h":1,"i":"0", data: assetsComponent, isComponent: true},
          {"x":0,"y":1,"w":1,"h":1,"i":"1", data: liabilitiesComponent, isComponent: true},
          {"x":0,"y":2,"w":1,"h":1,"i":"2", data: equityComponent, isComponent: true},

        ],
     
     
      }
    },
    methods: {
      testButton() {
        console.log("this.$f7", this.$f7);
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
.grid-container {
  background: rgb(255, 255, 255);

}
//Grid Display
.grid-item-style {
  background: rgb(224, 224, 224);
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
  border: 2px solid black;
  overflow: hidden;

}

</style>

