import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Template from '@/pages/template'
import Table from '@/pages/table'
import drawerComponent from '@/components/elements/layout/drawer-component'
import userComponent from "@/pages/user-component.vue"

import About from '@/pages/about'

import HomeViewRoutes from '@/views/drawer/home-views-navigation.vue'

import Colors from '@/pages/colors'
import Fonts from '@/pages/fonts'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: 'drawer',
      component: drawerComponent
    },
    {
      path: '/',
      components: {
        main: Home,
        drawer: HomeViewRoutes
      },
      props: { 
        main: false, 
        drawer: true }
    },
    {
      path: '/table/',
      component: Table
    },
    //Utility Pages
    {
      path: '/colors/',
      component: Colors
    },
    {
      path: '/fonts/',
      component: Fonts
    },
    //Test Pages
    {
      path: '/about/',
      component: About
    },
    {
      path: '/user/:name',
      components: {
        main: userComponent,
        drawer: Template
      },
      props: true
    },
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
})
