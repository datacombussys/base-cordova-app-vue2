<template>
	<div>
		<p>Employee benefits</p>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "employeeBenefitsComponent",
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

<style scoped lang="scss">

</style>
