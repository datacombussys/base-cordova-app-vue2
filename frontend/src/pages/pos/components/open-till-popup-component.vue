<template>
	<div>
		<f7-popup
		style="scrollbar-width: none;"
		swipeToClose
		class="open-till-popup"
		:opened="OpenTillPopup"
		@popup:closed="OpenTillPopup = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title large class="no-margin text-color-white">Open Till</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right margin-right margin-top-half"
							popup-close
							icon-size="50"
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
								<f7-card-content>
									<f7-list>
										<f7-row v-if="isTillOpen">
											<f7-col>
												<p>Your till is already open</p>
												<p>You must close the till before you can enter opening amounts.</p>
											</f7-col>
										</f7-row>
										<f7-row v-if="!isTillOpen">
											<f7-list class="full-width">
												<f7-block-title class="margin-top-half">Coins</f7-block-title>
												<!-- Coins -->
												<f7-row>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="Pennies"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.coins.pennies"
																	@input="cashDrawer.coins.pennies = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.coins.pennies * 0.01"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="Nickles"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	class="no-margin"
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.coins.nickels"
																	@input="cashDrawer.coins.nickels = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.coins.nickels * 0.5"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="Dimes"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.coins.dimes"
																	@input="cashDrawer.coins.dimes = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.coins.dimes * 0.1"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="Quarters"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	class="no-margin"
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.coins.quarters"
																	@input="cashDrawer.coins.quarters = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.coins.quarters * 0.30"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="Half-Dollars"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.coins.halfDollars"
																	@input="cashDrawer.coins.halfDollars = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.coins.halfDollars * 0.5"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="Dollar Coins"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	class="no-margin"
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.coins.dollarCoins"
																	@input="cashDrawer.coins.dollarCoins = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.coins.dollarCoins"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col class="display-flex justify-content-end" width="70">
														<f7-list-item class="open-till-text-bold" title="Total Coins:"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<f7-list-item
															class="open-till-text-bold"
															:title="calculateTotalCoins | formatDollar"
														></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- END Coins -->
												<!-- Bills -->
												<f7-row>
													<f7-block-title class="margin-top-half">Bills</f7-block-title>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="$1's"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.bills.ones"
																	@input="cashDrawer.bills.ones = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.bills.ones"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="$5's"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	class="no-margin"
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.bills.fives"
																	@input="cashDrawer.bills.fives = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.bills.fives * 5"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="$10's"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.bills.tens"
																	@input="cashDrawer.bills.tens = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.bills.tens * 10"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="$20's"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	class="no-margin"
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.bills.twenties"
																	@input="cashDrawer.bills.twenties = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.bills.twenties * 20"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="$50's"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.bills.fiftys"
																	@input="cashDrawer.bills.fiftys = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.bills.fiftys * 50"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
													<f7-col width="50">
														<f7-row class="display-flex justify-content-space-around full-width">
															<f7-col width="30">
																<f7-list-item class="open-till-text" title="$100's"></f7-list-item>
															</f7-col>
															<f7-col width="30">
																<f7-list-input
																	class="no-margin"
																	type="number"
																	validate
																	step="1"
																	error-message="Whole Numbers only"
																	:value="cashDrawer.bills.hundreds"
																	@input="cashDrawer.bills.hundreds = $event.target.value"
																	style="background: rgb(216,252,253)"
																></f7-list-input>
															</f7-col>
															<f7-col width="30">
																<f7-list-item class="open-till-text" :title="cashDrawer.bills.hundreds * 100"></f7-list-item>
															</f7-col>
														</f7-row>
													</f7-col>
												</f7-row>
												<f7-row>
													<f7-col class="display-flex justify-content-end" width="70">
														<f7-list-item class="open-till-text-bold" title="Total Bills:"></f7-list-item>
													</f7-col>
													<f7-col width="30">
														<f7-list-item
															class="open-till-text-bold"
															:title="calculateTotalBills | formatDollar"
														></f7-list-item>
													</f7-col>
												</f7-row>
												<!-- END Bills -->
												<f7-row class="margin-top">
													<f7-block class="full-width">
														<f7-col>
															<f7-button fill large @click="openTill">Open Till</f7-button>
														</f7-col>
													</f7-block>
												</f7-row>
											</f7-list>
										</f7-row>
										<f7-row>
											<f7-col>
												<f7-button @click="testButton">Test</f7-button>
											</f7-col>
										</f7-row>
										<f7-row>
											<f7-block class="padding margin"></f7-block>
										</f7-row>
									</f7-list>
								</f7-card-content>
							</f7-card>
						</f7-block>
					</div>
				</div>
			</f7-page>
		</f7-popup>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");
import {EventBus} from '@/services/event-bus';

//Mixins
import { UniversalMixins } from "../../../mixins/universal-mixins";

export default {
	name: "openTillPopupComponent",
	components: {

	},
	mixins: [
		UniversalMixins,

		],
	props: {
		// openTillSettings: {
		// 	type: Object,
		// 	required: true
		// },
		// openTillData: {
		// 	type: Object,
		// }
	},
	data() {
		return {
			//Main Data
			isTillOpen: false,
			OpenTillPopup: false,

			//Cash Drawer Coins and Bills
			cashDrawer: {
				coins: {
					pennies: 0,
					nickels: 0,
					dimes: 0,
					quarters: 0,
					halfDollars: 0,
					dollarCoins: 0
				},
				bills: {
					ones: 0,
					fives: 0,
					tens: 0,
					twenties: 0,
					fiftys: 0,
					hundreds: 0
				}
			},



		}
	},
	methods: {
		async testButton(e) {
	
		},
		openTill() {
			this.isTillOpen = true;
		},


	},
	computed: {
		...mapState(["Attendance", "Users"]),
		// ...mapGetters([]),
		calculateTotalCoins() {
			let pennies = parseFloat(this.cashDrawer.coins.pennies) * 0.01 || 0;
			let nickels = parseFloat(this.cashDrawer.coins.nickels) * 0.05 || 0;
			let dimes = parseFloat(this.cashDrawer.coins.dimes) * 0.1 || 0;
			let quarters = parseFloat(this.cashDrawer.coins.quarters) * 0.25 || 0;
			let halfDollars = parseFloat(this.cashDrawer.coins.halfDollars) * 0.5 || 0;
			let dollarCoins = parseFloat(this.cashDrawer.coins.dollarCoins) || 0;

			var totalCoins = pennies + nickels + dimes + quarters + halfDollars + dollarCoins;

			return totalCoins
		},
		calculateTotalBills() {
			let ones = parseFloat(this.cashDrawer.bills.ones) * 1 || 0;
			let fives = parseFloat(this.cashDrawer.bills.fives) * 5 || 0;
			let tens = parseFloat(this.cashDrawer.bills.tens) * 10 || 0;
			let twenties = parseFloat(this.cashDrawer.bills.twenties) * 20 || 0;
			let fiftys = parseFloat(this.cashDrawer.bills.fiftys) * 50 || 0;
			let hundreds = parseFloat(this.cashDrawer.bills.hundreds) * 100 || 0;

			var totalBills = ones + fives + tens + twenties + fiftys + hundreds;

			return totalBills
		}

	},
	created() {},
	async mounted() {

	}
};
</script>

<style scoped lang="less">
@standard-font: 1.1em;
.open-till-popup {
	left: 35%;
	top: 45%;
	width: 75%;
	height: 80%;
}
.open-till-text {
	font-family: OpenSans-Regular;
	font-size: @standard-font;
}
.open-till-text-bold {
	font-family: OpenSans-SemiBold;
	font-size: @standard-font*1.5;

}
</style>
