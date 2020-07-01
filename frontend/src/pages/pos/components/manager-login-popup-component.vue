<template>
	<div>
		<!-- Cash Payment Page Popup -->
		<f7-popup class="manager-login-popup" :opened="managerPopupOpened" @popup:closed="managerPopupOpened = false">
			<f7-page>
				<f7-row class="popup-header">
					<f7-col width="90" class="margin-left">
						<f7-block-title class="margin-top text-color-white">Manager Login</f7-block-title>
					</f7-col>
					<f7-col width="10">
						<f7-link
							class="level-right margin-right"
							popup-close
							icon-size="40"
							icon-color="white"
							icon="mdi mdi-close"
						></f7-link>
					</f7-col>
				</f7-row>
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 100%;">
					<div>
						<f7-block>
							<f7-card>
								<f7-list>
									<f7-card-content>
										<p>manager login</p>

									</f7-card-content>
								</f7-list>
							</f7-card>
						</f7-block>
					</div>
				</div>
				<!-- END Scrollbae -->
			</f7-page>
		</f7-popup>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components


export default {
	name: "managerLoginPopupComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
	},
	data() {
		return {
			//Component Data

			//Main Data
			managerPopupOpened: false,

		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.gratuityType', this.gratuityType);
		},


	},
	computed: {
		...mapState(["Auth", "RetailPOS"]),
		...mapGetters([])

	},
	created() {

	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="less">

</style>
