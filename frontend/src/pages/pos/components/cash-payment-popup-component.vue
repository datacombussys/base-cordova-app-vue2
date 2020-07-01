<template>
	<div>
		<!-- Cash Payment Page Popup -->
		<f7-popup class="cash-popup" :opened="sharedData.CashpopupOpened" @popup:closed="sharedData.CashpopupOpened = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title class="margin-top text-color-white">Cash Tender</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right text-color-grey margin-right"
							@click="popupCloseCashPayment($event)"
							popup-close
							icon-size="40"
							icon-color="white"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>

				<f7-card>
					<f7-card-content>
						<f7-row v-show="sharedData.allItemsInTill.length === 0">
							<f7-col>
								<p>Your till is empty</p>
								<p>Select "Sale" or "Refund" to get started</p>
							</f7-col>
						</f7-row>
						<f7-row v-show="showTotalPaid === false && sharedData.allItemsInTill.length != 0">
							<f7-list>
								<f7-row>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" title="Total Due"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" :title="formData.total | currency"></f7-list-item>
									</f7-col>
								</f7-row>
								<f7-row v-if="showTotalPaid">
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold-paid" title="Total Paid"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold-paid" title="$(120.00)"></f7-list-item>
									</f7-col>
								</f7-row>

								<f7-row class="display-flex justify-content-center">
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-paid" title="Amount Tendered"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-input
											class="checkout-text-bold-paid"
											type="number"
											validate
											step="0.01"
											error-message="Numbers only"
											:value="formData.payment.cashPaidAmount"
											@input="formData.payment.cashPaidAmount = $event.target.value"
											style="background: rgb(216,252,253)"
										></f7-list-input>
									</f7-col>
								</f7-row>
								<f7-row class="full-width margin-top display-flex justify-content-center">
									<f7-col width="50">
										<f7-button fill large @click="processTransactionCash">Confirm</f7-button>
									</f7-col>
								</f7-row>
							</f7-list>
						</f7-row>
						<f7-row class="full-width" v-show="showTotalPaid === true && sharedData.allItemsInTill.length != 0">
							<f7-list class="full-width">
								<f7-row>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" title="Total Due"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text" :title="formData.total | currency"></f7-list-item>
									</f7-col>
								</f7-row>
								<f7-row v-if="showTotalPaid">
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold-paid" title="Total Paid"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item
											class="checkout-text-bold-paid"
											:title="formData.payment.cashPaidAmount | currency"
										></f7-list-item>
									</f7-col>
								</f7-row>
								<f7-row>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item class="checkout-text-bold" title="Change"></f7-list-item>
									</f7-col>
									<f7-col width="50" class="display-flex justify-content-center">
										<f7-list-item
											class="checkout-text-bold"
											:title="(parseFloat(formData.payment.cashPaidAmount) - parseFloat(formData.total)) | currency"
										></f7-list-item>
									</f7-col>
								</f7-row>
							</f7-list>
						</f7-row>
						<!-- <f7-row class="margin-top full-width">
							<f7-col>
								<f7-button popup-close fill large>Close</f7-button>
							</f7-col>
						</f7-row>-->
					</f7-card-content>
				</f7-card>
				<f7-row>
					<f7-col>
						<f7-button @click="testButton">Test</f7-button>
					</f7-col>
				</f7-row>
			</f7-page>
		</f7-popup>
		<!-- END Cash Payment Page Popup -->
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
	name: "cashPaymentPopupComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
		sharedData: {
			type: Object,
			required: true
		},
		formData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Component Data

			//Main Data
			showTotalPaid: false,


		};
	},
	methods: {
		testButton(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},
		popupCloseCashPayment(e) {
			// console.log('discount popup e', e);
			this.$f7.popup.close();
			this.resetCashPayment();
		},
		resetCashPayment() {},
		//Cash Transaction
		processTransactionCash() {
			this.showTotalPaid = true;
			//if Balance reamins do not close order offer another payment method
			//if Balance === 0, them clear the order and reset for new entry order
		},


	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters([])

	},
	created() {

	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="less">
.cash-popup {
	height: 500px;
}
.checkout-text-bold-paid {
	font-size: 1.5em;
	font-family: OpenSans-SemiBold;
}
</style>
