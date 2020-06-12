<template>
	<f7-row class="full-width">
		<b-progress class="full-width" :type="progressBarType" :value="settings.value" show-value format="percent">
			{{ settings.title }}
		</b-progress>
	</f7-row>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "progressbarComponent",
	mixins: [],
	components: {},
	props: {
		settings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			progressBarType: ""
		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		}
	},
	computed: {
		// ...mapState(["Auth", "Invoices"]);
	},
	created() {},
	mounted() {
		if (this.settings.value < 25) {
			this.progressBarType = "is-danger";
		}
		if (this.settings.value > 25 && this.settings.value < 50) {
			this.progressBarType = "is-warning";
		}
		if (this.settings.value > 50 && this.settings.value < 75) {
			this.progressBarType = "is-info";
		}
		if (this.settings.value > 75 && this.settings.value < 100) {
			this.progressBarType = "is-success";
		}
	}
};
</script>

<style scoped style="less"></style>
