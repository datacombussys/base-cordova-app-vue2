<template>
	<div>
			<!-- Credit Card Payment Page Popup -->
		<f7-popup class="credit-card-popup" :opened="sharedData.CCpopupOpened" @popup:closed="sharedData.CCpopupOpened = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title class="margin-top text-color-white">MCredit Card Payment</f7-block-title>
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

				<f7-card>
					<f7-card-content>
						<f7-list>
							<f7-row>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text" title="Total Due"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text" title="$125.45"></f7-list-item>
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
										step="0.01"
										validate-on-blur
										error-message="Numbers only. 2 decimal places."
										style="background: rgb(216,252,253)"
									></f7-list-input>
								</f7-col>
							</f7-row>

							<f7-row>
								<!-- Row 1 Credit Card Number -->
								<f7-col width="100" medium="100">
									<f7-list-input
										outline
										label="Card Number"
										floating-label
										type="text"
										placeholder="Card Number"
										clear-button
									>
										<f7-icon f7="creditcard" slot="media"></f7-icon>
									</f7-list-input>
								</f7-col>
							</f7-row>
							<!-- Row 2 - Exp Date and CVV -->
							<f7-row>
								<f7-col width="50" medium="50">
									<f7-list-input
										outline
										label="Expiration Date"
										floating-label
										type="text"
										placeholder="MMYY"
										clear-button
									>
										<f7-icon f7="cerdit_card" slot="media"></f7-icon>
									</f7-list-input>
								</f7-col>
								<f7-col width="50" medium="50">
									<f7-list-input
										outline
										label="CVV / CVV2"
										floating-label
										type="text"
										placeholder="###"
										clear-button
									></f7-list-input>
								</f7-col>
							</f7-row>

							<f7-row>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold" title="Change"></f7-list-item>
								</f7-col>
								<f7-col width="50" class="display-flex justify-content-center">
									<f7-list-item class="checkout-text-bold" title="$5.65"></f7-list-item>
								</f7-col>
							</f7-row>
						</f7-list>
						<!-- Row 3 Submit Button -->
						<f7-row>
							<f7-col width="50" medium="50">
								<f7-button fill large color="deeporange">Cancel</f7-button>
							</f7-col>
							<f7-col width="50" medium="50">
								<f7-button fill large color="blue">Authorize</f7-button>
							</f7-col>
						</f7-row>
					</f7-card-content>
				</f7-card>
			</f7-page>
		</f7-popup>
		<!-- END Credit Card Payment Page Popup -->
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
	name: "creditCardPopupComponent",
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
		testingMethod(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
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
.credit-card-popup {
	height: 650px;
}

</style>
