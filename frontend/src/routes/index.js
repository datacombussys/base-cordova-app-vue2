import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/";

// import Home from '@/pages/home'
// import Template from '@/pages/template'
// import Table from '@/pages/table'
// import drawerComponent from '@/components/elements/layout/drawer-component'
// import userComponent from "@/pages/user-component.vue"

// import About from '@/pages/about'

// import HomeViewRoutes from '@/views/drawer/home-views-navigation.vue'


import Home from "@/views/home-view";
import Error from "@/views/error-view";
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
import Customer from "@/pages/customers/customer"
import SalesOffice from "@/pages/sales-offices/sales-office"
import Warehouse from "@/pages/warehouses/warehouse"
import HelpDesk from "@/pages/help-desk/help-desk"

import Registers from "@/pages/pos/new-pos/registers"
import Categories from "@/pages/pos/new-pos/categories-drawer"
import Inventory from "@/pages/inventory/new/inventory"
import POSLoginView from "@/views/pos-login-view"
import VirtualTerminal from "@/pages/vt_hpp/new/virtual-terminal"
import RetailPOS from "@/pages/pos/new-pos/new-pos"

import Colors from '@/pages/colors'
import Icons from '@/pages/icons'
// import Fonts from '@/pages/fonts'

Vue.use(Router)



export var router = new Router({
  // mode:'history',
  routes: [
    {
			path: '/secured',
			name: 'secured',
			meta: { requiresAuth: false },
			beforeEnter: (to, from, next) => {
				console.log('secured from', from)
				console.log('secured to', to)
				console.log('secured this', this)
				console.log('secured router', router)
				if(Object.keys(from.query).length != 0) {
					next({
						path: from.query.redirect,
					})
				} else {
					next({
						name: 'home',
					})
				}
				
      }
    },
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: false },
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
      path: "/employee",
      name: "employee",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Employee
			},
    },
		{
      path: "/customer",
      name: "customer",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Customer
			},
    },
		{
      path: "/help-desk",
      name: "help-desk",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: HelpDesk
			},
		},
		{
      path: "/sales-office",
      name: "sales-office",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: SalesOffice
			},
		},
		{
      path: "/warehouse",
      name: "warehouse",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Warehouse
			},
    },
    //Login Pages
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
			},
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
		//POS Pages
		{
      path: "/registers",
      name: "registers",
      components: {
        layout: defaultLayout,
        content: Registers,
      }
    },
    {
      path: "/retail-pos:id",
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
			},
    },
    {
      path: "/inventory",
      name: "inventory",
      components: {
        layout: defaultLayout,
        content: Inventory
			},
		},
		//Test Pages
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
		//Redirect Pages
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
		//Error Page
		{
			path: "/error",
			name: "error",
      component: Error
		}
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
    // //Utility Pages
    // {
    //   path: '/fonts/',
    //   component: Fonts
    // },

    // {
    //   path: '/user/:name',
    //   components: {
    //     main: userComponent,
    //     drawer: Template
    //   },
    //   props: true
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



router.beforeEach((to, from, next) => {
	var is_loggedIn = null

	let localStorageUser = JSON.parse(localStorage.getItem("user"))
	if(localStorageUser != null) {
		is_loggedIn = true
	} else {
		console.log("store._modules.root.state.Auth.isAuthenticated", store._modules.root.state.Auth.isAuthenticated)
		is_loggedIn = store._modules.root.state.Auth.isAuthenticated
	}
	console.log('from', from)
	console.log('to', to)
	store._modules.root.state.Auth.preLoginPagePath = to.path;
	console.log('store._modules.root.state.Auth.preLoginPagePath', store._modules.root.state.Auth.preLoginPagePath)
	console.log('is_loggedIn', is_loggedIn)

  if(to.name === "login-form" && is_loggedIn) {
		next({ 
			name: "secured",
			query: { redirect: to.query.redirect } 
		});
  }
	
  if (to.matched.some(record => record.meta.requiresAuth)) {
		
		// Check to see if user is logged in
    if(!is_loggedIn) {
			// console.group("store._modules.root.state.Auth.isAuthenticated", store._modules.root.state.Auth.isAuthenticated)
			console.log("NOT LOGED IN YET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

			/* This fixes the issue with routes loading before Vuex updates properly - dispatch the prefetgch profile here. */
			// store.dispatch("preFetchLogin")

      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
			//Is logged in. Check to see if window.location.host is the same as logged in user company
			if(store._modules.root.state.Auth.webdomain === store._modules.root.state.Auth.userCompany.domain) {
				console.log("webdomain equals usercompany Domain")
				if(Object.keys(to.query).length != 0) {
					next({ 
						name: "secured",
						query: { redirect: to.query.redirect } 
					});
				} else {
					next();
				}
			} else {
				next({
					name: "error",
					query: { redirect: from.fullPath }
				});
			}
      
    }
  } else {
    next();
  }
})
