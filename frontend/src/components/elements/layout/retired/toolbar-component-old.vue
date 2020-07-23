<template>
	<div class="page-container w-full">
		<div class="flex justify-between w-full items-center">
			<div class="flex items-center">
				<md-button class="md-icon-button" @click="toggleDrawer">
					<md-icon>menu</md-icon>
				</md-button>
				<span class="ml-6"><img src="../../../static/DataboxxLogo130X600.png" alt="Databoxx" width="150" height="33"></span>
			</div>
			<div>
				<span>
					<md-button to="/">Home</md-button>
					<md-button to="/template" :md-ripple="false">Template</md-button>
					<md-button to="/table">Table</md-button>
					<md-button to="/user/LEFT">User left</md-button>
					<md-button to="/colors">Color Palette</md-button>
					<md-button to="/fonts">Fonts</md-button>
				</span>
			</div>
			
		
			<div>
					<md-button to="/"  class="md-icon-button">
						<md-icon>portrait</md-icon>
					</md-button>
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
