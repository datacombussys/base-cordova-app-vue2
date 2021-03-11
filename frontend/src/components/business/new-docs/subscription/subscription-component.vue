<template>
	<div>
		<sheetTemplateComponent
			:openedSheet="openedSubscriptionSheet"
			@closeSheet="closeSheet">
			<template v-slot:title>
				Subscriptions
			</template>
			<template v-slot:message>
				<DxScrollView
					id="contractsScroll"
					ref="contractsScrollWidget"
					height="100%"
					width="100%"
					:scroll-by-content="false"
					:scroll-by-thumb="true"
					show-scrollbar="always"
					:bounce-enabled="false">
					<div class="block">
						<div class="row mt-5">
							<v-card class="w-full" elevation="5">
								<v-card-title>
									Subscriptions
								</v-card-title>
								<div class="row">
									<div class="col-3">
										<v-checkbox
										v-model="POS"
										label="Point of Sale"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="virtualTerminal"
										label="Virtual Terminal"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="giftCards"
										label="Gift Cards"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="Attendance"
										label="Attendance"
									></v-checkbox>
									</div>
								</div>

								<div class="row">
									<div class="col-3">
										<v-checkbox
										v-model="Accounting"
										label="Accounting"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="Equipment"
										label="Equipment"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="HelpDesk"
										label="Help Desk"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="ProjectMgt"
										label="Project Management"
									></v-checkbox>
									</div>
								</div>
								
								<div class="row">
									<div class="col-3">
										<v-checkbox
										v-model="Website"
										label="Website"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="Training"
										label="Training"
									></v-checkbox>
									</div>
									<div class="col-3">
										<v-checkbox
										v-model="eCommerce"
										label="E-Commerce"
									></v-checkbox>
									</div>
									<div class="col-3">
					
									</div>
								</div>

							</v-card>
						</div>
					</div>

					

				</DxScrollView>
			</template>

		</sheetTemplateComponent>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import { DxScrollView } from 'devextreme-vue/scroll-view';

//Components
import sheetTemplateComponent from "@/components/elements/modals/basic-sheet-component"
//Mixins


export default {
	name: "subscriptionComponent",
	mixins: [

	],
	components: {
		DxScrollView,
		sheetTemplateComponent

	},
	props: {

	},
	data() {
		return {
			//Main Data
			openedSubscriptionSheet: false,

			//Form Settings

			POS: false,
			virtualTerminal: false,
			giftCards: false,
			Accounting: false,
			Equipment: false,
			HelpDesk: false,
			ProjectMgt: false,
			Website: false,
			Training: false,
			eCommerce: false,
			Attendance: false,

		
		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);

		},
		closeSheet() {
			this.openedSubscriptionSheet= false
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
