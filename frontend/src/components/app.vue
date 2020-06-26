<template>
	<f7-app :params="f7params">
		<!-- Left Panel Main -->
		<f7-panel left cover>
			<f7-view>
				<f7-page>
					<f7-navbar title="Dashboard"></f7-navbar>
					<div
						v-bar="{
							preventParentScroll: true,
							scrollThrottle: 30
						}"
						style="height:100%;"
					>
						<!-- el1 -->
						<div>
							<!-- el2 -->
							<f7-block-title class="small">Profile Management</f7-block-title>
							<f7-list>
								<f7-list-item
									v-if="Auth.authLevel === 1"
									view=".view-main"
									link="/datacom/"
									panel-close
									title="Super User"
								>
									<f7-icon size="40" icon="mdi mdi-account-tie" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item
									v-if="Auth.authLevel <= 2"
									view=".view-main"
									link="/partnerprofile/"
									panel-close
									title="Partners"
								>
									<f7-icon size="40" icon="mdi mdi-office-building" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item
									v-if="Auth.authLevel <= 3"
									view=".view-main"
									link="/companyprofile/"
									panel-close
									title="Merchants"
								>
									<f7-icon size="40" icon="mdi mdi-office-building" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item
									v-if="Auth.authLevel <= 4"
									view=".view-main"
									link="/vendorprofile/"
									panel-close
									title="Vendors"
								>
									<f7-icon size="40" icon="mdi mdi-office-building" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/employeeprofile/" panel-close title="Employees">
									<f7-icon size="40" icon="mdi mdi-account-group" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/customerprofile/" panel-close title="Customers">
									<f7-icon size="40" icon="mdi mdi-account-group" slot="media"></f7-icon>
								</f7-list-item>
								
								<!-- <f7-list-item view=".view-main" link="/leadprofile/" panel-close title="Leads">
                <f7-icon size="40" icon="mdi mdi-office-building" slot="media"></f7-icon>
              </f7-list-item> -->
							</f7-list>
							<f7-block-title class="small">Locations</f7-block-title>
							<f7-list>
								<f7-list-item view=".view-main" link="/salesoffice/" panel-close title="Sales Offices">
									<f7-icon size="40" f7="building_2_fill" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/warehouse/" panel-close title="Warehouses">
									<f7-icon size="40" icon="mdi mdi-warehouse" slot="media"></f7-icon>
								</f7-list-item>
							</f7-list>
							<f7-block-title class="small">Applications</f7-block-title>
							<f7-list>
								<f7-list-item view=".view-main" link="/work-schedule/" panel-close title="Attendance">
									<f7-icon size="40" icon="mdi mdi-timer" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/vt/" panel-close title="Virtual Terminal">
									<f7-icon size="40" icon="mdi mdi-cash-register" slot="media"></f7-icon>
								</f7-list-item>
							</f7-list>
							<f7-block-title class="small">Point of Sale</f7-block-title>
							<f7-list>
								<f7-list-item view=".view-main" link="/inventory/" panel-close title="Inventory">
									<f7-icon size="40" icon="mdi mdi-package-variant" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/retailpos/" panel-close title="Retail POS">
									<f7-icon size="40" icon="mdi mdi-cash-register" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/restaurantpos/" panel-close title="Restaurant POS">
									<f7-icon size="40" icon="mdi mdi-cash-register" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/kitchen-screen/" panel-close title="Kitchen Monitor">
									<f7-icon size="40" icon="mdi mdi-desktop-mac" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/floorplan/" panel-close title="Floorplan Maker">
									<f7-icon size="40" icon="mdi mdi-map" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/signature/" panel-close title="Signature Pad">
									<f7-icon size="40" icon="mdi mdi-lead-pencil" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/hpp/" panel-close title="Hosted Payment Page">
									<f7-icon size="40" icon="mdi mdi-web" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/contracts/" panel-close title="Recurring Contracts">
									<f7-icon size="40" icon="mdi mdi-refresh" slot="media"></f7-icon>
								</f7-list-item>
							</f7-list>
							<f7-block-title class="small">Utilities</f7-block-title>
							<f7-list>
								<f7-list-item view=".view-main" link="/drag-n-drop/" panel-close title="Drag-N-Drop">
									<f7-icon size="40" icon="mdi mdi-drag-variant" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/labelmaker/" panel-close title="Label Maker">
									<f7-icon size="40" icon="mdi mdi-label" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/merge-labels/" panel-close title="Label Merger">
									<f7-icon size="40" icon="mdi mdi-label" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/email/" panel-close title="Email">
									<f7-icon size="40" icon="mdi mdi-email" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/lobby/" panel-close title="Chat Lobby">
									<f7-icon size="40" icon="mdi mdi-chat" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/textmessage/" panel-close title="Text Messaging">
									<f7-icon size="40" icon="mdi mdi-comment-text" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/usercalendar/" panel-close title="Calendar">
									<f7-icon size="40" icon="mdi mdi-calendar" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" panel-close title="PDF Maker">
									<f7-icon size="40" icon="mdi mdi-file-pdf" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/setup/" panel-close title="Setup">
									<f7-icon size="40" icon="mdi mdi-cogs" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="/kanban/" panel-close title="Kanban">
									<f7-icon size="40" icon="mdi mdi-rotate-90 mdi-swap-vertical-circle" slot="media"></f7-icon>
								</f7-list-item>
							</f7-list>

							<f7-block-title class="small">Administration</f7-block-title>
							<f7-list>
								<f7-list-item view=".view-main" link="/admin/" panel-close title="Admin">
									<f7-icon size="40" icon="mdi mdi-lock" slot="media"></f7-icon>
								</f7-list-item>
								<f7-list-item view=".view-main" link="#" panel-close title="Help Desk">
									<f7-icon size="40" icon="mdi mdi-help-rhombus" slot="media"></f7-icon>
								</f7-list-item>
							</f7-list>
						</div>
						<!-- dragger will be automatically added here -->
					</div>
				</f7-page>
			</f7-view>
		</f7-panel>

		<!-- Left Panel Datacom -->
		<div class="panel panel-left datacom-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Datacom Links"></f7-navbar>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Registration"></f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Login"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- POS Categories is Located on the Retail POS Page -->

		<!-- Left Panel Partner -->
		<div class="panel panel-left partner-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Partner Links"></f7-navbar>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Registration"></f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Login"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Vendor -->
		<div class="panel panel-left vendor-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Vendor Links"></f7-navbar>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Registration"></f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Login"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Merchant -->
		<div class="panel panel-left merchant-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Merchant Links"></f7-navbar>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Registration"></f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Login"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel SalesOffice -->
		<div class="panel panel-left salesoffice-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Datacom Links"></f7-navbar>
					<f7-block-title class="small">Sales Workflow</f7-block-title>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Quotes">
							<f7-icon size="40" f7="doc_richtext" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Invoices">
							<f7-icon size="40" f7="doc_richtext" slot="media"></f7-icon>
						</f7-list-item>
					</f7-list>
					<f7-block-title class="small">Leads / Customers</f7-block-title>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Leads">
							<f7-icon size="40" icon="mdi mdi-account-box-multiple" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Customers">
							<f7-icon size="40" icon="mdi mdi-account-box-multiple" slot="media"></f7-icon>
						</f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Warehouse -->
		<div class="panel panel-left warehouse-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Datacom Links"></f7-navbar>
					<f7-block-title class="small">Shipping</f7-block-title>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Sales Orders">
							<f7-icon size="40" f7="doc_richtext" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Labels">
							<f7-icon size="40" icon="mdi mdi-label-outline" slot="media"></f7-icon>
						</f7-list-item>
					</f7-list>
					<f7-block-title class="small">Receiving</f7-block-title>
					<f7-list>
						<f7-list-item view=".view-main" link="#" panel-close title="Vendors">
							<f7-icon size="40" icon="mdi mdi-account-arrow-left" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Purchase Orders">
							<f7-icon size="40" f7="doc_plaintext" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Receiving">
							<f7-icon size="40" icon="mdi mdi-truck" slot="media"></f7-icon>
						</f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Virtual Terminal -->
		<div class="panel panel-left virtual-terminal panel-cover panel-init">
			<div class="page">
				<f7-navbar title="Virtual Terminal"></f7-navbar>
				<f7-block-title>Transactions</f7-block-title>
				<f7-list>
					<f7-list-item view=".view-main" link="/vt/" panel-close title="New Transaction">
						<f7-icon size="40" icon="mdi mdi-cash-register" slot="media"></f7-icon>
					</f7-list-item>
				</f7-list>
				<f7-block-title>Customers</f7-block-title>
				<f7-list>
					<f7-list-item view=".view-main" link="/userprofile/" panel-close title="Add Customer">
						<f7-icon size="40" icon="mdi mdi-account-plus" slot="media"></f7-icon>
					</f7-list-item>
					<f7-list-item view=".view-main" link="#" panel-close title="Find Customer">
						<f7-icon size="40" icon="mdi mdi-account-group" slot="media"></f7-icon>
					</f7-list-item>
				</f7-list>
				<f7-block-title>Contracts</f7-block-title>
				<f7-list>
					<f7-list-item view=".view-main" link="/contracts/" panel-close title="Add Contract">
						<f7-icon size="40" icon="mdi mdi-script-text-outline" slot="media"></f7-icon>
					</f7-list-item>
				</f7-list>
				<f7-block-title>Products / Services</f7-block-title>
				<f7-list>
					<f7-list-item view=".view-main" link="/inventory/" panel-close title="Add Product / Service">
						<f7-icon size="40" icon="mdi mdi-package-variant" slot="media"></f7-icon>
					</f7-list-item>
					<f7-list-item view=".view-main" link="/inventory/" panel-close title="Find Product / Service">
						<f7-icon size="40" icon="mdi mdi-magnify" slot="media"></f7-icon>
					</f7-list-item>
				</f7-list>
				<f7-block-title>Reporting</f7-block-title>
				<f7-list>
					<f7-list-item view=".view-main" link="/batches/" panel-close title="Batch Reports">
						<f7-icon size="40" icon="mdi mdi-file-document-box-multiple-outline" slot="media"></f7-icon>
					</f7-list-item>
					<f7-list-item view=".view-main" link="/transactions/" panel-close title="Transactions">
						<f7-icon size="40" icon="mdi mdi-file-document-box-search" slot="media"></f7-icon>
					</f7-list-item>
				</f7-list>
				<f7-block-title>Administration</f7-block-title>
				<f7-list>
					<f7-list-item view=".view-main" link="#" panel-close title="Admin">
						<f7-icon size="40" icon="mdi mdi-lock" slot="media"></f7-icon>
					</f7-list-item>
				</f7-list>
			</div>
		</div>

		<!-- Left Panel Customer Panel -->
		<div class="panel panel-left customer-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Customer Links"></f7-navbar>
					<f7-list>
						<f7-list-item view=".view-main" link="/registration/" panel-close title="Registration"></f7-list-item>
						<f7-list-item view=".view-main" link="#" panel-close title="Login"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Databoxx-Cards -->
		<div class="panel panel-left databoxx-cards panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Databoxx Cards"></f7-navbar>
					<f7-list>
						<f7-list-item view=".view-main" link="/databoxx-cards/" panel-close title="Databoxx Cards"></f7-list-item>
						<f7-list-item view=".view-main" link="/gift-cards/" panel-close title="Gift Cards"></f7-list-item>
						<f7-list-item view=".view-main" panel-close title="Loyalty Cards"></f7-list-item>
						<f7-list-item view=".view-main" panel-close title="Coupon Cards"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Time and Attendance -->
		<div class="panel panel-left time-attendance panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Time Attendance"></f7-navbar>
					<f7-list>
						<f7-list-item
							panel-close
							view=".view-main"
							link="/time-card/"
							title="Consolidated Time Cards"
						></f7-list-item>
						<f7-list-item
							panel-close
							view=".view-main"
							link="/clock-screen/"
							title="Clock-In / Clock-Out"
						></f7-list-item>
						<f7-list-item
							panel-close
							view=".view-main"
							link="/attendance-reports/"
							title="Reports / Export Data"
						></f7-list-item>
						<f7-list-item panel-close view=".view-main" link="/work-schedule/" title="Schedule"></f7-list-item>
						<f7-list-item
							panel-close
							view=".view-main"
							link="/leave-request/"
							title="Leave Request Form"
						></f7-list-item>
						<f7-list-item panel-close view=".view-main" link="/attendance-settings/" title="Settings"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Permissions -->
		<div class="panel panel-left permissions-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Time Attendance"></f7-navbar>
					<f7-list>
						<f7-list-item link="/groups-permissions/" panel-close view=".view-main" title="Groups"></f7-list-item>
						<f7-list-item link="/users-groups/" panel-close view=".view-main" title="Permissions"></f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Left Panel Employee -->
		<div class="panel panel-left employee-panel panel-cover panel-init">
			<f7-view>
				<f7-page>
					<f7-navbar title="Employee Quick Links"></f7-navbar>
					<f7-list>
						<f7-list-item view=".view-main" link="/email/" panel-close title="Email">
							<f7-icon size="40" icon="mdi mdi-email" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="/lobby/" panel-close title="Chat Lobby">
							<f7-icon size="40" icon="mdi mdi-chat" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="/textmessage/" panel-close title="Text Messaging">
							<f7-icon size="40" icon="mdi mdi-comment-text" slot="media"></f7-icon>
						</f7-list-item>
						<f7-list-item view=".view-main" link="/usercalendar/" panel-close title="Calendar">
							<f7-icon size="40" icon="mdi mdi-calendar" slot="media"></f7-icon>
						</f7-list-item>
					</f7-list>
				</f7-page>
			</f7-view>
		</div>

		<!-- Right panel with reveal effect-->
		<f7-panel right reveal theme-dark>
			<f7-view>
				<f7-page>
					<f7-navbar title="Right Panel"></f7-navbar>
					<f7-block>Right panel content goes here</f7-block>
				</f7-page>
			</f7-view>
		</f7-panel>

		<!-- Your main view, should have "view-main" class -->
		<f7-view main class="safe-areas" url="/"></f7-view>

		<!-- Main Login Screen -->
		<f7-login-screen id="my-login-screen">
			<f7-view>
				<f7-page login-screen>
					<f7-login-screen-title>Login</f7-login-screen-title>
					<f7-list form>
						<f7-list-input
							type="text"
							name="username"
							placeholder="Your username"
							:value="username"
							@input="username = $event.target.value"
						></f7-list-input>
						<f7-list-input
							type="password"
							name="password"
							placeholder="Your password"
							:value="password"
							@input="password = $event.target.value"
						></f7-list-input>
					</f7-list>
					<f7-list>
						<f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
						<f7-block-footer>
							Some text about login information.<br />Click "Sign In" to close Login Screen
						</f7-block-footer>
					</f7-list>
				</f7-page>
			</f7-view>
		</f7-login-screen>
	</f7-app>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import cordovaApp from "../js/cordova-app.js";
