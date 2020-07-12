<template>
	<div class="full-width">
		<f7-row class="notification-header padding-half">
			<p class="notification-text">Order Notifications</p>
		</f7-row>
		<f7-block class="margin-top-half">
			<f7-row>
				<f7-col>
					<p>You have no current notifications</p>
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
	name: "orderNotificationsComponent",
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

<style scoped lang="scss">
.notification-header {
	background: lightgrey;
	.notification-text {
		font-family: OpenSans-Bold;
		font-size: 1.5em;
		font-weight: 500;
	}
}
</style>
