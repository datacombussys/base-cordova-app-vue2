<template>
	<div>
		<p>The Home page. Dude</p>
	</div>
</template>

<script>
// import Vue from "vue"

// import { DashboardLayoutPlugin } from "@syncfusion/ej2-vue-layouts";
// Vue.use(DashboardLayoutPlugin);

//Charts
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import BarChart from "../mixins/chartJS/bar-chart";
// import PieChart from "../mixins/chartJS/pie-chart1";
// import LineChart from "../mixins/chartJS/line-chart";
// import MultiLineChart from "../mixins/chartJS/multi-line-chart";
// import MultiLineChart2 from "../mixins/chartJS/multi-line2";
// import HistogramChart from "../mixins/chartJS/histogram-chart";

export default {
	components: {
		// "nav-bar-component": navBarComponent,
		// "bar-chart": BarChart,
		// "pie-chart": PieChart,
		// "line-chart": LineChart,
		// "multi-line-chart": MultiLineChart,
		// "multi-line2": MultiLineChart2,
		// "histogram-chart": HistogramChart,
		// "notification-messages-component": () => ({
		// component: notificationMessagesComponent,
		// 		loading: LoadingState,
		// 		error: ErrorState,
		// 		delay:10000,
		// 		timeout: 7000
		// 	})

	},
	data() {
		return {
			//Component Data
			pageSettings: {
				leftNavDrawer: "left",
				pageTitle: "Dashboard"
			},
			moduleInfo: {
				name: "home",
				type: "dashboard",
				level: 0
			},
			//Syncfusion Grid
			spacing: [10,10],
			cellAspectRatio: 100/50,
			draggableHandle:'.e-panel-header',
 


			//VueGrid
			showChart: true,
			loading: true,
			gridLayout: [
				{"x":0,"y":0,"w":2,"h":1,"i":"0"},
				{"x":2,"y":0,"w":2,"h":1,"i":"1"},
				{"x":4,"y":0,"w":2,"h":1,"i":"2"},
				{"x":0,"y":1,"w":2,"h":1,"i":"3"},
				{"x":2,"y":1,"w":2,"h":1,"i":"4"},
				{"x":4,"y":1,"w":2,"h":1,"i":"5"},
			]
		};
	},
	methods: {
		testMethods() {
			// console.log("this.Auth.userProfile", this.Auth.userProfile);
			// console.log("this.Users.employeeProfile", this.Users.employeeProfile);
			// console.log("this.Auth.platformInfo", this.Auth.platformInfo);
			// console.log("this.GET_OWN_DATACOM_PROFILE", this.GET_OWN_DATACOM_PROFILE);
			console.log("this.Vendors.vendorList", this.Vendors.vendorList);
			
		},

		logout() {

		},


	},
	computed: {
		// ...mapState(["Users", "Inventory", "Auth", "Errors", "Attendance", "Datacom", "Common", "Vendors"]),
		// ...mapGetters(['GET_OWN_DATACOM_PROFILE']),
		// pieStyle() {
		// 	return {
		// 		width: "175px"
		// 		// position: 'absolute'
		// 	};
		// },
		// histogramStyle() {
		// 	return {
		// 		width: "200px"
		// 		// position: 'absolute'
		// 	};
		// }
	},
	async mounted() {	
		// this.$store.dispatch('getSharedCountries');
		// this.$store.dispatch('getSharedStates', 6252001);

		
	}
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-layouts/styles/material.css";


.swiper1-container {
	max-width: 600px;
	.swiper1-bar-chart {
		height: 150px;
	}
}
.swiper2-container {
	max-width: 500px;
	.swiper2-pie-chart {
		max-height: 160px;
	}
}

.line-container {
	max-width: 500px;
	.line-chart {
		max-height: 160px;
	}
}
.histogram-container {
	max-width: 600px;
	.histogram-chart {
		height: 165px;
	}
}
.multi-line-container {
	max-width: 600px;
	.multi-line-chart {
		height: 300px;
	}
}
.multi-line2-container {
	max-width: 600px;
	.multi-line2 {
		height: 200px;
	}
}
// .grid-item-style {
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	text-align: center;
// 	border: 2px solid black;
// }
</style>
