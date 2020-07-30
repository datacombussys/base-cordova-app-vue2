<template>
	<div class="page-container w-full">
		<div class="flex justify-between w-full items-center">
			<div class="flex items-center">
				<v-btn @click="toggleDrawer">

				</v-btn>
				<span class="ml-6"><img src="../../../static/DataboxxLogo130X600.png" alt="Databoxx" width="150" height="33"></span>
			</div>
			<div>
				<span>
					<v-btn to="/">Home</v-btn>
			
					<v-btn to="/table">Table</v-btn>
					<v-btn to="/user/LEFT">User left</v-btn>
					<v-btn to="/colors">Color Palette</v-btn>
					<v-btn to="/fonts">Fonts</v-btn>
				</span>
			</div>
			
		
		</div>	


</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "toolbarComponent",
	mixins: [],
	components: {},
	props: {
		menuVisible: {
			type: Boolean,
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
		},
		toggleDrawer(e) {
			this.$emit('toggleDrawer', true)
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
