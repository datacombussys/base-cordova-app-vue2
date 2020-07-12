<template>
	<div class="mt-4">
		<ejs-button>Button</ejs-button>
		<ejs-button>Button</ejs-button>
		<ejs-button>Button</ejs-button>
		<ejs-button>Button</ejs-button>
		<ejs-button>Button</ejs-button>

</div>
</template>

<script>
import { mapState } from "vuex";
import Vue from 'vue';
import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
Vue.use(ButtonPlugin);

export default {
	name: "buttonComponent",
	mixins: [],
	components: {},
	props: {

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
@import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
.e-btn {
	border-radius: 0;
	height: 50px;
	width: 100px;
	background: rgba(177, 230, 235, 0.5);
	&.e-btn:hover {
		background: rgba(177, 230, 235, 1);
	}
}
</style>
