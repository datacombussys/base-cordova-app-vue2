<template>
	<div>
		
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "billingShippingComponent",
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
		...mapState(["Invoices", "Users"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss"></style>
