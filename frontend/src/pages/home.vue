<template>
	<f7-page name="home">
		<!-- Top Navbar -->
		<nav-bar-component :pageSettings="pageSettings" :moduleInfo="moduleInfo"></nav-bar-component>
		<!-- END Top Navbar -->
		<!-- Toolbar-->
		<f7-toolbar bottom>
			<f7-link>Privacy Policy</f7-link>
			<f7-link>Terms and Conditions</f7-link>
		</f7-toolbar>
		<!-- Top Scrollbar for Charts -->
		<f7-row safe-areas>
			<!--Create a function for the below params to modify the breakpoints-->
			<f7-swiper navigation :params="{ speed: 500, slidesPerView: 4, spaceBetween: 20 }">
				<f7-swiper-slide>
					<f7-card>
						<div class="swiper1-container">
							<bar-chart class="swiper1-bar-chart"></bar-chart>
						</div>
					</f7-card>
				</f7-swiper-slide>
				<f7-swiper-slide>
					<f7-card>
						<f7-row class="display-flex justify-content-center">
							<div class="swiper2-container">
								<pie-chart class="swiper2-pie-chart" :styles="pieStyle"></pie-chart>
							</div>
							<!-- <f7-col width="50">
                <p>Blue: Revenue</p>
                <p>Dark: Expenses</p>
                <p>Orange: Profit</p>
              </f7-col> -->
						</f7-row>
					</f7-card>
				</f7-swiper-slide>
				<f7-swiper-slide>
					<f7-card class="display-flex justify-content-center">
						<div class="histogram-container">
							<histogram-chart class="histogram-chart" :styles="histogramStyle"></histogram-chart>
						</div>
					</f7-card>
				</f7-swiper-slide>
				<f7-swiper-slide>
					<f7-card>
						<div class="line-container">
							<line-chart class="line-chart"></line-chart>
						</div>
					</f7-card>
				</f7-swiper-slide>
				<f7-swiper-slide>
					<f7-card>
						<f7-gauge
							size="150"
							type="circle"
							:value="32"
							border-color="#2196f3"
							:border-width="10"
							value-text="32%"
							:value-font-size="41"
							value-text-color="#2196f3"
							label-text="amount of something"
						></f7-gauge>
					</f7-card>
				</f7-swiper-slide>
				<f7-swiper-slide>
					<f7-card>
						<f7-gauge
							size="150"
							type="circle"
							:value="0.35"
							value-text="35%"
							value-text-color="#4caf50"
							:valueFontSize="51"
							:valueFontWeight="700"
							:border-width="20"
							border-color="#4caf50"
							border-bg-color="#ffeb3b"
							bg-color="#ffeb3b"
						></f7-gauge>
					</f7-card>
				</f7-swiper-slide>
			</f7-swiper>
		</f7-row>
		<!-- END Top Scrollbar for Charts -->

		<!-- Main Container Row -->
		<f7-row>
			<!-- Main Column -->
			<f7-col width="100" medium="100">
				<f7-row class="full-width body-row display-flex justify-content-stretch">
					<!-- Left Column-->
					<f7-col width="50" class="padding">
						<!-- Notifications -->
						<b-tabs type="is-boxed">
							<b-tab-item>
								<template slot="header">
									<f7-row class="display-flex align-items-center">
										<b-icon icon="email-alert" size="is-medium"></b-icon>
										<span> New Messages <b-tag rounded> 3 </b-tag> </span>
									</f7-row>
								</template>
								<f7-row class="display-flex align-content-flex-start">
									<f7-row class="full-width">
										<f7-col width="20">
											<p class="field-title">Archive</p>
										</f7-col>
										<f7-col width="50">
											<p class="field-title">Notification</p>
										</f7-col>
										<f7-col width="30">
											<p class="field-title">Approve/Decline</p>
										</f7-col>
									</f7-row>
									<div
										v-bar="{
											preventParentScroll: false,
											scrollThrottle: 30
										}"
										style="height:250px; width: 100%;"
									>
										<!-- el1 -->
										<div>
											<!-- el2 -->
											<f7-row class="full-width">
												<f7-col width="100">
													<f7-list media-list class="display-flex justify-content-space-evenly no-margin full-width">
														<f7-col width="10" class="display-flex align-items-center">
															<f7-list-item checkbox></f7-list-item>
														</f7-col>
														<f7-col class="full-width">
															<f7-list-item
																link="#"
																title="Facebook"
																after="17:14"
																subtitle="New messages from John Doe"
																text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
															></f7-list-item>
														</f7-col>
														<f7-col width="20" class="display-flex justify-content-space-between align-items-center">
															<b-icon class="margin-half" icon="thumb-up-outline" size="is-medium"></b-icon>
															<b-icon class="margin-half" icon="thumb-down-outline" size="is-medium"></b-icon>
														</f7-col>
													</f7-list>
												</f7-col>
											</f7-row>
											<f7-row class="full-width">
												<f7-col width="100">
													<f7-list media-list class="display-flex justify-content-space-evenly no-margin full-width">
														<f7-col width="10" class="display-flex align-items-center">
															<f7-list-item checkbox></f7-list-item>
														</f7-col>
														<f7-col class="full-width">
															<f7-list-item
																link="#"
																title="Facebook"
																after="17:14"
																subtitle="New messages from John Doe"
																text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
															></f7-list-item>
														</f7-col>
														<f7-col width="20" class="display-flex justify-content-space-between align-items-center">
															<b-icon class="margin-half" icon="thumb-up-outline" size="is-medium"></b-icon>
															<b-icon class="margin-half" icon="thumb-down-outline" size="is-medium"></b-icon>
														</f7-col>
													</f7-list>
												</f7-col>
											</f7-row>
											<f7-row class="full-width">
												<f7-col width="100">
													<f7-list media-list class="display-flex justify-content-space-evenly no-margin full-width">
														<f7-col width="10" class="display-flex align-items-center">
															<f7-list-item checkbox></f7-list-item>
														</f7-col>
														<f7-col class="full-width">
															<f7-list-item
																link="#"
																title="Facebook"
																after="17:14"
																subtitle="New messages from John Doe"
																text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
															></f7-list-item>
														</f7-col>
														<f7-col width="20" class="display-flex justify-content-space-between align-items-center">
															<b-icon class="margin-half" icon="thumb-up-outline" size="is-medium"></b-icon>
															<b-icon class="margin-half" icon="thumb-down-outline" size="is-medium"></b-icon>
														</f7-col>
													</f7-list>
												</f7-col>
											</f7-row>
										</div>
									</div>
									<!-- END Vue Scrollbar Container -->
								</f7-row>
							</b-tab-item>
							<b-tab-item>
								<template slot="header">
									<f7-row class="display-flex align-items-center">
										<b-icon icon="email-lock" size="is-medium"></b-icon>
										<span> Archived Messages <b-tag rounded> 135 </b-tag> </span>
									</f7-row>
								</template>
							</b-tab-item>
						</b-tabs>
					</f7-col>
					<!-- END Left Column-->

					<!-- Right Column-->
					<f7-col width="50" class="padding">
						<f7-block-title>Expenses</f7-block-title>
						<div class="multi-line-container">
							<multi-line-chart class="multi-line-chart"></multi-line-chart>
						</div>
					</f7-col>
					<!-- END Right Column-->
				</f7-row>
				<f7-row>
					<f7-col width="50">
						<!-- <i class="fas fa-address-book"></i> -->
						<fa-icon :icon="['far', 'address-book']" size="6x"></fa-icon>
						<f7-button @click="testMethods">test methods</f7-button>
					</f7-col>
					<f7-col width="50">
						<div class="multi-line2-container">
							<multi-line2 class="multi-line2"></multi-line2>
						</div>
					</f7-col>
				</f7-row>
			</f7-col>
			<!-- END Main Column -->
		</f7-row>
		<!--END  Main Container Row -->

		<!--  <f7-row ID="sampleID">
      <f7-col>
        This is used for the PDF maker. It currently works
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium ex delectus eligendi, modi quibusdam corrupti, veritatis dolorum itaque consectetur officiis totam, ab ad animi architecto. Dolor doloremque officia nam ex.</p>
      </f7-col>
    </f7-row>
    <f7-row ref="myHomePage">
      <f7-col>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium ex delectus eligendi, modi quibusdam corrupti, veritatis dolorum itaque consectetur officiis totam, ab ad animi architecto. Dolor doloremque officia nam ex.</p>
      </f7-col>
    </f7-row> -->

		<!-- FAB Right Bottom (Orange) -->
		<f7-fab position="right-bottom" slot="fixed" color="orange">
			<f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
			<f7-icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></f7-icon>
			<f7-fab-buttons position="top">
				<f7-fab-button label="Email">1</f7-fab-button>
				<f7-fab-button label="Chat">2</f7-fab-button>
				<f7-fab-button label="Text">3</f7-fab-button>
			</f7-fab-buttons>
		</f7-fab>
	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//LayoutComponents
