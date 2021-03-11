
<template>
	<div>
		<v-bottom-sheet 
			class="open-till-sheet"
			v-model="openSheetCloseTill">
      <v-sheet
        class="text-center"
				height="100vh"
       
      >
				<div class="row justify-between">
					<div class="col-4 flex items-center">
						<div class="headline-3 font-semibold">
							Manager Menu
						</div>
					</div>
					<div class="col-1">
						<v-btn
							icon
							color="red"
							@click="closeSheet"
						>
							<v-icon large>mdi mdi-close-circle</v-icon>
						</v-btn>
					</div>
				</div>

				<DxScrollView
					id="scrollview"
					ref="openTillScrollView"
					height="75vh"
					:scroll-by-content="true"
					:scroll-by-thumb="true"
					show-scrollbar="always"
					:bounce-enabled="true"
				>
				<template>
					<div class="row">
						<div class="col-6">
							Register Pay-Ins
						</div>
						<div class="col-6">
							Register Pay-Outs
						</div>
					</div>
				</template>
			

					<template>
						<div class="row justify-end">
							<v-btn 
							class="m-2" 
							large
							@click="cancelOpenTill"
							Cancel
							</v-btn>
							<v-btn 
								class="m-2" 
								large 
								color="primary"
								@click="submitOpenTill">
									Submit Count
							</v-btn>
						</div>
					</template>

				</DxScrollView>

      </v-sheet>
    </v-bottom-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";
var moment = require("moment");

import { DxScrollView } from 'devextreme-vue/scroll-view';

export default {
	name: "managerMenuComponent",
	mixins: [],
	components: {
		DxScrollView
	},
	props: {

	},
	data() {
		return {

		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},

	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
