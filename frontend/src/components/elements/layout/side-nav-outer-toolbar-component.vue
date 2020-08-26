<template>
  <div class="side-nav-outer-toolbar">
    <header-toolbar
      class="layout-header"
      :menuToggleEnabled="true"
      :toggleMenuFunc="toggleMenu"
      :title="title"
    />
    <dx-drawer
      class="layout-body"
      position="before"
      template="menu"
      :opened.sync="menuOpened"
      :opened-state-mode="drawerOptions.menuMode"
      :reveal-mode="drawerOptions.menuRevealMode"
      :min-size="drawerOptions.minMenuSize"
      :shading="drawerOptions.shaderEnabled"
      :close-on-outside-click="drawerOptions.closeOnOutsideClick"
      style="z-index: 50;"
    >
    <!-- eslint-disable vue/no-unused-vars -->
      <side-nav-menu
        
        slot="menu"
        slot-scope="_"
        :compact-mode="!menuOpened"
        @click="handleSideBarClick"
      />
      <dx-scroll-view 
        :height="scrollHeight"
        width="100%"
        ref="scrollViewRef" >
        <slot />
        <slot name="footer" />
      </dx-scroll-view>
      <!-- eslint-enable -->
    </dx-drawer>
  </div>
</template>

<script>
import DxDrawer from "devextreme-vue/drawer";
import DxScrollView from "devextreme-vue/scroll-view";

import HeaderToolbar from "@/components/elements/layout/header-toolbar-component";
import SideNavMenu from "@/components/elements/layout/side-nav-menu-component";

export default {
	components: {
    DxDrawer,
    DxScrollView,
    HeaderToolbar,
    SideNavMenu
  },
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean
  },
  data() {
    return {
      //Main Data
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      menuOpened: this.isLarge,
      menuTemporaryOpened: false,
    };
  },
  methods: {
    toggleMenu(e) {
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (this.menuOpened) {
        this.menuTemporaryOpened = false;
      }
      this.menuOpened = !this.menuOpened;
    },
    handleSideBarClick() {
      if (this.menuOpened === false) this.menuTemporaryOpened = true;
      this.menuOpened = true;
    }
  },
  computed: {
    drawerOptions() {
      const shaderEnabled = !this.isLarge;
      return {
        menuMode: this.isLarge ? "shrink" : "overlap",
        menuRevealMode: this.isXSmall ? "slide" : "expand",
        minMenuSize: this.isXSmall ? 0 : 60,
        menuOpened: this.isLarge,
        closeOnOutsideClick: shaderEnabled,
        shaderEnabled
      };
    },
    headerMenuTogglerEnabled() {
      return this.isXSmall;
    },
    scrollView() {
      return this.$refs["scrollViewRef"].instance;
    },
    scrollHeight() {
			if(this.windowWidth > 640) {
				let footerPercent = this.windowHeight * .05
				return this.windowHeight - footerPercent
			} 
			return "100%"
		}
  },
  watch: {
    isLarge() {
      if (!this.menuTemporaryOpened) {
        this.menuOpened = this.isLarge;
      }
    },
    $route() {
      if (this.menuTemporaryOpened || !this.isLarge) {
        this.menuOpened = false;
        this.menuTemporaryOpened = false;
      }
      this.scrollView.scrollTo(0);
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    // console.log("Window width is:", this.windowWidth);
    });
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight
      // console.log("Window height is:", this.windowHeight);
    })
  }
};
</script>

<style lang="scss">
.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}
.layout-header {
  z-index: 1501;
}
.main-content {
  flex-grow: 1;
}
.menu-container {
	background:  linear-gradient(90deg, #131212, rgb(40, 40, 40));
}
//Dont place any scroillable css here. Plce it in the dx-styles.scss

</style>
