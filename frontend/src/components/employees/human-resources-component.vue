<template>
	<div>
		<p>Human Resources</p>

	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "employeeHumanResourcesComponent",
	mixins: [],
	components: {
		
	},
	props: {
		accountSettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
		};
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
