<template>
  <v-app>
    <!-- <home-system-bar /> -->

    <home-app-bar :drawer="drawer"
			@openDrawer="openCloseDrawer" />

    <home-view />

    <home-footer />

    <!-- <home-settings /> -->
  </v-app>
</template>

<script>

//Vue Event Bus
import { bus } from "@/services/bus"


  export default {
    name: 'HomeLayout',

    components: {
      HomeAppBar: () => import('@/layouts/website/AppBar'),
      HomeSystemBar: () => import('@/layouts/website/SystemBar'),
			HomeView: () => import('@/layouts/website/View'),
			HomeSettings: () => import('@/layouts/website/Settings'),
			HomeFooter: () => import('@/layouts/website/Footer'),
		},
		
		data() {
			return {
				// Drawer
				drawer: false,
			}
		},
		methods: {
			openCloseDrawer(evt) {
				console.log('openCloseDrawer evt', evt)
				this.drawer = evt
			}
		},
		mounted() {
			console.log('process.env', process.env)
		},
		created() {
			bus.$on('closeDrawer', (data) => {
				this.drawer = data;
			})
		}
  }
</script>
