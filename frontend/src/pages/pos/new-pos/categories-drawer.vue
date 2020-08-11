<template>
  <div>
    <DxDrawer
      class="category-drawer"
      opened-state-mode="push"
      :opened.sync="drawerOptions.menuOpened"
      :reveal-mode="drawerOptions.menuRevealMode"
      :min-size="drawerOptions.minMenuSize"
      template="list">
      <template #list>
        <CategoryListComponent
          @navigated="menuClicked"
        />
      </template>
      <div id="view">
        <retailPOS @navigated="menuClicked" />
      </div>
    </DxDrawer>
  </div>
</template>

<script>
import DxResizable from 'devextreme-vue/resizable';
import DxDrawer from "devextreme-vue/drawer";
import DxScrollView from "devextreme-vue/scroll-view";
import CategoryListComponent from "./components/category-list-component";
import { DxList } from "devextreme-vue/list";

import retailPOS from "./new-pos"

export default {
  name: "categoryDrawer",
  mixins: [
  ],
  components: {
		DxResizable,
		DxDrawer,
		DxScrollView,
    CategoryListComponent,
    DxList,
    retailPOS
  },
  data() {
    return {
      //Component Data
     
      //Main Settings
      isLarge: false,
      isXSmall: false,
      
      
      //Data
      
    
    }
  },
  methods: {
    testButton() {
      
		},
		handleSideBarClick() {
      if (this.menuOpened === false) this.menuTemporaryOpened = true;
      this.menuOpened = true;
    },
    handleClick(e) {
      console.log('handleClick e', e)
    },
    menuClicked() {
      this.isLarge = !this.isLarge
      this.isXSmall = !this.isXSmall
    }

  },
  computed: {
		drawerOptions() {
      const shaderEnabled = !this.isLarge;
      return {
        menuMode: this.isLarge ? "shrink" : "overlap",
        menuRevealMode: this.isXSmall ? "slide" : "expand",
        minMenuSize: this.isXSmall ? 200 :0,
        menuOpened: this.isLarge,
        closeOnOutsideClick: shaderEnabled,
        shaderEnabled
      };
    },


    
  },
  watch: {

  },
  mounted() {

    
  },
  created() {

  },

    
  }
</script>

<style lang="scss">
.category-drawer {
 min-height: 100vh;
 .dx-drawer-wrapper {
   min-height: 100vh;
   .dx-drawer-panel-content {
     min-height: 100%;
   }
   .dx-drawer-content {
       min-height: 100vh;
       #view {
         min-height: 100vh;
         .pos-page {
            height: 100vh;
            main-row {
              display: flex;
              min-height: 100vh;
            }
          }
       }
     }
 }
}

</style>

