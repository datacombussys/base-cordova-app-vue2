<template>
	<div>
		<v-bottom-sheet class="top-sheet" v-model="openedSheet">
			<v-sheet height="100vh">
				<nav class="close-sheet-button">
					<div class="header">
						<slot name="title"></slot>
					</div>
					<div class="close-button">
						<router-link to="#" @click.native="closeSheet">
							<v-btn fab>
								<v-icon style="font-size: 45px">mdi-close-circle</v-icon>
							</v-btn>
						</router-link>
					</div>
				</nav>
				<div class="frame-container-sheet">
					<slot name="message"></slot>
					
				</div>
			</v-sheet>
		</v-bottom-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import { DxScrollView } from 'devextreme-vue/scroll-view';

//Mixins


export default {
	name: "sheetTemplateComponent",
	mixins: [

	],
	components: {
		DxScrollView

	},
	props: {
		openedSheet: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			//Main Data

		
		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);

		},
		closeSheet() {
			this.$emit('closeSheet', false)
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
.top-sheet {
	z-index: 1000;
}
.close-sheet-button {
	text-align: right;
	position: relative;
	right: -1px;
	top: -10px;
}

.frame-container-sheet {
	height: calc(90vh - 150px);
}
</style>
