<template>
  <v-app>
		<!-- Drawer Content on app-bar -->

    <v-main>
			<v-fade-transition mode="out-in">
				<router-view />
			</v-fade-transition>


			<v-fade-transition mode="out-in">
				<router-view name="main" />
			</v-fade-transition>

			<!--Spinner and Preloaders -->
			<v-overlay :value="Notifications.isLoadPanelVisible">
				<div class="row">
					<v-card
						color="blue-grey darken-4"
						class="mx-auto"
						max-width="250"
					>
						<div style="height: 150px;">
							<v-row
								class="fill-height"
								align-content="center"
								justify="center"
							>
								<v-col cols="6">
									<v-progress-linear
										color="deep-orange darken-1"
										indeterminate
										rounded
										height="6"
									></v-progress-linear>
								</v-col>
								<v-col
									class="subtitle-1 text-center"
									cols="12"
								>
									Please wait while we load your data...
								</v-col>
							</v-row>
						</div>
					</v-card>
				</div>
			</v-overlay>

			<!-- Loading Dialog -->
			<v-dialog
				v-model="Notifications.spinner"
				width="25%"
			>
				<v-card>
					<v-card-title class="headline-3 grey lighten-2">
						Processing
					</v-card-title>

					<v-card-text class="text-center">
						<p class="my-3">
							Please wait...
						</p>
						<v-progress-circular
							indeterminate
							color="primary"
						></v-progress-circular>
					</v-card-text>
				
				</v-card>
			</v-dialog>

			<!-- Notifications Dialog -->
			<v-dialog
				v-model="Notifications.showAlert"
				persistent
				max-width="290"
			>
				<v-card>
					<v-card-title class="headline">
						{{ Notifications.alert.title }}
					</v-card-title>
					<v-card-text>
						{{ Notifications.alert.body }}
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="green darken-1"
							text
							@click="Notifications.showAlert = false"
						>
							Ok
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<!-- Alerts/Snackbar -->
			<stacked-snacks
				bottom 
				left
				:objects.sync="Notifications.snackBarStack">
			</stacked-snacks>

    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DBSApp',
	metaInfo: {
		title: 'Datacom Business Systems',
		titleTemplate: '%s | DBS',
		htmlAttrs: { lang: 'en' },
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
	},
  components: {
		HomeAppBar: () => import('@/layouts/website/AppBar'),
  },

  data: () => ({
		// Main Data
		

  }),
  methods: {
		testButton () {

		},
		


  },
  computed: {
    ...mapState(['Auth', 'Notifications']),
		...mapGetters([]),

  },
  watch: {
 

  },
  beforeCreate () {

	},
	created() {

	},
	async mounted() {
		let onDeviceReady = () => {
			document.addEventListener("pause", onPause, false);
			document.addEventListener("resume", onResume, false);
			document.addEventListener("menubutton", onMenuKeyDown, false);
			screen.orientation.lock('landscape')
			// Add similar listeners for other events

			subscribe(this.screenSizeChanged);
			console.log("App.vue mounted");
			console.log("device", device);
			//Need to get device info
			this.$store.dispatch("preFetchProfile");
			this.$store.dispatch("initTimeZone");
			this.$store.dispatch("initTime");
			this.$store.dispatch("initDate");
			this.$store.dispatch("setDevice")
		
		}
		let onPause = () => {
			// Handle the pause event
		}

		let onResume = () => {
			// Handle the resume event
		}

		let onMenuKeyDown = () => {
			// Handle the menubutton event
		}
		document.addEventListener("deviceready", onDeviceReady, false);
		// device APIs are available

		// Add similar event handlers for other events
		
	},
}
</script>

<style lang="sass">
	
</style>



