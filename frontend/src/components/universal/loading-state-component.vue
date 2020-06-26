<template>
	<div>
		<!-- PreLoader -->
		<f7-block class="text-align-center">
			<f7-preloader :size="42" color="deeporange"></f7-preloader>
		</f7-block>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';

//Components


export default {
	name: "loadingStateComponent",
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

	},
	created() {

	},
	mounted() {}
};
</script>

<style scoped lang="less">

</style>
