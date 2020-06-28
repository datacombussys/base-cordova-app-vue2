<template>
	<div>
		<!-- Settings Sheet -->
		<f7-sheet
			class="retail-POS-Settings"
			:opened="retailSettings.retailPOSsheetOpened"
			@sheet:closed="retailSettings.retailPOSsheetOpened = false"
		>
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content>
				<f7-block>
					<f7-card>
						<f7-card-header class="padding">
							<f7-block-header>POS Settings</f7-block-header>
						</f7-card-header>
						<f7-card-content>
							<f7-list>
								<f7-row>
									<f7-list accordion-list inset>
										<!-- Accordion #1 -->
										<f7-list-item accordion-item title="General Settings">
											<f7-accordion-content>
												<f7-block class="padding-top">
													<f7-row>
														<f7-col width="50">
															<p class="field-title">Enable Gratuity</p>
															<f7-list-item>
																<f7-toggle :checked="retailSettings.enableGratuity" @change="retailSettings.enableGratuity = $event.target.checked"></f7-toggle>
															</f7-list-item>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">Enable Cash Discount</p>
															<f7-list-item>
																<f7-toggle
																	:checked="orderSettings.enableCashDisocunt"
																	@change="orderSettings.enableCashDisocunt = $event.target.checked"
																></f7-toggle>
															</f7-list-item>
														</f7-col>
													</f7-row>
													<f7-row>
														<f7-col width="50">
															<p class="field-title">Enable Gratuity</p>
															<f7-list-item>
																<f7-toggle :checked="retailSettings.enableGratuity" @change="retailSettings.enableGratuity = $event.target.checked"></f7-toggle>
															</f7-list-item>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">Cash Discount Percentage</p>
															<f7-list-input
																type="number"
																step="0.01"
																error-message="Numbers only. 2 decimal places."
																required
																validate
																style="background: rgb(216,252,253)"
															></f7-list-input>
														</f7-col>
													</f7-row>
												</f7-block>
											</f7-accordion-content>
										</f7-list-item>
										<!-- END Accordion #1 -->
										<!-- Accordion #2 -->
										<f7-list-item accordion-item title="Tax Settings">
											<f7-accordion-content>
												<f7-block class="padding-top">

												</f7-block>
												<f7-list>
													<f7-list-item title="Item 1"></f7-list-item>
													<f7-list-item title="Item 2"></f7-list-item>
													<f7-list-item title="Item 3"></f7-list-item>
													<f7-list-item title="Item 4"></f7-list-item>
												</f7-list>
											</f7-accordion-content>
										</f7-list-item>
										<!-- END Accordion #2 -->
										<!-- Accordion #3 -->
										<f7-list-item accordion-item title="Offline Settings">
											<f7-accordion-content>
												<f7-block class="padding-top">
													<p>
														Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
													</p>
												</f7-block>
											</f7-accordion-content>
										</f7-list-item>
										<!-- END Accordion #3 -->
										<!-- Accordion #4 -->
										<f7-list-item accordion-item title="Discounts">
											<f7-accordion-content>
												<f7-block class="padding-top"> 
													<p>
														Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
													</p>
												</f7-block>
											</f7-accordion-content>
										</f7-list-item>
										<!-- END Accordion #4 -->
									</f7-list>
								</f7-row>
								
							</f7-list>
						</f7-card-content>
					</f7-card>
				</f7-block>
			</f7-page-content>
		</f7-sheet>
		<!-- END Settings Sheet -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components


export default {
	name: "retailPOSSettingsComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
		retailSettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Component Data

			//Main Data
			retailPOSsheetOpened: false,
			orderSettings: {
				enableCashDisocunt: true,
			}


		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},


	},
	computed: {
		...mapState(["Auth", "RetailPOS"]),
		...mapGetters([])

	},
	created() {

	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="less">
.retail-POS-Settings {
	height: 100%;
}
</style>
