<template>
	<div>
		<f7-row class="full-width margin display-flex justify-content-end">
			<f7-col width="25">
				<f7-button fill class="trans-btn-left"><span>New Transaction</span></f7-button>
				<f7-button fill 
					popover-open=".new-transaction" 
					class="trans-btn-right" 
					icon-color="white"
					icon-size="40" 
					icon="mdi mdi-menu-down"></f7-button>
				<f7-popover class="new-transaction">
					<f7-list>
						<f7-list-item link="#" no-chevron popover-close title="Sale"></f7-list-item>
						<f7-list-item link="#" no-chevron popover-close title="Return"></f7-list-item>
						<f7-list-item link="#" no-chevron popover-close title="Void"></f7-list-item>
						<f7-list-item link="#" no-chevron popover-close title="Recurring"></f7-list-item>
						<f7-list-item link="#" no-chevron popover-close title="Verification"></f7-list-item>
					</f7-list>
				</f7-popover>
			</f7-col>
		</f7-row>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "newTransactionButtonComponent",
	mixins: [],
	components: {},
	props: {

	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		}
	},
	computed: {
		...mapState(["Invoices"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss"></style>
