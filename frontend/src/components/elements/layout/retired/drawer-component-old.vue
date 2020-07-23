<template>
	<div class="page-container">

	<md-toolbar class="md-transparent linear-gradient" md-elevation="6">
		<div class="w-full">
			<div tabindex="0" class="e-card">
				<div class="e-card-header">
					<div class="e-card-header-image football e-card-corner"></div>
						<div class="e-card-header-caption">
							<div class="e-card-header-title text-white">Ian Christensen</div>
						<div class="e-card-sub-title text-white">Owner and Director</div>
					</div>
				</div>
			</div>
		</div>
	</md-toolbar>
		<router-view class="view-left" name="drawer" :menuVisible="menuVisible"></router-view>


	</div>
</template>

<script>
import { mapState } from "vuex";



export default {
	name: "drawerComponent",
	mixins: [],
	components: {

	},
	props: {
		menuVisible: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			propData: {
				type: "Cool",
				height: "100"
			}
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
@import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../../node_modules/@syncfusion/ej2-vue-layouts/styles/material.css';
.linear-gradient {
	background:  linear-gradient(90deg, #001113, rgb(0, 33, 36));
}
.e-card {
	background: none;
	width: 100%;
	box-shadow: none;
}
.e-card .e-card-header .e-card-header-image.football {
	background-image: url('../../../static/Ian-profile250X250.jpg');
}
.e-card .e-card-header {
	padding: 0px;
	.e-card-header-image {
		width: 50px;
		height: 50px;
	}
	.e-card-header-title {
		color: white;
		font-family: Montserrat;
		font-weight: 500;
		font-size: 1.5em;
	}
	.e-card-sub-title {
		color: white;
		font-family: Montserrat;
		font-weight: 500;
		font-size: 0.9em;
	}
}

</style>
