<template>
	<div>
		<div class="headline">Reporting</div>

	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "reportingComponent",
	mixins: [],
	components: {

	},
	props: {

	},
	data() {
		return {
	
		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
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
