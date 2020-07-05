<template>
	<div>
		<f7-block>
			<f7-list>
				<f7-card>
					<f7-card-header>
						<f7-row class="margin-top">
							<f7-block-title class="full-width" medium>Sales Orders</f7-block-title>
						</f7-row>
					</f7-card-header>
					<f7-card-content class="padding-half">
						<f7-row class="full-width display-flex justify-content-center">
							<div class="open-arrow">Quotes</div>
							<div class="approved-quote-arrow">Approved</div>
							<div class="invoices-arrow">Invoices</div>
							<div class="past-due-arrow">Past Due</div>
							<div class="paid">Paid</div>
						</f7-row>
					</f7-card-content>
				</f7-card>
			</f7-list>
		</f7-block>
		
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "salesOrdersHomeComponent",
	mixins: [],
	components: {},
	props: {

	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log();
		}
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="less">
.open-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	background: rgba(2, 90, 114, 0.6);
	clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);
}
.approved-quote-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(4, 143, 69, 0.3);
	clip-path: polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%);
}
.invoices-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(4, 81, 95, 0.3);
	clip-path: polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%);
}
.past-due-arrow {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding: 20px;
	padding-left: 40px;
	margin-left: -20px;
	background: rgba(117, 6, 6, 0.3);
	clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 15% 50%);
}
.paid {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding-top: 20px;
	padding-bottom: 20px;
	margin-left: 5px;
	background: rgba(0, 0, 0, 0.3);
}
.cancelled {
	cursor: pointer;
	text-align: center;
	font-size: 1.3em;
	font-family: OpenSans-SemiBold;
	width: 20%;
	height: 75px;
	padding-top: 20px;
	padding-bottom: 20px;
	margin-left: 5px;
	background: rgba(65, 65, 65, 0.3);
}
</style>