import routes from "../js/routes.js";

export default {
	data() {
		return {
			// Framework7 Parameters
			f7params: {
				id: "com.datacom.datapos", // App bundle ID
				name: "Datapos", // App name
				theme: "auto", // Automatic theme detection

				// App routes
				routes: routes,
				// view: {
				//   pushState: true,
				//   history: true,
				//   pushStateRoot: "",
				// },

				// Input settings
				input: {
					scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
					scrollIntoViewCentered: this.$device.cordova && !this.$device.electron
				},
				// Cordova Statusbar settings
				statusbar: {
					iosOverlaysWebView: true,
					androidOverlaysWebView: false
				}
			},

			// Login screen data
			username: "",
			password: ""
		};
	},
	computed: {
		...mapState(["Inventory", "Auth"])
	},
	methods: {
		testButton() {

		},
		alertLoginData() {
			this.$f7.dialog.alert("Username: " + this.username + "<br>Password: " + this.password);
		}
	},
	async created() {
		await this.$store.dispatch("setDomain");
	},
	async mounted() {
		this.$f7ready((f7) => {
			// Init cordova APIs (see cordova-app.js)
			if (f7.device.cordova) {
				cordovaApp.init(f7);
			}
			// Call F7 APIs here
			console.log("App.vue mounted");
			this.$store.dispatch("preFetchProfile");
			this.$store.dispatch("initTimeZone");
			this.$store.dispatch("initTime");
			this.$store.dispatch("initDate");
		});
	}
};
</script>

<style lang="less" scoped></style>