import navBarComponent from "../components/universal/navbar-component.vue";

//Charts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BarChart from "../mixins/chartJS/bar-chart";
import PieChart from "../mixins/chartJS/pie-chart1";
import LineChart from "../mixins/chartJS/line-chart";
import MultiLineChart from "../mixins/chartJS/multi-line-chart";
import MultiLineChart2 from "../mixins/chartJS/multi-line2";
import HistogramChart from "../mixins/chartJS/histogram-chart";

export default {
	components: {
		"nav-bar-component": navBarComponent,
		"bar-chart": BarChart,
		"pie-chart": PieChart,
		"line-chart": LineChart,
		"multi-line-chart": MultiLineChart,
		"multi-line2": MultiLineChart2,
		"histogram-chart": HistogramChart
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
			showChart: true
		};
	},
	methods: {
		testMethods() {
			console.log("this.Attendance.hoursOfOperation", this.Attendance.hoursOfOperation);
			console.log("this.Attendance.holidayProfile", this.Attendance.holidayProfile);
			console.log("this.Auth.userLoginProfile", this.Auth.userLoginProfile);
			
		},

		makePDF() {
			// Landscape export, 2×4 inches
			var $$ = this.Dom7;
			var source = $$("#sampleID")[0].innerHTML;
			console.log("source", source);

			var sourceData = this.$refs.myHomePage.$el.innerHTML;
			console.log("sourceData", sourceData);

			var element123 = document.getElementById("sampleID");
			console.log("element123", element123);

			var htmltocanvas = html2canvas(element123).then((canvas) => {
				console.log("canvas", canvas);

				var image = canvas.toDataURL("image/png");
				console.log("image", image);
				// window.location.href= image;

				var pdf = new jsPDF();
				console.log("pdf", pdf);
				// pdf.text('My Goodness!', 1, 1, 0);
				pdf.addImage(image, "PNG", 0, 0, 100, 100, "Alias", "NONE", 0);

				pdf.save("myWebPagePDF.pdf");
				// pdf.output("dataurlnewwindow");
			});
		},
		logout() {
			this.$store.dispatch("signOut");
		},
		viewDBNotes(db) {
			const tx = db.transaction("PersonalNotes", "readonly");
			const pNotes = tx.objectStore("PersonalNotes");
			const request = pNotes.openCursor();
			request.onsuccess = (e) => {
				const cursor = e.target.result;

				if (cursor) {
					console.log("There was a DB, ", cursor);

					cursor.continue();
				}
			};
		}
	},
	computed: {
		...mapState(["Users", "Inventory", "Auth", "Errors", "Attendance", "Datacom"]),
		pieStyle() {
			return {
				width: "175px"
				// position: 'absolute'
			};
		},
		histogramStyle() {
			return {
				width: "200px"
				// position: 'absolute'
			};
		}
	},
	async mounted() {	
		this.$store.dispatch('getSharedCountries');
		this.$store.dispatch('getSharedStates', 6252001);

		//*****************************Finished Loading Databases***************************** */
		const dbName = "NotesDB";
		const dbVersion = 1;

		const indexDB = indexedDB.open(dbName, dbVersion);

		indexDB.onupgradeneeded = (e) => {
			console.log("Upgrade was called");
			console.log("this", this);
			// this.$f7.dialog.create({
			//   text: "Upgrade was called",
			//   buttonOk: 'Ok',
			//   closeByBackdropClick: true,
			// }).open();

			const db = e.target.result;
			console.log("Success db", db);

			//Can Only create on Upgrade
			const pNotes = db.createObjectStore("PersonalNotes", {
				keyPath: "title"
			});
			const myNotes = db.createObjectStore("MyNotes", { keyPath: "title" });
			const singleQuote = "Yes";
		};
		//On Success
		indexDB.onsuccess = (e) => {
			console.log("Success was called");
			// this.$f7.dialog.create({
			//   text: "Success was called",
			//   buttonOk: 'Ok',
			//   closeByBackdropClick: true,
			// }).open();

			const db = e.target.result;

			//Add Notes to DB
			const note = {
				title: "Database Title",
				text: "Text Goes Here"
			};
			const tx = db.transaction("PersonalNotes", "readwrite");
			const newNotes = tx.objectStore("PersonalNotes");
			newNotes.add(note);

			//View Notes
			this.viewDBNotes(db);
		};
		//On Error
		indexDB.onerror = (e) => {
			console.log("Error was called");
			console.log(`Error: ${e.target.error} was found`);
		};
	}
};
</script>

<style lang="scss" scoped>
.notification-message {
	border-bottom: 1px solid black;
}
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
</style>
