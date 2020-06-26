<template>
	<div>
		
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';

//Components


export default {
	name: "simpleTabsComponent",
	mixins: [],
	components: {
	},
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

		}
	},
	computed: {
		...mapGetters(["GET_NOTIFICATIONS_LIST", "GET_NOTIFICATIONS_LIST_LENGTH"]),
	},
	created() {

	},
	mounted() {}
};
</script>

<style scoped lang="less">

</style>
