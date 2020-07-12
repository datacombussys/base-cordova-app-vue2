<template>
	<div class="page-container">
		<h1>The User is: {{ name }}</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia minus eos, itaque harum, ipsam id et laudantium exercitationem eum nobis aperiam quam voluptatibus numquam omnis magni porro obcaecati error molestias.</p>

	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "userComponent",
	mixins: [],
	components: {},
	props: {
    name: {
      type: String,
      default: "Joey"
    }
  },
	data() {
		return {
			menuVisible: false,
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
