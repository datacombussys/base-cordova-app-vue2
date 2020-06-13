<template>
	<div>
		
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "shiftDatabaseComponent",
	components: {},
	mixins: [],
	props: {

	},
	data() {
		return {
			//Main Settings
		
	
		};
	},
	methods: {
		async testingMethod(e) {
	
		},

	
	},
	computed: {
		...mapState(["Users", "Attendance"])

	},
	created() {},
	async mounted() {
	
		
	}
};
</script>

<style scoped style="less">

</style>
