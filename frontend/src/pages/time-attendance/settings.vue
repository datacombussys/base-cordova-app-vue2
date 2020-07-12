<template>
	<f7-page name="attendance-settings">
		<nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
		<f7-row>
			<!-- Main Column -->
			<f7-col width="100" medium="100" class="display-flex flex-direction-column">
				<!-- Page content-->
				<!-- Vue Scrollbar (dragger) -->
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 100vh;"
				>
					<!-- el1 -->
					<div>
						<!-- el2 -->

						<b-tabs size="is-large" class="block">

							<b-tab-item label="Holidays" icon="numeric-1-circle-outline">
								<holiday-component></holiday-component>
							</b-tab-item>

							<b-tab-item label="Hours" icon="numeric-2-circle-outline">
								<hours-of-operation-component
									@receiveOpenTimes="changeOpenData"
									@receiveCloseTimes="changeCloseData"
									:hours="hours"
								></hours-of-operation-component>
							</b-tab-item>

							<b-tab-item label="Settings" icon="numeric-3-circle-outline">
								<attendance-settings-component :settingsProfile:="settingsProfile" :hours="hours"></attendance-settings-component>
							</b-tab-item>

							<b-tab-item label="Shifts" icon="numeric-4-circle-outline">
								<shift-component></shift-component>
							</b-tab-item>

							
						</b-tabs>
						<!-- <f7-row class="margin padding">
							<f7-block class="margin padding">
								<f7-button @click="testButton">Test</f7-button>
							</f7-block>
						</f7-row> -->
					</div>
				</div>
				<!-- END Scrollbar -->

				<!-- END Page content-->
			</f7-col>
		</f7-row>
	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Layout Components
import HoursOfOperationComponent from "./components/hours-of-operation-component.vue";
import navBarComponent from "@/components/universal/navbar-component.vue";
import attendanceSettingsComponent from "./components/attendance-settings-component.vue";
import holidayComponent from "./components/holiday-component.vue";
import shiftComponent from "./components/shift-component.vue";

export default {
	name: "attendanceSettings",
	mixins: [],
	components: {
		"nav-bar-component": navBarComponent,
		"hours-of-operation-component": HoursOfOperationComponent,
		"attendance-settings-component": attendanceSettingsComponent,
		"holiday-component": holidayComponent,
		"shift-component": shiftComponent
	},
	data() {
		return {
			//Component Data
			pageSettings: {
				leftNavDrawer: ".time-attendance",
				pageTitle: "Attendance"
			},
			moduleInfo: {
				name: "Time and Attendance",
				type: "settings"
			},
			hours: {},
			settingsProfile: {},
			//Buefy Tabs
			activeStepDiscount: 0,
			stepItems: [],
			isAnimated: true,
			hasNavigation: false,
			customNavigation: true,
			prevIcon: "chevron-left",
			nextIcon: "chevron-right",
			isStepsClickable: true,
			isProfileSuccess: false,
			
			timeCardForm: {
				employee: null,
				punchType: null,
				date: null,
				is_late: false,
				is_onLeave: false,
				clock_in_time: null,
				clock_out_time: null,
				remark: null
			},

			holidayForm: {
				name: null,
				type: null,
				date: null,
				duration_days: null
			},
			timeOpenListFromChild: [],
			timeCloseListFromChild: []
		};
	},
	methods: {
		testButton() {
			// console.log("this.$refs", this.$refs);
			// var element = document.getElementById("tui-time");
			// console.log("element", element);
			// var element2 = this.$refs;
			// console.log("element2", element2);
			console.log("this.settingsProfile", this.settingsProfile);
			// instance.getHour();
		},
		//Not Used But shows how to pass data back from component to parent
		changeOpenData(payload) {
			this.timeOpenListFromChild = payload;
		},
		//Not Used But shows how to pass data back from component to parent
		changeCloseData(payload) {
			this.timeCloseListFromChild = payload;
		}
	},
	computed: {
		...mapState(["Users", "Inventory", "Auth", "Attendance"])
	},
	watch: {},
	async mounted() {
		
	}
};
</script>

<style lang="scss" scoped></style>
