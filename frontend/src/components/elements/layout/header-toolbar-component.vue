<template>
  <header class="header-component">
    <dx-toolbar class="header-toolbar">
      <dx-item
        :visible="menuToggleEnabled"
        location="before"
        css-class="menu-button"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <dx-button
          icon="menu"
          styling-mode="text"
          @click="toggleMenuFunc"
          slot-scope="_"
        />
        <!-- eslint-enable -->
      </dx-item>

      <dx-item
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <span><img class="ml-6" src="../../../static/datacom-bluebox-orange-logo827X178.png" alt="Databoxx" width="186" height="40"></span>
        <!-- eslint-enable -->
      </dx-item>    

      <dx-item
        location="after"
        locate-in-menu="auto"
        menu-item-template="menuUserItem"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <div slot-scope="_" v-if="Auth.isAuthenticated">
        <!-- eslint-enable -->
          <dx-button
            class="user-button authorization"
            :width="210"
            height="100%"
            styling-mode="text"
          >
            <user-panel :menu-items="userMenuItems" menu-mode="context" />
          </dx-button>
        </div>
        <div slot-scope="_" v-else>
        <!-- eslint-enable -->
        <router-link to="login-form" >
          <span class="mdi mdi-login mdi-35 text-white"></span>
        </router-link>
        
        </div>
      </dx-item>

      <!-- eslint-disable vue/no-unused-vars -->
      <user-panel
        :menu-items="userMenuItems"
        menu-mode="list"
        slot-scope="_"
        slot="menuUserItem"
      />
      <!-- eslint-enable -->
    </dx-toolbar>
  </header>
</template>

<script>
import { mapState } from "vuex"
import DxButton from "devextreme-vue/button";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

import UserPanel from "./user-panel-component";

export default {
	components: {
    DxItem,
    DxButton,
    DxToolbar,
    UserPanel
  },
  props: {
    menuToggleEnabled: Boolean,
    title: String,
    toggleMenuFunc: Function,
    logOutFunc: Function
  },
  data() {
    return {
      userMenuItems: [
        {
          text: "Profile",
          icon: "user"
        },
        {
          text: "Notifications",
          icon: "info",
          onClick: this.onLogoutClick
        },
        {
          text: "Help",
          icon: "help",
          onClick: this.onLogoutClick
        },
        {
          text: "Logout",
          icon: "runner",
          onClick: this.onLogoutClick
        },
        {
          text: "Login",
          icon: "mdi mdi-login",
          onClick: this.onLoginClick
        }
      ]
    };
  },
  methods: {
    testButton() {
      console.log('testButton')
    },
    onLogoutClick() {
      this.$store.dispatch("signOut")
      this.$router.push({
        path: "/login-form",
        query: { redirect: this.$route.path }
      });
    },
    onLoginClick() {
      // console.log("this.Auth", this.Auth)
      // this.$store.dispatch("signIn")
      this.$router.push({
        path: "/login-form",
        query: { redirect: this.$route.path }
      });

    },

  },
  computed: {
    ...mapState(["Auth"]),
     
    },
};
</script>

<style lang="scss">
@import "../../../assets/themes/devexpress/generated/variables.base.scss";


.header-component {
  flex: 0 0 auto;
  z-index: 1;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	.header-toolbar {
		background: linear-gradient(90deg, #013136, rgb(3, 97, 105));

	}

  .dx-toolbar .dx-toolbar-item.menu-button > .dx-toolbar-item-content .dx-icon {
    color: $base-accent;
  }
}

.dx-toolbar.header-toolbar .dx-toolbar-items-container .dx-toolbar-after {
	padding: 0 40px;
	

  .screen-x-small & {
    padding: 0 20px;
  }
}

.dx-toolbar .dx-toolbar-item.dx-toolbar-button.menu-button {
  width: $side-panel-min-width;
  text-align: center;
  padding: 0;
}

.header-title .dx-item-content {
  padding: 0;
	margin: 0;
	color: $base-accent;
}

.dx-theme-generic {
  .dx-toolbar {
    padding: 10px 0;
  }

  .user-button > .dx-button-content {
		padding: 3px;
  }
}
.user-info {
	.user-name {
		color: rgb(233, 233, 233);
	}
}
</style>
