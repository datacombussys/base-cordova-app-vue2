<template>
	<div>
		<v-navigation-drawer
			:value="drawer"
			:mini-variant.sync="isHome"
			app
			expand-on-hover
			dark
			:permanent="drawer"
			mobile-breakpoint="500"
		>
		<router-view :onDrawer="mini" name="left"></router-view>

		</v-navigation-drawer>

	</div>
</template>

<script>
  export default {
    name: 'Drawer',

    props: {
			drawer: {
				type: Boolean,
				required: true,
				default: false
			},
      items: {
        type: Array,
        default: () => ([]),
      },
		},
		data() {
			return {
				// Drawer
				isHome: true,
				mini: true,
			}
		},
		computed: {
			
		},
		watch: {
		
		},
		mounted() {
			if(this.$route.name === 'Home') {
					this.isHome = false
				} 
		}
				

  }
</script>
