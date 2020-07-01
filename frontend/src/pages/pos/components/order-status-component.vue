<template>
		<div class="full-width">
		<f7-row class="full-width padding-half order-status-header align-items-center">
			<f7-col width="50">
				<p class="order-status-text">Order Status</p>
			</f7-col>
			<f7-col width="50" class="text-align-center">
				<f7-badge size="50" color="green">Open</f7-badge>
			</f7-col>
		</f7-row>
		<f7-block class="no-margin-top">
			<f7-row class="split-bill-header display-flex justify-content-space-between">
				<f7-col width="30">
					Payment
				</f7-col>
				<f7-col width="30">
					Method
				</f7-col>
				<f7-col width="30" class="text-align-center">
					Paid
				</f7-col>
			</f7-row>
			<div
				v-bar="{
					preventParentScroll: true,
					scrollThrottle: 30
				}"
				style="height: 300px;"
			>
				<!-- el1 -->
				<div>
				<!-- el2 -->
					<f7-row>
						<f7-col width="30">
							Split 1
						</f7-col>
						<f7-col width="30">
							Credit Card
						</f7-col>
						<f7-col width="30" class="text-align-center">
							$35.00
						</f7-col>
					</f7-row>
					<f7-row>
						<f7-col width="30">
							Split 2
						</f7-col>
						<f7-col width="30">
							Gift Card
						</f7-col>
						<f7-col width="30" class="text-align-center">
							$75.00
						</f7-col>
					</f7-row>
					<f7-row>
					<f7-col width="50">
						<f7-button small fill>Add Payment</f7-button>
					</f7-col>
				</f7-row>
				</div>
			</div>
			<!-- END Vue Dragger -->

			<f7-row class="split-totals">
				<f7-col width="50">
					Remaining Balance
				</f7-col>
				<f7-col width="50" class="text-align-right padding-right-half">
					$75.00
				</f7-col>
			</f7-row>
			
		</f7-block>
		
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
	name: "orderStatusComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {

	},
	data() {
		return {
			//Component Data

			//Main Data



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
.badge {
	min-height: 30px;
	min-width: 90px;
	font-size: 1em;
	font-weight: 900;
	padding: 6px;
} 
.order-status-header {
	background: lightgrey;
	.order-status-text {
		font-family: OpenSans-Bold;
		font-size: 1.5em;
		font-weight: 500;
	}
}

.split-bill-header {
		font-family: OpenSans-Regular;
		font-weight: 500;
}
.split-totals {
	width: 100%;
	position: absolute;
	bottom: 10px;
	padding-right: 20px;
	font-family: OpenSans-SemiBold;
	font-size: 1em;
}
</style>
