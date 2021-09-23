<template>
  <div class="z-20">
    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="3"
      height="80"
    >

      <base-img
        :src="require('@/assets/static/logos/Datacom-Logo-225x56.png')"
        class="mr-3 hidden-xs-only"
        contain
        max-width="250"
        width="100%"
      />


      <v-spacer />

      <div>
        <v-tabs
          class="hidden-sm-and-down"
          optional
        >
          <v-tab
            v-for="(name, i) in items"
            :key="i"
            :to="{ name: name }"
            :exact="name === 'Home'"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            {{ name }}
          </v-tab>
        </v-tabs>
      </div>

			
			 <div v-if="!Auth.isAuthenticated">
				<v-btn :to="{name: 'Login'}" icon color="info">
					<v-icon class="ml-3">mdi-login</v-icon>
				</v-btn>
			</div>

			 <v-menu 
			 	bottom
				v-else
				v-model="showMenu"
				absolute
				style="max-width: 600px"
			>
				<template v-slot:activator="{ on, attrs }">
					<div v-if="Auth.fullUserProfile">
						<div v-if="Auth.fullUserProfile.profile_img">
							<div v-if="Object.keys(Auth.fullUserProfile).length != 0">
								<v-card
									elevation="4"
									rounded="circle"
									:img="Auth.fullUserProfile.profile_img"
									height="50"
									width="50"
									v-bind="attrs"
									v-on="on"
								></v-card>
							</div>
						</div>
						<div v-else>
							<v-card
								elevation="4"
								rounded="circle"
								:img="require('@/assets/static/Male-Profile170X150.png')"
								height="50"
								width="50"
								v-bind="attrs"
								v-on="on"
							></v-card>
						</div>
						
					</div>
					
					<div v-else>
						<v-card
							elevation="4"
							rounded="circle"
							:img="require('@/assets/static/Male-Profile170X150.png')"
							height="50"
							width="50"
							v-bind="attrs"
							v-on="on"
						></v-card>
					</div>
				</template>

				<v-list>
					<v-list-item
						v-for="(item, index) in menuItems"
						:key="index"
						@click="userMenuClick"
					>
						<v-list-item-title >{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="openDrawer"
      />
    </v-app-bar>

    <GlobalDrawer
      :drawer="drawer"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'AppBar',

    components: {
      GlobalDrawer: () => import('./Drawer'),
		},
		props: {
			drawer: {
				type: Boolean,
				required: true,
			}
		},
    data: () => ({
			//Links
      items: [
        'Home',
			],
			
			//Menu items
			showMenu: false,
			menuItems: [
				{ title: 'Profile', path: '/profile' },
				{ title: 'Logout' }
			]
		
		}),
		methods: {
			userMenuClick (evt) {
				console.log('userMenuClick', evt)
				if (evt.target.textContent === 'Logout') {
					this.$store.dispatch('logout')
					this.showMenu = false
				} else if(evt.target.textContent === 'Profile') {
					this.$router.push('/profile')
					this.showMenu = false
				} else {
					this.testButton()
				}
			},
			openDrawer() {
				this.$emit("openDrawer", !this.drawer)
			}
		},
		computed: {
			...mapState(['Auth', 'Notifications']),
			...mapGetters([]),
		}
  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none

    .portrait
      border-radius: 30px

</style>
