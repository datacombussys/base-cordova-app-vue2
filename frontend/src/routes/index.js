import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/pages/home'
// import Template from '@/pages/template'
// import Table from '@/pages/table'
// import drawerComponent from '@/components/elements/layout/drawer-component'
// import userComponent from "@/pages/user-component.vue"

// import About from '@/pages/about'

// import HomeViewRoutes from '@/views/drawer/home-views-navigation.vue'


import Home from "@/views/home-view";
import TestPage from "@/views/test-page";
import Profile from "@/views/profile-view";
import DisplayData from "@/views/display-data-view";
import defaultLayout from "@/components/elements/layout/side-nav-outer-toolbar-component";
import simpleLayout from "@/views/single-card-view";
import accessCard from "@/views/access-card-view";

//Datacom Converted Pages
import LoginView from "@/views/login-form-view"
import PasswordReset from "@/views/password-reset-view"

import Datacom from "@/pages/datacom/datacom"
import Partner from "@/pages/partners/partner"
import Merchant from "@/pages/merchants/merchant"
import Employee from "@/pages/employees/employee"
import HelpDesk from "@/pages/help-desk/help-desk"

import RetailPOS from "@/pages/pos/new-pos/new-pos"
import Categories from "@/pages/pos/new-pos/categories-drawer"
import Inventory from "@/pages/inventory/new/inventory"
import POSLoginView from "@/views/pos-login-view"
import VirtualTerminal from "@/pages/vt_hpp/new/virtual-terminal"

import Colors from '@/pages/colors'
import Icons from '@/pages/icons'
// import Fonts from '@/pages/fonts'

Vue.use(Router)

//Auth Only Routes
// function checkAuth(to, from, resolve, reject) {
//   if (store._modules.root.state.Auth.isAuthenticated) {
//     resolve(to);
//   } else {
//     reject();
//     var router = this;
//     console.log('router', router);
//     console.log('to', to);
//     console.log('from', from);
//     store._modules.root.state.Auth.preLoginPagePath = to.path;
//     router.navigate('/login/');

//   }
// }

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/secured',
      async(to, from, resolve, reject) {
        var router = this;
        if (store._modules.root.state.Auth.isAuthenticated) {
          router.navigate(store._modules.root.state.Auth.preLoginPagePath);
          console.log('store._modules.root.state.Auth.preLoginPagePath', store._modules.root.state.Auth.preLoginPagePath);
          resolve({redirect: store._modules.root.state.Auth.preLoginPagePath});
          
        } else {
          reject({
            components: {
              layout: simpleLayout,
              content: LoginView
            }
          });
        }
      },
    },
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Home
      }
    },
    {
      path: "/test-page",
      name: "test-page",
      meta: { requiresAuth: false },
      components: {
        layout: defaultLayout,
        content: TestPage
      }
    },
    {
      path: "/profile",
      name: "profile",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Profile
      }
    },
    {
      path: "/datacom",
      name: "datacom",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Datacom
      }
    },
    {
      path: "/partner",
      name: "partner",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Partner
      }
    },
    {
      path: "/merchant",
      name: "merchant",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Merchant
      }
    },
    {
      path: "/help-desk",
      name: "help-desk",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: HelpDesk
      }
    },
    {
      path: "/employee",
      name: "employee",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Employee
      }
    },


    {
      path: "/display-data",
      name: "display-data",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: DisplayData
      }
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: LoginView
      }
    },
    {
      path: "/pos-login",
      name: "pos-login",
      meta: { requiresAuth: false },
      components: {
        layout: accessCard,
        content: POSLoginView
      }
    },
    {
      path: "/password-reset",
      name: "password-reset",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: PasswordReset
      }
    },
    {
      path: '/colors/',
      name: "colors",
      meta: { requiresAuth: false },
      components: {
        layout: defaultLayout,
        content: Colors
      }
    },
    {
      path: "/icons",
      name: "icons",
      meta: { requiresAuth: false },
      components: {
        layout: defaultLayout,
        content: Icons
      }
    },
    {
      path: "/retail-pos",
      name: "retail-pos",
      components: {
        categories: Categories,
        pos: RetailPOS,
      }
    },
    {
      path: "/virtual-terminal",
      name: "virtual-terminal",
      components: {
        categories: defaultLayout,
        pos: VirtualTerminal,
      }
    },
    {
      path: "/inventory",
      name: "inventory",
      components: {
        layout: defaultLayout,
        content: Inventory
      }
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "*",
      redirect: "/home"
    },
    
    // {
    //   path: 'drawer',
    //   component: drawerComponent
    // },
    // {
    //   path: '/',
    //   components: {
    //     main: Home,
    //     drawer: HomeViewRoutes
    //   },
    //   props: { 
    //     main: false, 
    //     drawer: true }
    // },
    // {
    //   path: '/table/',
    //   component: Table
    // },
    // //Utility Pages

    // {
    //   path: '/fonts/',
    //   component: Fonts
    // },
    // //Test Pages
    // {
    //   path: '/about/',
    //   component: About
    // },
    // {
    //   path: '/user/:name',
    //   components: {
    //     main: userComponent,
    //     drawer: Template
    //   },
    //   props: true
    // },
    // How to set up Navbar for Views
    // {
    //   path: '/parent/',
    //   component: {
    //     main: Parent,
    //     left: ParentMenu
    //   },
        
    // },
    // {
    //   path: '/user/main/:name',
    //   component: userComponent,
    //   props: true
    // },
    // {
    //   path: '/template',
    //   name: 'template',
    //   component: {
    //     main: Template
    //   }
    // },
  ]
});

// router.beforeEach((to, from, next) => {

//   if (to.name === "login-form" && auth.authenticated()) {
//     next({ name: "home" });
//   }

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!auth.authenticated()) {
//       next({
//         name: "login-form",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
