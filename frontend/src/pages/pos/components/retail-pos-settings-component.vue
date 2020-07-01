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
									<f7-list accordion-list inset class="full-width">
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
													<f7-row>
														<f7-col width="50">
															<p class="field-title">Have you set up your tax profile?</p>
															<f7-list-item checkbox :checked="Object.keys(Financial.salesTaxProfile).length!= 0" value="has_tax" title="Local Taxes"></f7-list-item>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">Setup Now</p>
															<f7-button fill>Go</f7-button>
														</f7-col>
													</f7-row>
												</f7-block>
											</f7-accordion-content>
										</f7-list-item>
										<!-- END Accordion #2 -->
										<!-- Accordion #3 -->
										<f7-list-item accordion-item title="Offline Settings">
											<f7-accordion-content>
												<f7-block class="padding-top">
													<f7-row>
														<f7-col width="50">
															<p class="field-title">Enable Offline Transactions</p>
															
															<f7-list-item>
																<f7-toggle 
																	:checked="enableOfflineTransactions" 
																	@change="enableOfflineTransactions = $event.target.checked"
																>
																</f7-toggle>
															<f7-icon class="tooltip-init"
																icon="mdi mdi-information" 
																size="30" 
																slot="media"
																data-tooltip="In the event of disconnected internet, the system will capture all required information to process credit card and gift card transactions after the internet has been restored.
																Do NOT power off this machine while there are still transaction in memory as they will be deleted.">
															</f7-icon>
															</f7-list-item>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">View Offline Transactions</p>
															<f7-button>View</f7-button>
														</f7-col>
														
													</f7-row>
													<f7-row class="display-flex justify-content-space-between">
														<f7-col width="30">
															<p class="field-title">Process attempts</p>
																<f7-list-input
																	type="number"
																	step="0.01"
																	error-message="Numbers only. 2 decimal places."
																	required
																	validate
																	style="background: rgb(216,252,253)"
																	:value="processDeclinedAttempts"
																	@input="processDeclinedAttempts = $event.target.value"
																	>
																	<f7-icon class="tooltip-init"
																		icon="mdi mdi-information" 
																		size="30" 
																		slot="media"
																		data-tooltip="What is the maximum amount of attempts to process declined transactions?">
																	</f7-icon>
																</f7-list-input>
															
														</f7-col>
														<f7-col width="30">
															<p class="field-title">Process Frequency</p>
																<f7-list-input
																	
																	type="select"
																	style="background: rgb(216,252,253)"
																	:value="processDeclinedAttempts"
																	@input="processDeclinedAttempts = $event.target.value"
																>
																<option 
																	v-for="freq in RetailPOS.processDeclinedFrequency"
																	:key="freq.id" 
																	:value="freq">
																	{{ freq }}
																</option>
															</f7-list-input>
														</f7-col>
													</f7-row>
												</f7-block>
											</f7-accordion-content>
										</f7-list-item>
										<!-- END Accordion #3 -->
										<!-- Accordion #4 -->
										<f7-list-item accordion-item title="Discounts">
											<f7-accordion-content>
												<f7-block class="padding-top"> 
													<f7-row>
														<f7-col width="50">
															<p class="field-title">Enable Discounts</p>
															<f7-list-item>
																<f7-toggle :checked="enableDiscounts" @change="enableDiscounts = $event.target.checked"></f7-toggle>
															</f7-list-item>
														</f7-col>
														<f7-col width="50">
															<p class="field-title">Require Manager Approval</p>
															<f7-list-item>
																<f7-toggle :checked="requireApproval" @change="enableDiscounts = $event.target.checked"></f7-toggle>
															</f7-list-item>
														</f7-col>
													</f7-row>
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
			},
			enableDiscounts: false,
			requireApproval: false,
			enableOfflineTransactions: false,
			processDeclinedAttempts: 0,


		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},


	},
	computed: {
		...mapState(["Auth", "RetailPOS", "Financial"]),
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
