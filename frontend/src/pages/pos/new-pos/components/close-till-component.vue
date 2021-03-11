<template>
	<div>
		<v-bottom-sheet 
			class="open-till-sheet"
			v-model="openSheetCloseTill">
      <v-sheet
        class="text-center"
				height="100vh"
       
      >
				<div class="row justify-between">
					<div class="col-4 flex items-center">
						<div class="headline-3 font-semibold">
							Close Till
						</div>
					</div>
					<div class="col-1">
						<v-btn
							icon
							color="red"
							@click="closeSheet"
						>
							<v-icon large>mdi mdi-close-circle</v-icon>
						</v-btn>
					</div>
				</div>

				<DxScrollView
					id="scrollview"
					ref="openTillScrollView"
					height="85vh"
					:scroll-by-content="true"
					:scroll-by-thumb="true"
					show-scrollbar="always"
					:bounce-enabled="true"
				>
				
					<template>
						<div class="row bg-gray-400">
							<div class="col-12 p-0">
								<div class="headline-3">
									Coins
								</div>
							</div>
						</div>
						<div class="container">

						
							<div class="row justify-evenly">
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												Pennies
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.coins.pennies"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.coins.pennies * 0.01 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												Nickles
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.coins.nickels"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.coins.nickels * 0.05 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row justify-evenly">
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												Dimes
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.coins.dimes"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.coins.dimes * 0.10 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												Quarters
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.coins.quarters"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.coins.quarters * 0.25 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row justify-evenly">
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												Half-Dollars
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.coins.halfDollars"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.coins.halfDollars * 0.50 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												Dollar Coins
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.coins.dollarCoins"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.coins.dollarCoins * 1 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row bg-gray-300">
								<div class="col-10 flex justify-end">
									<div class="headline-5">
										Total Coins: {{ calculateTotalCoins | formatDollar }}
									</div>
								</div>
							</div>
						</div>
					</template>

					
					<template>
						<div class="row bg-gray-400 mt-2">
							<div class="col-12 p-0">
								<div class="headline-3">
									Bills
								</div>
							</div>
						</div>
						<div class="container">
							<div class="row justify-evenly">
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												$1's
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.bills.ones"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.bills.ones | formatDollar }}
											</div>
										</div>
									</div>
								</div>
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												$5's
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.bills.fives"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.bills.fives * 5 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row justify-evenly">
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												$10's
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.bills.tens"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.bills.tens * 10 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												$20's
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.bills.twenties"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.bills.twenties * 20 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row justify-evenly">
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												$50's
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.bills.fiftys"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.bills.fiftys * 50 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
								<div class="md:col-6">
									<div class="row">
										<div class="col-4 flex items-center justify-end">
											<div class="headline-5 pb-4">
												$100's
											</div>
										</div>
										<div class="col-4 flex items-center">
											<v-text-field
												solo
												placeholder="count"
												v-model="cashDrawer.bills.hundreds"
												:rules="numberOnly"
												v-mask="numberMask"
											></v-text-field>
										</div>
										<div class="col-4 flex items-center">
											<div class="headline-5 pb-4">
												{{ cashDrawer.bills.hundreds * 100 | formatDollar }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row bg-gray-300">
								<div class="col-10 flex justify-end">
									<div class="headline-5">
										Total Bills: {{ calculateTotalBills | formatDollar }}
									</div>
								</div>
							</div>
						</div>
					</template>

					<template>
						<div class="row justify-end">
							<v-btn 
							class="m-2" 
							large
							@click="cancelOpenTill"
							Cancel
							</v-btn>
							<v-btn 
								class="m-2" 
								large 
								color="primary"
								@click="submitOpenTill">
									Submit Count
							</v-btn>
						</div>
					</template>

				</DxScrollView>

      </v-sheet>
    </v-bottom-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";
var moment = require("moment");

import { DxScrollView } from 'devextreme-vue/scroll-view';

export default {
	name: "closeTillComponent",
	mixins: [],
	components: {
		DxScrollView
	},
	props: {
		openSheetCloseTill: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			//Cash Drawer Coins and Bills
			cashDrawer: {
				coins: {
					pennies: null,
					nickels: null,
					dimes: null,
					quarters: null,
					halfDollars: null,
					dollarCoins: null
				},
				bills: {
					ones: null,
					fives: null,
					tens: null,
					twenties: null,
					fiftys: null,
					hundreds: null
				}
			},
			numberMask: '######',
			numberOnly: [
				v => /(?=.*[0-9])/.test(v) || 'Must have numbers only',
			] 
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		closeSheet() {
			this.$emit("closeTillSheet", false)
		},
			submitOpenTill() {
			console.log("submitOpenTill");
		},
		cancelOpenTill() {
			console.log("cancelOpenTill");
		}
	},
	computed: {
		...mapState([]),
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
	mounted() {}
};
</script>

<style scoped lang="scss">

.col-6 {
	padding: 0px;
}
.col-4 {
	padding: 0px 10px;
}
</style>
