<template>
	<div>
		<!-- Cash Payment Page Popup -->
		<f7-popup class="gratuity-popup" :opened="gratuityPopupOpened" @popup:closed="gratuityPopupOpened = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title class="margin-top text-color-white">Enter Gratuity</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right margin-right"
							popup-close
							icon-size="40"
							icon-color="white"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 100%;">
					<div>
						<f7-block>
							<f7-card>
								<f7-list>
									<f7-card-content>
										<f7-row>
											<f7-block-header>Type of Gratuity</f7-block-header>
											<f7-col width="100">
												<f7-list-item
													radio
													radio-icon="start"
													name="gratuityType"
													title="Percentage"
													value="percent"
													:checked="gratuityType === 'percent'"
													@change="gratuityType = $event.target.value"
												></f7-list-item>
												<f7-list-item
													radio
													radio-icon="start"
													name="gratuityType"
													title="Dollar Amount"
													value="amount"
													:checked="gratuityType === 'amount'"
													@change="gratuityType = $event.target.value"
												></f7-list-item>
											</f7-col>
										</f7-row>
										<f7-row class="display-flex justify-content-center">
											<f7-col width="75" v-if="gratuityType === 'percent'">
												<f7-block-header>Tip Percentage</f7-block-header>
												<f7-row class="display-flex flex-direction-row">
													
													<f7-list-input
														type="number"
														step="0.01"
														placeholder="%"
														:value="gratuityPercent"
														@input="gratuityPercent = parseFloat($event.target.value), gratuityAmount = ''">
														<p style="font-size:2em" slot="media">%</p>
													</f7-list-input>
												</f7-row>
											</f7-col>
											<f7-col width="75" v-if="gratuityType === 'amount'">
												<f7-block-header>Tip Amount</f7-block-header>
												<f7-row class="display-flex flex-direction-row">
													<f7-list-input
														type="number"
														step="0.01"
														placeholder="$"
														:value="gratuityAmount"
														@input="gratuityAmount = parseFloat($event.target.value), gratuityPercent = ''">
														<p style="font-size:2em" slot="media">$</p>
													</f7-list-input>
													</f7-row>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item class="checkout-text-bold-paid" title="Total Gratuity"></f7-list-item>
											</f7-col>
											<f7-col width="50" class="display-flex justify-content-center">
												<f7-list-item
													v-if="gratuityAmount.length != 0"
													class="checkout-text-bold-paid"
													:title="gratuityAmount | formatDollar"
												></f7-list-item>
												<f7-list-item
													v-if="gratuityPercent.length != 0"
													class="checkout-text-bold-paid"
													:title="gratuityTotal | formatDollar"
												></f7-list-item>
											</f7-col>
										</f7-row>
											<f7-row class="display-flex justify-content-end">
											<f7-col width="50">
												<f7-button fill popup-close @click="applyGratuity">Save</f7-button>
											</f7-col>
										</f7-row>
										
										<f7-row>
											<f7-col>
												<f7-button @click="testingMethod">Test</f7-button>
											</f7-col>
										</f7-row>

									</f7-card-content>
								</f7-list>
							</f7-card>
						</f7-block>
					</div>
				</div>
				<!-- END Scrollbae -->
			</f7-page>
		</f7-popup>
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
	name: "gratuityPopupComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
		startTimer: {
			type: Function,
			required: true
		},
		orderForm: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Component Data

			//Main Data
			gratuityType: null,
			gratuityPopupOpened: false,
			gratuityPercent: '',
			gratuityAmount: '',


		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.gratuityPercent', this.gratuityPercent);
			console.log('this.gratuityAmount', this.gratuityAmount);
			console.log('this.orderForm', this.orderForm);
		},
		applyGratuity() {
			console.log("Gratuity Applied");
			if(this.gratuityAmount) {
				this.orderForm.gratuity = this.gratuityAmount;
			} else {
				var gratpercent = this.gratuityPercent / 100;
				var gratDollarAmount = this.orderForm.subtotal * gratpercent;
				this.orderForm.gratuity = gratDollarAmount;
			}
			console.log("this.orderForm", this.orderForm);

			this.startTimer();
		}


	},
	computed: {
		...mapState(["Auth", "RetailPOS"]),
		...mapGetters([]),
		gratuityTotal() {
			var gratpercent = this.gratuityPercent / 100;
			console.log('gratpercent', gratpercent);
			var gratDollarAmount = this.orderForm.subtotal * gratpercent;
			console.log('gratDollarAmount', gratDollarAmount);
			return gratDollarAmount;
		}

	},
	created() {

	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="less">
.checkout-text-bold-paid {
	font-size: 1.5em;
	font-family: OpenSans-SemiBold;
}
</style>
